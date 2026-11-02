import React from 'react';
import { DollarSign, Users, Star, BookOpen, TrendingUp, TrendingDown, Layers } from 'lucide-react';

export const InstructorMetricCards = ({ metrics }) => {
    const defaultMetrics = {
        monthlyEarnings: 3840.50,
        earningsGrowth: 14.2,
        totalStudents: 1240,
        studentsGrowth: 8.5,
        averageRating: 4.88,
        totalReviews: 342,
        activeCourses: 5,
        draftCourses: 2,
    };

    const data = metrics || defaultMetrics;

    const cards = [
        {
            id: 'earnings',
            title: 'Ingresos del Mes',
            value: `$${data.monthlyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`,
            growth: data.earningsGrowth,
            growthLabel: 'vs mes anterior',
            icon: DollarSign,
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        },
        {
            id: 'students',
            title: 'Estudiantes Totales',
            value: data.totalStudents.toLocaleString(),
            growth: data.studentsGrowth,
            growthLabel: 'nuevos este mes',
            icon: Users,
            iconBg: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
        },
        {
            id: 'rating',
            title: 'Rating Promedio',
            value: `${data.averageRating} / 5.0`,
            growth: null,
            growthLabel: `${data.totalReviews} valoraciones recibidas`,
            icon: Star,
            iconBg: 'bg-amber-50 dark:bg-amber-950/80 text-amber-500 border-amber-200 dark:border-amber-800',
        },
        {
            id: 'courses',
            title: 'Cursos Creados',
            value: `${data.activeCourses} Activos`,
            growth: null,
            growthLabel: `${data.draftCourses} en borrador / revisión`,
            icon: Layers,
            iconBg: 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((card) => {
                const Icon = card.icon;
                const isPositive = card.growth !== null && card.growth >= 0;

                return (
                    <div
                        key={card.id}
                        className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {card.title}
                            </span>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${card.iconBg}`}>
                                <Icon size={20} className={card.id === 'rating' ? 'fill-amber-500' : ''} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight block">
                                {card.value}
                            </span>

                            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                                {card.growth !== null ? (
                                    <>
                                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-bold ${isPositive
                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                : 'bg-rose-500/10 text-rose-500'
                                            }`}>
                                            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {isPositive ? `+${card.growth}%` : `${card.growth}%`}
                                        </span>
                                        <span className="text-slate-400">{card.growthLabel}</span>
                                    </>
                                ) : (
                                    <span className="text-slate-400">{card.growthLabel}</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};