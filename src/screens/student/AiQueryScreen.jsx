import React, { useRef, useEffect } from 'react';
import { useAiQuery } from '../../hooks/useAiQuery';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Send, Bot, User, Trash2, Loader2, Sparkles, BookOpen } from 'lucide-react';

export const AiQueryScreen = () => {
    const {
        messages,
        inputPrompt,
        setInputPrompt,
        loading,
        error,
        handleSendMessage,
        handleClearHistory,
    } = useAiQuery();

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="student" brandTitle="RutaIA — Asistente Inteligente" />

            <div className="flex">
                <Sidebar role="student" currentRoute="/app/ai-query" />

                <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-65px)]">
                    {/* Header del Chat */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 mb-4 shadow-xs flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h1 className="text-base font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                    <span>Asistente Pedagógico IA</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                        RAG Activo
                                    </span>
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Resuelve dudas tecnicas, solicita explicaciones de codigo o pide ejercicios practicos.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            icon={Trash2}
                            onClick={handleClearHistory}
                        >
                            Limpiar Chat
                        </Button>
                    </div>

                    {/* Area de Mensajes */}
                    <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 md:p-6 overflow-y-auto space-y-4 mb-4 shadow-xs">
                        {messages.map((msg) => {
                            const isAi = msg.sender === 'ai';

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${isAi
                                                ? 'bg-indigo-600'
                                                : 'bg-slate-700 dark:bg-slate-600'
                                            }`}
                                    >
                                        {isAi ? <Bot size={16} /> : <User size={16} />}
                                    </div>

                                    <div className={`max-w-2xl space-y-1 ${isAi ? 'text-left' : 'text-right'}`}>
                                        <div
                                            className={`p-4 rounded-2xl text-xs leading-relaxed inline-block ${isAi
                                                    ? 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800'
                                                    : 'bg-indigo-600 text-white font-medium'
                                                } ${msg.isError ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400' : ''}`}
                                        >
                                            {msg.text}

                                            {/* Fuentes pedagógicas consultadas por el RAG */}
                                            {msg.sources && msg.sources.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400 space-y-1">
                                                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                                                        <BookOpen size={12} /> Fuentes del curso consultadas:
                                                    </span>
                                                    {msg.sources.map((src, i) => (
                                                        <span key={i} className="block font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                                                            {src}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <span className="block text-[10px] text-slate-400 px-1 font-mono">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {loading && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                                    <Bot size={16} />
                                </div>
                                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    <Loader2 size={14} className="animate-spin" />
                                    <span>Generando respuesta con contexto RAG...</span>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input de Envio de Mensaje */}
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 shrink-0">
                        <div className="flex-1">
                            <Input
                                value={inputPrompt}
                                onChange={(e) => setInputPrompt(e.target.value)}
                                placeholder="Haz una pregunta sobre el contenido del curso o arquitectura..."
                                disabled={loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            isDisabled={loading || !inputPrompt.trim()}
                            isLoading={loading}
                            icon={Send}
                        >
                            Enviar
                        </Button>
                    </form>

                    {error && (
                        <span className="block text-xs font-semibold text-rose-500 mt-2 text-center">
                            {error}
                        </span>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AiQueryScreen;