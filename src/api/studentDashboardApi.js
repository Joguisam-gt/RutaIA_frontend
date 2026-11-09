// src/api/studentDashboardApi.js
import { apiClient } from './apiClient';

export const studentDashboardApi = {
    /**
     * Cursos del estudiante en progreso.
     * GET /api/v1/students/my-courses?status=in_progress&sortBy=last_accessed
     */
    getInProgressCourses: async () => {
        const response = await apiClient.get('/students/my-courses', {
            params: { status: 'in_progress', sortBy: 'last_accessed' },
        });
        return response.data;
    },

    /**
     * Métricas personales del estudiante autenticado.
     * GET /api/v1/students/metrics
     */
    getStudentMetrics: async () => {
        const response = await apiClient.get('/students/metrics');
        return response.data;
    },

    /**
     * Cursos completados del estudiante.
     * GET /api/v1/students/my-courses?status=completed
     */
    getCompletedCourses: async () => {
        const response = await apiClient.get('/students/my-courses', {
            params: { status: 'completed', sortBy: 'title' },
        });
        return response.data;
    },

    /**
     * @deprecated Usar getInProgressCourses + getStudentMetrics por separado.
     * Alias de compatibilidad.
     */
    getDashboardData: async () => {
        const [coursesRes, metricsRes] = await Promise.allSettled([
            apiClient.get('/students/my-courses', {
                params: { status: 'in_progress', sortBy: 'last_accessed' },
            }),
            apiClient.get('/students/metrics'),
        ]);

        const courses = coursesRes.status === 'fulfilled'
            ? (coursesRes.value?.data?.data || coursesRes.value?.data || [])
            : [];

        const metrics = metricsRes.status === 'fulfilled'
            ? (metricsRes.value?.data?.data || metricsRes.value?.data || {})
            : {};

        return { courses, metrics };
    },
};
