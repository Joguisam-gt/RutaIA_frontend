import { apiClient } from './apiClient';

export const authRegisterApi = {
    /**
     * Registra un nuevo estudiante en la plataforma.
     * Conecta con POST /api/v1/auth/register
     */
    registerStudent: async (userData) => {
        const response = await apiClient.post('/auth/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            plan: userData.plan || 'starter',
            termsAccepted: userData.termsAccepted,
            role: 'student',
        });
        return response.data;
    },

    /**
     * Envía una solicitud de registro para Maestro/Instructor sujeta a aprobación del Admin.
     * Conecta con POST /api/v1/auth/instructor-request
     */
    requestInstructorAccount: async (userData) => {
        const response = await apiClient.post('/auth/instructor-request', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            specialty: userData.specialty || 'General',
            termsAccepted: userData.termsAccepted,
            role: 'instructor_pending',
        });
        return response.data;
    },

    /**
     * Inicia el registro rápido mediante OAuth con proveedores sociales.
     */
    registerWithProvider: async (provider, plan = '') => {
        const queryParams = new URLSearchParams({ role: 'student', plan });
        window.location.href = `${apiClient.defaults.baseURL}/auth/${provider}?${queryParams.toString()}`;
    },
};