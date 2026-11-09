// src/screens/student/AiQueryScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import useAiQuery from '../../hooks/useAiQuery';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';

export const AiQueryScreen = () => {
    const { user } = useAuth() || {};
    const { messages, loading, sendMessage } = useAiQuery(user);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;
        sendMessage(inputText);
        setInputText('');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/asistente-ia" />
                <main className="flex-1 p-6 flex flex-col" style={{height: "100vh", overflow: "hidden"}}>
                <div className="max-w-5xl w-full mx-auto flex flex-col h-full">
            <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-4 overflow-hidden">

                {/* Encabezado del Chat */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-bold text-blue-400">Asistente Virtual RutaIA</h2>
                        <p className="text-xs text-gray-400">
                            Recomendaciones fundamentadas mediante búsqueda semántica y RAG
                        </p>
                    </div>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-900/50 text-green-400 border border-green-700">
                        En línea (Qdrant RAG)
                    </span>
                </div>

                {/* Mensajes del Chat */}
                <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
                    {messages.length === 0 && !loading && (
                        <div className="text-center text-gray-500 my-12">
                            <p className="text-lg font-medium">Hola, ¿qué te gustaría aprender hoy?</p>
                            <p className="text-sm mt-1">
                                Escribe tu necesidad en lenguaje natural y te recomendaremos los cursos ideales.
                            </p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.text}</p>

                                {/* RF 15: Renderizado diferenciado de Cursos Fuente con Score de Similitud */}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-gray-700/80 space-y-2">
                                        <span className="block text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                                            Cursos Recomendados (Fuentes Qdrant)
                                        </span>
                                        <div className="grid grid-cols-1 gap-2">
                                            {msg.sources.map((src, idx) => (
                                                <div
                                                    key={src.courseId || idx}
                                                    className="p-2.5 rounded-lg bg-gray-900/90 border border-gray-700 flex items-center justify-between gap-2"
                                                >
                                                    <div className="overflow-hidden">
                                                        <span className="block text-xs font-semibold text-gray-200 truncate">
                                                            {src.title}
                                                        </span>
                                                        <span className="block text-[10px] text-gray-400">
                                                            Categoría: {src.category || 'General'}
                                                        </span>
                                                    </div>
                                                    <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                                                        {src.similarity ? `${Math.round(src.similarity * 100)}% relevancia` : 'Alta coincidencia'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-gray-400 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                <span className="text-xs ml-2">Consultando memoria semántica en Qdrant...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-gray-800">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Escribe lo que deseas aprender (ej: Quiero aprender desarrollo frontend con React)..."
                        disabled={loading}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading || !inputText.trim()}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition-colors"
                    >
                        Enviar
                    </button>
                </form>

            </div>
                </div>
                </main>
            </div>
        </div>
    );
};

export default AiQueryScreen;