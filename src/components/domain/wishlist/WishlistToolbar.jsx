import React, { useState } from 'react';
import { LayoutGrid, List, Trash2, SlidersHorizontal, Heart, AlertTriangle } from 'lucide-react';

export const WishlistToolbar = ({
    totalItems = 0,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    onClearAll,
}) => {
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const handleConfirmClear = () => {
        onClearAll();
        setShowClearConfirm(false);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Total de Cursos Guardados */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-800">
                        <Heart size={20} className="fill-rose-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                                Lista de Deseos
                            </h2>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                                {totalItems} {totalItems === 1 ? 'curso' : 'cursos'}
                            </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Guarda tus rutas de formación de interés para matricularte más tarde.
                        </span>
                    </div>
                </div>

                {/* Controles: Orden, Switcher Vista y Vaciar Lista */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Selector de Orden */}
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                        <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                        >
                            <option value="added_at">Añadidos Recientemente</option>
                            <option value="rating">Mejor Valorados</option>
                            <option value="price_low">Precio: Menor a Mayor</option>
                            <option value="price_high">Precio: Mayor a Menor</option>
                        </select>
                    </div>

                    {/* Switcher Layout Grid vs Lista */}
                    <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
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
                            onClick={() => onViewModeChange('list')}
                            className={`p-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list'
                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                            title="Vista en Lista"
                        >
                            <List size={16} />
                        </button>
                    </div>

                    {/* Botón Vaciar Lista */}
                    {totalItems > 0 && (
                        <div className="relative">
                            {!showClearConfirm ? (
                                <button
                                    onClick={() => setShowClearConfirm(true)}
                                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center gap-1.5"
                                >
                                    <Trash2 size={14} />
                                    <span>Vaciar Lista</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-1.5 p-1 bg-rose-100 dark:bg-rose-950/80 rounded-xl border border-rose-300 dark:border-rose-800">
                                    <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300 px-2 flex items-center gap-1">
                                        <AlertTriangle size={12} /> ¿Confirmar?
                                    </span>
                                    <button
                                        onClick={handleConfirmClear}
                                        className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors"
                                    >
                                        Sí, vaciar
                                    </button>
                                    <button
                                        onClick={() => setShowClearConfirm(false)}
                                        className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-300 transition-colors"
                                    >
                                        No
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};