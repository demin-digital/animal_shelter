import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

class RegistrationServices {
    static async register(data) {
        const response = await axios.post("/auth/register", data, {
            baseURL: CONFIG.AUTH_SERVER_URL,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            username: form.username.value.trim(),
            password: form.password.value.trim(),
            email: form.email.value.trim(),
            firstName: form.firstName.value.trim(),
            secondName: form.secondName.value.trim(),
            phoneNumber: form.phoneNumber.value.trim()
        };

        // Валидация
        if (!data.username || !data.password || !data.email || !data.phoneNumber) {
            showMessage("Пожалуйста, заполните обязательные поля", "danger");
            return;
        }

        if (data.password.length < 6) {
            showMessage("Пароль должен быть не менее 6 символов", "danger");
            return;
        }

        if (!/^\+?\d{10,}$/.test(data.phoneNumber)) {
            showMessage("Некорректный номер телефона", "danger");
            return;
        }

        try {
            const response = await RegistrationServices.register(data);
        
            // DEBUG — выводим ответ в консоль
            console.log("Registration response:", response);
        
            const res = response;
        
            if (res.success) {
                showMessage("Регистрация успешна!", "success");
                form.reset();
                setTimeout(() => window.location.href = "/sign-up", 2000);
            } else {
                showMessage("Ошибка: " + (res.message || "Неизвестная ошибка"), "danger");
            }
        
        } catch (error) {
            console.error("Ошибка axios:", error);
        
            if (error.response?.data?.message) {
                showMessage("Ошибка: " + error.response.data.message, "danger");
            } else if (error.message?.includes("Network Error")) {
                showMessage("Ошибка соединения с сервером", "danger");
            } else {
                showMessage("Что-то пошло не так", "danger");
            }
        }
    });

    function showMessage(text, type = "success") {
        const msg = document.getElementById("message");
    
        msg.className = `alert alert-${type} text-center mt-3`;
        msg.innerHTML = (type === "success" ? "✅" : "❌") + " " + text;
        msg.classList.remove("visually-hidden");
    
        // Скрыть через 5 секунд, если это ошибка
        if (type !== "success") {
            setTimeout(() => {
                msg.classList.add("visually-hidden");
            }, 5000);
        }
    }
});
