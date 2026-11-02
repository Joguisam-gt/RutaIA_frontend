import { apiClient } from './apiClient';

export const authApi = {
    /**
     * Realiza el inicio de sesión con correo, contraseña y rol seleccionado.
     * Conecta con POST /api/v1/auth/login
     */
    login: async ({ email, password, role, rememberMe }) => {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
            role, // 'student' | 'admin'
            rememberMe,
        });
        return response.data;
    },

    /**
     * Inicia el flujo de autenticación OAuth con proveedores sociales (Google / GitHub).
     */
    loginWithProvider: async (provider, role = 'student', redirectTo = '') => {
        const queryParams = new URLSearchParams({ role, redirect_to: redirectTo });
        window.location.href = `${apiClient.defaults.baseURL}/auth/${provider}?${queryParams.toString()}`;
    },
};