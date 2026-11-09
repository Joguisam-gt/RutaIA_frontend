// src/components/domain/instructor/CoursePerformanceTable.jsx
import React, { useState } from 'react';
import { Search, Star, Users, BookOpen } from 'lucide-react';

export const CoursePerformanceTable = ({ courses = [] }) => {
    // Inicializacion segura con string vacio para evitar que sea undefined
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Filtro defensivo que previene errores si title o searchValue son nulos
    const safeSearch = (searchValue || '').trim().toLowerCase();
    
    const filteredList = (courses || []).filter((course) => {
        const titleMatch = (course?.title || '').toLowerCase().includes(safeSearch);
        const categoryMatch = 
            selectedCategory === 'ALL' || 
            (course?.category || '').toUpperCase() === selectedCategory.toUpperCase();

        return titleMatch && categoryMatch;
    });

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
            {/* Cabecera y Barra de Busqueda */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                        <BookOpen size={18} className="text-indigo-600" />
                        <span>Rendimiento de Cursos</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Metricas de inscripciones y valoraciones de los programas academicos activos.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Buscar curso..."
                            className="w-48 sm:w-56 pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Tabla de Cursos */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            <th className="pb-3 pl-2">Curso</th>
                            <th className="pb-3 px-3">Categoria</th>
                            <th className="pb-3 px-3">Nivel</th>
                            <th className="pb-3 px-3">Inscritos</th>
                            <th className="pb-3 pr-2 text-right">Valoracion</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                        {filteredList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-400">
                                    No se encontraron cursos que coincidan con la busqueda.
                                </td>
                            </tr>
                        ) : (
                            filteredList.map((course) => (
                                <tr 
                                    key={course.id || course._id}
                                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                                >
                                    <td className="py-3.5 pl-2">
                                        <span className="font-bold text-slate-900 dark:text-slate-100 block truncate max-w-xs">
                                            {course.title}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">
                                        {course.category || 'General'}
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                                            {course.level || 'INTERMEDIO'}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                                        <div className="flex items-center gap-1.5">
                                            <Users size={13} className="text-slate-400" />
                                            <span>{course.enrolledCount || 1}</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 pr-2 text-right">
                                        <div className="inline-flex items-center gap-1 text-amber-500 font-bold">
                                            <Star size={13} className="fill-amber-400 text-amber-400" />
                                            <span>{course.rating ? Number(course.rating).toFixed(1) : '5.0'}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursePerformanceTable;