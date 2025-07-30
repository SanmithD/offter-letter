import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api',
    baseURL:'https://offter-letter.onrender.com/api',
    withCredentials: true
});