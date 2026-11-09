import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsSidebarIndex = ({ sections = [], activeSection }) => {
    return (
        <div className="sticky top-20 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <FileText size={16} className="text-indigo-500" />
                <span>Índice del Documento</span>
            </div>

            <nav className="space-y-1.5">
                {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                        <a
                            key={sec.id}
                            href={`#${sec.id}`}
                            className={`block px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            {sec.title}
                        </a>
                    );
                })}
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck size={14} className="text-cyan-500 shrink-0" />
                <span>Documento legalmente vinculante</span>
            </div>
        </div>
    );
};

export default TermsSidebarIndex;