import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import TokenService from './token-service.js';
import FavoriteService from './favorite-service.js';
import AuthService from './auth-services.js';

axios.defaults.baseURL = CONFIG.BACKEND_URI;

class SearchService {
    // Функция для загрузки списка городов
    static async loadCities() {
        try {
            // Отправляем GET-запрос на бэкенд
            const response = await fetch(`${CONFIG.BACKEND_URI}/cities/get_list/`);
            const data = await response.json();

            // Получаем элемент <select>
            const citySelect = document.getElementById('city-select');

            // Очищаем список (если там уже есть элементы)
            citySelect.innerHTML = '<option value="" disabled selected>Выберите город</option>';

            // Добавляем города в выпадающий список
            data.cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.cityId; // Значение для отправки на сервер
                option.textContent = city.name; // Отображаемое название города
                citySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Ошибка при загрузке городов:', error);
        }
    }

    // Функция для обработки выбора города
    static handleCitySelection() {
        const citySelect = document.getElementById('city-select');
        citySelect.addEventListener('change', function () {
            const selectedCityId = this.value; // Получаем выбранный cityId
            const selectedCityName = this.options[this.selectedIndex].text; // Получаем название города

            console.log('Выбран город:', selectedCityName, 'ID:', selectedCityId);
        });
    }

    // Функция для поиска питомцев
    static async searchPets(cityId, breed, petId) {
        try {
            // Проверяем и обновляем токен
            const access_token = await TokenService.checkAndRefreshToken();

            // Формируем URL с параметрами поиска
            const url = new URL(`${CONFIG.BACKEND_URI}/pet/search`, window.location.origin);
            if (cityId) url.searchParams.append('cityId', cityId);
            if (breed) url.searchParams.append('breed', breed);
            if (petId) url.searchParams.append('petId', petId);

            // Отправляем GET-запрос на сервер с токеном
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }

            const pets = await response.json();
            this.displaySearchResults(pets);
        } catch (error) {
            console.error('Ошибка при поиске питомцев:', error);
            this.displayError(error.message);

            // Если ошибка связана с авторизацией, перенаправляем на страницу логина
            if (error.message.includes('Необходимо авторизоваться') || error.message.includes('Не удалось обновить токен')) {
                // window.location.href = '/login'; TODO: убрать на финальной стадии проекта, либо сделать переадресацию на страницу логина
            }
        }
    }

    // Функция для отображения результатов поиска
    static displaySearchResults(pets) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Очищаем предыдущие результаты

        if (pets.length === 0) {
            resultsContainer.innerHTML = '<p>Ничего не найдено.</p>';
            return;
        }

        pets.forEach(pet => {
            const col = document.createElement('div');
            col.className = 'col';

            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = pet.imageUrl ?  CONFIG.BACKEND_URI + pet.imageUrl : '/static/png/card-dog.png'; 
        
            card.dataset.petId = pet.id;  // Сохраняем ID собаки в dataset чтобы дальше отправлять в сервисы
            card.dataset.cityId = pet.cityId; // Сохраняем ID города

            const cardBody = document.createElement('div');
            cardBody.className = 'sp-card-body';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'sp-card-title';
            cardTitle.textContent = pet.nickname;

            const cardText = document.createElement('p');
            cardText.className = 'sp-card-text';
            cardText.innerHTML = pet.breed + `, <br>` + pet.cityName;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);

            // Если isFavorite = true, сразу делаем кнопку активной
            const isFavorite = pet.isFavorite ? "checked" : "";

            // Создаем кнопку "Избранное"
            const favButton = document.createElement('div');
            favButton.className = 'favorite-icon ' + isFavorite;
            favButton.id = `fav-${pet.id}`;  // Присваиваем ID для поиска элемента

            favButton.innerHTML = `
                <div class="icon-wrapper">
                    <svg class="inactive-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none" viewBox="0 0 18 16" stroke="currentColor">
                        <path d="M8.42465 2.03443L8.80036 2.46232L9.17608 2.03443C9.24084 1.96069 9.30845 1.8885 9.37893 1.81802L9.048 1.48709L9.37893 1.81802C11.1363 0.0606602 13.9855 0.0606602 15.7429 1.81802C16.9657 3.04086 17.1503 4.52317 17.0918 5.42251C17.0384 6.24397 16.7829 6.87345 16.645 7.17876C16.3561 7.81846 15.9716 8.33972 15.7473 8.62972C13.5628 11.4543 12.3045 12.4559 10.7281 13.7107C10.1588 14.1638 9.54806 14.65 8.83724 15.2669C8.12006 14.6507 7.50522 14.1665 6.93242 13.7154C5.35004 12.4692 4.08855 11.4757 1.87677 8.651C1.65055 8.36209 1.26267 7.84294 0.969766 7.20546C0.830279 6.90188 0.569535 6.2722 0.511155 5.44832C0.447139 4.54492 0.625832 3.05003 1.85784 1.81802C3.6152 0.0606602 6.46444 0.0606602 8.2218 1.81802C8.29228 1.8885 8.3599 1.96069 8.42465 2.03443Z" stroke="black" />
                    </svg>
                </div>
            `;

            card.appendChild(favButton);
            resultsContainer.appendChild(col);

            // Добавляем обработчик клика на всю карточку (переход в детальную)
            card.addEventListener('click', () => {
                window.location.href = `details?petId=${pet.id}`;
            });

            // Добавляем обработчик клика на избранное
            favButton.addEventListener('click', (event) => {
                event.stopPropagation();
                this.toggleFavorite(pet.id); // Вызываем метод класса
            });
        });
    }

    static async toggleFavorite(petId) {
        const favIcon = document.getElementById(`fav-${petId}`);
        if (!favIcon) return;
    
        const isCurrentlyFavorite = favIcon.classList.contains("checked");
    
        try {
            if (isCurrentlyFavorite) {
                await FavoriteService.removeFromFavorites(petId);
            } else {
                await FavoriteService.addToFavorites(petId);
            }
    
            // Переключаем класс в зависимости от нового состояния
            favIcon.classList.toggle("checked", !isCurrentlyFavorite);
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
        }
    }

    // Функция для отображения ошибки
    static displayError(message) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = `<p style="color: red;">Ошибка:` + message + `</p>`;
    }

    // Инициализация обработчика формы поиска
    static initSearchForm() {
        const searchForm = document.getElementById('search-form');

        // Проверяем, существует ли элемент
        if (!searchForm) {
            console.error('Элемент с id="search-form" не найден');
            return;
        }

        searchForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            // Получаем выбранный город и введенную породу
            const cityId = document.getElementById('city-select').value;
            const breed = document.getElementById('breed-input').value;

            // Выполняем поиск
            SearchService.searchPets(cityId, breed);
        });
    }
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
    SearchService.loadCities(); // Загружаем список городов
    SearchService.handleCitySelection(); // Настраиваем обработчик выбора города
    SearchService.initSearchForm(); // Инициализируем обработчик формы поиска
    AuthService.initNavButtonHandler();
});