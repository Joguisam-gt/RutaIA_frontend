import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const CatalogSearchHeader = ({
    searchValue,
    onSearchChange,
    suggestions,
    isSearchingSuggestions,
    sortValue,
    onSortChange,
    totalResults,
    onOpenMobileFilters,
}) => {
    const { t } = useLanguage();
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Buscador Central con Autocompletado */}
            <div className="relative flex-1" ref={containerRef}>
                <div className="relative flex items-center">
                    <Search size={18} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                            onSearchChange(e.target.value);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Buscar por tecnología, título o instructor (ej. React, Node.js, UX)..."
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    {isSearchingSuggestions ? (
                        <Loader2 size={16} className="absolute right-3.5 text-indigo-500 animate-spin" />
                    ) : searchValue ? (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={16} />
                        </button>
                    ) : null}
                </div>

                {/* Dropdown de Sugerencias */}
                {showDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        {suggestions.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    onSearchChange(item.title);
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 last:border-none"
                            >
                                <span>{item.title}</span>
                                <span className="text-[10px] text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                                    {item.category}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Acciones: Conteo, Filtro Móvil y Dropdown Ordenamiento */}
            <div className="flex items-center justify-between md:justify-end gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {totalResults} cursos encontrados
                </span>

                {/* Botón Trigger de Filtros para UX Móvil */}
                <button
                    onClick={onOpenMobileFilters}
                    className="flex lg:hidden items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                >
                    <SlidersHorizontal size={16} />
                    <span>Filtros</span>
                </button>

                {/* Selector de Ordenamiento */}
                <div className="relative flex items-center">
                    <ArrowUpDown size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                    <select
                        value={sortValue}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="pl-8 pr-8 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                    >
                        <option value="popular">Más Populares</option>
                        <option value="newest">Más Recientes</option>
                        <option value="rating">Mejor Valorados</option>
                        <option value="price_asc">Precio: Menor a Mayor</option>
                        <option value="price_desc">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>
        </div>
    );
};