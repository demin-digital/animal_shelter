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

            // Сохранение токенов через TokenService
            TokenService.saveTokens(response.data);
            console.log("Tokens received:", response.data);

            return response.data;
        } catch (error) {
            console.error("Error getting tokens:", error);
            throw error;
        }
    }

    // Обработка авторизационного кода (вызываем только на shadow-auth)
    static async handleAuthorization() {
        const code = this.getAuthorizationCode();
        console.log("Authorization code is:", code);

        if (code) {
            try {
                await this.getTokens(code);
                window.history.replaceState({}, document.title, window.location.pathname);
                window.location.href = "/my-account"; // Перенаправляем на главную страницу
            } catch (error) {
                console.error("Error handling authorization:", error);
            }
        } else {
            console.error("Authorization code not found in URL.");
        }
    }

    static isAuthenticated() {
        return sessionStorage.getItem("access_token") &&
            sessionStorage.getItem("refresh_token") &&
            sessionStorage.getItem("token");
    }


    static logout() {
        // Удаляем токены из sessionStorage
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("token");

        // Перенаправляем на страницу входа
        window.location.href = "/sign-up";
    }

    static initLogoutButton() {
        const logoutButton = document.getElementById("logout-btn");

        if (logoutButton) {
            logoutButton.addEventListener("click", function (event) {
                event.preventDefault();
                AuthService.logout();
            });
        }
    }

    static initNavButtonHandler() {
        const navButton = document.querySelector(".navbar-btn");
    
        if (navButton) {
            navButton.addEventListener("click", function (event) {
                event.preventDefault(); // Отменяем стандартный переход
                window.location.href = AuthService.isAuthenticated() ? "/my-account" : "/sign-up";
            });
        }
    }
}

// Вызываем handleAuthorization() только если это shadow-auth.jsp
document.addEventListener("DOMContentLoaded", () => {
    TokenService.initTokenRefresh();
    if (window.location.pathname.includes("shadow-auth")) {
        AuthService.handleAuthorization();
    }
    AuthService.initNavButtonHandler();
});


export default AuthService;
