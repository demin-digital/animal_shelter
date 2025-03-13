import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import TokenService from './token-service.js';

axios.defaults.baseURL = "http://localhost:8083"; // Явно задаем API URL

class FavoriteService {
    static async getFavorites() {
        try {
            const token = TokenService.getRSToken(); // Получаем сохраненный токен
            const access_token = await TokenService.checkAndRefreshToken();
            
            if (!token) {
                console.warn("Токен отсутствует!");
                return [];
            }

            console.log("Используемый токен:", token);

            const response = await axios.get("/favorites/user", {
                headers: {
                    "token": token,
                    'Authorization': `Bearer ${access_token}`,
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
        try {
            const token = TokenService.getRSToken(); // Получаем сохраненный токен
            if (!token) {
                console.warn("Токен отсутствует!");
                return false;
            }

            console.log("Используемый токен:", token);

            const response = await axios.delete(`/favorites/remove?petId=${petId}`, {
                headers: { "token": token }
            });

            console.log("Статус ответа:", response.status);
            console.log("Данные от API:", response.data);

            return response.data; // Возвращаем ответ от сервера
        } catch (error) {
            console.error("Ошибка при удалении из избранного:", error.response?.data || error.message);
            return false;
        }
    }
}

export default FavoriteService;
