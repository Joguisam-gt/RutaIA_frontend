import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-5xl mx-auto text-center px-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plataforma Especializada en Tecnología e IA</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                    Aprende Inteligencia Artificial, UX/UI y Desarrollo Web con Proyectos Reales
                </h1>

                <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    RutaIA te ofrece rutas de aprendizaje intensivas de 4 meses con asistencia de tutores IA integrados, revisión de código y arquitecturas de bases de datos avanzadas.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/catalog"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                        <span>Explorar Cursos</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/pricing"
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Ver Programas</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;