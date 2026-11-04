// src/hooks/useAiQuery.js
import { useState, useCallback, useEffect } from 'react';
import { queryApi } from '../api/queryApi';

export const useAiQuery = (courseId = null, isAnonymous = false) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadHistory = useCallback(async () => {
        if (isAnonymous) return;

        try {
            setError(null);
            const response = await queryApi.getHistory();
            const historyData = response?.data || response;

            if (Array.isArray(historyData) && historyData.length > 0) {
                const formattedHistory = historyData.map((item) => ([
                    {
                        id: `${item._id}-user`,
                        sender: 'user',
                        role: 'user',
                        text: item.userQuery || item.prompt,
                        content: item.userQuery || item.prompt,
                        timestamp: item.createdAt
                    },
                    {
                        id: `${item._id}-ai`,
                        sender: 'ai',
                        role: 'assistant',
                        text: item.aiResponse || item.response || item.output || 'Sin respuesta registrada.',
                        content: item.aiResponse || item.response || item.output || 'Sin respuesta registrada.',
                        queryId: item._id,
                        timestamp: item.updatedAt
                    }
                ])).flat();

                setMessages(formattedHistory);
            }
        } catch (err) {
            console.warn('Historial de chat no disponible:', err.message);
        }
    }, [isAnonymous]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const sendMessage = async (promptText, extraMetadata = {}) => {
        if (!promptText || !promptText.trim()) return;

        const userMessageId = `user-${Date.now()}`;
        const userMessage = {
            id: userMessageId,
            sender: 'user',
            role: 'user',
            text: promptText.trim(),
            content: promptText.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        setError(null);

        try {
            const payload = {
                prompt: promptText.trim(),
                courseId: courseId || extraMetadata.courseId || 'general',
                userRole: isAnonymous ? 'anonymous' : (extraMetadata.userRole || 'estudiante'),
                studentId: extraMetadata.studentId || null
            };

            const result = await queryApi.askQuery(payload);

            // Mapeo adaptativo: extrae la propiedad aiResponse enviada por la API
            const responseBody = result?.data || result;
            const aiText = responseBody?.aiResponse
                || responseBody?.response
                || responseBody?.output
                || 'No se pudo obtener la respuesta.';

            const queryId = responseBody?._id || responseBody?.queryId || Date.now().toString();

            const aiMessage = {
                id: `ai-${queryId}`,
                sender: 'ai',
                role: 'assistant',
                text: aiText,
                content: aiText,
                queryId: queryId,
                timestamp: new Date().toISOString()
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            const errorText = err.response?.data?.message
                || err.message
                || 'Ocurrió un error al procesar tu consulta con la IA.';

            const errorMessage = {
                id: `err-${Date.now()}`,
                sender: 'ai',
                role: 'assistant',
                text: `⚠️ ${errorText}`,
                content: `⚠️ ${errorText}`,
                isError: true,
                timestamp: new Date().toISOString()
            };

            setMessages((prev) => [...prev, errorMessage]);
            setError(errorText);
        } finally {
            setLoading(false);
        }
    };

    const rateResponse = async (queryId, score, comment = '') => {
        try {
            await queryApi.rateQuery({ queryId, score, comment });
            return true;
        } catch (err) {
            setError(err.message || 'No se pudo registrar la calificación.');
            return false;
        }
    };

    return {
        messages,
        loading,
        error,
        sendMessage,
        sendQuery: sendMessage, // Alias de compatibilidad
        rateResponse,
        reloadHistory: loadHistory,
        clearChat: () => setMessages([])
    };
};

export default useAiQuery;