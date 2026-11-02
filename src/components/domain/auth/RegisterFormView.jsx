import React from 'react';
import { User, ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { SocialLoginButtons } from './SocialLoginButtons';
import { SelectedPlanBanner } from './SelectedPlanBanner';
import { PasswordStrengthBar } from './PasswordStrengthBar';

export const RegisterFormView = ({
    role,
    onRoleChange,
    formData,
    showPassword,
    onToggleShowPassword,
    selectedPlan,
    passwordStrength,
    loading,
    error,
    errors,
    pendingApprovalSuccess,
    onChange,
    onSubmit,
    onSocialRegister,
}) => {
    // Si la solicitud de Maestro fue enviada con éxito y está pendiente de aprobación
    if (pendingApprovalSuccess) {
        return (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                    <Clock size={28} />
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
                    Solicitud de Maestro Enviada
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    Gracias por postularte como instructor en RutaIA. Por políticas de calidad académica, las cuentas de Maestro requieren <strong>aprobación previa por parte del Administrador</strong>. Te notificaremos por correo electrónico una vez que tu cuenta sea verificada.
                </p>

                <a
                    href="/"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    Volver a la Página Principal
                </a>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header del Formulario */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-1">
                    Crear tu Cuenta
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Únete a la comunidad de aprendizaje práctico en tecnología.
                </p>
            </div>

            {/* Banner de Contexto de Plan Seleccionado */}
            <SelectedPlanBanner selectedPlan={selectedPlan} />

            {/* Selector de Rol: Estudiante (Directo) vs Maestro (Requiere Aprobación) */}
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
                    <span>Estudiante</span>
                </button>

                <button
                    type="button"
                    onClick={() => onRoleChange('instructor')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${role === 'instructor'
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                >
                    <ShieldCheck size={14} className={role === 'instructor' ? 'text-violet-500' : ''} />
                    <span>Maestro / Admin</span>
                </button>
            </div>

            {/* Nota informativa si selecciona Maestro */}
            {role === 'instructor' && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[11px] font-medium flex items-center gap-2 mb-4">
                    <Clock size={16} className="shrink-0" />
                    <span>El registro de Maestro está sujeto a revisión y aprobación por el Administrador.</span>
                </div>
            )}

            {/* Botones OAuth de Registro Rápido (Solo Estudiante) */}
            {role === 'student' && (
                <>
                    <SocialLoginButtons onSocialLogin={onSocialRegister} disabled={loading} />

                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <span className="relative px-3 text-[11px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950 text-slate-400">
                            O regístrate con correo
                        </span>
                    </div>
                </>
            )}

            {/* Mensaje de Error API */}
            {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2 mb-5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Formulario de Registro */}
            <form onSubmit={onSubmit} className="space-y-4">
                {/* Nombre Completo */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nombre Completo
                    </label>
                    <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            placeholder="Ej. José Guillermo Rodríguez"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                    </div>
                    {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                {/* Correo Electrónico */}
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

                {/* Contraseña con indicador de fortaleza */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Contraseña
                    </label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => onChange('password', e.target.value)}
                            placeholder="Crea una contraseña segura..."
                            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                        <button
                            type="button"
                            onClick={onToggleShowPassword}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <PasswordStrengthBar password={formData.password} strength={passwordStrength} />
                    {errors.password && <span className="text-[11px] text-rose-500 mt-1 block">{errors.password}</span>}
                </div>

                {/* Checkbox Obligatorio de Aceptación Legal */}
                <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={(e) => onChange('termsAccepted', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                            Acepto los{' '}
                            <a href="/terminos-y-condiciones" target="_blank" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Términos y Condiciones
                            </a>{' '}
                            y la{' '}
                            <a href="/politica-de-privacidad" target="_blank" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                Política de Privacidad
                            </a>
                            .
                        </span>
                    </label>
                    {errors.termsAccepted && <span className="text-[11px] text-rose-500 mt-1 block">{errors.termsAccepted}</span>}
                </div>

                {/* Botón de Submit (Degradado exclusivo en botón principal CTA) */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-3"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : role === 'student' ? (
                        <span>Crear mi Cuenta de Estudiante</span>
                    ) : (
                        <span>Enviar Solicitud de Maestro</span>
                    )}
                </button>
            </form>

            {/* Link a Iniciar Sesión */}
            <div className="mt-6 text-center text-xs text-slate-500">
                <span>¿Ya tienes una cuenta? </span>
                <a href="/auth/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Inicia sesión aquí
                </a>
            </div>
        </div>
    );
};

export default RegisterFormView;