<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Админская страница</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="static/css/home-style.css" rel="stylesheet">
</head>

<body>
  <div id="admin-title">👑 Добро пожаловать в админ-панель</div>
  <div id="admin-message">Загрузка...</div>

  <script type="module">
    import { initAdminPage } from './js/admin-page-init.js';
    document.addEventListener("DOMContentLoaded", initAdminPage);
  </script>
</body>

</html>
