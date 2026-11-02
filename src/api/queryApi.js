import { apiClient } from './apiClient';

export const queryApi = {
    /**
     * Envia una consulta al asistente virtual de IA.
     * Conecta con POST /api/v1/ai/query
     */
    sendQuery: async (prompt, courseContextId = null) => {
        const response = await apiClient.post('/ai/query', {
            prompt,
            courseContextId,
        });
        return response.data;
    },

    /**
     * Obtiene el historial de conversaciones guardadas con el asistente.
     * Conecta con GET /api/v1/ai/history
     */
    getHistory: async () => {
        const response = await apiClient.get('/ai/history');
        return response.data.data;
    },

    /**
     * Limpia el historial de chat del usuario.
     * Conecta con DELETE /api/v1/ai/history
     */
    clearHistory: async () => {
        const response = await apiClient.delete('/ai/history');
        return response.data;
    },
};