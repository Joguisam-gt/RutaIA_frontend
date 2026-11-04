// src/hooks/useAiQuery.js
import { useState } from 'react';
import { askQueryApi } from '../api/queryApi.js';

export const useAiQuery = (currentUser) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (userText) => {
        if (!userText.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: userText };
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);
        setError(null);

        try {
            const response = await askQueryApi({
                query: userText,
                userId: currentUser?.id || currentUser?._id
            });

            // Extrae el texto de la respuesta según el formato normalizado o el output directo de n8n
            const botReplyText =
                response?.answer ||
                response?.data?.answer ||
                (Array.isArray(response) ? response[0]?.output : response?.output) ||
                'No se obtuvo respuesta del asistente.';

            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botReplyText
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error('Error al enviar consulta:', err);
            setError('No se pudo establecer comunicación con el asistente de IA.');
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