import React from 'react';
import { Target, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const AboutHero = () => {
    const { t } = useLanguage();

    return (
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-6">
                    <Target size={14} className="text-violet-500" />
                    <span>Nuestro Manifiesto & Propósito</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-6">
                    Democratizar la educación tecnológica práctica de alto impacto en Latinoamérica
                </h1>

                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
                    En RutaIA creemos que el aprendizaje de la programación, la Inteligencia Artificial y el diseño UX/UI debe ser accesible, orientado a proyectos del mundo real y guiado por las necesidades actuales de la industria, eliminando las barreras económicas y metodológicas tradicionales.
                </p>

                <div className="flex justify-center">
                    <a
                        href="/cursos"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/20 transition-all"
                    >
                        <span>Explorar Programas de Formación</span>
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};