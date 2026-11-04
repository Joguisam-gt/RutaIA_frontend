// src/screens/student/AiQueryScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import useAiQuery from '../../hooks/useAiQuery';

export const AiQueryScreen = ({ courseId = null, user = null }) => {
    // Si no hay usuario en sesión se marca como anónimo para prevenir llamadas fallidas de historial
    const isAnonymous = !user;
    const { messages, loading, sendMessage } = useAiQuery(courseId, isAnonymous);
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
        sendMessage(inputText, { studentId: user?.id || user?._id });
        setInputText('');
    };

    return (
        <div className="max-w-5xl w-full mx-auto p-4 flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-4 overflow-hidden">

                {/* Encabezado del Chat */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-bold text-blue-400">Asistente Virtual RutaIA</h2>
                        <p className="text-xs text-gray-400">
                            Pregunta sobre cursos, certificados, precios y ruta de aprendizaje
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
                            <p className="text-lg font-medium">¡Hola! ¿En qué puedo ayudarte hoy?</p>
                            <p className="text-sm mt-1">
                                Puedes preguntarme: "¿Qué costo tiene el curso de SQL?", "¿Cómo obtengo mi certificado?"
                            </p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : msg.isError
                                            ? 'bg-red-900/40 border border-red-700 text-red-200 rounded-bl-none'
                                            : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                <span className="block text-[10px] text-gray-400 mt-1 text-right">
                                    {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </span>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 text-sm text-gray-400 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                <span className="text-xs ml-2">Consultando base de conocimientos en Qdrant...</span>
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
                        placeholder="Escribe tu consulta sobre los cursos o la plataforma..."
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
    );
};

export default AiQueryScreen;