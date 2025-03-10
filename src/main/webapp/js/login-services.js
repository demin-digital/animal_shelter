import CONFIG from './config.js';
import axios from 'https://cdn.skypack.dev/axios';

axios.defaults.baseURL = CONFIG.SERVER_URL;

class LoginService {
    // Редирект на страницу авторизации
    static login() {
        let requestParams = new URLSearchParams({
            response_type: "code",
            client_id: CONFIG.CLIENT_ID,
            redirect_uri: CONFIG.REDIRECT_URI,
            scope: "read.scope write.scope"
        });

        window.location.href = `${CONFIG.SERVER_URL}/oauth2/authorize?${requestParams}`;
    }

    // Аутентификация через логин и пароль
    static async authenticate(username, password) {
        try {
            const response = await axios.post('/auth', {
                username: username,
                password: password
            }, {
                baseURL: CONFIG.BACKEND_URI,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Проверяем, есть ли токен в ответе
            if (response.data.token) {
                sessionStorage.setItem(CONFIG.RESOURSE_SERVER_TOKEN_KEY, response.data.token);
                console.log("Токен сохранен:", response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error("Ошибка при аутентификации:", error);
            throw error;
        }
    }
}

// Экспортируем класс и делаем методы доступными глобально
window.LoginService = LoginService;