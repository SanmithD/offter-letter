import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:'https://offter-letter.onrender.com/api',
    withCredentials: true
});