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
}

// Экспортируем класс и делаем login() доступным глобально
window.LoginService = LoginService;
export default LoginService;