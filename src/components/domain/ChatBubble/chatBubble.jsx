import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { useAiQuery } from '../../../hooks/useAiQuery';

export const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState('');
    const messagesEndRef = useRef(null);

    const {
        messages,
        loading,
        error,
        sendQuery,
        clearChat
    } = useAiQuery();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        const textToSend = prompt;
        setPrompt('');
        await sendQuery(textToSend);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Ventana Desplegable del Chat */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300">
                    {/* Encabezado */}
                    <div className="bg-blue-600 dark:bg-blue-700 p-4 text-white flex items-center justify-between shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm leading-tight">Asistente RutaIA</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={clearChat}
                                type="button"
                                title="Limpiar chat"
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-blue-100 hover:text-white"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                title="Cerrar chat"
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-blue-100 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Área de Mensajes */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-slate-950/50 text-sm">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500 dark:text-slate-400 space-y-2">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <p className="font-medium text-slate-800 dark:text-slate-200">¿En qué puedo ayudarte hoy?</p>
                                <p className="text-xs">Hazme preguntas sobre cursos, temas técnicos o rutas de aprendizaje.</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    {msg.role !== 'user' && (
                                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-bl-none'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="p-1.5 bg-slate-200 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 flex-shrink-0 mt-0.5">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {loading && (
                            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs">
                                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400">
                                    <Bot className="w-4 h-4 animate-spin" />
                                </div>
                                <span>Escribiendo respuesta...</span>
                            </div>
                        )}

                        {error && (
                            <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs">
                                {error}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input de Mensajes */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Escribe tu consulta..."
                            disabled={loading}
                            className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                aria-label="Abrir asistente de IA"
                className="group relative p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95"
            >
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                {isOpen ? (
                    <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
                ) : (
                    <Bot className="w-6 h-6 transition-transform group-hover:scale-110 duration-200" />
                )}
            </button>
        </div>
    );
};

export default ChatBubble;