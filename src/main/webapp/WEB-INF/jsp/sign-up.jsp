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

<section class="main-content">
    <div class="container top_sign_up position-relative">
        <img src="static/png/sign_up_shape.png" class="img-fluid img-sign_up_shape position-absolute" style="z-index: 0;">
        <img src="static/png/sign_up_dog.png" class="img-fluid img-sign_up_dog position-absolute" style="z-index: 1;">
        <div class="title_top" style="z-index: 3; position: absolute; top: -75px; overflow: visible;">
            <p class="title_top_sign_up">Гав-Гав!</p>
            <p class="text_top_sign_up">(перевод с собачьего: “привет, дружище!”)</p>
        </div>
    </div>
    <div class="container bottom_sign_up position-relative">
        <div class="title_bottom">
            <p class="title_bottom_sign_up">Добро Пожаловать!</p>
            <p class="text_bottom_sign_up">Войдя в аккаунт, вы получаете доступ к избранному, а также дополнительным функциям</p>
            <p class="info_bottom_sign_up">Если вы не заходили больше года, вам необходимо заново создать аккаунт</p>
            <p class="login_bottom_sign_up">Войти через почту</p>
        </div>
        <form class="input_sign_up">
            <div>
              <input type="email" placeholder="Email">
            </div>
            <div>
              <input type="password" placeholder="Пароль">
            </div>
            <button type="submit" class="login">Войти</button>
          </form>
          <div class="registration">
            <p class="title_registration">Нет аккаунта?</p>
            <button type="submit" class="button_registration">зарегистрироваться</button>
          </div>
          <div class="policy_sign_up">
            <p class="title_policy">Ознакомиться с политикой <a href="#" class="privacy-link">конфиденциальности</a> и всякими другими штуками</p>
          </div>
    </div>
</section>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
</body>

</html>