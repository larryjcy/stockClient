// src/assets/js/login.js
import { AuthApi } from './AuthApi.js';

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await AuthApi.post('/auth/login', { username, password });
        const token = res.data.token;
        localStorage.setItem('authToken', token);
        window.location.href = '/pages/dashboard.html';
    } catch (err) {
        loginError.textContent = err.response?.data?.message || 'Login failed';
    }
});
