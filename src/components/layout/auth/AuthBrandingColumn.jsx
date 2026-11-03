import React from 'react';

export const AuthBrandingColumn = ({ testimonial }) => {
    return (
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800 transition-colors">
            {/* Contenido branding adaptable a tema claro y oscuro */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                    <span>RutaIA Learning Platform</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">
                    Aprende desarrollo web e inteligencia artificial
                </h2>
            </div>

            {/* Testimonio dinámico con soporte de tema */}
            {testimonial && (
                <blockquote className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                        "{testimonial.quote}"
                    </p>
                    <footer className="mt-4 text-xs font-bold text-slate-900 dark:text-white">
                        - {testimonial.author}
                    </footer>
                </blockquote>
            )}
        </div>
    );
};