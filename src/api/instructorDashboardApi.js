import { apiClient } from './apiClient';

export const instructorDashboardApi = {
    /**
     * Obtiene la visión global del panel de instructor: tarjetas de métricas, gráfico analítico y tabla comparativa.
     * Conecta con GET /api/v1/instructor/dashboard
     */
    getDashboardSummary: async (timeRange = '30d') => {
        const response = await apiClient.get(`/instructor/dashboard?range=${timeRange}`);
        return response.data.data;
    },

    /**
     * Obtiene los datos analíticos de ingresos e inscripciones filtrados por rango de tiempo.
     * Conecta con GET /api/v1/instructor/analytics
     */
    getAnalyticsData: async (timeRange = '30d', metricType = 'revenue') => {
        const response = await apiClient.get(`/instructor/analytics?range=${timeRange}&metric=${metricType}`);
        return response.data.data;
    },

    /**
     * Obtiene el listado comparativo de rendimiento de cursos del instructor.
     * Conecta con GET /api/v1/instructor/courses/performance
     */
    getCoursePerformance: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);

        const response = await apiClient.get(`/instructor/courses/performance?${queryParams.toString()}`);
        return response.data.data;
    },
};