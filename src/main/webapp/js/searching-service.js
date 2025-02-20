// Импорт библиотеки Axios
import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

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

            // Здесь можно отправить выбранный город на сервер или выполнить другие действия
        });
    }
}
// Инициализация
document.addEventListener("DOMContentLoaded", function () {
    SearchService.loadCities(); // Загружаем список городов
    SearchService.handleCitySelection(); // Настраиваем обработчик выбора города
});