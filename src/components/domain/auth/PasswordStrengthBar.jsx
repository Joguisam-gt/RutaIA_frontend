import React from 'react';
import { Check, ShieldAlert } from 'lucide-react';

export const PasswordStrengthBar = ({ password, strength }) => {
    if (!password) return null;

    const checks = [
        { label: 'Mínimo 8 caracteres', valid: password.length >= 8 },
        { label: 'Al menos una mayúscula', valid: /[A-Z]/.test(password) },
        { label: 'Un número o símbolo', valid: /[0-9!@#$%^&*()]/.test(password) },
    ];

    return (
        <div className="mt-2 space-y-2">
            {/* Barra gráfica de progreso */}
            <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                    />
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 min-w-[70px] text-right">
                    {strength.label}
                </span>
            </div>

            {/* Lista de requisitos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1">
                {checks.map((check, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-1 text-[10px] font-semibold ${check.valid
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                    >
                        {check.valid ? (
                            <Check size={12} strokeWidth={3} className="shrink-0" />
                        ) : (
                            <ShieldAlert size={12} className="shrink-0" />
                        )}
                        <span className="truncate">{check.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrengthBar