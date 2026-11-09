// src/api/metricApi.js
import { apiClient } from './apiClient';

export const metricApi = {
    /**
     * Métricas globales de la plataforma RAG
     * GET /api/v1/metrics
     */
    getPlatformMetrics: async () => {
        const response = await apiClient.get('/metrics');
        return response.data?.data || response.data;
    },

    /**
     * Métricas personales del estudiante autenticado
     * GET /api/v1/students/metrics
     */
    getStudentMetrics: async () => {
        const response = await apiClient.get('/students/metrics');
        return response.data?.data || response.data;
    },
};

export default metricApi;
