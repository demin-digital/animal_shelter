import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';
import RefreshTokenService from './refresh-token-service.js';

axios.defaults.baseURL = CONFIG.SERVER_URL;

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
    static async searchPets(cityId, breed) {
        try {
            // Проверяем и обновляем токен
            const token = await RefreshTokenService.checkAndRefreshToken();

            // Формируем URL с параметрами поиска
            const url = new URL(`${CONFIG.BACKEND_URI}/pet/search`, window.location.origin);
            if (cityId) url.searchParams.append('cityId', cityId);
            if (breed) url.searchParams.append('breed', breed);

            // Отправляем GET-запрос на сервер с токеном
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

        const list = document.createElement('ul');
        pets.forEach(pet => {
            const item = document.createElement('li');
            item.innerHTML = `<p style="color: green;">Кличка: ${pet.nickname}, Порода: ${pet.breed}, Город: ${pet.cityId}<p>`;
            list.appendChild(item);
        });

        resultsContainer.appendChild(list);
    }

    // Функция для отображения ошибки
    static displayError(message) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = `<p style="color: red;">Ошибка: ${message}</p>`;
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
});