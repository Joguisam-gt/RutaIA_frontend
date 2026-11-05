// src/api/queryApi.js
import apiClient from './apiClient';

/**
 * Envia una pregunta en lenguaje natural al agente RAG (RF 06)
 */
export const askQueryApi = async (queryPayload) => {
    const response = await apiClient.post('/queries/ask', queryPayload);
    return response.data;
};

/**
 * Obtiene el historial de consultas del estudiante autenticado (RF 16)
 */
export const getQueryHistoryApi = async () => {
    const response = await apiClient.get('/queries/history');
    return response.data;
};

export default {
    askQueryApi,
    getQueryHistoryApi
};