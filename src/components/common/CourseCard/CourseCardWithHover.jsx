import React, { useState } from 'react';
import { Star, Clock, BookOpen, Heart, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export const CourseCardWithHover = ({ course }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const {
        title,
        category,
        level,
        instructor,
        rating,
        reviewCount,
        duration,
        lessonsCount,
        price,
        thumbnail,
        syllabusSummary = [
            'Configuración inicial y buenas prácticas',
            'Integración de APIs y backend en tiempo real',
            'Despliegue y optimización en producción',
        ],
    } = course;

    return (
        <div
            className="relative group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-visible shadow-sm hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {/* Contenedor Principal de la Tarjeta */}
            <div className="overflow-hidden rounded-2xl flex flex-col flex-1">
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className="rounded-md bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/30">
                            {category}
                        </span>
                        <span className="rounded-md bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700">
                            {level}
                        </span>
                    </div>
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-slate-300 hover:text-rose-500 transition-colors">
                        <Heart size={16} />
                    </button>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-2">
                        <Star size={14} className="fill-amber-500 text-amber-500" />
                        <span>{rating || 4.9}</span>
                        <span className="text-slate-400 font-normal">({reviewCount || 120})</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Por <span className="font-medium text-slate-700 dark:text-slate-300">{instructor || 'Instructor RutaIA'}</span>
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{duration || '10 hrs'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{lessonsCount || 40} clases</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-400 block">Precio</span>
                            <span className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                                {price === 0 ? 'Gratis' : `$${price} USD`}
                            </span>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all">
                            <span>Detalles</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tooltip Flotante de Previsualización en Hover (Escritorio) */}
            {showTooltip && (
                <div className="hidden lg:block absolute left-full top-0 ml-3 w-72 p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl z-40 animate-fade-in pointer-events-none">
                    <h4 className="text-xs font-bold text-indigo-400 mb-2">Temario Rápido del Curso</h4>
                    <ul className="space-y-2 mb-4">
                        {syllabusSummary.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                                <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">Acceso libre al trailer</span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400">
                            <Play size={12} className="fill-cyan-400" />
                            <span>Probar Lección Gratis</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};