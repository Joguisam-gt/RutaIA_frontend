import React, { useRef, useEffect } from 'react';
import {
    Edit3,
    MoreVertical,
    Copy,
    Archive,
    BarChart2,
    BookOpen,
    Clock,
    Users,
    Star,
    ExternalLink,
    ShieldCheck,
    Circle
} from 'lucide-react';

export const InstructorCourseCard = ({
    course,
    viewMode = 'grid',
    isMenuActive,
    onToggleMenu,
    onDuplicate,
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
        status = 'published', // 'published' | 'draft' | 'under_review'
        totalLessons = 0,
        totalHours = 0,
        studentsCount = 0,
        rating = 0,
        thumbnail,
        isArchived = false,
    } = course;

    // Renderizado del Status Badge con indicador de color dedicado
    const renderStatusBadge = () => {
        switch (status) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-emerald-500 text-emerald-500" />
                        <span>Publicado</span>
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-amber-500 text-amber-500" />
                        <span>Borrador</span>
                    </span>
                );
            case 'under_review':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-cyan-500 text-cyan-500" />
                        <span>En Revisión</span>
                    </span>
                );
            default:
                return null;
        }
    };

    // Renderizado en Modo Tabla (Fila Horizontal)
    if (viewMode === 'table') {
        return (
            <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800/80">
                <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300'}
                            alt={title}
                            className="w-14 h-10 rounded-xl object-cover bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                                {category}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate block max-w-sm">
                                {title}
                            </span>
                        </div>
                    </div>
                </td>

                <td className="py-4 px-4">{renderStatusBadge()}</td>

                <td className="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <BookOpen size={13} className="text-indigo-500" />
                            {totalLessons} lecciones
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" />
                            {totalHours}h
                        </span>
                    </div>
                </td>

                <td className="py-4 px-4 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-1">
                        <Users size={14} className="text-slate-400" />
                        <span>{studentsCount.toLocaleString()} alumnos</span>
                    </div>
                </td>

                <td className="py-4 px-4 text-xs font-bold text-amber-500">
                    {rating > 0 ? (
                        <div className="flex items-center gap-1">
                            <Star size={13} className="fill-amber-500" />
                            <span>{rating}</span>
                        </div>
                    ) : (
                        <span className="text-slate-400 text-[11px] font-normal italic">Sin reseñas</span>
                    )}
                </td>

                <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative" ref={menuRef}>
                        {/* Botón CTA Editar Contenido en Tabla */}
                        <a
                            href={`/instructor/cursos/${id}/editar`}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-xs transition-all flex items-center gap-1"
                        >
                            <Edit3 size={13} />
                            <span>Editar</span>
                        </a>

                        {/* Menú Contextual */}
                        <button
                            onClick={() => onToggleMenu(isMenuActive ? null : id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {isMenuActive && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-left">
                                <button
                                    type="button"
                                    onClick={() => onDuplicate(id)}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Copy size={14} className="text-slate-400" />
                                    <span>Duplicar Curso</span>
                                </button>

                                <a
                                    href={`/instructor/analiticas?course=${id}`}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <BarChart2 size={14} className="text-indigo-500" />
                                    <span>Ver Analíticas</span>
                                </a>

                                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                <button
                                    type="button"
                                    onClick={() => onToggleArchive(id, isArchived)}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Archive size={14} />
                                    <span>{isArchived ? 'Desarchivar' : 'Archivar Curso'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    }

    // Renderizado en Modo Cuadrícula (Grid Default)
    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between relative group">
            <div>
                {/* Contenedor Portada con Status Badge y Menú Contextual (...) */}
                <div className="aspect-video w-full relative bg-slate-950 overflow-hidden">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Status Badge Superior Izquierda */}
                    <div className="absolute top-3 left-3 z-10">
                        {renderStatusBadge()}
                    </div>

                    {/* Menú Contextual (...) Superior Derecha */}
                    <div className="absolute top-3 right-3 z-20" ref={menuRef}>
                        <button
                            onClick={() => onToggleMenu(isMenuActive ? null : id)}
                            className="p-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md text-slate-200 hover:text-white hover:bg-slate-900 transition-colors border border-white/10"
                            title="Opciones del curso"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {isMenuActive && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-left overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => onDuplicate(id)}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Copy size={14} className="text-slate-400" />
                                    <span>Duplicar Curso</span>
                                </button>

                                <a
                                    href={`/instructor/analiticas?course=${id}`}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <BarChart2 size={14} className="text-indigo-500" />
                                    <span>Ver Analíticas</span>
                                </a>

                                <a
                                    href={`/cursos/${id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <ExternalLink size={14} className="text-cyan-500" />
                                    <span>Ver Vista Previa</span>
                                </a>

                                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                <button
                                    type="button"
                                    onClick={() => onToggleArchive(id, isArchived)}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Archive size={14} />
                                    <span>{isArchived ? 'Desarchivar' : 'Archivar Curso'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                        {category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-4">
                        {title}
                    </h3>

                    {/* Métricas de Lecciones, Horas, Alumnos y Rating */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="flex items-center gap-1 font-semibold">
                            <BookOpen size={13} className="text-indigo-500" />
                            {totalLessons} lecciones ({totalHours}h)
                        </span>
                        <span className="flex items-center gap-1 font-semibold justify-end">
                            <Users size={13} className="text-cyan-500" />
                            {studentsCount.toLocaleString()} alumnos
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer con Botón Primario "Editar Contenido" con degradado exclusivo */}
            <div className="px-5 pb-5 pt-2">
                <a
                    href={`/instructor/cursos/${id}/editar`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                    <Edit3 size={14} />
                    <span>Editar Contenido</span>
                </a>
            </div>
        </div>
    );
};// src/components/domain/course-management/InstructorCourseCard.jsx
import React, { useRef, useEffect } from 'react';
import {
    Edit3,
    MoreVertical,
    Copy,
    Archive,
    BarChart2,
    BookOpen,
    Clock,
    Users,
    Star,
    ExternalLink,
    ShieldCheck,
    Circle
} from 'lucide-react';

export const InstructorCourseCard = ({
    course,
    viewMode = 'grid',
    isMenuActive,
    onToggleMenu,
    onDuplicate,
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
        status = 'published', // 'published' | 'draft' | 'under_review'
        totalLessons = 0,
        totalHours = 0,
        studentsCount = 0,
        rating = 0,
        thumbnail,
        isArchived = false,
    } = course;

    // Renderizado del Status Badge con indicador de color dedicado
    const renderStatusBadge = () => {
        switch (status) {
            case 'published':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-emerald-500 text-emerald-500" />
                        <span>Publicado</span>
                    </span>
                );
            case 'draft':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-amber-500 text-amber-500" />
                        <span>Borrador</span>
                    </span>
                );
            case 'under_review':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                        <Circle size={8} className="fill-cyan-500 text-cyan-500" />
                        <span>En Revisión</span>
                    </span>
                );
            default:
                return null;
        }
    };

    // Renderizado en Modo Tabla (Fila Horizontal)
    if (viewMode === 'table') {
        return (
            <tr className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800/80">
                <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300'}
                            alt={title}
                            className="w-14 h-10 rounded-xl object-cover bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                        />
                        <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                                {category}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate block max-w-sm">
                                {title}
                            </span>
                        </div>
                    </div>
                </td>

                <td className="py-4 px-4">{renderStatusBadge()}</td>

                <td className="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <BookOpen size={13} className="text-indigo-500" />
                            {totalLessons} lecciones
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" />
                            {totalHours}h
                        </span>
                    </div>
                </td>

                <td className="py-4 px-4 text-xs font-bold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-1">
                        <Users size={14} className="text-slate-400" />
                        <span>{studentsCount.toLocaleString()} alumnos</span>
                    </div>
                </td>

                <td className="py-4 px-4 text-xs font-bold text-amber-500">
                    {rating > 0 ? (
                        <div className="flex items-center gap-1">
                            <Star size={13} className="fill-amber-500" />
                            <span>{rating}</span>
                        </div>
                    ) : (
                        <span className="text-slate-400 text-[11px] font-normal italic">Sin reseñas</span>
                    )}
                </td>

                <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative" ref={menuRef}>
                        {/* Botón CTA Editar Contenido en Tabla */}
                        <a
                            href={`/instructor/cursos/${id}/editar`}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-xs transition-all flex items-center gap-1"
                        >
                            <Edit3 size={13} />
                            <span>Editar</span>
                        </a>

                        {/* Menú Contextual */}
                        <button
                            onClick={() => onToggleMenu(isMenuActive ? null : id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {isMenuActive && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-left">
                                <button
                                    type="button"
                                    onClick={() => onDuplicate(id)}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Copy size={14} className="text-slate-400" />
                                    <span>Duplicar Curso</span>
                                </button>

                                <a
                                    href={`/instructor/analiticas?course=${id}`}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <BarChart2 size={14} className="text-indigo-500" />
                                    <span>Ver Analíticas</span>
                                </a>

                                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                <button
                                    type="button"
                                    onClick={() => onToggleArchive(id, isArchived)}
                                    className="w-full px-3.5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Archive size={14} />
                                    <span>{isArchived ? 'Desarchivar' : 'Archivar Curso'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    }

    // Renderizado en Modo Cuadrícula (Grid Default)
    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between relative group">
            <div>
                {/* Contenedor Portada con Status Badge y Menú Contextual (...) */}
                <div className="aspect-video w-full relative bg-slate-950 overflow-hidden">
                    <img
                        src={thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Status Badge Superior Izquierda */}
                    <div className="absolute top-3 left-3 z-10">
                        {renderStatusBadge()}
                    </div>

                    {/* Menú Contextual (...) Superior Derecha */}
                    <div className="absolute top-3 right-3 z-20" ref={menuRef}>
                        <button
                            onClick={() => onToggleMenu(isMenuActive ? null : id)}
                            className="p-1.5 rounded-xl bg-slate-950/70 backdrop-blur-md text-slate-200 hover:text-white hover:bg-slate-900 transition-colors border border-white/10"
                            title="Opciones del curso"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {isMenuActive && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 py-1 text-left overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => onDuplicate(id)}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Copy size={14} className="text-slate-400" />
                                    <span>Duplicar Curso</span>
                                </button>

                                <a
                                    href={`/instructor/analiticas?course=${id}`}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <BarChart2 size={14} className="text-indigo-500" />
                                    <span>Ver Analíticas</span>
                                </a>

                                <a
                                    href={`/cursos/${id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <ExternalLink size={14} className="text-cyan-500" />
                                    <span>Ver Vista Previa</span>
                                </a>

                                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                <button
                                    type="button"
                                    onClick={() => onToggleArchive(id, isArchived)}
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                                >
                                    <Archive size={14} />
                                    <span>{isArchived ? 'Desarchivar' : 'Archivar Curso'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                        {category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-4">
                        {title}
                    </h3>

                    {/* Métricas de Lecciones, Horas, Alumnos y Rating */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <span className="flex items-center gap-1 font-semibold">
                            <BookOpen size={13} className="text-indigo-500" />
                            {totalLessons} lecciones ({totalHours}h)
                        </span>
                        <span className="flex items-center gap-1 font-semibold justify-end">
                            <Users size={13} className="text-cyan-500" />
                            {studentsCount.toLocaleString()} alumnos
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer con Botón Primario "Editar Contenido" con degradado exclusivo */}
            <div className="px-5 pb-5 pt-2">
                <a
                    href={`/instructor/cursos/${id}/editar`}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                    <Edit3 size={14} />
                    <span>Editar Contenido</span>
                </a>
            </div>
        </div>
    );
};