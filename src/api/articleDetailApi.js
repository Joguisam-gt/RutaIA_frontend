import { apiClient } from './apiClient';

export const articleDetailApi = {
    /**
     * Obtiene el contenido completo y metadatos de un artículo por su slug.
     * Conecta con GET /api/v1/blog/articles/:slug
     */
    getArticleBySlug: async (articleSlug) => {
        const response = await apiClient.get(`/blog/articles/${articleSlug}`);
        return response.data.data;
    },

    /**
     * Registra una interacción de compartir o lectura en las métricas de analítica.
     */
    trackArticleShare: async (articleId, platform) => {
        const response = await apiClient.post(`/blog/articles/${articleId}/share`, { platform });
        return response.data;
    }
};