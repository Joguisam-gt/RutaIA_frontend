import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { PasswordStrengthBar } from './PasswordStrengthBar';

export const ForgotPasswordStepConfirmation = ({
    newPassword: externalNewPassword,
    setNewPassword: externalSetNewPassword,
    confirmPassword: externalConfirmPassword,
    setConfirmPassword: externalSetConfirmPassword,
    onSubmit,
    loading,
    error
}) => {
    const [internalNewPassword, setInternalNewPassword] = useState('');
    const [internalConfirmPassword, setInternalConfirmPassword] = useState('');

    const newPassword = externalNewPassword !== undefined ? externalNewPassword : internalNewPassword;
    const confirmPassword = externalConfirmPassword !== undefined ? externalConfirmPassword : internalConfirmPassword;

    const handleNewPasswordChange = (e) => {
        if (externalSetNewPassword) {
            externalSetNewPassword(e.target.value);
        } else {
            setInternalNewPassword(e.target.value);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        if (externalSetConfirmPassword) {
            externalSetConfirmPassword(e.target.value);
        } else {
            setInternalConfirmPassword(e.target.value);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Crear Nueva Contraseña
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    Ingresa y confirma tu nueva clave de acceso
                </p>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nueva Contraseña
                    </label>
                    <div className="relative flex items-center mb-2">
                        <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-10" />
                        <input
                            type="password"
                            name="newPassword"
                            required
                            value={newPassword || ''}
                            onChange={handleNewPasswordChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-20"
                        />
                    </div>
                    <PasswordStrengthBar password={newPassword || ''} />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Confirmar Contraseña
                    </label>
                    <div className="relative flex items-center">
                        <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-10" />
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={confirmPassword || ''}
                            onChange={handleConfirmPasswordChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-20"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 relative z-20"
                >
                    <span>{loading ? 'Restableciendo...' : 'Restablecer Contraseña'}</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordStepConfirmation;