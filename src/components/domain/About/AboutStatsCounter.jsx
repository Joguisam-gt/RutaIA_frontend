// src/components/domain/about/AboutStatsCounter.jsx
import React from 'react';

export const AboutStatsCounter = ({ stats = [] }) => {
    return (
        <section className="py-12 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="block text-2xl md:text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-1">
                                {item.value}
                            </span>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};