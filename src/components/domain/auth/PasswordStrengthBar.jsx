import React from 'react';

export const PasswordStrengthBar = ({ password = '' }) => {
    const getStrength = (pass) => {
        if (!pass) return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-800' };
        let score = 0;
        if (pass.length >= 6) score += 1;
        if (pass.length >= 10) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        if (score <= 1) return { score: 1, label: 'Débil', color: 'bg-red-500' };
        if (score <= 3) return { score: 2, label: 'Media', color: 'bg-amber-500' };
        if (score <= 4) return { score: 3, label: 'Fuerte', color: 'bg-emerald-500' };
        return { score: 4, label: 'Muy Fuerte', color: 'bg-cyan-500' };
    };

    const strength = getStrength(password) || { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-800' };

    return (
        <div className="space-y-1.5 mt-2">
            <div className="flex h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden gap-1 p-0.5">
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${level <= strength.score ? strength.color : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                    />
                ))}
            </div>
            {strength.label && (
                <p className="text-[10px] text-right font-medium text-slate-500 dark:text-slate-400">
                    Fortaleza: <span className="font-bold">{strength.label}</span>
                </p>
            )}
        </div>
    );
};

export default PasswordStrengthBar;