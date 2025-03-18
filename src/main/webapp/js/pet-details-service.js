import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import TokenService from './token-service.js';

axios.defaults.baseURL = "http://localhost:8083";

class PetDetailsService {
    static async loadPetDetails(petId) {
        try {
            const access_token = await TokenService.checkAndRefreshToken();
            const url = new URL(`${CONFIG.BACKEND_URI}/pet/search`, window.location.origin);
            url.searchParams.append('petId', petId);

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${access_token}` },
            });

            if (!response.ok) throw new Error('Ошибка при загрузке данных');

            const pets = await response.json();
            if (pets.length === 0) {
                document.getElementById('pet-details').innerHTML = '<p>Питомец не найден.</p>';
                return;
            }

            const pet = pets[0]; // Единственная запись
            document.getElementById('pet-details').innerHTML = `
                <h3>${pet.nickname}</h3>
                <p><strong>Порода:</strong> ${pet.breed}</p>
                <p><strong>Возраст:</strong> ${pet.age} лет</p>
                <p><strong>Пол:</strong> ${pet.gender}</p>
                <p><strong>Размер:</strong> ${pet.size}</p>
                <p><strong>Цвет:</strong> ${pet.color}</p>
                <p><strong>Город ID:</strong> ${pet.cityId}</p>
                <p><strong>Вакцинирован:</strong> ${pet.vaccinated ? 'Да' : 'Нет'}</p>
                <p><strong>Стерилизован:</strong> ${pet.sterilized ? 'Да' : 'Нет'}</p>
            `;
        } catch (error) {
            console.error('Ошибка загрузки питомца:', error);
            document.getElementById('pet-details').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    }

    static async loadPetDescriptions(petId) {
        try {
            const access_token = await TokenService.checkAndRefreshToken();
            const url = `${CONFIG.BACKEND_URI}/pet/description/${petId}`;
            console.log('идет вызов на эндпоинт: ' + url);

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${access_token}` },
            });
            if (!response.ok) throw new Error('Ошибка при загрузке данных');

            const pet = await response.json();
            this.displayPetDetails(pet);
        } catch (error) {
            console.error('Ошибка загрузки питомца:', error);
            document.getElementById('pet-details').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    }

    static displayPetDetails(pet) {
        const detailsContainer = document.getElementById('pet-descriptions');
        if (!detailsContainer) {
            console.error('Элемент с id="pet-descriptions" не найден');
            return;
        }

        detailsContainer.innerHTML = `
            <h3>` + pet.shortDescription + `</h3>
            <p>` + pet.fullDescription + `</p>
        `;
    }
}
window.PetDetailsService = PetDetailsService;
