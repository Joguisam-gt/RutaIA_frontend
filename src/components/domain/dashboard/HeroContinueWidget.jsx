import React from 'react';
import { Play, Clock, BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export const HeroContinueWidget = ({ heroCourse }) => {
    const defaultHero = {
        courseId: 'c-101',
        courseTitle: 'Arquitectura Backend y APIs REST con Node.js & Express',
        category: 'Backend Architecture',
        lastLessonId: 'les-402',
        lastLessonTitle: 'Mapeo de Rutas Avanzado y Middlewares de Error Globales',
        lessonNumber: 14,
        totalLessons: 24,
        progressPercentage: 62,
        remainingTime: '25 min restantes',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
    };

    const course = heroCourse || defaultHero;

    return (
        <div className="relative rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 md:p-8 shadow-xl overflow-hidden mb-8">
            {/* Resplandor decorativo de fondo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="w-full lg:w-3/5 space-y-4">
                    {/* Badge Superior */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-cyan-400 border border-indigo-500/30">
                        <Sparkles size={14} />
                        <span>Continuar Aprendiendo</span>
                    </div>

                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            {course.category}
                        </span>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-50 tracking-tight leading-snug">
                            {course.courseTitle}
                        </h2>
                    </div>

                    {/* Lección Pendiente */}
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                            <span className="font-bold text-white flex items-center gap-1.5">
                                <BookOpen size={14} className="text-indigo-400" />
                                Lección {course.lessonNumber} de {course.totalLessons}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                <Clock size={12} />
                                {course.remainingTime}
                            </span>
                        </div>
                        <p className="text-xs font-medium text-slate-200 truncate">
                            {course.lastLessonTitle}
                        </p>
                    </div>

                    {/* Barra de Progreso */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-400 font-semibold">
                            <span>Progreso General</span>
                            <span className="text-cyan-400 font-bold">{course.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                                style={{ width: `${course.progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Botón 1-Click CTA con degradado exclusivo */}
                    <div className="pt-2">
                        <a
                            href={`/app/cursos/${course.courseId}/lecciones/${course.lastLessonId}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 transition-all w-full sm:w-auto"
                        >
                            <Play size={16} className="fill-white" />
                            <span>▶ Continuar Lección</span>
                        </a>
                    </div>
                </div>

                {/* Portada / Preview Gráfico */}
                <div className="w-full lg:w-2/5 shrink-0">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative group">
                        <img
                            src={course.thumbnail}
                            alt={course.courseTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                <Play size={20} className="fill-white ml-0.5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContinueWidget;