import { apiClient } from './apiClient';

export const categoryApi = {
    /**
     * Obtiene la información detallada de la categoría por su slug
     * (Título, resumen, métricas de nicho y subcategorías pertenecientes al árbol).
     */
    getCategoryBySlug: async (slug) => {
        const response = await apiClient.get(`/courses/categories/${slug}`);
        return response.data.data;
    },

    /**
     * Obtiene los cursos pertenecientes a una categoría específica y sus subcategorías.
     */
    getCategoryCourses: async (slug, params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.subcategory) queryParams.append('subcategory', params.subcategory);
        if (params.levels?.length) queryParams.append('levels', params.levels.join(','));
        if (params.modality) queryParams.append('modality', params.modality);
        if (params.minRating) queryParams.append('minRating', params.minRating);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit || 12);

        const response = await apiClient.get(`/courses/categories/${slug}/courses?${queryParams.toString()}`);
        return response.data;
    }
};