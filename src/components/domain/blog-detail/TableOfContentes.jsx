import React from 'react';

export const TableOfContents = ({ items = [] }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 my-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Tabla de Contenidos
            </h3>
            <ul className="space-y-2 text-xs">
                {items.map((item, idx) => (
                    <li key={idx} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
                        <a
                            href={`#${item.slug}`}
                            className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

// Aliases de exportación para asegurar compatibilidad total con cualquier importación
export const TableOfContentes = TableOfContents;
export default TableOfContents;