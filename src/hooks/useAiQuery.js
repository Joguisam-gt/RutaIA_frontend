// src/hooks/useAiQuery.js
import { useState } from 'react';
import { askQueryApi } from '../api/queryApi.js';

export const useAiQuery = (currentUser) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (userText) => {
        if (!userText || !userText.trim()) return;

        const userMsg = { 
            id: Date.now(), 
            sender: 'user', 
            text: userText.trim() 
        };
        
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);
        setError(null);

        try {
            // Se envia 'question' para cumplir con el contrato de la API
            const response = await askQueryApi({
                question: userText.trim(),
                prompt: userText.trim(),
                query: userText.trim(),
                studentId: currentUser?.id || currentUser?._id
            });

            // Extraer el payload de respuesta estandarizado de Express
            const resultData = response?.data || response;

            const botReplyText =
                resultData?.answer ||
                resultData?.response ||
                'No se obtuvo respuesta del asistente.';

            const sources = resultData?.sources || [];
            const status = resultData?.status || 'Respondida';
            const queryId = resultData?.queryId || null;

            // Se preservan fuentes y similitudes requeridas por RF 13 y RF 15
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botReplyText,
                sources: sources,
                status: status,
                queryId: queryId
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error('Error al enviar consulta:', err);
            const serverMessage = err.response?.data?.message || 'No se pudo establecer comunicacion con el asistente de IA.';
            setError(serverMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage
    };
};

export default useAiQuery;