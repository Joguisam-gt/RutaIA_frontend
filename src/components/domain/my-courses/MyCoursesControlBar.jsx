import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export const MyCoursesControlBar = ({
    tabs,
    activeTab,
    onTabChange,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
}) => {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Pestañas de Estado */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 overflow-x-auto">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive
                                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Controles de Búsqueda y Ordenamiento */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Buscador Interno */}
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por título o tecnología..."
                        className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
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

                {/* Selector de Ordenamiento */}
                <div className="relative w-full sm:w-auto flex items-center gap-2">
                    <SlidersHorizontal size={14} className="text-slate-400 hidden sm:block shrink-0" />
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
                    >
                        <option value="last_accessed">Último Acceso</option>
                        <option value="progress">Mayor Progreso</option>
                        <option value="title">Nombre (A-Z)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};