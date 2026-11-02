import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const defaultFilters = {
    categories: ['Todos', 'Desarrollo Web', 'Backend', 'UX/UI', 'Inteligencia Artificial', 'Bases de Datos'],
    levels: ['Todos', 'Principiante', 'Intermedio', 'Avanzado'],
    prices: ['Todos', 'Gratis', 'De Pago'],
};

export const CatalogSidebarFilters = ({
    filters = defaultFilters,
    selectedCategory = 'Todos',
    setSelectedCategory = () => { },
    selectedLevel = 'Todos',
    setSelectedLevel = () => { },
    selectedPrice = 'Todos',
    setSelectedPrice = () => { },
    onResetFilters = () => { },
}) => {
    const safeFilters = {
        categories: filters?.categories || defaultFilters.categories,
        levels: filters?.levels || defaultFilters.levels,
        prices: filters?.prices || defaultFilters.prices,
    };

    return (
        <aside className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                    <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Filtros</span>
                </div>
                <button
                    onClick={onResetFilters}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <RotateCcw size={14} />
                    <span>Limpiar</span>
                </button>
            </div>

            {/* Categorías */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Categoría
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedCategory === category
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Nivel */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Nivel de Dificultad
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedLevel === level
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Precio */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Precio
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.prices.map((price) => (
                        <button
                            key={price}
                            onClick={() => setSelectedPrice(price)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedPrice === price
                                    ? 'bg-indigo-600 text-white font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                }`}
                        >
                            {price}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default CatalogSidebarFilters;