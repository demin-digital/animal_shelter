import axiosAuth from './axios-auth.js';
import CONFIG from './config.js';

let isRefreshing = false;

class TokenService {

    static saveTokens(tokens) {
        sessionStorage.setItem('access_token', tokens.access_token);
        sessionStorage.setItem('refresh_token', tokens.refresh_token);
    }

    static isTokenExpired(token) {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return Math.floor(Date.now() / 1000) >= payload.exp;
        } catch (error) {
            console.error("Ошибка при проверке срока действия токена:", error);
            return true;
        }
    }

    static getTokenSource(refreshToken) {
        // Проверяем, JWT ли это (наличие 3-х частей через '.')
        if (refreshToken.split('.').length === 3) {
            try {
                const payload = JSON.parse(atob(refreshToken.split('.')[1]));
                return payload.source || 'api'; // кастомные токены всегда имеют source
            } catch (error) {
                console.error("Ошибка при разборе JWT токена:", error);
                return 'unknown';
            }
        } else {
            return 'oauth2';
        }
    }

    static async refreshTokens() {
        const refreshToken = sessionStorage.getItem('refresh_token');

        if (!refreshToken || typeof refreshToken !== 'string') {
            throw new Error('Refresh token некорректный');
        }
        
        const source = this.getTokenSource(refreshToken);

        if (source === 'api') {
            try {
                const response = await axiosAuth.post('/auth/refresh', {
                    refresh_token: refreshToken
                });
                this.saveTokens(response.data);
                return response.data;
            } catch (error) {
                console.error('Ошибка при обновлении токена (API):', error);
                throw error;
            }
        } else if (source === 'oauth2') {
            const payload = new URLSearchParams();
            payload.append('grant_type', 'refresh_token');
            payload.append('refresh_token', refreshToken);

            try {
                const response = await axiosAuth.post('/oauth2/token', payload, {
                    headers: {
                        'Authorization': CONFIG.AUTH_HEADER_VALUE,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                this.saveTokens(response.data);
                return response.data;
            } catch (error) {
                console.error('Ошибка при обновлении токена (OAuth2):', error);
                throw error;
            }
        } else {
            throw new Error(`Неизвестный источник токена: ${source}`);
        }
    }

    static async checkAndRefreshToken() {
        const accessToken = sessionStorage.getItem('access_token');
        const refreshToken = sessionStorage.getItem('refresh_token');

        if (!accessToken || !refreshToken) {
            throw new Error('Необходимо авторизоваться');
        }

        if (this.isTokenExpired(accessToken)) {
            try {
                const newTokens = await this.refreshTokens();
                return newTokens.access_token;
            } catch (error) {
                console.error('Ошибка при обновлении токена:', error);
                throw new Error('Не удалось обновить токен. Пожалуйста, авторизуйтесь снова.');
            }
        }

        return accessToken;
    }

    static async initTokenRefresh() {
        await TokenService.checkAndRefreshToken(); 
    }

    static setupAxiosInterceptors(instance) {
        instance.interceptors.request.use(
            async (config) => {
                const accessToken = sessionStorage.getItem('access_token');
                if (accessToken && !TokenService.isTokenExpired(accessToken)) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        instance.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
    
                // Защита от зацикливания
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (isRefreshing) {
                        console.warn("Уже идёт попытка обновления токена, прерываем повторную попытку.");
                        return Promise.reject(error);
                    }
    
                    originalRequest._retry = true;
                    isRefreshing = true;
    
                    try {
                        const newTokens = await TokenService.refreshTokens();
    
                        // Проставим новый токен в оригинальный запрос
                        originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
    
                        isRefreshing = false;
                        return instance(originalRequest); // повторяем запрос
                    } catch (refreshError) {
                        console.error("❌ Ошибка при обновлении токена через Interceptor:", refreshError);
                        isRefreshing = false;
                        sessionStorage.clear();
                        window.location.href = "/sign-up";
                        return Promise.reject(refreshError);
                    }
                }
    
                return Promise.reject(error);
            }
        );
    }
}

export default TokenService;