import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, Send, Loader2 } from 'lucide-react';

export const Step4ReviewChecklist = ({
    checklist,
    onSubmit,
    isSubmitting,
}) => {
    const { items, isAllValid } = checklist;

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                        Paso 4: Checklist Pre-flight y Envió
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Revisión automatizada de calidad antes de publicar o solicitar aprobación.
                    </p>
                </div>

                {/* Lista del Checklist Automatizado */}
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${item.isValid
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {item.isValid ? (
                                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                ) : (
                                    <XCircle size={18} className="text-rose-500 shrink-0" />
                                )}
                                <span>{item.label}</span>
                            </span>

                            <span className="text-[10px] font-extrabold uppercase tracking-wider">
                                {item.isValid ? 'Cumplido' : 'Pendiente'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Banner de Estado Final */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 text-center">
                    <ShieldCheck size={32} className="mx-auto text-cyan-400" />
                    <h3 className="text-sm font-extrabold">
                        {isAllValid
                            ? '¡Tu borrador está listo para su envío!'
                            : 'Completa los requisitos marcados en rojo para poder enviar'}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Una vez enviado, el equipo pedagógico revisará el audio, la resolución del video y los recursos en un plazo máximo de 24 horas.
                    </p>

                    {/* Botón Enviar con degradado exclusivo */}
                    <div className="pt-2">
                        <button
                            onClick={onSubmit}
                            disabled={!isAllValid || isSubmitting}
                            className={`px-8 py-3.5 rounded-2xl text-xs font-bold text-white transition-all ${isAllValid
                                    ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 cursor-pointer'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Enviando a Revisión...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Send size={16} />
                                    <span>Enviar Curso a Revisión Oficial</span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4ReviewChecklist;