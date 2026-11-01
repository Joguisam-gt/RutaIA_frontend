// src/components/domain/about/AlumniLogoCloud.jsx
import React from 'react';
import { Building } from 'lucide-react';

export const AlumniLogoCloud = ({ companies = [] }) => {
    return (
        <section className="py-16 bg-slate-100/70 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-5xl text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-8">
                    Nuestros egresados trabajan en empresas de alto crecimiento
                </span>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-75">
                    {companies.map((comp, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-extrabold text-sm md:text-base">
                            <Building size={18} className="text-indigo-500" />
                            <span>{comp.logoText}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};