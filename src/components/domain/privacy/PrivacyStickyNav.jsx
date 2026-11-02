import React from 'react';
import { Shield, Cookie, FileText } from 'lucide-react';

export const PrivacyStickyNav = ({ sections = [], activeSection, onOpenCookieModal }) => {
    return (
        <div className="sticky top-20 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <FileText size={16} className="text-indigo-500" />
                    <span>Navegación Normativa</span>
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
            </div>

            {/* Widget Activador de Preferencias de Cookies */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={onOpenCookieModal}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors text-xs font-bold"
                >
                    <div className="flex items-center gap-2">
                        <Cookie size={16} className="text-amber-500" />
                        <span>Gestor de Cookies</span>
                    </div>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                        Configurar
                    </span>
                </button>
            </div>
        </div>
    );
};