// src/components/domain/ChatBubble/chatBubble.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAiQuery from '../../../hooks/useAiQuery';

export const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const { user } = useAuth() || {};
    const { messages, loading, sendMessage } = useAiQuery(user);
    const location = useLocation();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, loading, isOpen]);

    // Ocultar en vistas de instructor
    if (location.pathname.startsWith('/instructor')) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;
        sendMessage(inputText.trim());
        setInputText('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Ventana del Chat (Solo visible cuando isOpen es true) */}
            {isOpen && (
                <div className="w-[360px] sm:w-[420px] h-[540px] max-h-[85vh] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-white">Asistente Virtual RutaIA</h3>
                                <span className="text-[10px] text-emerald-400 font-medium block">
                                    Qdrant y n8n RAG Conectado
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                        {messages.length === 0 && !loading && (
                            <div className="text-center text-gray-400 py-12 px-4 space-y-2">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto text-blue-400 mb-3">
                                    <Bot size={24} />
                                </div>
                                <p className="font-semibold text-gray-200">Hola, ¿qué deseas aprender hoy?</p>
                                <p className="text-[11px] text-gray-400">
                                    Escribe lo que buscas en lenguaje natural y consultaremos la memoria semántica en Qdrant.
                                </p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">{msg.text}</p>

                                    {/* Fuentes recomendadas con score de similitud */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-2.5 border-t border-gray-700/80 space-y-1.5">
                                            <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                                Cursos Recomendados (Fuentes)
                                            </span>
                                            {msg.sources.map((src, idx) => (
                                                <div
                                                    key={src.courseId || idx}
                                                    className="p-2 rounded-lg bg-gray-900 border border-gray-700/70 flex items-center justify-between gap-2"
                                                >
                                                    <div className="overflow-hidden">
                                                        <span className="block font-semibold text-gray-200 truncate text-[11px]">
                                                            {src.title}
                                                        </span>
                                                        <span className="block text-[9px] text-gray-400">
                                                            {src.category || 'General'}
                                                        </span>
                                                    </div>
                                                    <span className="shrink-0 px-2 py-0.5 text-[9px] font-bold rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                                                        {src.similarity ? `${Math.round(src.similarity * 100)}%` : 'Relevante'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-3.5 py-2.5 text-gray-400 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-blue-400 shrink-0" />
                                    <span className="text-[11px]">Buscando cursos en Qdrant...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Formulario de Input fijado abajo */}
                    <form 
                        onSubmit={handleSubmit} 
                        className="p-3 bg-gray-950 border-t border-gray-800 flex items-center gap-2 shrink-0"
                    >
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Escribe lo que deseas aprender..."
                            disabled={loading}
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading || !inputText.trim()}
                            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-colors shrink-0 flex items-center justify-center"
                        >
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            )}

            {/* Boton Circular Flotante: Solo se renderiza si el chat esta CERRADO (!isOpen) */}
            {!isOpen && (
                <button
                    type="button"
                    aria-label="Abrir asistente de IA"
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95 relative"
                >
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <Bot size={24} />
                </button>
            )}
        </div>
    );
};

export default ChatBubble;