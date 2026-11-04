// src/api/authApi.js
import { apiClient } from './apiClient.js';

export const authApi = {
    login: async (credentials) => {
        const payload = {
            email: String(credentials.email || credentials.username || '').toLowerCase().trim(),
            password: String(credentials.password || '')
        };

        console.log('[authApi] Enviando payload a /auth/login:', payload);

        const response = await apiClient.post('/auth/login', payload);
        return response.data;
    },

    register: async (userData) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};

export default authApi;