import React from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

export const FaqAccordionList = ({
    faqs = [],
    openIds = [],
    onToggle,
    userFeedback = {},
    onVote,
}) => {
    if (!faqs.length) return null;

    return (
        <div className="space-y-4 max-w-4xl mx-auto mb-16">
            {faqs.map((faq) => {
                const faqId = faq.id || faq._id;
                const isOpen = openIds.includes(faqId);
                const currentVote = userFeedback[faqId];

                return (
                    <div
                        key={faqId}
                        className={`rounded-2xl border transition-all overflow-hidden ${isOpen
                                ? 'bg-white dark:bg-slate-900 border-indigo-500/50 shadow-md'
                                : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                    >
                        {/* Header / Pregunta */}
                        <button
                            onClick={() => onToggle(faqId)}
                            className="w-full flex items-center justify-between p-5 text-left font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                            <span className="pr-4">{faq.question}</span>
                            {isOpen ? (
                                <ChevronUp size={18} className="text-indigo-500 shrink-0" />
                            ) : (
                                <ChevronDown size={18} className="text-slate-400 shrink-0" />
                            )}
                        </button>

                        {/* Contenido / Respuesta Estructurada */}
                        {isOpen && (
                            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30">
                                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 pt-4">
                                    <p>{faq.answer}</p>

                                    {/* Puntos destacados si existen */}
                                    {faq.highlights && faq.highlights.length > 0 && (
                                        <ul className="space-y-1.5 pt-2">
                                            {faq.highlights.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs">
                                                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Widget de Utilidad (👍/👎) */}
                                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>¿Te resultó útil esta respuesta?</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onVote(faqId, true)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${currentVote === 'up'
                                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                                                }`}
                                        >
                                            <ThumbsUp size={14} className={currentVote === 'up' ? 'fill-emerald-500' : ''} />
                                            <span>Sí</span>
                                        </button>

                                        <button
                                            onClick={() => onVote(faqId, false)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${currentVote === 'down'
                                                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-rose-400'
                                                }`}
                                        >
                                            <ThumbsDown size={14} className={currentVote === 'down' ? 'fill-rose-500' : ''} />
                                            <span>No</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};