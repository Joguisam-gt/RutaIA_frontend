import React from 'react';

export const BlogFilterBar = ({
    categories = ['Todos', 'Inteligencia Artificial', 'Backend', 'Desarrollo Web', 'UX/UI', 'Bases de Datos'],
    selectedCategory = 'Todos',
    onSelectCategory = () => { },
}) => {
    return (
        <div className="flex flex-wrap items-center gap-2 my-6 pb-2 border-b border-slate-200 dark:border-slate-800">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${selectedCategory === category
                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default BlogFilterBar;