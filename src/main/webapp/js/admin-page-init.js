import TokenService from './token-service.js';
import axiosResource from './axios-resource.js';

export async function initAdminPage() {
    const container = document.getElementById('admin-message');

    try {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
            window.location.href = "/sign-up";
            return;
        }

        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const roles = payload.roles || [];

        if (!roles.includes("ROLE_ADMIN")) {
            alert("У вас нет доступа к этой странице!");
            window.location.href = "/";
            return;
        }

        console.log("✅ Пользователь с ролью ADMIN вошел на страницу");

        TokenService.setupAxiosInterceptors(axiosResource);

        const response = await axiosResource.get('/admin-only');
        container.textContent = `✅ Ответ от сервера: ${response.data}`;
    } catch (error) {
        console.error("Ошибка на админской странице:", error);
        container.textContent = "❌ Доступ запрещён или произошла ошибка.";
    }
}
