// src/assets/js/AuthApi.js
import axios from 'axios';

export const AuthApi = (() => {
    const instance = axios.create({
        baseURL: 'http://localhost:4000/api', // your backend API
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
    });

    // Attach JWT token to each request
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('authToken');
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    }, error => Promise.reject(error));

    // Handle 401 Unauthorized
    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('authToken');
                window.location.href = '/pages/sign-in.html';
            }
            return Promise.reject(error);
        }
    );

    return {
        get: (url, config) => instance.get(url, config),
        post: (url, data, config) => instance.post(url, data, config),
        put: (url, data, config) => instance.put(url, data, config),
        delete: (url, config) => instance.delete(url, config),
        instance
    };
})();
