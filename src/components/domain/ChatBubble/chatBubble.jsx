// src/components/domain/ChatBubble/chatBubble.jsx
import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { AiQueryScreen } from '../../../screens/student/AiQueryScreen';

export const ChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth() || {};
    const location = useLocation();

    // Se oculta exclusivamente en las pantallas de instructor (/instructor/*)
    if (location.pathname.startsWith('/instructor')) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className="mb-4 w-[400px] h-[550px] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
                    <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
                        <span className="text-xs font-bold text-white">Chat RutaIA (n8n RAG)</span>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white p-1 rounded-lg"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <AiQueryScreen user={user} />
                    </div>
                </div>
            )}

            <button
                type="button"
                aria-label="Abrir asistente de IA"
                onClick={() => setIsOpen(!isOpen)}
                className="group relative p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95"
            >
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <Bot size={24} className="transition-transform group-hover:scale-110 duration-200" />
                )}
            </button>
        </div>
    );
};

export default ChatBubble;