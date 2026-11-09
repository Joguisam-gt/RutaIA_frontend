import React, { useState } from "react";
import { Filter, RotateCcw, X, SlidersHorizontal } from "lucide-react";

const defaultFilters = {
    categories: ["Todos", "Desarrollo Web", "Inteligencia Artificial", "Bases de Datos", "Programación", "Automatización y Datos"],
    levels: ["Todos", "Principiante", "Intermedio", "Avanzado"],
    prices: ["Todos", "Gratis", "De Pago"],
};

export const CatalogSidebarFilters = ({
    filters = defaultFilters,
    selectedCategory = "Todos",
    setSelectedCategory = () => {},
    selectedLevel = "Todos",
    setSelectedLevel = () => {},
    selectedPrice = "Todos",
    setSelectedPrice = () => {},
    onResetFilters = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const safeFilters = {
        categories: filters?.categories || defaultFilters.categories,
        levels: filters?.levels || defaultFilters.levels,
        prices: filters?.prices || defaultFilters.prices,
    };

    const hasActiveFilters =
        selectedCategory !== "Todos" ||
        selectedLevel !== "Todos" ||
        selectedPrice !== "Todos";

    const FilterContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                    <Filter size={18} className="text-indigo-600 dark:text-indigo-400" />
                    <span>Filtros</span>
                </div>
                <button
                    onClick={() => { onResetFilters(); }}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <RotateCcw size={14} />
                    <span>Limpiar</span>
                </button>
            </div>

            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Categoría
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => { setSelectedCategory(category); setIsOpen(false); }}
                            className={"w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors " + (
                                selectedCategory === category
                                    ? "bg-indigo-600 text-white font-bold"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Nivel de Dificultad
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.levels.map((level) => (
                        <button
                            key={level}
                            onClick={() => { setSelectedLevel(level); setIsOpen(false); }}
                            className={"w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors " + (
                                selectedLevel === level
                                    ? "bg-indigo-600 text-white font-bold"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            )}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Precio
                </h4>
                <div className="space-y-1.5">
                    {safeFilters.prices.map((price) => (
                        <button
                            key={price}
                            onClick={() => { setSelectedPrice(price); setIsOpen(false); }}
                            className={"w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors " + (
                                selectedPrice === price
                                    ? "bg-indigo-600 text-white font-bold"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            )}
                        >
                            {price}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Botón flotante hamburguesa — siempre visible */}
            <div className="lg:hidden fixed bottom-24 right-4 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-colors"
                >
                    <SlidersHorizontal size={18} />
                    <span className="text-sm font-semibold">Filtros</span>
                    {hasActiveFilters && (
                        <span className="w-2 h-2 bg-white rounded-full" />
                    )}
                </button>
            </div>

            {/* Drawer móvil */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Panel */}
                    <div className="relative ml-auto w-80 max-w-full h-full bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-bold text-slate-900 dark:text-slate-100">Filtros</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}

            {/* Sidebar desktop — solo visible en lg+ */}
            <aside className="hidden lg:block order-2 lg:order-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-fit sticky top-24">
                <FilterContent />
            </aside>
        </>
    );
};

export default CatalogSidebarFilters;
