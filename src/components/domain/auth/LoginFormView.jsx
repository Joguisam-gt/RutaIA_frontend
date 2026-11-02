import React from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2, User, ShieldCheck } from 'lucide-react';
import { SocialLoginButtons } from './SocialLoginButtons';

export const LoginFormView = ({
    role,
    onRoleChange,
    formData,
    showPassword,
    onToggleShowPassword,
    loading,
    error,
    errors,
    onChange,
    onSubmit,
    onSocialLogin,
}) => {
    return (
        <div className="w-full">
            {/* Header del Formulario */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-1">
                    Iniciar Sesión
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ingresa tus credenciales para acceder a tu panel de aprendizaje.
                </p>
            </div>

            {/* Selector de Rol (Estudiante vs Maestro/Admin) */}
            <div className="p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 grid grid-cols-2 gap-1 mb-6">
                <button
                    type="button"
                    onClick={() => onRoleChange('student')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${role === 'student'
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    <User size={14} className={role === 'student' ? 'text-indigo-500' : ''} />
                    <span>Estudiante / Usuario</span>
                </button>

                <button
                    type="button"
                    onClick={() => onRoleChange('admin')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${role === 'admin'
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    <ShieldCheck size={14} className={role === 'admin' ? 'text-violet-500' : ''} />
                    <span>Maestro / Admin</span>
                </button>
            </div>

            {/* Botones OAuth de Inicio Rápido */}
            <SocialLoginButtons onSocialLogin={onSocialLogin} disabled={loading} />

            {/* Separador u Opción Tradicional */}
            <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-3 text-[11px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950 text-slate-400">
                    O con tu correo
                </span>
            </div>

            {/* Mensaje de Error API */}
            {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2 mb-5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={onSubmit} className="space-y-4">
                {/* Campo Correo Electrónico */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Correo Electrónico
                    </label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            placeholder="tu.correo@ejemplo.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                    </div>
                    {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                </div>

                {/* Campo Contraseña con Toggle de Visibilidad (👁️ / 👁️‍🗨️) */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                            Contraseña
                        </label>
                        <a
                            href="/auth/olvidé-contrasena"
                            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => onChange('password', e.target.value)}
                            placeholder="••••••••••••"
                            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={onToggleShowPassword}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-[11px] text-rose-500 mt-1 block">{errors.password}</span>}
                </div>

                {/* Checkbox Recordar Sesión */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => onChange('rememberMe', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            Recordar mi sesión en este dispositivo
                        </span>
                    </label>
                </div>

                {/* Botón Iniciar Sesión con degradado exclusivo para el CTA */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <span>Ingresar como {role === 'admin' ? 'Maestro / Admin' : 'Estudiante'}</span>
                    )}
                </button>
            </form>

            {/* Link de Registro */}
            <div className="mt-6 text-center text-xs text-slate-500">
                <span>¿Aún no tienes una cuenta? </span>
                <a href="/auth/registro" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Regístrate gratis
                </a>
            </div>
        </div>
    );
};

export default LoginFormView;