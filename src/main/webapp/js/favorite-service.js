import axiosResource from './axios-resource.js';
import AuthService from './auth-services.js';
import TokenService from './token-service.js';

class FavoriteService {
    static async getFavorites() {
        try {
            const response = await axiosResource.get("/favorites/user");

            console.log("Статус ответа:", response.status);
            console.log("Данные от API:", response.data);

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Ошибка при загрузке избранного:", error.response?.data || error.message);
            return [];
        }
    }

    static async removeFromFavorites(petId) {
        try {
            const response = await axiosResource.delete(`/favorites/remove?petId=${petId}`);
            console.log("Питомец удален из избранного:", response.data);
            return response.data;
        } catch (error) {
            console.error("Ошибка при удалении из избранного:", error.response?.data || error.message);
            return false;
        }
    }

    static async addToFavorites(petId) {
        try {
            const response = await axiosResource.post("/favorites/add", { petId });
            console.log("Питомец добавлен в избранное:", response.data);
            return response.data;
        } catch (error) {
            console.error("Ошибка при добавлении в избранное:", error.response?.data || error.message);
            throw new Error("Ошибка при добавлении в избранное");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    TokenService.setupAxiosInterceptors(axiosResource);
    AuthService.initNavButtonHandler();
});

export default FavoriteService;