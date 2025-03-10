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

// Автоматически вызываем обработку кода при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    AuthService.handleAuthorization();
});

// Экспортируем класс и делаем login() доступным глобально
window.AuthService = AuthService;
export default AuthService;