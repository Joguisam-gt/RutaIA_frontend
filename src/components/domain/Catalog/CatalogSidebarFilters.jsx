import React from 'react';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';

export const CatalogSidebarFilters = ({
    filters,
    onToggleCategory,
    onToggleLevel,
    onSetModality,
    onSetMinRating,
    onResetFilters,
}) => {
    const categoriesList = [
        { id: 'Web Dev', label: 'Desarrollo Web' },
        { id: 'Backend', label: 'Backend & APIs' },
        { id: 'UX/UI', label: 'Diseño UX/UI' },
        { id: 'AI & Data', label: 'Inteligencia Artificial' },
        { id: 'Databases', label: 'Bases de Datos NoSQL/SQL' },
    ];

    const levelsList = [
        { id: 'PRINCIPIANTE', label: 'Principiante' },
        { id: 'INTERMEDIO', label: 'Intermedio' },
        { id: 'AVANZADO', label: 'Avanzado' },
    ];

    return (
        <aside className="w-full flex flex-col gap-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <Filter size={16} className="text-indigo-500" />
                    <span>Filtros</span>
                </div>
                <button
                    onClick={onResetFilters}
                    className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-indigo-500 transition-colors"
                    title="Limpiar todos los filtros"
                >
                    <RotateCcw size={12} />
                    <span>Limpiar</span>
                </button>
            </div>

            {/* Categorías (Checkboxes) */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Categorías</h4>
                <div className="space-y-2">
                    {categoriesList.map((cat) => {
                        const isChecked = filters.categories.includes(cat.id);
                        return (
                            <label
                                key={cat.id}
                                onClick={() => onToggleCategory(cat.id)}
                                className="flex items-center justify-between cursor-pointer group text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-colors"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked
                                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 group-hover:border-indigo-400'
                                            }`}
                                    >
                                        {isChecked && <Check size={12} strokeWidth={3} />}
                                    </div>
                                    <span>{cat.label}</span>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Nivel (Checkboxes) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Nivel Académico</h4>
                <div className="space-y-2">
                    {levelsList.map((lvl) => {
                        const isChecked = filters.levels.includes(lvl.id);
                        return (
                            <label
                                key={lvl.id}
                                onClick={() => onToggleLevel(lvl.id)}
                                className="flex items-center gap-2.5 cursor-pointer group text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-colors"
                            >
                                <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 group-hover:border-indigo-400'
                                        }`}
                                >
                                    {isChecked && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span>{lvl.label}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Modalidad (Gratis / Pago / Todos) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Modalidad</h4>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                    {[
                        { key: 'all', label: 'Todos' },
                        { key: 'free', label: 'Gratis' },
                        { key: 'paid', label: 'De Pago' },
                    ].map((m) => (
                        <button
                            key={m.key}
                            onClick={() => onSetModality(m.key)}
                            className={`py-1.5 rounded-lg font-semibold transition-all ${filters.modality === m.key
                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calificación (4★+) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Calificación Mínima</h4>
                <div className="space-y-1.5">
                    {[4.5, 4.0, 3.5].map((stars) => (
                        <button
                            key={stars}
                            onClick={() => onSetMinRating(filters.minRating === stars ? 0 : stars)}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${filters.minRating === stars
                                    ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-bold'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                }`}
                        >
                            <div className="flex items-center gap-1.5">
                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                <span>{stars} o más estrellas</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default CatalogSidebarFilters;