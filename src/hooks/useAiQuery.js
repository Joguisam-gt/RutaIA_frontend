// src/hooks/useAiQuery.js
import { useState, useCallback } from 'react';
import { askQueryApi, askQueryGuestApi, clearHistoryApi, rateSessionApi } from '../api/queryApi.js';

export const useAiQuery = (currentUser) => {
    const [messages, setMessages]           = useState([]);
    const [loading, setLoading]             = useState(false);
    const [error, setError]                 = useState(null);
    // Control del flujo de calificación
    const [pendingRating, setPendingRating] = useState(false); // Muestra el modal de calificación
    const [sessionRated, setSessionRated]   = useState(false); // Ya calificó esta sesión

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
            const isAuthenticated = !!(currentUser?.id || currentUser?._id);
            const response = isAuthenticated
                ? await askQueryApi(userText.trim())
                : await askQueryGuestApi(userText.trim());

            const resultData = response?.data || response;

            const botReplyText =
                resultData?.answer ||
                resultData?.response ||
                'No se obtuvo respuesta del asistente.';

            const sources = resultData?.sources || [];
            const status  = resultData?.status   || 'Respondida';
            const queryId = resultData?.queryId   || null;

            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botReplyText,
                sources,
                status,
                queryId
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error('[useAiQuery] Error al enviar consulta:', err);
            const serverMessage =
                err.response?.data?.message ||
                'No se pudo establecer comunicación con el asistente de IA.';
            setError(serverMessage);

            setMessages((prev) => [...prev, {
                id: Date.now() + 2,
                sender: 'bot',
                text: serverMessage,
                sources: [],
                isError: true
            }]);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Limpia el historial en backend y resetea la UI.
     * Si hay mensajes, muestra el modal de calificación antes de limpiar.
     */
    const clearHistory = useCallback(async () => {
        const isAuthenticated = !!(currentUser?.id || currentUser?._id);
        // Si hay mensajes y no ha calificado aún → mostrar modal para TODOS
        if (messages.length > 0 && !sessionRated) {
            setPendingRating(true);
            return;
        }
        // Sin mensajes o ya calificó → limpiar directo
        await _doClearHistory(isAuthenticated);
    }, [messages, sessionRated, currentUser]);

    /** Limpieza real del historial */
    const _doClearHistory = async (isAuthenticated) => {
        try {
            if (isAuthenticated) {
                await clearHistoryApi();
            }
        } catch (err) {
            console.warn('[useAiQuery] Error al limpiar historial:', err.message);
        } finally {
            setMessages([]);
            setError(null);
            setPendingRating(false);
            setSessionRated(false);
        }
    };

    /**
     * Envía la calificación y luego limpia el historial.
     * @param {number} rating   - 1 a 5 estrellas
     * @param {string} comment  - Comentario opcional
     */
    const submitRating = useCallback(async (rating, comment = '') => {
        const isAuthenticated = !!(currentUser?.id || currentUser?._id);
        try {
            if (isAuthenticated) {
                await rateSessionApi(rating, comment);
            }
            setSessionRated(true);
        } catch (err) {
            console.warn('[useAiQuery] Error al enviar calificación:', err.message);
        } finally {
            await _doClearHistory(isAuthenticated);
        }
    }, [currentUser]);

    /** Cierra el modal sin calificar y limpia igual */
    const skipRating = useCallback(async () => {
        const isAuthenticated = !!(currentUser?.id || currentUser?._id);
        await _doClearHistory(isAuthenticated);
    }, [currentUser]);

    return {
        messages,
        loading,
        error,
        sendMessage,
        clearHistory,
        pendingRating,
        submitRating,
        skipRating,
        sessionRated
    };
};

export default useAiQuery;
