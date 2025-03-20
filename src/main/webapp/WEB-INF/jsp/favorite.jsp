<%@ page language="java" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Избранное</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="static/css/home-style.css" rel="stylesheet">
    </head>

    <body>
        <header class="main-header">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid" id="navbar">
                    <a class="navbar-brand" href="/">BOWWOW</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav ms-auto d-flex align-items-center">
                            <li class="nav-item">
                                <a class="nav-link" href="#">rehoming</a>
                            <li class="nav-item text-center">
                                <a class="nav-link" href="#">dog advice</a>
                            </li>
                            <li class="nav-item text-center">
                                <a class="nav-link" href="#">how we help</a>
                            </li>
                            <li class="nav-item text-center">
                                <a class="nav-link" href="#">support us</a>
                            </li>
                            <li class="nav-item text-center">
                                <a class="nav-link" href="#">about us</a>
                            </li>
                            <li class="nav-item">
                                <a class="navbar-btn" href="#">
                                    <img src="static/png/profile.png" alt="Profile">
                                </a>
                            </li>
                        </ul>
                    </div>
            </nav>
        </header>

        <div class="title_top" style="z-index: 3; overflow: visible;">
            <p class="title_top_favorite">Избранные питомцы</p>
        </div>
        <div class="container mt-4">
            <div id="loading-indicator" style="display: none;">Загрузка...</div>
            <div id="favorite-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <!-- Карточки будут добавляться сюда -->
            </div>
        </div>

        <script type="module">
            import FavoriteService from './js/favorite-service.js';

            document.addEventListener("DOMContentLoaded", async () => {
                const loadingIndicator = document.getElementById("loading-indicator");
                loadingIndicator.style.display = "block"; // Показываем лоадер

                try {
                    const favorites = await FavoriteService.getFavorites();
                    console.log("Избранные питомцы:", favorites);

                    renderFavorites(favorites); // Вызываем функцию renderFavorites
                } catch (error) {
                    console.error("Ошибка при загрузке избранного:", error);
                } finally {
                    loadingIndicator.style.display = "none"; // Скрываем лоадер
                }
            });

            function renderFavorites(favorites) {
                const container = document.getElementById("favorite-list");
                if (!container) {
                    console.error("Контейнер favorite-list не найден!");
                    return;
                }

                container.innerHTML = ""; // Очищаем перед добавлением карточек

                if (!Array.isArray(favorites) || favorites.length === 0) {
                    container.innerHTML = "<p class='text-center text-muted'>Нет избранных питомцев</p>";
                    return;
                }

                console.log("Данные избранных:", favorites); // Логируем данные

                favorites.forEach((fav, index) => {
                    console.log(`Обрабатываем элемент ${index}:`, fav); // Логируем каждый элемент

                    if (!fav || !fav.pet) {
                        console.warn(`Ошибка: fav или fav.pet отсутствует в элементе ${index}`, fav);
                        return;
                    }

                    const pet = fav.pet;
                    console.log(`🐶 Обрабатываем питомца ${index}:`, pet); // Логируем данные питомца

                    // Проверяем каждое значение, если null или undefined - подставляем "Не указано"
                    function safeValue(value) {
                        return value !== null && value !== undefined ? value : "Не указано";
                    }

                    const petData = {
                        nickname: safeValue(pet.nickname),
                        breed: safeValue(pet.breed),
                        cityId: safeValue(pet.cityId),
                        cityName: safeValue(pet.cityName),
                        age: safeValue(pet.age),
                        color: safeValue(pet.color),
                        gender: safeValue(pet.gender),
                        size: safeValue(pet.size),
                        sterilized: pet.sterilized ? "Да" : "Нет",
                        vaccinated: pet.vaccinated ? "Да" : "Нет"
                    };

                    console.log(`📌 Данные для карточки ${index}:`, petData); // Логируем данные для карточки

                    // Создаем карточку
                    const card = document.createElement("div");
                    card.className = "col";

                    const isChecked = pet.isFavorite ? "checked" : "";

                    // Используем шаблонную строку с интерполяцией
                    const cardContent = `
                <div class="fv-card border-0 bg-transparent">
                    <div class="card-img-container">
                        <div class="favorite-icon `+ isChecked +`" onclick="toggleFavorite('card` + index + `')" id="card` + index + `">
                            <div class="icon-wrapper">
                                <svg class="inactive-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none" viewBox="0 0 18 16" stroke="currentColor">
                                    <path d="M8.42465 2.03443L8.80036 2.46232L9.17608 2.03443C9.24084 1.96069 9.30845 1.8885 9.37893 1.81802L9.048 1.48709L9.37893 1.81802C11.1363 0.0606602 13.9855 0.0606602 15.7429 1.81802C16.9657 3.04086 17.1503 4.52317 17.0918 5.42251C17.0384 6.24397 16.7829 6.87345 16.645 7.17876C16.3561 7.81846 15.9716 8.33972 15.7473 8.62972C13.5628 11.4543 12.3045 12.4559 10.7281 13.7107C10.1588 14.1638 9.54806 14.65 8.83724 15.2669C8.12006 14.6507 7.50522 14.1665 6.93242 13.7154C5.35004 12.4692 4.08855 11.4757 1.87677 8.651C1.65055 8.36209 1.26267 7.84294 0.969766 7.20546C0.830279 6.90188 0.569535 6.2722 0.511155 5.44832C0.447139 4.54492 0.625832 3.05003 1.85784 1.81802C3.6152 0.0606602 6.46444 0.0606602 8.2218 1.81802C8.29228 1.8885 8.3599 1.96069 8.42465 2.03443Z" stroke="black" />
                                </svg>
                            </div>
                        </div>
                        <img src="static/png/card-dog.png" class="card-img-top">
                        <div class="fv-card-body">
                            <p class="fv-card-title"><strong>` + petData.nickname + `</strong></p>
                            <p class="fv-card-text"><strong>Порода: </strong>` + petData.breed + `</p>
                            <p class="fv-card-text"><strong>Возраст: </strong>` + petData.age + `</p>
                            <p class="fv-card-text"><strong>Город: </strong>` + petData.cityName + `</p>
                            <p class="fv-card-text"><strong>Цвет: </strong>` + petData.color + `</p>
                            <p class="fv-card-text"><strong>Размер: </strong>` + petData.size + `</p>
                            <p class="fv-card-text"><strong>Стерилизован: </strong>` + petData.sterilized + `</p>
                            <p class="fv-card-text"><strong>Вакцинирован: </strong>` + petData.vaccinated + `</p>
                            <!-- Кнопка удаления теперь внутри этой card-body -->
                <button class="btn btn-danger mt-3 remove-favorite" data-id="` + pet.id +`">Убрать из избранного</button>
                        </div>
                    </div>
                </div>
            `;

                    card.innerHTML = cardContent;

                    // Добавляем обработчик события для удаления
card.querySelector(".remove-favorite").addEventListener("click", async (event) => {
    const petId = event.target.dataset.id;
    try {
        const result = await FavoriteService.removeFromFavorites(petId);
        if (result) {
            console.log("Питомец удален из избранного:", result);
            card.remove(); // Удаляем карточку из DOM
        } else {
            console.error("Не удалось удалить питомца из избранного");
        }
    } catch (error) {
        console.error("Ошибка при удалении из избранного:", error);
    }
});

                    // Добавляем карточку в контейнер
                    container.appendChild(card);

                    console.log(`Карточка ${index} добавлена в DOM:`, card); // Логируем добавленную карточку
                });
            }

            function toggleFavorite(cardId) {
                var icon = document.getElementById(cardId).querySelector('.favorite-icon');
                icon.classList.toggle('checked');
            }
        </script>
    </body>

    </html>