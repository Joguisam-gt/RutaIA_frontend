import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

export const ContactFaqRedirectWidget = ({ quickFaqs = [] }) => {
    const [openId, setOpenId] = useState(null);

    const defaultFaqs = [
        {
            id: 'quick-1',
            question: '¿Cómo obtengo mi certificado de finalización?',
            answer: 'Debes completar el 100% de las lecciones grabadas y entregar el Proyecto Capstone. El diploma se generará automáticamente en /app/certificados.',
        },
        {
            id: 'quick-2',
            question: '¿Puedo solicitar reembolso si el curso no cumple mis expectativas?',
            answer: 'Sí, cuentas con 30 días de garantía total sin preguntas desde tu compra o inscripción al Plan Pro.',
        },
        {
            id: 'quick-3',
            question: '¿Emiten facturas fiscales para empresas?',
            answer: 'Sí, todas las compras de planes Teams y pases completos generan automáticamente facturas en PDF descargables desde tu perfil.',
        },
    ];

    const list = quickFaqs.length > 0 ? quickFaqs : defaultFaqs;

    return (
        <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 mb-8">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-indigo-100 dark:border-indigo-800/40">
                <div className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                        Resuelve tu duda al instante
                    </h3>
                </div>
                <a
                    href="/faq"
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                >
                    <span>Ver todas las FAQ</span>
                    <ArrowUpRight size={12} />
                </a>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Consulta las 3 respuestas más comunes antes de enviar un ticket:
            </p>

            <div className="space-y-2">
                {list.map((item) => {
                    const id = item.id || item._id;
                    const isOpen = openId === id;

                    return (
                        <div
                            key={id}
                            className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenId(isOpen ? null : id)}
                                className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <span>{item.question}</span>
                                {isOpen ? <ChevronUp size={14} className="text-indigo-500 shrink-0" /> : <ChevronDown size={14} className="text-slate-400 shrink-0" />}
                            </button>

                            {isOpen && (
                                <div className="p-3 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 leading-relaxed">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};