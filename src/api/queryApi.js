// src/api/queryApi.js
import apiClient from './apiClient';

export const askQueryApi = async (queryPayload) => {
    const response = await apiClient.post('/queries/ask', queryPayload);
    return response.data;
};