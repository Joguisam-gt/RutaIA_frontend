import React from 'react';
import { Users, BookOpen, Briefcase, Star } from 'lucide-react';

export const ProofCounterBanner = () => {
    const stats = [
        {
            id: 'students',
            label: 'Estudiantes Activos',
            value: '15,000+',
            icon: Users,
        },
        {
            id: 'courses',
            label: 'Cursos & Rutas',
            value: '40+',
            icon: BookOpen,
        },
        {
            id: 'employment',
            label: 'Tasa de Inserción',
            value: '94%',
            icon: Briefcase,
        },
        {
            id: 'rating',
            label: 'Calificación Promedio',
            value: '4.9/5',
            icon: Star,
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={stat.id} className="space-y-2">
                            <div className="w-10 h-10 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                <IconComponent size={20} />
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50">
                                {stat.value}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProofCounterBanner;