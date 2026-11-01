import React from 'react';
import { Sparkles } from 'lucide-react';

export const PricingHeader = ({ billingCycle, onToggleBillingCycle }) => {
    return (
        <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Badge Superior */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-4">
                <Sparkles size={14} className="text-violet-500" />
                <span>Inversión Transparente para tu Carrera</span>
            </div>

            {/* Título Principal (Sin degradado en texto) */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
                Planes diseñados para acelerar tu perfil tecnológico
            </h1>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Elige la suscripción ilimitada o adquiere pases de módulos individuales según tu ritmo de estudio.
            </p>

            {/* Toggle Mensual / Anual */}
            <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
                <button
                    onClick={onToggleBillingCycle}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly'
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                >
                    Facturación Mensual
                </button>

                <button
                    onClick={onToggleBillingCycle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'annual'
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                >
                    <span>Facturación Anual</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-500 text-slate-950 font-black">
                        -20% Ahorro
                    </span>
                </button>
            </div>
        </div>
    );
};