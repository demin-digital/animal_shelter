<%@ page language="java" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BOWWOW</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="static/css/home-style.css">
</head>

<body>

<header class="main-header">
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid" id="navbar">
            <a class="navbar-brand" href="#">BOWWOW</a>
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
                        <a class="navbar-btn" href="#" onclick="LoginService.login()">
                            <img src="static/png/profile.png" alt="Profile">
                        </a>
                    </li>
                </ul>
            </div>
    </nav>
</header>

<section class="main-top position-relative">
    <div class="container position-relative">
        <img src="static/png/dog.png" class="img-fluid position-absolute" style="left: 0; z-index: 0;">
        <img src="static/png/Rectangle.png" class="img-fluid position-absolute top-25 start-0" style="z-index: 1;">
        <div class="position-absolute top-100 start-50" style="z-index: 3;">
            <h1>Left in the cold, dogs like tiny need your help.</h1>
            <p id="top-text">This Christmas, will you be a star and help guide dogs like Tiny to their Dogs Trust
                miracle?
            </p>
            <div class="main-top-buttons">
                <button type="button" class="btn btn-dark rounded-pill custom-btn">Donate</button>
            </div>
        </div>
    </div>
    <div class="row position-relative rehoming-center justify-content-center align-items-center">
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="col">
            <div class="icon-and-text">
                <p>rehoming centre</p>
                <div class="rounded-circle">
                    <img src="static/png/apartment.png" alt="icon" class="img-fluid">
                </div>
            </div>
        </div>
        <div class="find-dog text-center">
            <h2>Find dog to adopt </h2>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div id="carousel-card" class="carousel slide carousel-multi-item">
                            <div class="carousel-inner">
                                <!-- First Slide -->
                                <div class="carousel-item active">
                                    <div class="row">
                                        <div class="col">
                                            <!-- Your first card content here -->
                                            <div class="card border-0 bg-transparent" id="card1">
                                                <div class="card-img-container position-relative">
                                                    <!-- Icon favorite-->
                                                    <div class="favorite-icon" onclick="toggleFavorite('card1')">
                                                        <div class="icon-wrapper">
                                                            <svg class="inactive-icon"
                                                                 xmlns="http://www.w3.org/2000/svg" width="18"
                                                                 height="16"
                                                                 fill="none" viewBox="0 0 18 16" stroke="currentColor">
                                                                <path
                                                                        d="M8.42465 2.03443L8.80036 2.46232L9.17608 2.03443C9.24084 1.96069 9.30845 1.8885 9.37893 1.81802L9.048 1.48709L9.37893 1.81802C11.1363 0.0606602 13.9855 0.0606602 15.7429 1.81802C16.9657 3.04086 17.1503 4.52317 17.0918 5.42251C17.0384 6.24397 16.7829 6.87345 16.645 7.17876C16.3561 7.81846 15.9716 8.33972 15.7473 8.62972C13.5628 11.4543 12.3045 12.4559 10.7281 13.7107C10.1588 14.1638 9.54806 14.65 8.83724 15.2669C8.12006 14.6507 7.50522 14.1665 6.93242 13.7154C5.35004 12.4692 4.08855 11.4757 1.87677 8.651C1.65055 8.36209 1.26267 7.84294 0.969766 7.20546C0.830279 6.90188 0.569535 6.2722 0.511155 5.44832C0.447139 4.54492 0.625832 3.05003 1.85784 1.81802C3.6152 0.0606602 6.46444 0.0606602 8.2218 1.81802C8.29228 1.8885 8.3599 1.96069 8.42465 2.03443Z"
                                                                        stroke="black"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <!-- Script перенесем в отдельный файл, чисто для наглядности-->
                                                    <script>
                              function toggleFavorite(cardId) {
                                var icon = document.getElementById(cardId).querySelector('.favorite-icon');
                                icon.classList.toggle('checked');
                              }


                                                    </script>
                                                    <img src="static/png/card-dog.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <!-- Second card content here -->
                                            <div class="card border-0 bg-transparent" id="card2">
                                                <div class="card-img-container position-relative">
                                                    <!-- Icon favorite-->
                                                    <div class="favorite-icon" onclick="toggleFavorite('card2')">
                                                        <div class="icon-wrapper">
                                                            <svg class="inactive-icon"
                                                                 xmlns="http://www.w3.org/2000/svg" width="18"
                                                                 height="16"
                                                                 fill="none" viewBox="0 0 18 16" stroke="currentColor">
                                                                <path
                                                                        d="M8.42465 2.03443L8.80036 2.46232L9.17608 2.03443C9.24084 1.96069 9.30845 1.8885 9.37893 1.81802L9.048 1.48709L9.37893 1.81802C11.1363 0.0606602 13.9855 0.0606602 15.7429 1.81802C16.9657 3.04086 17.1503 4.52317 17.0918 5.42251C17.0384 6.24397 16.7829 6.87345 16.645 7.17876C16.3561 7.81846 15.9716 8.33972 15.7473 8.62972C13.5628 11.4543 12.3045 12.4559 10.7281 13.7107C10.1588 14.1638 9.54806 14.65 8.83724 15.2669C8.12006 14.6507 7.50522 14.1665 6.93242 13.7154C5.35004 12.4692 4.08855 11.4757 1.87677 8.651C1.65055 8.36209 1.26267 7.84294 0.969766 7.20546C0.830279 6.90188 0.569535 6.2722 0.511155 5.44832C0.447139 4.54492 0.625832 3.05003 1.85784 1.81802C3.6152 0.0606602 6.46444 0.0606602 8.2218 1.81802C8.29228 1.8885 8.3599 1.96069 8.42465 2.03443Z"
                                                                        stroke="black"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <img src="static/png/card-dog.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Second Slide -->
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col">
                                            <!-- Your first card content here -->
                                            <div class="card border-0 bg-transparent" id="card3">
                                                <div class="card-img-container position-relative">
                                                    <div class="favorite-icon" onclick="toggleFavorite('card3')">
                                                        <div class="icon-wrapper">
                                                            <svg class="inactive-icon"
                                                                 xmlns="http://www.w3.org/2000/svg" width="18"
                                                                 height="16"
                                                                 fill="none" viewBox="0 0 18 16" stroke="currentColor">
                                                                <path
                                                                        d="M8.42465 2.03443L8.80036 2.46232L9.17608 2.03443C9.24084 1.96069 9.30845 1.8885 9.37893 1.81802L9.048 1.48709L9.37893 1.81802C11.1363 0.0606602 13.9855 0.0606602 15.7429 1.81802C16.9657 3.04086 17.1503 4.52317 17.0918 5.42251C17.0384 6.24397 16.7829 6.87345 16.645 7.17876C16.3561 7.81846 15.9716 8.33972 15.7473 8.62972C13.5628 11.4543 12.3045 12.4559 10.7281 13.7107C10.1588 14.1638 9.54806 14.65 8.83724 15.2669C8.12006 14.6507 7.50522 14.1665 6.93242 13.7154C5.35004 12.4692 4.08855 11.4757 1.87677 8.651C1.65055 8.36209 1.26267 7.84294 0.969766 7.20546C0.830279 6.90188 0.569535 6.2722 0.511155 5.44832C0.447139 4.54492 0.625832 3.05003 1.85784 1.81802C3.6152 0.0606602 6.46444 0.0606602 8.2218 1.81802C8.29228 1.8885 8.3599 1.96069 8.42465 2.03443Z"
                                                                        stroke="black"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <img src="static/png/card3.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <!-- Your second card content here -->
                                            <div class="card border-0 bg-transparent">
                                                <div class="card-img-container position-relative">
                                                    <img src="static/png/card4.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Third Slide -->
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col">
                                            <!-- Your first card content here -->
                                            <div class="card border-0 bg-transparent">
                                                <div class="card-img-container position-relative">
                                                    <img src="static/png/card5.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <!-- Your second card content here -->
                                            <div class="card border-0 bg-transparent">
                                                <div class="card-img-container position-relative">
                                                    <img src="static/png/card6.png" class="card-img-top">
                                                    <img src="static/png/card-background.png" class="card-img-bottom">
                                                    <div class="card-body position-absolute top-0 start-50 translate-middle-x">
                                                        <h3 class="card-title">Baboo</h3>
                                                        <p class="card-text">French Buldog Moscow</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-card"
                                    data-bs-slide="prev">
                                <img src="static/png/Left.png" alt="Previous">
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carousel-card"
                                    data-bs-slide="next">
                                <img src="static/png/Right.png" alt="Next">
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <form>
                            <!-- Форма -->
                            <div>
                                <input type="text" class="search-city" placeholder="Город">
                            </div>
                            <div>
                                <input type="text" class="search-breed" placeholder="Порода Собаки">
                            </div>
                            <button type="submit" class="search-button">Поиск</button>
                            <a class="catalog" href="#">Посмотреть всех собак</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="main-bottom position-relative">
    <p> Будь дед морозом, подари собачкам чудо на новый год</p>
    <div class="miracle">
        <p>Сделаешь маленькое чудо?</p>
        <p id="choose-gift">Выбери из трех подарков</p>
        <div class="gift">
            <div class="img-container">
                <img src="static/png/miracle_dog.png" class="img-fluid position-absolute">
            </div>
            <button type="submit" class="sacrifice-button">Пожертвовать 300₽ сейчас</button>
            <div class="pay-method">
                <img src="static/png/visa.png" class="icon1">
                <img src="static/png/master.png" class="icon2">
                <img src="static/png/apple.png" class="icon3">
                <img src="static/png/google.png" class="icon4">
            </div>
        </div>
    </div>
</section>

<script src="js/login-services.js" type="module"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
</body>

</html>