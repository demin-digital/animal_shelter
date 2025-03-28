import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

const axiosAuth = axios.create({
    baseURL: CONFIG.AUTH_SERVER_URL,
});

export default axiosAuth;
