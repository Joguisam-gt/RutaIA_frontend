import React from 'react';
import { Building, CreditCard, FileText, CheckCircle2, Plus, ShieldCheck, ExternalLink } from 'lucide-react';

export const PayoutMethodsTab = () => {
    return (
        <div className="space-y-6">
            {/* Cuentas de Cobro Vinculadas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                            Métodos de Cobro Configurados
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Selecciona la cuenta bancaria o monedero donde recibirás tus retiros de fondos.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                    >
                        <Plus size={14} />
                        <span>Añadir Cuenta</span>
                    </button>
                </div>

                {/* Método 1: IBAN Bancario (Predeterminado) */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800">
                            <Building size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                    Transferencia IBAN / SWIFT Internacional
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                    Predeterminada
                                </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 block">
                                Cuenta: ES91 •••• •••• •••• 4210 (BBVA Bank)
                            </span>
                        </div>
                    </div>

                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Editar
                    </button>
                </div>

                {/* Método 2: PayPal */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200 dark:border-cyan-800">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                PayPal Business Account
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                                jose.rodriguez@ejemplo.com
                            </span>
                        </div>
                    </div>

                    <button className="text-xs font-bold text-slate-500 hover:underline">
                        Establecer Predeterminada
                    </button>
                </div>
            </div>

            {/* Formulario Fiscal W-8BEN (Cumplimiento Tributario Internacional) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 border border-violet-200 dark:border-violet-800">
                            <FileText size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                    Formulario Fiscal W-8BEN (IRS Estados Unidos)
                                </h4>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                    <CheckCircle2 size={12} /> Verificado
                                </span>
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                                Requerido para exoneración o retención de impuestos internacionales.
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
                    >
                        <ExternalLink size={14} />
                        <span>Actualizar W-8BEN</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayoutMethodsTab;