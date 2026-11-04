// src/api/apiClient.js
import axios from 'axios';

/**
 * Instancia de Axios con exportación doble (nombrada y por defecto)
 * para garantizar compatibilidad con cualquier tipo de importación.
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 360000, // Timeout de 6 minutos para dar tiempo a RAG y Qdrant
});

// Interceptor para adjuntar Token JWT si existe la sesión activa
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;