import React, { useState } from 'react';
import { MessageSquare, Star, Send, Loader2, CheckCircle2, Clock, User, ArrowRight } from 'lucide-react';

export const InstructorActivitySidebar = ({
    pendingQuestions = [],
    recentReviews = [],
    replyingQuestionId,
    onQuickReply,
}) => {
    const [quickAnswers, setQuickAnswers] = useState({});
    const [activeQuestionId, setActiveQuestionId] = useState(null);

    const defaultQuestions = [
        {
            id: 'q-101',
            studentName: 'Carlos Mendoza',
            studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            courseTitle: 'Arquitectura Backend y APIs REST',
            lessonTitle: 'Middlewares de Error Globales',
            question: '¿Por qué Express requiere 4 parámetros en el middleware de error?',
            timeAgo: 'Hace 15 min',
        },
        {
            id: 'q-102',
            studentName: 'Valeria Gómez',
            studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            courseTitle: 'Bases de Datos Vectoriales con pgvector',
            lessonTitle: 'Índices HNSW',
            question: '¿Cuál es el valor óptimo de m y ef_construction para 1M de vectores?',
            timeAgo: 'Hace 2 horas',
        },
    ];

    const defaultReviews = [
        {
            id: 'r-201',
            studentName: 'Mateo Silva',
            studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            courseTitle: 'Agentes de IA y Orquestación RAG',
            rating: 5,
            comment: 'Explicación impecable sobre pipelines de embeddings. El proyecto Capstone valió 100% la pena.',
            timeAgo: 'Hace 1 hora',
        },
        {
            id: 'r-202',
            studentName: 'Lucía Fernández',
            studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
            courseTitle: 'Arquitectura Backend y APIs REST',
            rating: 5,
            comment: 'Directo al grano, sin contenido de relleno. Muy recomendado para devs fullstack.',
            timeAgo: 'Hace 4 horas',
        },
    ];

    const questionsList = pendingQuestions.length > 0 ? pendingQuestions : defaultQuestions;
    const reviewsList = recentReviews.length > 0 ? recentReviews : defaultReviews;

    const handleInputChange = (id, text) => {
        setQuickAnswers((prev) => ({ ...prev, [id]: text }));
    };

    const handleSend = (id) => {
        const text = quickAnswers[id];
        if (text && text.trim()) {
            onQuickReply(id, text);
            setQuickAnswers((prev) => ({ ...prev, [id]: '' }));
            setActiveQuestionId(null);
        }
    };

    return (
        <aside className="space-y-6">
            {/* Widget 1: Preguntas Pendientes en Q&A con Respuesta Rápida 1-Clic */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                            <MessageSquare size={16} />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                            Preguntas Q&A Pendientes
                        </h3>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {questionsList.length}
                    </span>
                </div>

                <div className="space-y-4">
                    {questionsList.map((q) => {
                        const isReplying = replyingQuestionId === q.id;
                        const isOpen = activeQuestionId === q.id;

                        return (
                            <div
                                key={q.id}
                                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3"
                            >
                                {/* Header Alumno */}
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={q.studentAvatar}
                                            alt={q.studentName}
                                            className="w-6 h-6 rounded-full object-cover border border-indigo-500"
                                        />
                                        <span className="font-bold text-slate-900 dark:text-slate-100">{q.studentName}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <Clock size={10} />
                                        {q.timeAgo}
                                    </span>
                                </div>

                                {/* Pregunta & Contexto */}
                                <div>
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block truncate">
                                        {q.courseTitle} • {q.lessonTitle}
                                    </span>
                                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 leading-snug">
                                        "{q.question}"
                                    </p>
                                </div>

                                {/* Formulario de Respuesta Rápida 1-Clic */}
                                {isOpen ? (
                                    <div className="pt-2 space-y-2 border-t border-slate-200/60 dark:border-slate-800">
                                        <textarea
                                            rows={2}
                                            value={quickAnswers[q.id] || ''}
                                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                                            placeholder="Escribe tu respuesta rápida..."
                                            className="w-full p-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                                        />
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setActiveQuestionId(null)}
                                                className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={() => handleSend(q.id)}
                                                disabled={isReplying}
                                                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1"
                                            >
                                                {isReplying ? (
                                                    <Loader2 size={12} className="animate-spin" />
                                                ) : (
                                                    <>
                                                        <Send size={12} />
                                                        <span>Responder (1-Clic)</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setActiveQuestionId(q.id)}
                                        className="w-full py-2 rounded-xl text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Send size={12} />
                                        <span>Respuesta Rápida</span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Widget 2: Feed de Últimas Reseñas Recibidas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                            <Star size={16} className="fill-amber-500" />
                        </div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                            Últimas Reseñas Recibidas
                        </h3>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">Feed en Vivo</span>
                </div>

                <div className="space-y-4">
                    {reviewsList.map((rev) => (
                        <div
                            key={rev.id}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2"
                        >
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={rev.studentAvatar}
                                        alt={rev.studentName}
                                        className="w-6 h-6 rounded-full object-cover border border-indigo-500"
                                    />
                                    <span className="font-bold text-slate-900 dark:text-slate-100">{rev.studentName}</span>
                                </div>
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <Star key={i} size={11} className="fill-amber-400" />
                                    ))}
                                </div>
                            </div>

                            <span className="text-[10px] font-bold text-slate-400 block truncate">
                                {rev.courseTitle}
                            </span>

                            <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                "{rev.comment}"
                            </p>

                            <span className="text-[10px] text-slate-400 block text-right">
                                {rev.timeAgo}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};