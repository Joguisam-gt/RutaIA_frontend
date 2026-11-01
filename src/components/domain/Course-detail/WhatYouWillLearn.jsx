// src/components/domain/course-detail/WhatYouWillLearn.jsx
import React from 'react';
import { Check } from 'lucide-react';

export const WhatYouWillLearn = ({ learningGoals = [] }) => {
    const defaultGoals = [
        'Construir aplicaciones web completas y escalables con React y Next.js',
        'Diseñar arquitecturas de API Backend eficientes con Express y bases de datos NoSQL',
        'Implementar autenticación segura con JWT y gestión de estados globales',
        'Aplicar buenas prácticas de diseño UX/UI utilizando componentes modulares',
        'Integrar modelos de IA y webhooks RAG para asistentes virtuales inteligentes',
        'Desplegar proyectos en entornos de producción cloud con integración continua',
    ];

    const goals = learningGoals.length > 0 ? learningGoals : defaultGoals;

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                Lo que aprenderás en este curso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goals.map((goal, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="leading-relaxed">{goal}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};