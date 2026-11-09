import { apiClient } from './apiClient';

export const contactApi = {
    /**
     * Envía un ticket de contacto con soporte para FormData (archivos adjuntos).
     * Conecta con POST /api/v1/notifications/tickets
     */
    sendTicket: async (formData) => {
        const response = await apiClient.post('/notifications/tickets', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Obtiene las 3 preguntas más frecuentes para el widget desvíador de tickets.
     */
    getQuickFaqs: async () => {
        const response = await apiClient.get('/faq?limit=3&sort=popular');
        return response.data.data || [];
    }
};