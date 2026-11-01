// src/components/domain/about/CompanyTimeline.jsx
import React from 'react';
import { CalendarCheck } from 'lucide-react';

export const CompanyTimeline = ({ timeline = [] }) => {
    return (
        <section className="py-20 bg-slate-100/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center max-w-xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">
                        Nuestra Trayectoria
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Los momentos clave en la evolución de RutaIA.
                    </p>
                </div>

                <div className="relative border-l-2 border-indigo-500/30 ml-4 md:ml-32 space-y-10">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-10">
                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-slate-950" />

                            <div className="md:absolute md:-left-36 md:top-0 text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800 inline-block mb-2 md:mb-0">
                                {item.year}
                            </div>

                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};