import React from 'react';
import { CheckCircle2, MailCheck, RefreshCw, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';

export const ForgotPasswordStepConfirmation = ({
    email,
    resendTimer,
    canResend,
    loading,
    onResend,
    onBackToStepOne,
}) => {
    return (
        <div className="w-full text-center">
            {/* Icono Visual de Éxito */}
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <MailCheck size={32} />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                ¡Revisa tu bandeja de entrada!
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Hemos enviado un correo de recuperación a:
            </p>

            {/* Dirección de Correo Resaltada */}
            <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-6">
                {email}
            </div>

            {/* Aviso de Carpeta Spam */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-700 dark:text-slate-300 text-left text-xs mb-6 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={16} className="shrink-0" />
                    <span>¿No encuentras el correo?</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Revisa tu carpeta de <strong>Spam o Correo No Deseado</strong>. Asegúrate también de que la dirección ingresada sea correcta.
                </p>
            </div>

            {/* Temporizador de Reenvío de 60s */}
            <div className="mb-6">
                {canResend ? (
                    <button
                        type="button"
                        onClick={onResend}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                    >
                        {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        <span>Reenviar correo de recuperación</span>
                    </button>
                ) : (
                    <span className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
                        <RefreshCw size={14} className="animate-spin text-indigo-500" />
                        <span>Puedes solicitar un nuevo envío en <strong>{resendTimer}s</strong></span>
                    </span>
                )}
            </div>

            {/* Cambiar de correo */}
            <button
                type="button"
                onClick={onBackToStepOne}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors inline-flex items-center gap-1"
            >
                <ArrowLeft size={14} />
                <span>Probar con otro correo electrónico</span>
            </button>
        </div>
    );
};

export default ForgotPasswordStepConfirmation;