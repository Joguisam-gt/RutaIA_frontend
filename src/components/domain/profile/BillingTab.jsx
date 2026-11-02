import React from 'react';
import { CreditCard, Download, Zap, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const BillingTab = ({ billingData }) => {
    const { activePlan, savedCards, invoices } = billingData;

    return (
        <div className="space-y-6">
            {/* Tarjeta de Plan Activo */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 text-white shadow-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/20 text-cyan-400 border border-indigo-500/30 text-xs font-bold mb-3">
                            <Zap size={14} />
                            <span>Plan Activo</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-50 mb-1">
                            {activePlan.name}
                        </h3>
                        <p className="text-xs text-slate-300">
                            Suscripción activa • Próxima fecha de cobro: <strong>{activePlan.nextBilling}</strong>
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-lg font-black text-cyan-400">
                            {activePlan.price}
                        </span>

                        {/* Botón CTA exclusivo con degradado */}
                        <a
                            href="/pricing"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1"
                        >
                            <span>Cambiar Plan</span>
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Tarjetas Guardadas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Métodos de Pago Guardados
                </h3>

                <div className="space-y-3">
                    {savedCards.map((card) => (
                        <div
                            key={card.id}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <CreditCard size={22} className="text-indigo-500 shrink-0" />
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                        {card.brand} terminada en •••• {card.last4}
                                    </span>
                                    <span className="text-[11px] text-slate-400">
                                        Vence {card.expMonth}/{card.expYear}
                                    </span>
                                </div>
                            </div>

                            {card.isDefault && (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30">
                                    Predeterminada
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Historial de Facturas en PDF */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Historial de Facturas
                </h3>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {invoices.map((inv) => (
                        <div key={inv.id} className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-slate-400 shrink-0" />
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                        Factura #{inv.id}
                                    </span>
                                    <span className="text-[11px] text-slate-400">{inv.date}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                    {inv.amount}
                                </span>

                                <a
                                    href={inv.pdfUrl}
                                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                                    title="Descargar factura en PDF"
                                >
                                    <Download size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};