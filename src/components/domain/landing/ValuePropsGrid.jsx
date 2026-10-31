// src/components/domain/landing/ValuePropsGrid.jsx
import React from 'react';
import { Code, Users, Award, Clock } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const ValuePropsGrid = () => {
    const { t } = useLanguage();

    const values = [
        {
            icon: Code,
            title: 'Proyectos 100% Reales',
            desc: 'Construye portafolios listos para el mercado laboral resolviendo desafíos reales de desarrollo y diseño.',
        },
        {
            icon: Users,
            title: 'Mentores Activos en la Industria',
            desc: 'Aprende directamente de profesionales con experiencia comprobada en empresas tecnológicas de alto nivel.',
        },
        {
            icon: Award,
            title: 'Certificaciones Oficiales',
            desc: 'Obtén diplomas verificables con código QR y firmas digitales para destacar en LinkedIn.',
        },
        {
            icon: Clock,
            title: 'Aprendizaje a tu Ritmo',
            desc: 'Acceso ilimitado 24/7 a contenido actualizado, ejercicios interactivos y soporte de IA instantáneo.',
        },
    ];

    return (
        <section className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">
                        {t('whyTitle')}
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {t('whySubtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((v, idx) => {
                        const Icon = v.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/40 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                                    {v.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};