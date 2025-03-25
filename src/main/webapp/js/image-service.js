import CONFIG from "./config.js";
import axios from 'https://cdn.skypack.dev/axios';

class ImageService {
    static async uploadPetImage(petId, file) {
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post(
                `/pet/${petId}/upload-image`,
                formData,
                {
                    baseURL: CONFIG.BACKEND_URI,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
        
            console.log("Ответ сервера:", response);
            
            if (response.status === 200 || response.status === 201) { 
                alert("Изображение успешно загружено");
            } else {
                alert(`Ошибка: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
            alert(`Ошибка загрузки изображения: ${error.response?.data || error.message}`);
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get("petId");

    if (petId) {
        const uploadButton = document.getElementById("uploadImageButton");
        const fileInput = document.getElementById("imageUploadInput");

        uploadButton.addEventListener("click", async () => {
            const file = fileInput.files[0];
            if (!file) {
                alert("Выберите изображение перед загрузкой!");
                return;
            }

            await ImageService.uploadPetImage(petId, file);
        });
    }
});