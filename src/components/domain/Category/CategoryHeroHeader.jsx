import React from 'react';
import { ChevronRight, BookOpen, Clock, Users, Layers } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const CategoryHeroHeader = ({ categoryMeta, categorySlug }) => {
    const { t } = useLanguage();

    if (!categoryMeta) return null;

    const { title, description, totalCourses, totalHours, activeStudents } = categoryMeta;

    return (
        <div className="bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-10 transition-colors">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs Navigation */}
                <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <a href="/" className="hover:text-indigo-500 transition-colors">Inicio</a>
                    <ChevronRight size={14} />
                    <a href="/cursos" className="hover:text-indigo-500 transition-colors">Catálogo</a>
                    <ChevronRight size={14} />
                    <span className="text-indigo-600 dark:text-indigo-400 capitalize">{title || categorySlug}</span>
                </nav>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Textos Informativos (Sin degradado en texto) */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                            <Layers size={14} />
                            <span>Especialidad Tecnológica</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
                            {title}
                        </h1>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Métricas de Nicho */}
                    <div className="grid grid-cols-3 gap-3 shrink-0">
                        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                            <BookOpen size={18} className="text-indigo-500 mx-auto mb-1" />
                            <span className="block text-base font-extrabold text-slate-900 dark:text-slate-100">
                                {totalCourses || 0}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">Cursos</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                            <Clock size={18} className="text-violet-500 mx-auto mb-1" />
                            <span className="block text-base font-extrabold text-slate-900 dark:text-slate-100">
                                {totalHours || 0}h
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">Contenido</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                            <Users size={18} className="text-cyan-500 mx-auto mb-1" />
                            <span className="block text-base font-extrabold text-slate-900 dark:text-slate-100">
                                +{activeStudents || 0}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">Alumnos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};