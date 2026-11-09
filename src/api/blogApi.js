import { apiClient } from './apiClient';

export const blogApi = {
    /**
     * Obtiene la lista de artículos aplicando búsqueda, filtros de categoría y paginación.
     */
    getArticles: async (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.category && params.category !== 'all') queryParams.append('category', params.category);
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit || 6);

        const response = await apiClient.get(`/blog/articles?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Obtiene el artículo destacado (Hero Post) principal.
     */
    getFeaturedPost: async () => {
        const response = await apiClient.get('/blog/featured');
        return response.data.data;
    },

    /**
     * Obtiene la lista de artículos más leídos para el widget del sidebar.
     */
    getPopularArticles: async () => {
        const response = await apiClient.get('/blog/popular?limit=4');
        return response.data.data || [];
    },

    /**
     * Suscribe un correo electrónico al boletín informativo (Newsletter).
     */
    subscribeNewsletter: async (email) => {
        const response = await apiClient.post('/notifications/newsletter/subscribe', { email });
        return response.data;
    }
};

