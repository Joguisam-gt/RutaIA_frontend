import React from 'react';
import { BookOpen, CheckCircle2, Play, ArrowRight } from 'lucide-react';

export const CoursesInProgressGrid = ({ courses = [] }) => {
    const defaultCourses = [
        {
            id: 'c-102',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            completedLessons: 8,
            totalLessons: 12,
            progressPercentage: 66,
            thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
        },
        {
            id: 'c-103',
            title: 'Diseño de Sistemas UX/UI Accesibles con Tailwind CSS y React',
            category: 'Frontend & Web',
            completedLessons: 4,
            totalLessons: 16,
            progressPercentage: 25,
            thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
        },
    ];

    const list = courses.length > 0 ? courses : defaultCourses;

    return (
        <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                    Mis Cursos en Progreso ({list.length})
                </h3>
                <a href="/app/cursos" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                    <span>Ver catálogo completo</span>
                    <ArrowRight size={14} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {list.map((c) => (
                    <div
                        key={c.id}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                        <div>
                            <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-slate-950">
                                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                                {c.category}
                            </span>

                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-3">
                                {c.title}
                            </h4>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="flex items-center gap-1 font-semibold">
                                    <CheckCircle2 size={14} className="text-emerald-500" />
                                    {c.completedLessons} de {c.totalLessons} lecciones
                                </span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                    {c.progressPercentage}%
                                </span>
                            </div>

                            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 rounded-full"
                                    style={{ width: `${c.progressPercentage}%` }}
                                />
                            </div>

                            <a
                                href={`/app/cursos/${c.id}`}
                                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                            >
                                <Play size={14} className="text-indigo-500" />
                                <span>Ir al Curso</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};