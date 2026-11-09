import React from 'react';
import { Code, Cpu, Database, Layout } from 'lucide-react';

export const EducationalPillars = () => {
    const pillars = [
        {
            icon: Cpu,
            title: 'Integración Inteligente',
            description: 'Interactúa con modelos de IA entrenados para resolver dudas de código y arquitectura en tiempo real.',
        },
        {
            icon: Layout,
            title: 'Diseño UX/UI Práctico',
            description: 'Aprende a construir interfaces accesibles, responsivas y centradas en la experiencia del usuario.',
        },
        {
            icon: Database,
            title: 'Bases de Datos SQL & NoSQL',
            description: 'Domina el modelado de datos relacional y no relacional preparado para escalar en producción.',
        },
        {
            icon: Code,
            title: 'Desarrollo Full-Stack',
            description: 'Crea aplicaciones robustas desde el backend en Node.js hasta interfaces modernas con React y Tailwind.',
        },
    ];

    return (
        <section className="py-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 md:p-8 my-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
                Nuestros Pilares Pedagógicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar, index) => {
                    const IconComponent = pillar.icon;
                    return (
                        <div
                            key={index}
                            className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col items-start space-y-3"
                        >
                            <div className="p-2.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md">
                                <IconComponent className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default EducationalPillars;