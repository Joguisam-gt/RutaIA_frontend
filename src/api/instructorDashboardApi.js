import { apiClient } from './apiClient';

export const instructorDashboardApi = {
    /**
     * Obtiene la visión global del panel de instructor: tarjetas, analítica, tabla y actividad reciente.
     */
    getDashboardSummary: async (timeRange = '30d') => {
        const response = await apiClient.get(`/instructor/dashboard?range=${timeRange}`);
        return response.data.data;
    },

    /**
     * Envía una respuesta rápida en 1-clic a una pregunta pendiente de Q&A.
     * Conecta con POST /api/v1/instructor/questions/:questionId/reply
     */
    replyToPendingQuestion: async (questionId, answerText) => {
        const response = await apiClient.post(`/instructor/questions/${questionId}/reply`, {
            answer: answerText,
        });
        return response.data;
    },

    /**
     * Obtiene el feed de últimas reseñas y preguntas pendientes.
     */
    getActivityFeed: async () => {
        const response = await apiClient.get('/instructor/activity-feed');
        return response.data.data;
    },
};