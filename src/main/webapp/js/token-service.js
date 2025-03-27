import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

axios.defaults.baseURL = CONFIG.AUTH_SERVER_URL;

class TokenService {
    // Сохранение токенов
    static saveTokens(tokens) {
        sessionStorage.setItem('access_token', tokens.access_token);
        sessionStorage.setItem('refresh_token', tokens.refresh_token);
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

    // Определение источника токена ('api' или 'oauth2')
    static getTokenSource(refreshToken) {
        try {
            const payload = JSON.parse(atob(refreshToken.split('.')[1]));
            return payload.source || 'unknown';
        } catch (error) {
            console.error("Ошибка при получении source из токена:", error);
            return 'unknown';
        }
    }

    // Обновление токенов с использованием refresh token
    static async refreshTokens() {
        const refreshToken = sessionStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('Refresh token не найден');
        }

        const source = this.getTokenSource(refreshToken);

        if (source === 'api') {
            try {
                const response = await axios.post('/auth/refresh', {
                    refresh_token: refreshToken
                });

                this.saveTokens(response.data);
                return response.data;
            } catch (error) {
                console.error('Ошибка при обновлении токена (API):', error);
                throw error;
            }
        } else if (source === 'oauth2') {
            const payload = new URLSearchParams();
            payload.append('grant_type', 'refresh_token');
            payload.append('refresh_token', refreshToken);

            try {
                const response = await axios.post('/oauth2/token', payload, {
                    headers: {
                        'Authorization': CONFIG.AUTH_HEADER_VALUE,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                this.saveTokens(response.data);
                return response.data;
            } catch (error) {
                console.error('Ошибка при обновлении токена (OAuth2):', error);
                throw error;
            }
        } else {
            throw new Error(`Неизвестный источник токена: ${source}`);
        }
    }

    // Проверка и обновление токена
    static async checkAndRefreshToken() {
        const accessToken = sessionStorage.getItem('access_token');
        const refreshToken = sessionStorage.getItem('refresh_token');

        if (!accessToken || !refreshToken) {
            throw new Error('Необходимо авторизоваться');
        }

        if (this.isTokenExpired(accessToken)) {
            try {
                const newTokens = await this.refreshTokens();
                return newTokens.access_token;
            } catch (error) {
                console.error('Ошибка при обновлении токена:', error);
                throw new Error('Не удалось обновить токен. Пожалуйста, авторизуйтесь снова.');
            }
        }

        return accessToken;
    }

    static async initTokenRefresh() {
            await TokenService.checkAndRefreshToken(); 
    }

    static setupAxiosInterceptors() {
        axios.interceptors.request.use(
            async (config) => {
                const accessToken = sessionStorage.getItem('access_token');
    
                if (accessToken && !TokenService.isTokenExpired(accessToken)) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
    
                return config;
            },
            (error) => Promise.reject(error)
        );
    
        axios.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
    
                // Если это 401 и мы ещё не пробовали обновить
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
    
                    try {
                        const newTokens = await TokenService.refreshTokens();
    
                        // Обновляем access_token в заголовке
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access_token}`;
                        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
    
                        return axios(originalRequest); // Повторяем оригинальный запрос
                    } catch (refreshError) {
                        console.error("Ошибка при обновлении токена через Interceptor:", refreshError);
                        sessionStorage.clear(); // Очистка токенов
                        window.location.href = "/sign-up"; // Перенаправление на вход
                    }
                }
    
                return Promise.reject(error);
            }
        );
    }
}

export default TokenService;
