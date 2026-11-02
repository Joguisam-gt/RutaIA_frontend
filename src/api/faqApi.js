import { apiClient } from './apiClient';

export const faqApi = {
    /**
     * Obtiene la lista de preguntas frecuentes aplicando búsqueda y filtro por categoría.
     * Conecta con GET /api/v1/faq
     */
    getFaqs: async (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.search) queryParams.append('search', params.search);
        if (params.category && params.category !== 'all') queryParams.append('category', params.category);

        const response = await apiClient.get(`/faq?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Obtiene sugerencias predictivas en tiempo real para el buscador.
     */
    getPredictiveSuggestions: async (query) => {
        if (!query || query.trim().length < 2) return [];
        const response = await apiClient.get(`/faq/suggestions?q=${encodeURIComponent(query)}`);
        return response.data.data || [];
    },

    /**
     * Envia la valoración de utilidad de una respuesta (👍 Me sirvió / 👎 No me sirvió).
     * Conecta con POST /api/v1/faq/:faqId/feedback
     */
    submitFeedback: async (faqId, isHelpful) => {
        const response = await apiClient.post(`/faq/${faqId}/feedback`, { isHelpful });
        return response.data;
    }
};