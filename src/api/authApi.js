import { apiClient } from './apiClient.js';

export const authApi = {
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
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
    },

    forgotPassword: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (resetData) => {
        const response = await apiClient.post('/auth/reset-password', resetData);
        return response.data;
    },
};

export default authApi;