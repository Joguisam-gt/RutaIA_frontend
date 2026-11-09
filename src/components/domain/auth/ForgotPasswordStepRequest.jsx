import React, { useRef, useEffect } from 'react';
import { Mail, KeyRound, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

export const ForgotPasswordStepRequest = ({
    email,
    onEmailChange,
    loading,
    error,
    onSubmit,
}) => {
    const inputRef = useRef(null);

    // Auto-foco en el input al cargar la pantalla
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="w-full">
            {/* Icono e Encabezado Tranquilizador */}
            <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-200 dark:border-indigo-800">
                    <KeyRound size={24} />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    No te preocupes, nos ocurre a todos. Introduce tu correo electrónico y te enviaremos un enlace seguro para restablecer tu acceso en pocos segundos.
                </p>
            </div>

            {/* Error Feedback */}
            {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2 mb-5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Correo Electrónico Vinculado
                    </label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            ref={inputRef}
                            type="email"
                            required
                            value={email}
                            onChange={(e) => onEmailChange(e.target.value)}
                            placeholder="tu.correo@ejemplo.com"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Garantía de Seguridad */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    <span>Enlace encriptado de un solo uso con validez de 15 minutos.</span>
                </div>

                {/* Botón CTA (Degradado exclusivo para botón de acción principal) */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <span>Enviar Enlace de Recuperación</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordStepRequest;