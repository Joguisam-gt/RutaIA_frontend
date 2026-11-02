import React, { useRef, useEffect } from 'react';
import { Play, Award, MoreVertical, Archive, ArchiveRestore, Share2, ExternalLink, BookOpen } from 'lucide-react';

export const MyCourseCard = ({
    course,
    isMenuActive,
    onToggleMenu,
    onToggleArchive,
}) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onToggleMenu(null);
            }
        };
        if (isMenuActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuActive, onToggleMenu]);

    const {
        id,
        title,
        category,
        thumbnail,
        progressPercentage = 0,
        completedLessons = 0,
        totalLessons = 0,
        lastLessonTitle,
        lastLessonId,
        isCompleted = false,
        isArchived = false,
        certificateUrl,
    } = course;

    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between relative group">
            <div>
                {/* Contenedor Thumbnail con Menú Contextual */}
                <div className="aspect-video w-full relative bg-slate-950 overflow-hidden">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge de Categoría */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                        {category}
                    </span>

                    {/* Menú Contextual (...) */}
                    <div className="absolute top-3 right-3" ref={menuRef}>
                        <button
                            onClick={() => onToggleMenu(isMenuActive ? null : id)}
                            className="p-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md text-slate-200 hover:text-white hover:bg-slate-900 transition-colors border border-white/10"
                            title="Opciones"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {isMenuActive && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-left overflow-hidden">
                                <a
                                    href={`/app/cursos/${id}`}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <ExternalLink size={14} className="text-slate-400" />
                                    <span>Ver Detalle del Curso</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/app/cursos/${id}`);
                                        onToggleMenu(null);
                                    }}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Share2 size={14} className="text-slate-400" />
                                    <span>Compartir Enlace</span>
                                </button>

                                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                <button
                                    type="button"
                                    onClick={() => onToggleArchive(id, isArchived)}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    {isArchived ? (
                                        <>
                                            <ArchiveRestore size={14} className="text-indigo-500" />
                                            <span>Desarchivar Curso</span>
                                        </>
                                    ) : (
                                        <>
                                            <Archive size={14} className="text-amber-500" />
                                            <span>Archivar Curso</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-3">
                        {title}
                    </h3>

                    {/* Última Lección Vista */}
                    {lastLessonTitle && !isCompleted && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 mb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                Última lección consultada:
                            </span>
                            <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate flex items-center gap-1.5">
                                <BookOpen size={12} className="text-indigo-500 shrink-0" />
                                <span>{lastLessonTitle}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer con Barra de Progreso y Acciones */}
            <div className="px-5 pb-5 space-y-4">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>{completedLessons} de {totalLessons} lecciones ({progressPercentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                                }`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Botón CTA con degradado exclusivo para "Continuar" */}
                {isCompleted ? (
                    <a
                        href={certificateUrl || `/app/certificados/${id}`}
                        className="w-full py-2.5 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                    >
                        <Award size={16} />
                        <span>Ver Certificado Oficial</span>
                    </a>
                ) : (
                    <a
                        href={`/app/cursos/${id}/lecciones/${lastLessonId || 'inicio'}`}
                        className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                        <Play size={14} className="fill-white" />
                        <span>Continuar Aprendiendo</span>
                    </a>
                )}
            </div>
        </div>
    );
};