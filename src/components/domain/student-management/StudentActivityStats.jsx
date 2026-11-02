import React from 'react';
import { Users, UserCheck, Award, AlertTriangle, ShieldCheck } from 'lucide-react';

export const StudentActivityStats = ({ stats }) => {
    const defaultStats = {
        totalEnrolled: 1240,
        activeThisWeek: 485,
        certificatesDelivered: 142,
        atRiskCount: 28,
    };

    const data = stats || defaultStats;

    const cards = [
        {
            id: 'enrolled',
            title: 'Alumnos Matriculados',
            value: data.totalEnrolled.toLocaleString(),
            subtitle: 'En todos tus cursos activos',
            icon: Users,
            iconBg: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
        },
        {
            id: 'active_week',
            title: 'Activos esta Semana',
            value: data.activeThisWeek.toLocaleString(),
            subtitle: 'Interacción en los últimos 7 días',
            icon: UserCheck,
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
        },
        {
            id: 'certificates',
            title: 'Certificados Entregados',
            value: data.certificatesDelivered.toLocaleString(),
            subtitle: 'Alumnos que completaron el 100%',
            icon: Award,
            iconBg: 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800',
        },
        {
            id: 'at_risk',
            title: 'En Riesgo de Abandono',
            value: data.atRiskCount.toLocaleString(),
            subtitle: 'Inactivos por más de 14 días',
            icon: AlertTriangle,
            iconBg: 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 border-rose-200 dark:border-rose-900/60',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((card) => {
                const Icon = card.icon;

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
                                <Icon size={20} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight block">
                                {card.value}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400 block">
                                {card.subtitle}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StudentActivityStats;