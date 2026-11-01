import { apiClient } from './apiClient';

export const courseApi = {
    /**
     * Obtiene la lista de cursos aplicando filtros, búsqueda y ordenamiento.
     * Conecta directamente con course.controller.js del backend.
     */
    getCourses: async (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.categories?.length) queryParams.append('categories', params.categories.join(','));
        if (params.levels?.length) queryParams.append('levels', params.levels.join(','));
        if (params.modality) queryParams.append('modality', params.modality); // 'free' | 'paid' | 'all'
        if (params.minRating) queryParams.append('minRating', params.minRating);
        if (params.sort) queryParams.append('sort', params.sort);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit || 12);

        const response = await apiClient.get(`/courses?${queryParams.toString()}`);
        return response.data; // Retorna { success: true, data: [...], pagination: {...} }
    },

    /**
     * Obtiene sugerencias de autocompletado para la barra de búsqueda.
     */
    getSearchSuggestions: async (query) => {
        if (!query || query.trim().length < 2) return [];
        const response = await apiClient.get(`/courses/suggestions?q=${encodeURIComponent(query)}`);
        return response.data.data || [];
    },

    /**
     * Obtiene el desglose de categorías y conteos para los checkboxes del sidebar.
     */
    getCategoriesMetaData: async () => {
        const response = await apiClient.get('/courses/categories-meta');
        return response.data.data || [];
    }
};