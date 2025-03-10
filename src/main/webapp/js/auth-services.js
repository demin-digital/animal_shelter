import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

axios.defaults.baseURL = CONFIG.SERVER_URL;

class AuthService {
    // Получение кода авторизации из URL
    static getAuthorizationCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    }

    // Получение токенов после редиректа
    static async getTokens(code) {
        let payload = new URLSearchParams();
        payload.append('grant_type', 'authorization_code');
        payload.append('code', code);
        payload.append('redirect_uri', CONFIG.REDIRECT_URI);

        try {
            const response = await axios.post('/oauth2/token', payload, {
                headers: {
                    'Authorization': CONFIG.AUTH_HEADER_VALUE
                }
            });

            // Сохранение access token и refresh token в sessionStorage
            window.sessionStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, response.data.access_token);
            window.sessionStorage.setItem(CONFIG.REFRESH_TOKEN_KEY, response.data.refresh_token);
            console.log("Tokens received:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error getting tokens:", error);
            throw error;
        }
    }

    // Проверка, истек ли срок действия токена
    static isTokenExpired(token) {
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена
            const exp = payload.exp; // Время истечения токена (в секундах)
            const now = Math.floor(Date.now() / 1000); // Текущее время (в секундах)

            return now >= exp; // Токен истек, если текущее время больше времени истечения
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Если токен некорректен, считаем его истекшим
        }
    }

    // Обновление токенов с использованием refresh token
    static async refreshTokens() {
        const refreshToken = window.sessionStorage.getItem(CONFIG.REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            console.error("Refresh token not found.");
            throw new Error("Refresh token not found.");
        }

        let payload = new URLSearchParams();
        payload.append('grant_type', 'refresh_token');
        payload.append('refresh_token', refreshToken);

        try {
            const response = await axios.post('/oauth2/token', payload, {
                headers: {
                    'Authorization': CONFIG.AUTH_HEADER_VALUE
                }
            });

            // Сохранение нового access token и refresh token
            window.sessionStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, response.data.access_token);
            window.sessionStorage.setItem(CONFIG.REFRESH_TOKEN_KEY, response.data.refresh_token);
            console.log("Tokens refreshed:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error refreshing tokens:", error);
            throw error;
        }
    }

    // Обработка авторизационного кода и получение токенов
    static async handleAuthorization() {
        const code = AuthService.getAuthorizationCode();
        console.log("Authorization code is:", code);

        if (code) {
            try {
                await AuthService.getTokens(code);
                window.history.replaceState({}, document.title, window.location.pathname);
                window.location.href = "/"; // Перенаправляем на главную страницу
            } catch (error) {
                console.error("Error handling authorization:", error);
            }
        } else {
            console.error("Authorization code not found in URL.");
        }
    }
}

// Добавляем интерцепторы Axios
axios.interceptors.request.use(async (config) => {
    const accessToken = window.sessionStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);

    if (accessToken) {
        if (AuthService.isTokenExpired(accessToken)) {
            try {
                await AuthService.refreshTokens(); // Обновляем токен, если он истек
                const newAccessToken = window.sessionStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
                config.headers['Authorization'] = `Bearer ${newAccessToken}`; // Обновляем заголовок
            } catch (error) {
                console.error("Failed to refresh token:", error);
                // Перенаправляем на страницу логина, если не удалось обновить токен
                window.location.href = "/login";
                return Promise.reject(error);
            }
        } else {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Используем текущий токен
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Перенаправляем на страницу логина, если токен недействителен
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

// Автоматически вызываем обработку кода при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    AuthService.handleAuthorization();
});

// Экспортируем класс и делаем login() доступным глобально
window.AuthService = AuthService;
export default AuthService;