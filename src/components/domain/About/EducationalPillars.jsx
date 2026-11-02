import React from 'react';
import { Code2, Bot, Users, HeartHandshake } from 'lucide-react';

const iconMap = {
    Code2: Code2,
    Bot: Bot,
    Users: Users,
    HeartHandshake: HeartHandshake,
};

export const EducationalPillars = ({ pillars = [] }) => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">
                        Nuestros Pilares Pedagógicos
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Principios fundamentales que guían el diseño de nuestros planes de estudio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pillars.map((pillar, idx) => {
                        const IconComponent = iconMap[pillar.iconName] || Code2;
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/40 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-200 dark:border-indigo-800">
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EducationalPillars;