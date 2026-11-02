import { useState, useEffect, useCallback } from 'react';
import { queryApi } from '../api/queryApi';

export const useAiQuery = () => {
    const [messages, setMessages] = useState([
        {
            id: 'msg-init',
            sender: 'ai',
            text: 'Hola, soy el asistente virtual de RutaIA. ¿En qué tema de arquitectura de software, bases de datos o IA puedo ayudarte hoy?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [inputPrompt, setInputPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = useCallback(async () => {
        try {
            const history = await queryApi.getHistory();
            if (history && history.length > 0) {
                setMessages(history);
            }
        } catch (err) {
            // Si falla, se mantiene el mensaje inicial
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!inputPrompt.trim() || loading) return;

        const userText = inputPrompt.trim();
        const userMessage = {
            id: `msg-user-${Date.now()}`,
            sender: 'user',
            text: userText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputPrompt('');
        setLoading(true);
        setError(null);

        try {
            const res = await queryApi.sendQuery(userText);
            const aiMessage = {
                id: `msg-ai-${Date.now()}`,
                sender: 'ai',
                text: res.answer || res.reply || 'No pude procesar una respuesta precisa.',
                sources: res.sources || [],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setError('Ocurrio un error al comunicarse con el asistente. Intenta de nuevo.');
            const errorMessage = {
                id: `msg-err-${Date.now()}`,
                sender: 'ai',
                text: 'Lo siento, hubo un problema al procesar tu solicitud. Por favor intenta responder mas tarde.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isError: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        try {
            await queryApi.clearHistory();
            setMessages([
                {
                    id: `msg-init-${Date.now()}`,
                    sender: 'ai',
                    text: 'Historial reiniciado. ¿De qué te gustaría hablar ahora?',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
        } catch (err) {
            setError('No se pudo limpiar el historial.');
        }
    };

    return {
        messages,
        inputPrompt,
        setInputPrompt,
        loading,
        error,
        handleSendMessage,
        handleClearHistory,
    };
};