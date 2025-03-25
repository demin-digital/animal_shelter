<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <html>

    <head>
        <title>Детали питомца</title>
        <script src="js/pet-details-service.js" type="module"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                                <a class="navbar-btn" href="/sign-up" ">
                                    <img src="static/png/profile.png" alt="Profile">
                                </a>
                            </li>
                        </ul>
                    </div>
            </nav>
        </header>

        <div class="title_top" style="z-index: 3; overflow: visible;">
            <p class="title_top_favorite">Информация о питомце</p>
        </div>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div id="pet-details" color="#000000">
                        <p>Загрузка...</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div id="pet-descriptions">
                        <p>Загрузка...</p>
                    </div>
                </div>
                <!-- Блок загрузки изображения -->
                <div class="mt-3">
                    <input type="file" id="imageUploadInput" accept="image/*" class="form-control">
                    <button id="uploadImageButton" class="btn btn-primary mt-2">Загрузить изображение</button>
                </div>
            </div>
        </div>
    </body>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const petId = urlParams.get('petId');

            if (petId) {
                PetDetailsService.loadPetDetails(petId);
                PetDetailsService.loadPetDescriptions(petId);
            } else {
                document.getElementById('pet-details').innerHTML = '<p>Ошибка: не указан petId</p>';
            }
        });
    </script>
    <script src="js/image-service.js" type="module"></script>

    </html>