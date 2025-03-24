import AuthService from "./auth-services.js";


class MyAccount {

}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
    AuthService.initLogoutButton(); 
    AuthService.initNavButtonHandler();
});