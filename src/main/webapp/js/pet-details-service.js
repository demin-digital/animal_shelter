import axiosResource from './axios-resource.js';
import AuthService from './auth-services.js';
import TokenService from './token-service.js';

TokenService.setupAxiosInterceptors(axiosResource);

class PetDetailsService {
    static async loadPetDetails(petId) {
        try {
            const response = await axiosResource.get(`/pet/search`, {
                //TODO: тут в будущем нужно убрать хардкод на "cityId", сейчас он нужен только для того, чтобы отрабатывала информация на детальной карточке и не триггерился flag
                params: { petId, "cityId":"1" }
            });

            console.log("Response" + response.data);
            const pets = response.data;
            if (!pets.length) {
                document.getElementById('pet-details').innerHTML = '<p>Питомец не найден.</p>';
                return;
            }

            const pet = pets[0];
            document.getElementById('pet-details').innerHTML = `
                <h3>${pet.nickname}</h3>
                <p><strong>Порода:</strong> ${pet.breed}</p>
                <p><strong>Возраст:</strong> ${pet.age} лет</p>
                <p><strong>Пол:</strong> ${pet.gender}</p>
                <p><strong>Размер:</strong> ${pet.size}</p>
                <p><strong>Цвет:</strong> ${pet.color}</p>
                <p><strong>Город:</strong> ${pet.cityName}</p>
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
            const response = await axiosResource.get(`/pet/description/${petId}`);
            this.displayPetDetails(response.data);
        } catch (error) {
            console.error('Ошибка загрузки описания:', error);
            document.getElementById('pet-descriptions').innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    }

    static displayPetDetails(pet) {
        const detailsContainer = document.getElementById('pet-descriptions');
        if (!detailsContainer) return;

        detailsContainer.innerHTML = `
            <h3>${pet.shortDescription || '<em>Нет краткого описания</em>'}</h3>
            <p>${pet.fullDescription}</p>
            <div class="mt-3">
                <textarea id="edit-full-desc" class="form-control" rows="3">${pet.fullDescription}</textarea>
                <button class="btn btn-warning mt-2" onclick="PetDetailsService.editDescription(${pet.petId})">Сохранить изменения</button>
            </div>
        `;
    }

    static async editDescription(petId) {
        try {
            const newFullDesc = document.getElementById('edit-full-desc').value;

            // Отправка пустого shortDescription (фронтенд-баг)
            await axiosResource.post(`/pet/description/add`, {
                petId,
                shortDescription: '', // TODO: здесь баг!
                fullDescription: newFullDesc
            });
            this.loadPetDescriptions(petId);
        } catch (error) {
            alert('Ошибка при обновлении описания');
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    AuthService.initNavButtonHandler();
});

window.PetDetailsService = PetDetailsService;
