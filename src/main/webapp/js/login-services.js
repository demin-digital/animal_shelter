// Импорт библиотеки Axios
import axios from 'https://cdn.skypack.dev/axios';

//TODO: вынести в глобальные переменные в конфиг
// Настройка базового URL для Axios
const serverUrl = "http://localhost:7777"
axios.defaults.baseURL = serverUrl;

// Определение переменных для параметров авторизации
const clientId = "test-client";
const authHeaderValue = "Basic dGVzdC1jbGllbnQ6dGVzdC1jbGllbnQ=";
const redirectUri = "http://localhost:5000/code";

const ACCESS_TOKEN_KEY = "access_token";

    // делаем первичный запрос на авторизацию через j-sso
    function   login() {
        let requestParams = new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: 'read.scope write.scope'
        });
        window.location = serverUrl + "/oauth2/authorize?" + requestParams;
    }

    // После успешного получения кода авторизации, делаем запрос на получение access и refresh токенов
    function getTokens(code) {
        let payload = new FormData()
        payload.append('grant_type', 'authorization_code')
        payload.append('code', code)
        payload.append('redirect_uri', redirectUri)
        payload.append('client_id', clientId)

        try {
            const response = axios.post('/oauth2/token', payload, {
                headers: {
                    'Content-type': 'application/url-form-encoded',
                    'Authorization': authHeaderValue
                }
            });

            // получаем токены, кладем access token в LocalStorage
            console.log("Result getting tokens: " + response.data)
            window.sessionStorage.setItem(ACCESS_TOKEN_KEY, response.data[ACCESS_TOKEN_KEY]);
        } catch (error) {
            console.error("Error getting tokens: ", error);
        }
    }

    // получение информации о токене
    function getTokenInfo() {
        let payload = new FormData();
        // Извлечение access token из LocalStorage и добавление его в параметр `token`
        payload.append('token', window.sessionStorage.getItem(ACCESS_TOKEN_KEY));
    
        return axios.post('/oauth2/token-info', payload, {
            headers: {
                'Authorization': authHeaderValue
            }
        });
    }

// Экспорт функций
window.login = login;
window.getTokens = getTokens;
window.getTokenInfo = getTokenInfo;