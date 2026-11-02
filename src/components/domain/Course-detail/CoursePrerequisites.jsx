import React from 'react';
import { CircleDot } from 'lucide-react';

export const CoursePrerequisites = ({ requirements = [] }) => {
    const defaultReqs = [
        'Conocimientos básicos de HTML, CSS y JavaScript moderno (ES6+)',
        'Computadora con conexión a internet y editor de código instalado (ej. VS Code)',
        'Ganas de aprender y construir proyectos del mundo real',
    ];

    const items = requirements.length > 0 ? requirements : defaultReqs;

    return (
        <div className="mb-8">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">
                Requisitos previos
            </h3>
            <ul className="space-y-2">
                {items.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        <CircleDot size={14} className="text-indigo-500 shrink-0 mt-1" />
                        <span>{req}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};