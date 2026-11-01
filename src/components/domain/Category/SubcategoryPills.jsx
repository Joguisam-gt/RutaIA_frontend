import React from 'react';
import { Tag } from 'lucide-react';

export const SubcategoryPills = ({
    subcategories = [],
    selectedSubcategory,
    onSelectSubcategory,
}) => {
    if (!subcategories.length) return null;

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none my-6">
            <button
                onClick={() => onSelectSubcategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${selectedSubcategory === 'all'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                    }`}
            >
                Todas las ramas
            </button>

            {subcategories.map((sub) => {
                const isSelected = selectedSubcategory === sub.slug;
                return (
                    <button
                        key={sub.slug}
                        onClick={() => onSelectSubcategory(sub.slug)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                            }`}
                    >
                        <Tag size={12} className={isSelected ? 'text-white' : 'text-indigo-500'} />
                        <span>{sub.name}</span>
                    </button>
                );
            })}
        </div>
    );
};