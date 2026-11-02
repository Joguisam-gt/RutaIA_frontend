import React from 'react';
import { Star, Clock, BookOpen, Trash2, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';

export const WishlistCourseCard = ({ course, viewMode = 'grid', onRemove }) => {
    const {
        id,
        title,
        category,
        thumbnail,
        rating = 4.9,
        reviewsCount = 320,
        duration = '18 horas',
        totalLessons = 24,
        price = 29.99,
        originalPrice = 49.99,
        isEnrolled = false,
        slug = 'backend-nodejs-express',
    } = course;

    // Layout en Lista Horizontal
    if (viewMode === 'list') {
        return (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'}
                        alt={title}
                        className="w-full sm:w-44 h-28 rounded-2xl object-cover shrink-0 bg-slate-950"
                    />

                    <div className="space-y-1.5 min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                            {category}
                        </span>
                        <h3 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                            {title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                            <span className="flex items-center gap-1 font-bold text-amber-500">
                                <Star size={14} className="fill-amber-500" />
                                {rating} ({reviewsCount})
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={13} />
                                {duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen size={13} />
                                {totalLessons} lecciones
                            </span>
                        </div>
                    </div>
                </div>

                {/* Precio y Botones de Acción */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left sm:text-right">
                        <span className="text-base font-black text-slate-900 dark:text-slate-50 block">
                            ${price} USD
                        </span>
                        {originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                                ${originalPrice} USD
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onRemove(course)}
                            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition-colors"
                            title="Quitar de la lista de deseos"
                        >
                            <Trash2 size={16} />
                        </button>

                        {/* Botón Primario de Inscripción/Compra con degradado exclusivo */}
                        <a
                            href={isEnrolled ? `/app/cursos/${id}` : `/checkout?course=${slug}`}
                            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 shrink-0"
                        >
                            {isEnrolled ? (
                                <>
                                    <ShieldCheck size={14} />
                                    <span>Ir al Curso</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={14} />
                                    <span>Inscribirme Ahora</span>
                                </>
                            )}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Layout en Cuadrícula (Grid Default)
    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between group">
            <div>
                {/* Thumbnail con Botón de Eliminar */}
                <div className="aspect-video w-full relative bg-slate-950 overflow-hidden">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                        {category}
                    </span>

                    <button
                        onClick={() => onRemove(course)}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-rose-400 hover:bg-slate-900 transition-colors border border-white/10"
                        title="Quitar de favoritos"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* Cuerpo Tarjeta */}
                <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="flex items-center gap-1 font-bold text-amber-500">
                            <Star size={14} className="fill-amber-500" />
                            {rating} ({reviewsCount})
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={13} />
                            {duration}
                        </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-3">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Footer con Precio y Botón CTA */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div>
                    <span className="text-sm font-black text-slate-900 dark:text-slate-50 block">
                        ${price} USD
                    </span>
                    {originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                            ${originalPrice} USD
                        </span>
                    )}
                </div>

                {/* Botón CTA con degradado exclusivo */}
                <a
                    href={isEnrolled ? `/app/cursos/${id}` : `/checkout?course=${slug}`}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                >
                    {isEnrolled ? (
                        <span>Ir al Curso</span>
                    ) : (
                        <>
                            <span>Inscribirme</span>
                            <ArrowRight size={14} />
                        </>
                    )}
                </a>
            </div>
        </div>
    );
};