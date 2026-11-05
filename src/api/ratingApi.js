// src/api/ratingApi.js
import { apiClient } from './apiClient';

export const ratingApi = {
    /**
     * Califica una recomendacion de la IA o un curso (RF 17)
     * POST /api/v1/ratings
     */
    submitRating: async (ratingData) => {
        const response = await apiClient.post('/ratings', ratingData);
        return response.data;
    },

    /**
     * Metodo auxiliar para calificar directamente la recomendacion generada por la IA
     */
    rateRecommendation: async (recommendationId, score, comment) => {
        const response = await apiClient.post('/ratings', {
            recommendationId,
            score: Number(score),
            comment: comment ? comment.trim() : null
        });
        return response.data;
    },

    /**
     * Consulta opcional de calificacion previa
     */
    getMyRating: async (targetId) => {
        try {
            const response = await apiClient.get(`/ratings/check/${targetId}`);
            return response.data?.data || null;
        } catch {
            return null; // Si no hay calificacion previa, retorna null sin romper la UI
        }
    }
};

export default ratingApi;