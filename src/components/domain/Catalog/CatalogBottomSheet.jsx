import React from 'react';
import { X, Check } from 'lucide-react';

export const CatalogBottomSheet = ({
    isOpen,
    onClose,
    filters,
    onToggleCategory,
    onToggleLevel,
    onSetModality,
    onResetFilters,
}) => {
    if (!isOpen) return null;

    const categoriesList = ['Web Dev', 'Backend', 'UX/UI', 'AI & Data', 'Databases'];
    const levelsList = ['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'];

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm lg:hidden">
            <div className="w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl p-6 border-t border-slate-200 dark:border-slate-800 animate-slide-up">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Filtros de Búsqueda</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Categorías */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Categorías</h4>
                    <div className="flex flex-wrap gap-2">
                        {categoriesList.map((cat) => {
                            const isChecked = filters.categories.includes(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => onToggleCategory(cat)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${isChecked
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    {isChecked && <Check size={12} />}
                                    <span>{cat}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Nivel Académico */}
                <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Nivel Académico</h4>
                    <div className="flex flex-wrap gap-2">
                        {levelsList.map((lvl) => {
                            const isChecked = filters.levels.includes(lvl);
                            return (
                                <button
                                    key={lvl}
                                    onClick={() => onToggleLevel(lvl)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${isChecked
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    {isChecked && <Check size={12} />}
                                    <span>{lvl}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Botones de Cierre */}
                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => {
                            onResetFilters();
                            onClose();
                        }}
                        className="flex-1 py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                        Limpiar Filtros
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-md shadow-indigo-500/20"
                    >
                        Ver Resultados
                    </button>
                </div>
            </div>
        </div>
    );
};