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
                        age: safeValue(pet.age),
                        color: safeValue(pet.color),
                        gender: safeValue(pet.gender),
                        size: safeValue(pet.size),
                        sterilized: pet.sterilized ? "Да" : "Нет",
                        vaccinated: pet.vaccinated ? "Да" : "Нет"
                    };

                    console.log(`📌 Данные для карточки ${index}:`, petData); // Логируем данные для карточки

                    // Создаем карточку вручную
                    const card = document.createElement("div");
                    card.className = "card shadow-sm p-3 mb-4";

                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";

                    // Создаем заголовок
                    const title = document.createElement("h5");
                    title.className = "card-title text-center";
                    title.textContent = petData.nickname;
                    cardBody.appendChild(title);

                    // Создаем элементы для каждого свойства
                    const breed = document.createElement("p");
                    breed.className = "card-text";
                    breed.innerHTML = `<strong>Порода:</strong> ` + petData.breed;
                    cardBody.appendChild(breed);

                    const cityId = document.createElement("p");
                    cityId.className = "card-text";
                    cityId.innerHTML = `<strong>Город ID:</strong> ` + petData.cityId;
                    cardBody.appendChild(cityId);

                    const age = document.createElement("p");
                    age.className = "card-text";
                    age.innerHTML = `<strong>Возраст:</strong> ` + petData.age;
                    cardBody.appendChild(age);

                    const color = document.createElement("p");
                    color.className = "card-text";
                    color.innerHTML = `<strong>Цвет:</strong> ` + petData.color;
                    cardBody.appendChild(color);

                    const size = document.createElement("p");
                    size.className = "card-text";
                    size.innerHTML = `<strong>Размер:</strong> ` + petData.size;
                    cardBody.appendChild(size);

                    const gender = document.createElement("p");
                    gender.className = "card-text";
                    gender.innerHTML = `<strong>Пол:</strong> ` + petData.gender;
                    cardBody.appendChild(gender);

                    const sterilized = document.createElement("p");
                    sterilized.className = "card-text";
                    sterilized.innerHTML = `<strong>Стерилизован:</strong> ` + petData.sterilized;
                    cardBody.appendChild(sterilized);

                    const vaccinated = document.createElement("p");
                    vaccinated.className = "card-text";
                    vaccinated.innerHTML = `<strong>Вакцинирован:</strong> ` + petData.vaccinated;
                    cardBody.appendChild(vaccinated);

                    // Создаем кнопку "Убрать из избранного"
                    const removeButton = document.createElement("button");
                    removeButton.className = "btn btn-danger mt-3";
                    removeButton.textContent = "Убрать из избранного";
                    removeButton.addEventListener("click", async () => {
                        try {
                            const result = await FavoriteService.removeFromFavorites(pet.id);
                            if (result) {
                                console.log("Питомец удален из избранного:", result);
                                // Удаляем карточку из DOM
                                card.remove();
                            } else {
                                console.error("Не удалось удалить питомца из избранного");
                            }
                        } catch (error) {
                            console.error("Ошибка при удалении из избранного:", error);
                        }
                    });
                    cardBody.appendChild(removeButton);

                    card.appendChild(cardBody);
                    container.appendChild(card);

                    console.log(`Карточка ${index} добавлена в DOM:`, card); // Логируем добавленную карточку
                });
            }
        </script>


    </body>

    </html>