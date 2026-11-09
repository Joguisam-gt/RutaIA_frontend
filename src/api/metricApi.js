// src/api/metricApi.js
import { apiClient } from './apiClient';

export const metricApi = {
    /**
     * Obtiene las 5 metricas globales de la plataforma RAG (RF 18)
     * GET /api/v1/metrics
     */
    getPlatformMetrics: async () => {
        const response = await apiClient.get('/metrics');
        return response.data?.data || response.data;
    },

    getStudentMetrics: async () => {
        const response = await apiClient.get('/metrics/student');
        return response.data?.data || response.data;
    }
};

export default metricApi;