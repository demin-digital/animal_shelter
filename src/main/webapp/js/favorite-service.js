import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import TokenService from './token-service.js';
import AuthService from './auth-services.js';

axios.defaults.baseURL = "http://localhost:8083"; // Явно задаем API URL

class FavoriteService {
    static async getFavorites() {
        try {
            const access_token = await TokenService.checkAndRefreshToken();
            const response = await axios.get("/favorites/user", {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            console.log("Статус ответа:", response.status);
            console.log("Данные от API:", response.data);

            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                console.error("Ожидался массив, но получено:", typeof response.data);
                return [];
            }
        } catch (error) {
            console.error("Ошибка при загрузке избранного:", error.response?.data || error.message);
            return [];
        }
    }

    // Метод для удаления из избранного
    static async removeFromFavorites(petId) {
        const access_token = await TokenService.checkAndRefreshToken();

        try {

            const response = await axios.delete(`/favorites/remove?petId=${petId}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            console.log("Статус ответа:", response.status);
            console.log("Данные от API:", response.data);

            return response.data; // Возвращаем ответ от сервера
        } catch (error) {
            console.error("Ошибка при удалении из избранного:", error.response?.data || error.message);
            return false;
        }
    }

    // Метод для добавления в избранное
    static async addToFavorites(petId) {
        try {
            // Проверяем и обновляем токен
            const access_token = await TokenService.checkAndRefreshToken();

            // Формируем URL с параметрами поиска
            const url = new URL(`${CONFIG.BACKEND_URI}/favorites/add`, window.location.origin);
            const body = JSON.stringify({
                petId: petId
            });

            // Отправляем GET-запрос на сервер с токеном
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }

            return response.data;
        } catch (error) {
            throw new Error("Ошибка при добавлении в избранное:", error.response?.data || error.message)
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    AuthService.initNavButtonHandler();
});

export default FavoriteService;
