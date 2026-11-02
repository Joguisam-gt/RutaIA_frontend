import React from 'react';
import { ListOrdered } from 'lucide-react';

export const TableOfContents = ({ headings = [], activeId }) => {
    if (!headings.length) return null;

    return (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-20">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                <ListOrdered size={16} className="text-indigo-500" />
                <span>Tabla de Contenidos</span>
            </div>

            <nav className="space-y-2">
                {headings.map((h) => {
                    const isActive = activeId === h.id;
                    return (
                        <a
                            key={h.id}
                            href={`#${h.id}`}
                            className={`block text-xs leading-relaxed transition-all ${h.level === 3 ? 'pl-3' : 'font-medium'
                                } ${isActive
                                    ? 'text-indigo-600 dark:text-indigo-400 font-bold border-l-2 border-indigo-500 pl-2'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            {h.text}
                        </a>
                    );
                })}
            </nav>
        </div>
    );
};

export default TableOfContents;