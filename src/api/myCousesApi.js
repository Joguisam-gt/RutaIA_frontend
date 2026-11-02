import { apiClient } from './apiClient';

export const myCoursesApi = {
    /**
     * Obtiene el listado de cursos matriculados del estudiante y el resumen de métricas.
     * Conecta con GET /api/v1/student/my-courses
     */
    getMyCourses: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status) queryParams.append('status', params.status); // 'in_progress' | 'completed' | 'archived'
        if (params.search) queryParams.append('search', params.search);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy); // 'last_accessed' | 'progress' | 'title'

        const response = await apiClient.get(`/student/my-courses?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Cambia el estado de archivado de un curso en la biblioteca del usuario.
     * Conecta with PATCH /api/v1/student/my-courses/:courseId/archive
     */
    toggleArchiveCourse: async (courseId, archive = true) => {
        const response = await apiClient.patch(`/student/my-courses/${courseId}/archive`, { archive });
        return response.data;
    }
};