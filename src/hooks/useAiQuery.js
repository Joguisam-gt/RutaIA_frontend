// Principio SRP (Single Responsibility Principle): Encapsula el estado del chat, el envío de mensajes y la sincronización con la API backend.
import { useState, useCallback, useEffect } from 'react';
import { queryApi } from '../api/queryApi';

export const useAiQuery = (courseId = null) => {
    // Estado para la lista de mensajes del chat
    const [messages, setMessages] = useState([]);
    // Estado para indicar si la IA está procesando una consulta (Proxy -> n8n -> Qdrant -> IA)
    const [loading, setLoading] = useState(false);
    // Estado para capturar y mostrar errores en la interfaz
    const [error, setError] = useState(null);

    /**
     * Carga el historial de chat persistido en MongoDB desde el backend.
     */
    const loadHistory = useCallback(async () => {
        try {
            setError(null);
            const response = await queryApi.getHistory();
            if (response && response.data) {
                // Mapea la estructura de la base de datos al formato del chat frontend
                const formattedHistory = response.data.map((item) => ([
                    { id: `${item._id}-user`, sender: 'user', text: item.prompt, timestamp: item.createdAt },
                    { id: `${item._id}-ai`, sender: 'ai', text: item.response, queryId: item._id, timestamp: item.updatedAt }
                ])).flat();

                setMessages(formattedHistory);
            }
        } catch (err) {
            setError(err.message || 'No se pudo cargar el historial del chat.');
        }
    }, []);

    // Carga el historial al montar el hook
    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    /**
     * Envía un nuevo mensaje al backend proxy para ser procesado por n8n e IA.
     * @param {string} promptText - Texto ingresado por el alumno o visitante.
     */
    const sendMessage = async (promptText) => {
        if (!promptText || !promptText.trim()) return;

        const userMessageId = Date.now().toString();
        const userMessage = {
            id: userMessageId,
            sender: 'user',
            text: promptText,
            timestamp: new Date().toISOString()
        };

        // Actualiza la interfaz de forma optimista
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        setError(null);

        try {
            // Envía la consulta al Backend Express (Proxy)
            const payload = {
                prompt: promptText,
                courseId: courseId || 'general'
            };

            const result = await queryApi.askQuery(payload);

            // Crea el mensaje de respuesta de la IA
            const aiMessage = {
                id: result.data?.queryId || Date.now().toString(),
                sender: 'ai',
                text: result.data?.response || 'No recibí respuesta del asistente.',
                queryId: result.data?.queryId,
                timestamp: new Date().toISOString()
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            const errorMessage = {
                id: Date.now().toString(),
                sender: 'ai',
                text: 'Lo siento, ocurrió un error al procesar tu consulta con la IA. Por favor, reintenta en unos momentos.',
                isError: true,
                timestamp: new Date().toISOString()
            };
            setMessages((prev) => [...prev, errorMessage]);
            setError(err.message || 'Error en la comunicación con el servicio de IA.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Permite al usuario calificar una respuesta de la IA.
     * @param {string} queryId - ID de la consulta.
     * @param {number} score - Puntuación de 1 a 5.
     * @param {string} comment - Comentario opcional.
     */
    const rateResponse = async (queryId, score, comment = '') => {
        try {
            await queryApi.rateQuery(queryId, { score, comment });
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
        rateResponse,
        reloadHistory: loadHistory
    };
};

export default useAiQuery;