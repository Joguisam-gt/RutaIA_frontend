import { apiClient } from './apiClient';

export const ratingApi = {
    /**
     * Obtiene la valoracion dada por el estudiante a un curso especifico.
     * Conecta con GET /api/v1/courses/:courseId/ratings/my-rating
     */
    getMyRating: async (courseId) => {
        const response = await apiClient.get(`/courses/${courseId}/ratings/my-rating`);
        return response.data.data;
    },

    /**
     * Publica o actualiza la valoracion de un curso.
     * Conecta con POST /api/v1/courses/:courseId/ratings
     */
    submitRating: async (courseId, rating, comment) => {
        const response = await apiClient.post(`/courses/${courseId}/ratings`, {
            rating,
            comment,
        });
        return response.data;
    },
};