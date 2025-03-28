import axios from 'https://cdn.skypack.dev/axios';
import CONFIG from './config.js';

const axiosResource = axios.create({
    baseURL: CONFIG.BACKEND_URI,
});

export default axiosResource;
