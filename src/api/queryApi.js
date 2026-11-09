// src/api/queryApi.js
import apiClient from './apiClient';

/**
 * Envía una pregunta al agente RAG — usuario AUTENTICADO (token en header)
 * El backend lee el perfil (level, areaOfInterest) desde MongoDB automáticamente.
 */
export const askQueryApi = async (question) => {
    const response = await apiClient.post('/queries/ask', { question });
    return response.data;
};

/**
 * Envía una pregunta al agente RAG — usuario INVITADO (sin token)
 * El AI Agent usará defaults: PRINCIPIANTE / Tecnología.
 */
export const askQueryGuestApi = async (question) => {
    const response = await apiClient.post('/queries/ask/guest', { question });
    return response.data;
};

/**
 * Obtiene el historial de consultas del estudiante autenticado (RF 16)
 */
export const getQueryHistoryApi = async () => {
    const response = await apiClient.get('/queries/history');
    return response.data;
};


/**
 * Elimina todo el historial de conversación del estudiante autenticado.
 */
export const clearHistoryApi = async () => {
    const response = await apiClient.delete('/queries/history');
    return response.data;
};

/**
 * Envía la calificación (estrellas + comentario) de la sesión de chat.
 * @param {number} rating  - 1 a 5 estrellas
 * @param {string} comment - Comentario opcional (máx 500 chars)
 */
export const rateSessionApi = async (rating, comment = '') => {
    const response = await apiClient.post('/queries/rate', { rating, comment });
    return response.data;
};

export default {
    askQueryApi,
    askQueryGuestApi,
    getQueryHistoryApi,
    clearHistoryApi,
    rateSessionApi
};
