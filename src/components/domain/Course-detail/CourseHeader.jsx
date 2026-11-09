import React from 'react';
import { Star, Calendar, ChevronRight, User, Award, ShieldCheck } from 'lucide-react';

export const CourseHeader = ({ course }) => {
    if (!course) return null;

    const {
        title,
        subtitle,
        category,
        level,
        instructor,
        rating = 4.9,
        reviewCount = 140,
        studentsCount = 1250,
        updatedAt = '10/2026',
    } = course;

    return (
        <div className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 py-8 transition-colors">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <a href="/" className="hover:text-indigo-500 transition-colors">Inicio</a>
                    <ChevronRight size={14} />
                    <a href="/cursos" className="hover:text-indigo-500 transition-colors">Catálogo</a>
                    <ChevronRight size={14} />
                    <span className="text-indigo-600 dark:text-indigo-400">{category}</span>
                </nav>

                <div className="max-w-3xl">
                    {/* Badges de Categoría y Nivel */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
                            {category}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
                            {level}
                        </span>
                    </div>

                    {/* Título H1 (Sin degradado en texto) */}
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
                        {title}
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Metadatos (Rating, Estudiantes, Instructor, Fecha) */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star size={16} className="fill-amber-500" />
                            <span>{rating}</span>
                            <span className="text-slate-400 font-normal">({reviewCount} valoraciones)</span>
                        </div>

                        <div className="flex items-center gap-1.5 font-medium">
                            <User size={14} className="text-indigo-500" />
                            <span>Creado por <strong className="text-slate-900 dark:text-slate-100">{instructor?.name || 'José Rodríguez'}</strong></span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar size={14} />
                            <span>Última actualización: {updatedAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;