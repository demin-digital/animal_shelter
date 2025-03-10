<%@ page language="java" pageEncoding="UTF-8" %>
    <!doctype html>
    <html lang="ru">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Редирект...</title>
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

        <div class="text-center">
            <h2 class="title_top_sign_up">Добро пожаловать!</h2>
            <p class="text_top_sign_up">Вы успешно авторизованы. Перенаправление...</p>
        </div>

        <script>
            setTimeout(() => {
                window.location.href = "/"; 
            }, 3000);
        </script>

        <script src="js/auth-services.js" type="module">
        </script>

    </body>
    </html>