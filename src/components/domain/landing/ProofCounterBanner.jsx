import React from 'react';
import { Users, BookOpen, Briefcase, Star } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const ProofCounterBanner = () => {
    const { t } = useLanguage();

    const metrics = [
        { icon: Users, label: t('statStudents'), color: 'text-indigo-500' },
        { icon: BookOpen, label: t('statCourses'), color: 'text-violet-500' },
        { icon: Briefcase, label: t('statJobRate'), color: 'text-cyan-500' },
        { icon: Star, label: t('statRating'), color: 'text-amber-500' },
    ];

    return (
        <section className="py-10 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {metrics.map((m, idx) => {
                        const Icon = m.icon;
                        return (
                            <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                                <Icon size={24} className={`${m.color} mb-2`} />
                                <span className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100">
                                    {m.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};