// Principio SRP: Responsable único de configurar Axios, inyectar el Bearer Token en peticiones salientes y normalizar errores HTTP.
import axios from 'axios';

// Creación de la instancia centralizada de Axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // Timeout de 30 segundos para respuestas de procesamiento de IA
});

// Interceptor de Peticiones (Request Interceptor)
apiClient.interceptors.request.use(
    (config) => {
        // Recupera el token JWT almacenado en la sesión del usuario
        const token = localStorage.getItem('auth_token');

        // Si existe token, lo inyecta automáticamente en los encabezados Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de Respuestas (Response Interceptor)
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Normalización de respuestas de error para ser consumidas limpiamente en la UI
        const customError = {
            message: error.response?.data?.message || 'Ocurrió un error inesperado en el servidor.',
            status: error.response?.status || 500,
            details: error.response?.data || null,
        };

        return Promise.reject(customError);
    }
);

export default apiClient;