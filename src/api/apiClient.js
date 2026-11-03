// src/api/apiClient.js
// Principio SRP: Instancia centralizada de Axios para la comunicación con el Backend Express.
import axios from 'axios';

/**
 * Instancia centralizada de Axios con configuración base y timeouts.
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Interceptor de Peticiones: Inyecta el Token JWT en el encabezado Authorization
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('rutaia_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de Respuestas: Manejo global de expiración de sesión (401)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('rutaia_token');
        }
        return Promise.reject(error.response?.data || error);
    }
);

// Alias para mantener compatibilidad con archivos que importen { api }
export const api = apiClient;

// Exportación por defecto para archivos que utilicen: import apiClient from './apiClient'
export default apiClient;