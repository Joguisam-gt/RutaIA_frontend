import React from 'react';
import { Flame, Trophy } from 'lucide-react';

export const GaminificationSteakWidget = ({ streakDays = 7 }) => {
    return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/20 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
                    <Flame size={24} className="animate-bounce" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Racha de Aprendizaje
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        ¡Llevas {streakDays} días consecutivos aprendiendo!
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-extrabold text-lg">
                <Trophy size={20} />
                <span>{streakDays}d</span>
            </div>
        </div>
    );
};

// Exportaciones alias para cubrir variaciones tipográficas en las importaciones
export const GamificationStreakWidget = GaminificationSteakWidget;
export const GaminificationStreakWidget = GaminificationSteakWidget;
export const GamificationSteakWidget = GaminificationSteakWidget;
export default GaminificationSteakWidget;