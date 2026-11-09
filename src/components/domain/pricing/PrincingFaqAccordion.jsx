import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const pricingFaqs = [
    {
        question: '¿Puedo cancelar mi suscripción en cualquier momento?',
        answer: 'Sí, puedes cancelar tu suscripción desde los ajustes de tu perfil cuando quieras sin penalización ni costos ocultos.',
    },
    {
        question: '¿Los certificados tienen costo adicional?',
        answer: 'No, todos los certificados de finalización están incluidos dentro del Plan Pro y Plan Equipos.',
    },
    {
        question: '¿Qué formas de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) y transferencias locales.',
    },
];

export const PricingFaqAccordion = () => {
    const [openIdx, setOpenIdx] = useState(null);

    const toggle = (idx) => {
        setOpenIdx(openIdx === idx ? null : idx);
    };

    return (
        <div className="max-w-3xl mx-auto my-12">
            <h3 className="text-xl font-bold text-center text-slate-900 dark:text-slate-50 mb-6">
                Preguntas frecuentes sobre nuestros planes
            </h3>
            <div className="space-y-3">
                {pricingFaqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-slate-800 dark:text-slate-200"
                        >
                            <span>{faq.question}</span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${openIdx === idx ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                                    }`}
                            />
                        </button>
                        {openIdx === idx && (
                            <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Exportaciones alias para prevenir errores por variaciones ortográficas
export const PrincingFaqAccordion = PricingFaqAccordion;
export default PricingFaqAccordion;