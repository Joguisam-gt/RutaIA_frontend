import React from 'react';
import { Search, X, Download, Filter, BookOpen, ShieldAlert } from 'lucide-react';

export const StudentFilterToolbar = ({
    selectedCourse,
    onCourseChange,
    selectedStatus,
    onStatusChange,
    searchQuery,
    onSearchChange,
    onExportCSV,
    coursesList = [],
}) => {
    const defaultCourses = [
        { id: 'all', title: 'Todos los Cursos' },
        { id: 'c-101', title: 'Arquitectura Backend y APIs REST' },
        { id: 'c-102', title: 'Bases de Datos Vectoriales con pgvector' },
        { id: 'c-103', title: 'Agentes de IA y Orquestación RAG' },
    ];

    const courses = coursesList.length > 0 ? coursesList : defaultCourses;

    const statusOptions = [
        { id: 'all', label: 'Todos los Estados' },
        { id: 'active', label: 'Activos' },
        { id: 'completed', label: 'Graduados' },
        { id: 'at_risk', label: 'En Riesgo (>14d)' },
        { id: 'inactive', label: 'Inactivos' },
    ];

    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs">
            {/* Selectores de Filtro */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Filtro por Curso */}
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex-1 sm:flex-none">
                    <BookOpen size={14} className="text-slate-400 shrink-0" />
                    <select
                        value={selectedCourse}
                        onChange={(e) => onCourseChange(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
                    >
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Estado Académico */}
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex-1 sm:flex-none">
                    <Filter size={14} className="text-slate-400 shrink-0" />
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Buscador & Exportación CSV */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Buscador */}
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por nombre o correo..."
                        className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Botón Exportación CSV con degradado exclusivo */}
                <button
                    onClick={onExportCSV}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                    <Download size={14} />
                    <span>Exportar CSV</span>
                </button>
            </div>
        </div>
    );
};

export default StudentFilterToolbar;