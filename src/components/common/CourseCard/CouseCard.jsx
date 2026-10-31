// src/components/common/CourseCard/CourseCard.jsx
import React from 'react';
import { Star, Clock, BookOpen, Heart, ArrowRight } from 'lucide-react';

export const CourseCard = ({ course }) => {
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
    } = course;

    return (
        <div className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
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
                <button
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-slate-300 hover:text-rose-500 transition-colors"
                    title="Guardar en Favoritos"
                >
                    <Heart size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-2">
                    <Star size={14} className="fill-amber-500 text-amber-500" />
                    <span>{rating}</span>
                    <span className="text-slate-400 font-normal">({reviewCount})</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Por <span className="font-medium text-slate-700 dark:text-slate-300">{instructor}</span>
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{lessonsCount} lecciones</span>
                    </div>
                </div>

                {/* Footer & CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-400 block">Precio</span>
                        <span className="text-lg font-extrabold text-slate-900 dark:text-slate-50">
                            {price === 0 ? 'Gratis' : `$${price} USD`}
                        </span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all">
                        <span>Ver Curso</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};