import { apiClient } from './apiClient';

export const notificationApi = {
    /**
     * Obtiene la lista de notificaciones del usuario logueado.
     * Conecta con GET /api/v1/user/notifications
     */
    getNotifications: async () => {
        const response = await apiClient.get('/user/notifications');
        return response.data.data;
    },

    /**
     * Marca una notificacion como leida.
     * Conecta con PATCH /api/v1/user/notifications/:id/read
     */
    markAsRead: async (notificationId) => {
        const response = await apiClient.patch(`/user/notifications/${notificationId}/read`);
        return response.data;
    },

    /**
     * Marca todas las notificaciones como leidas.
     * Conecta con PATCH /api/v1/user/notifications/read-all
     */
    markAllAsRead: async () => {
        const response = await apiClient.patch('/user/notifications/read-all');
        return response.data;
    },
};