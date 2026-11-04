// src/api/queryApi.js
import { apiClient } from './apiClient.js';

export const queryApi = {
    /**
     * Envía la consulta a la API Backend -> n8n -> Qdrant
     */
    askQuery: async (queryData) => {
        const response = await apiClient.post('/queries/ask', {
            prompt: queryData.prompt || queryData.userQuery,
            studentId: queryData.studentId || queryData.userId || null,
            courseId: queryData.courseId || 'general',
            userRole: queryData.userRole || 'anonymous'
        });
        return response.data;
    },

    /**
     * Obtiene el historial del estudiante autenticado
     */
    getHistory: async () => {
        try {
            const response = await apiClient.get('/queries/history');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                return { success: true, data: [] };
            }
            throw error;
        }
    },

    /**
     * Registra la calificación dada por el usuario
     */
    rateQuery: async (ratingData) => {
        const response = await apiClient.post('/queries/rate', ratingData);
        return response.data;
    }
};

export default queryApi;