// src/api/apiClient.js
import axios from 'axios';

// ✅ Exportación nombrada directa: export const apiClient
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    timeout: 360000, // 6 minutos
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para inyectar token solo si existe y es válido
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Exportación por defecto para retrocompatibilidad
export default apiClient;