// Principio ISP y DIP: Expone los métodos de interacción con el backend proxy desacoplando a los componentes React de los endpoints HTTP directos.
import apiClient from './apiClient';

export const queryApi = {
    /**
     * Envía una pregunta al backend proxy (Express -> n8n -> Qdrant -> IA).
     * @param {Object} queryData - Objeto con el prompt y metadatos del curso o usuario.
     */
    askQuery: async (queryData) => {
        return await apiClient.post('/queries/ask', queryData);
    },

    /**
     * Obtiene el historial de chat almacenado en MongoDB para el usuario en sesión.
     */
    getHistory: async () => {
        return await apiClient.get('/queries/history');
    },

    /**
     * Envía la calificación dada por el usuario a una respuesta generada por la IA.
     * @param {string} queryId - ID de la consulta a calificar.
     * @param {Object} ratingData - Puntuación y retroalimentación.
     */
    rateQuery: async (queryId, ratingData) => {
        return await apiClient.post(`/queries/${queryId}/rating`, ratingData);
    },
};