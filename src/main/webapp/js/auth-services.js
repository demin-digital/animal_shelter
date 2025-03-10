import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import TokenService from './token-service.js';

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

            // Сохранение токенов через RefreshTokenService
            TokenService.saveTokens(response.data);
            console.log("Tokens received:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error getting tokens:", error);
            throw error;
        }
    }

    // Обработка авторизационного кода и получение токенов
    static async handleAuthorization() {
        const code = this.getAuthorizationCode();
        console.log("Authorization code is:", code);

        if (code) {
            try {
                await this.getTokens(code);
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

// TODO: этот момент ниже можно оптимизировать в сторону автоматической перезагрузки страницы в jsp, нужно подумать;
// Автоматически вызываем обработку кода при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    AuthService.handleAuthorization();
});

// Экспортируем класс
export default AuthService;