import { apiClient } from './apiClient';

export const courseManagementApi = {
    /**
     * Obtiene la lista de cursos del instructor filtrados por estado, búsqueda y ordenamiento.
     * Conecta con GET /api/v1/instructor/courses
     */
    getCourses: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.status && params.status !== 'all') queryParams.append('status', params.status); // 'published' | 'draft' | 'under_review'
        if (params.search) queryParams.append('search', params.search);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy); // 'last_updated' | 'students' | 'revenue' | 'title'

        const response = await apiClient.get(`/courses?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Duplica una estructura de curso existente (lecciones, módulos y borradores).
     * Conecta con POST /api/v1/instructor/courses/:courseId/duplicate
     */
    duplicateCourse: async (courseId) => {
        const response = await apiClient.post(`/courses/${courseId}/duplicate`);
        return response.data;
    },

    /**
     * Archiva o desarchiva un curso publicado o borrador.
     * Conecta con PATCH /api/v1/instructor/courses/:courseId/archive
     */
    toggleArchiveCourse: async (courseId, archive = true) => {
        const response = await apiClient.patch(`/courses/${courseId}/archive`, { archive });
        return response.data;
    },
};