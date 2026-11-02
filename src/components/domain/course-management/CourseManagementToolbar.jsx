import React from 'react';
import { Search, X, SlidersHorizontal, LayoutGrid, List, Plus } from 'lucide-react';

export const CourseManagementToolbar = ({
    tabs,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
}) => {
    return (
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs">
            {/* Pestañas de Estado */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive
                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Controles de Búsqueda, Orden y Cambio de Vista */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Buscador */}
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por título o módulo..."
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

                {/* Dropdown Ordenamiento */}
                <div className="relative w-full sm:w-auto flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                    <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer w-full sm:w-auto"
                    >
                        <option value="last_updated">Última Actualización</option>
                        <option value="students">Más Estudiantes</option>
                        <option value="revenue">Mayor Ingreso</option>
                        <option value="title">Título (A-Z)</option>
                    </select>
                </div>

                {/* Switcher Grid / Tabla */}
                <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => onViewModeChange('grid')}
                        className={`p-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'grid'
                                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        title="Vista en Cuadrícula"
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange('table')}
                        className={`p-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'table'
                                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                        title="Vista en Tabla"
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseManagementToolbar;