import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { SocialLoginButtons } from './SocialLoginButtons';

export const LoginFormView = ({
    formData: externalFormData,
    onChange: externalOnChange,
    onSubmit,
    loading,
    error
}) => {
    const [internalFormData, setInternalFormData] = useState({ email: '', password: '' });

    const formData = externalFormData || internalFormData;

    const handleChange = (e) => {
        if (externalOnChange) {
            externalOnChange(e);
        } else {
            setInternalFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Iniciar Sesión
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    Ingresa tus credenciales para acceder a tu panel
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
                        Correo Electrónico
                    </label>
                    <div className="relative flex items-center">
                        <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-30" />
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-10"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                            Contraseña
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline relative z-30"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <div className="relative flex items-center">
                        <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-30" />
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password || ''}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-10"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 relative z-20"
                >
                    <span>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <SocialLoginButtons />

            <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                ¿No tienes una cuenta?{' '}
                <Link
                    to="/register"
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    Regístrate aquí
                </Link>
            </p>
        </div>
    );
};

export default LoginFormView;