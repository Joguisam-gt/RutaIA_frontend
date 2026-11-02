import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const PricingFaqAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: '¿Cuáles son los métodos de pago aceptados?',
            answer: 'Aceptamos todas las tarjetas de crédito y débito internacionales (Visa, MasterCard, American Express), PayPal y transferencias bancarias para planes corporativos B2B.',
        },
        {
            question: '¿Puedo cancelar mi suscripción en cualquier momento?',
            answer: 'Sí, totalmente. Puedes cancelar tu suscripción desde el panel de Configuración de Cuenta (/app/perfil) en cualquier momento. Mantendrás acceso hasta el final de tu periodo pagado.',
        },
        {
            question: '¿Cómo funciona la garantía de devolución de 30 días?',
            answer: 'Si te inscribes en un plan Pro o compras un Pase Completo de especialización y sientes que el curso no cumple tus expectativas, puedes solicitar el reembolso del 100% de tu dinero dentro de los primeros 30 días.',
        },
        {
            question: '¿Se emiten facturas fiscales para empresas?',
            answer: 'Sí. Para compras de planes Teams o pases completos, nuestro sistema genera automáticamente facturas fiscales con desglose de impuestos válidas para deducción corporativa.',
        },
    ];

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                    <HelpCircle size={14} />
                    <span>Soporte de Facturación</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
                    Preguntas frecuentes sobre pagos
                </h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    Resolvemos tus dudas antes de realizar tu inscripción.
                </p>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
                        >
                            <button
                                onClick={() => toggle(idx)}
                                className="w-full flex items-center justify-between p-5 text-left font-bold text-xs md:text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <span>{faq.question}</span>
                                {isOpen ? <ChevronUp size={18} className="text-indigo-500" /> : <ChevronDown size={18} className="text-slate-400" />}
                            </button>

                            {isOpen && (
                                <div className="p-5 pt-0 text-xs md:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PricingFaqAccordion;