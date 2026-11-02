import { apiClient } from './apiClient';

export const profileApi = {
    /**
     * Obtiene la información completa del perfil del usuario logueado.
     * Conecta con GET /api/v1/user/profile
     */
    getProfile: async () => {
        const response = await apiClient.get('/user/profile');
        return response.data.data;
    },

    /**
     * Actualiza los datos del perfil público.
     * Conecta con PATCH /api/v1/user/profile/public
     */
    updatePublicProfile: async (profileData) => {
        const response = await apiClient.patch('/user/profile/public', profileData);
        return response.data;
    },

    /**
     * Sube y actualiza el avatar recortado del usuario.
     * Conecta con POST /api/v1/user/profile/avatar
     */
    uploadAvatar: async (fileFormData) => {
        const response = await apiClient.post('/user/profile/avatar', fileFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /**
     * Actualiza el correo o contraseña del usuario.
     * Conecta con PATCH /api/v1/user/security
     */
    updateSecurity: async (securityData) => {
        const response = await apiClient.patch('/user/security', securityData);
        return response.data;
    },

    /**
     * Activa o desactiva la autenticación en dos pasos (2FA).
     */
    toggleTwoFactor: async (enabled) => {
        const response = await apiClient.post('/user/security/2fa', { enabled });
        return response.data;
    },

    /**
     * Revoca una sesión activa.
     */
    revokeSession: async (sessionId) => {
        const response = await apiClient.delete(`/user/security/sessions/${sessionId}`);
        return response.data;
    },

    /**
     * Actualiza las preferencias de matriz de notificaciones (Email vs In-App).
     */
    updateNotificationsMatrix: async (matrix) => {
        const response = await apiClient.patch('/user/notifications/preferences', { matrix });
        return response.data;
    },

    /**
     * Actualiza las preferencias de sistema (Idioma y Tema visual).
     */
    updatePreferences: async (preferences) => {
        const response = await apiClient.patch('/user/preferences', preferences);
        return response.data;
    },
};