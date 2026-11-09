import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Loader2 } from 'lucide-react';

export const CatalogSearchHeader = ({
    searchValue = '',
    onSearchChange = () => { },
    onClearSearch = () => { },
    isLoading = false,
    onToggleMobileFilters = () => { },
    sortBy = 'popular',
    onSortChange = () => { },
}) => {
    return (
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Search className="w-5 h-5" />
                        )}
                    </div>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar cursos por título, tecnología o tema..."
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    {searchValue && (
                        <button
                            onClick={onClearSearch}
                            aria-label="Limpiar búsqueda"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                        onClick={onToggleMobileFilters}
                        className="lg:hidden inline-flex items-center space-x-2 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <ArrowUpDown className="w-4 h-4 text-slate-500 dark:text-slate-400 hidden sm:block" />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="px-3 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="popular">Más populares</option>
                            <option value="newest">Más recientes</option>
                            <option value="rating">Mejor valorados</option>
                            <option value="price-asc">Precio: menor a mayor</option>
                            <option value="price-desc">Precio: mayor a menor</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogSearchHeader;