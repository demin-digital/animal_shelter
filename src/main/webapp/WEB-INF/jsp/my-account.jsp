<%@ page language="java" pageEncoding="UTF-8" %>
    <!doctype html>
    <html lang="ru">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Мой аккаунт</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="static/css/home-style.css">

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
                                <a class="navbar-btn" href="#" onclick="LoginService.login()">
                                    <img src="static/png/profile.png" alt="Profile">
                                </a>
                            </li>
                        </ul>
                    </div>
            </nav>
        </header>

        <body>
            <div class="IntroMyAccount">
                <div class="inner-container">
                    <div class="welcome-text">Зд-Гав-сьте!</div>
                    <div class="icon-container">
                        <a href="/favorite" class="icon-item">
                            <img src="static/png/fav-icon.png" alt="Icon 1">
                            <span>Избранное</span>
                        </a>
                        <a href="#" class="icon-item">
                            <img src="static/png/sponsore-icon.png" alt="Icon 2">
                            <span>Пожертвовать на корм</span>
                        </a>
                        <a href="/search" class="icon-item">
                            <img src="static/png/rehome-icon.png" alt="Icon 3">
                            <span>Переселение</span>
                        </a>
                        <a href="#" class="icon-item">
                            <img src="static/png/acc-icon.png" alt="Icon 4">
                            <span>Настройка аккаунта</span>
                        </a>
                        <a href="#" class="icon-item">
                            <img src="static/png/logout-icon.png" alt="Icon 5">
                            <span>Выйти из аккаунта</span>
                        </a>
                    </div>
                </div>
            </div>
        </body>
    </body>

    </html>