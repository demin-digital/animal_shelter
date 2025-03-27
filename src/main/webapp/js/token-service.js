import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

axios.defaults.baseURL = CONFIG.SERVER_URL;

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

    // Обновление токенов с использованием refresh token
    static async refreshTokens() {
        const refreshToken = sessionStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('Refresh token не найден');
        }

        let payload = new URLSearchParams();
        payload.append('grant_type', 'refresh_token');
        payload.append('refresh_token', refreshToken);

        try {
            const response = await axios.post('/oauth2/token', payload, {
                baseURL: CONFIG.SERVER_URL,
                headers: {
                    'Authorization': CONFIG.AUTH_HEADER_VALUE,
                },
            });

            // Сохраняем новые токены
            sessionStorage.setItem('access_token', response.data.access_token);
            sessionStorage.setItem('refresh_token', response.data.refresh_token);

            return response.data;
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            throw error;
        }
    }

    // Проверка и обновление токена
    static async checkAndRefreshToken() {
        const accessToken = sessionStorage.getItem('access_token');
        const refreshToken = sessionStorage.getItem('refresh_token');

        // Если токены отсутствуют
        if (!accessToken || !refreshToken) {
            throw new Error('Необходимо авторизоваться');
        }

        // Проверяем, истек ли access token
        if (this.isTokenExpired(accessToken)) {
            try {
                // Обновляем токен
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
        try {
            await TokenService.checkAndRefreshToken();
            console.log("Токен проверен и обновлён (если требовалось).");
        } catch (error) {
            console.error("Ошибка при проверке токена:", error);
            if (window.location.pathname !== "/sign-up" && window.location.pathname !== "/shadow-auth") {
                window.location.href = "/sign-up";
            }
        }
    }
}

// Экспортируем класс
export default TokenService;