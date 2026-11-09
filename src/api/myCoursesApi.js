// src/api/myCoursesApi.js
import { apiClient } from './apiClient';

export const myCoursesApi = {
    /**
     * Cursos matriculados del estudiante autenticado con progreso
     * GET /api/v1/students/my-courses?status=in_progress|completed&sortBy=last_accessed|progress|title
     */
    getMyCourses: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status && params.status !== 'all') queryParams.append('status', params.status);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        const qs = queryParams.toString();
        const response = await apiClient.get(`/students/my-courses${qs ? `?${qs}` : ''}`);
        return response.data;
    },
};
