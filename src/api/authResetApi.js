import { apiClient } from './apiClient';

export const authResetApi = {
    /**
     * Solicita el envío del correo de recuperación de contraseña.
     * Conecta con POST /api/v1/auth/forgot-password
     */
    requestPasswordReset: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    /**
     * Confirma y actualiza la contraseña mediante el token de seguridad.
     * Conecta con POST /api/v1/auth/reset-password
     */
    resetPassword: async (token, newPassword) => {
        const response = await apiClient.post('/auth/reset-password', {
            token,
            newPassword,
        });
        return response.data;
    },
};