import { apiClient } from './apiClient';

export const wishlistApi = {
    /**
     * Obtiene la lista de cursos guardados en la wishlist del estudiante.
     * Conecta con GET /api/v1/student/wishlist
     */
    getWishlist: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.sortBy) queryParams.append('sortBy', params.sortBy); // 'added_at' | 'price_low' | 'price_high' | 'rating'

        const response = await apiClient.get(`/student/wishlist?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Remueve un curso de la wishlist por su ID.
     * Conecta con DELETE /api/v1/student/wishlist/:courseId
     */
    removeFromWishlist: async (courseId) => {
        const response = await apiClient.delete(`/student/wishlist/${courseId}`);
        return response.data;
    },

    /**
     * Re-agrega un curso previamente eliminado (Undo feature).
     * Conecta con POST /api/v1/student/wishlist/:courseId
     */
    addToWishlist: async (courseId) => {
        const response = await apiClient.post(`/student/wishlist/${courseId}`);
        return response.data;
    },

    /**
     * Vacía completamente la lista de deseos.
     * Conecta con DELETE /api/v1/student/wishlist
     */
    clearWishlist: async () => {
        const response = await apiClient.delete('/student/wishlist');
        return response.data;
    },
};