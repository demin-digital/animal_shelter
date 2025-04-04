import CONFIG from './config.js';
import axios from 'https://cdn.skypack.dev/axios';
import TokenService from './token-service.js';

axios.defaults.baseURL = CONFIG.AUTH_SERVER_URL;

class LoginService {
    // Редирект на страницу авторизации
    static login() {
        let requestParams = new URLSearchParams({
            response_type: "code",
            client_id: CONFIG.CLIENT_ID,
            redirect_uri: CONFIG.REDIRECT_URI,
            scope: "read.scope write.scope"
        });

        window.location.href = `${CONFIG.AUTH_SERVER_URL}/oauth2/authorize?${requestParams}`;
    }

    // Аутентификация через логин и пароль
    static async authenticate(username, password) {
        try {
            const payload = { username, password };

            const response = await axios.post("/auth/login", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            // Сохраняем access и refresh токены
            TokenService.saveTokens(response.data);
    
            return response.data;
        } catch (error) {
            console.error("Ошибка при аутентификации:", error);
            throw error;
        }
    }
}

// Экспортируем класс и делаем методы доступными глобально
window.LoginService = LoginService;