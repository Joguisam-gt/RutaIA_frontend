import React from 'react';
import { Flame, Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

export const GamificationStreakWidget = ({ streakData }) => {
    const defaultStreak = {
        currentStreakDays: 5,
        longestStreakDays: 12,
        weeklyTargetHours: 8,
        weeklyCompletedHours: 5.5,
        weeklyHistory: [
            { day: 'Lun', hours: 1.2, goalMet: true },
            { day: 'Mar', hours: 0.8, goalMet: true },
            { day: 'Mié', hours: 1.5, goalMet: true },
            { day: 'Jue', hours: 1.0, goalMet: true },
            { day: 'Vie', hours: 1.0, goalMet: true },
            { day: 'Sáb', hours: 0.0, goalMet: false },
            { day: 'Dom', hours: 0.0, goalMet: false },
        ],
    };

    const streak = streakData || defaultStreak;
    const targetPercent = Math.min(100, Math.round((streak.weeklyCompletedHours / streak.weeklyTargetHours) * 100));

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Header Racha */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                        <Flame size={26} className="fill-amber-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-2xl font-black text-slate-900 dark:text-slate-50">
                                {streak.currentStreakDays} Días
                            </span>
                            <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                                🔥 Racha Activa
                            </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Mejor racha récord: {streak.longestStreakDays} días seguidos
                        </span>
                    </div>
                </div>
            </div>

            {/* Meta Semanal de Horas */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Target size={14} className="text-indigo-500" />
                        Meta Semanal de Estudio
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                        {streak.weeklyCompletedHours}h / {streak.weeklyTargetHours}h ({targetPercent}%)
                    </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${targetPercent}%` }}
                    />
                </div>
            </div>

            {/* Gráfica de Horas Semanales */}
            <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-emerald-500" />
                        Horas por Día
                    </span>
                    <span className="text-[11px] text-slate-400">Semana Actual</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 items-end h-28 pt-2">
                    {streak.weeklyHistory.map((item, idx) => {
                        const maxBarHeight = 80; // px
                        const heightPx = Math.max(8, Math.min(maxBarHeight, (item.hours / 2) * maxBarHeight));

                        return (
                            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                                <span className="text-[10px] font-bold text-slate-400">
                                    {item.hours > 0 ? `${item.hours}h` : '-'}
                                </span>
                                <div
                                    className={`w-full rounded-t-lg transition-all ${item.goalMet
                                            ? 'bg-gradient-to-t from-indigo-600 to-indigo-400'
                                            : 'bg-slate-200 dark:bg-slate-800'
                                        }`}
                                    style={{ height: `${heightPx}px` }}
                                />
                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                                    {item.day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};