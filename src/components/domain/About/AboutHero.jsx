import React from 'react';

export const AboutHero = () => {
    return (
        <div className="w-full my-8 p-8 md:p-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-center transition-colors">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                Empoderando a la próxima generación de profesionales en tecnología
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
                Diseñamos programas educativos alineados a las necesidades reales de la industria del software y la inteligencia artificial.
            </p>
        </div>
    );
};

export default AboutHero;