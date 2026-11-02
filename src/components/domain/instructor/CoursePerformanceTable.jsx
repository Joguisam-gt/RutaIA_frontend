import React from 'react';
import { Search, Star, Users, DollarSign, Layers, ArrowUpDown, ExternalLink, Edit3, MoreVertical } from 'lucide-react';

export const CoursePerformanceTable = ({
    courses = [],
    searchValue,
    onSearchChange,
    sortBy,
    onSortChange,
}) => {
    const defaultCourses = [
        {
            id: 'c-101',
            title: 'Arquitectura Backend y APIs REST con Node.js & Express',
            category: 'Backend Architecture',
            studentsCount: 640,
            totalEarnings: 15360.00,
            rating: 4.9,
            reviewsCount: 184,
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300',
        },
        {
            id: 'c-102',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            studentsCount: 410,
            totalEarnings: 9840.00,
            rating: 4.8,
            reviewsCount: 112,
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300',
        },
        {
            id: 'c-103',
            title: 'Agentes de IA y Orquestación RAG con n8n y LangChain',
            category: 'Artificial Intelligence',
            studentsCount: 190,
            totalEarnings: 5700.00,
            rating: 4.95,
            reviewsCount: 46,
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300',
        },
        {
            id: 'c-104',
            title: 'Patrones de Diseño SOLID y Microservicios en TypeScript',
            category: 'Software Architecture',
            studentsCount: 0,
            totalEarnings: 0.00,
            rating: 0,
            reviewsCount: 0,
            status: 'draft',
            thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300',
        },
    ];

    const list = courses.length > 0 ? courses : defaultCourses;

    // Filtrado interno en cliente por búsqueda
    const filteredList = list.filter((c) =>
        c.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        c.category.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Header Tabla & Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                        Matriz Comparativa de Cursos
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        Rendimiento individual por ventas, estudiantes y satisfacción.
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Buscador de Cursos */}
                    <div className="relative flex-1 sm:w-64">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Buscar curso por título..."
                            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Selector de Ordenamiento */}
                    <div className="relative shrink-0">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 focus:outline-none cursor-pointer"
                        >
                            <option value="revenue">Mayor Ingreso</option>
                            <option value="students">Más Alumnos</option>
                            <option value="rating">Mejor Rating</option>
                            <option value="title">Título (A-Z)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabla Matriz de Rendimiento */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-3 px-4">Curso / Categoría</th>
                            <th className="py-3 px-4">Estado</th>
                            <th className="py-3 px-4 text-center">Alumnos</th>
                            <th className="py-3 px-4 text-center">Rating</th>
                            <th className="py-3 px-4 text-right">Ingresos Totales</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {filteredList.map((course) => (
                            <tr key={course.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                                {/* Título & Portada */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-12 h-9 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                                        />
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                                                {course.category}
                                            </span>
                                            <span className="font-bold text-slate-900 dark:text-slate-100 truncate block max-w-xs">
                                                {course.title}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Estado (Activo vs Borrador) */}
                                <td className="py-3.5 px-4">
                                    {course.status === 'active' ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                            Borrador
                                        </span>
                                    )}
                                </td>

                                {/* Cantidad de Alumnos */}
                                <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                                    <div className="flex items-center justify-center gap-1">
                                        <Users size={14} className="text-slate-400" />
                                        <span>{course.studentsCount.toLocaleString()}</span>
                                    </div>
                                </td>

                                {/* Rating Promedio */}
                                <td className="py-3.5 px-4 text-center">
                                    {course.rating > 0 ? (
                                        <div className="flex items-center justify-center gap-1 font-bold text-amber-500">
                                            <Star size={13} className="fill-amber-500" />
                                            <span>{course.rating}</span>
                                            <span className="text-[10px] text-slate-400">({course.reviewsCount})</span>
                                        </div>
                                    ) : (
                                        <span className="text-[11px] text-slate-400 italic">Sin reseñas</span>
                                    )}
                                </td>

                                {/* Ingresos Acumulados */}
                                <td className="py-3.5 px-4 text-right font-black text-slate-900 dark:text-slate-50">
                                    ${course.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                                </td>

                                {/* Acciones */}
                                <td className="py-3.5 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <a
                                            href={`/instructor/cursos/${course.id}/editar`}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            title="Editar Curso"
                                        >
                                            <Edit3 size={15} />
                                        </a>
                                        <a
                                            href={`/cursos/${course.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            title="Ver Página Pública"
                                        >
                                            <ExternalLink size={15} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursePerformanceTable;