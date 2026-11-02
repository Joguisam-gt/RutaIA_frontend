import React from 'react';
import { DollarSign, Clock, TrendingUp, Wallet, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const BalanceHeroCard = ({
    availableBalance = 3840.50,
    pendingCustodyBalance = 920.00,
    lifetimeEarnings = 28450.00,
    onOpenWithdrawalModal,
}) => {
    return (
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 md:p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden mb-8">
            {/* Resplandor radial decorativo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Saldo Principal Disponibilidad Directa */}
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Wallet size={14} />
                        <span>Fondos Listos para Transferencia</span>
                    </div>

                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Saldo Disponible para Retiro
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl md:text-5xl font-black tracking-tight text-white">
                                ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm font-bold text-cyan-400">USD</span>
                        </div>
                    </div>
                </div>

                {/* Bloques Secundarios: Custodia 14 Días e Históricos */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
                    {/* Custodia en Retención (14 días por política de reembolso) */}
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 min-w-[170px]">
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                            <Clock size={14} />
                            <span>En Custodia (14 días)</span>
                        </div>
                        <span className="text-lg font-black text-slate-100 block">
                            ${pendingCustodyBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                        </span>
                        <span className="text-[10px] text-slate-400">
                            Pendiente por política de reembolso
                        </span>
                    </div>

                    {/* Acumulado Histórico */}
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 min-w-[170px]">
                        <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-1">
                            <TrendingUp size={14} />
                            <span>Acumulado Histórico</span>
                        </div>
                        <span className="text-lg font-black text-slate-100 block">
                            ${lifetimeEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                        </span>
                        <span className="text-[10px] text-slate-400">
                            Total facturado en RutaIA
                        </span>
                    </div>

                    {/* Botón 1-Click CTA Solicitar Retiro con degradado exclusivo */}
                    <div className="flex items-center">
                        <button
                            onClick={onOpenWithdrawalModal}
                            disabled={availableBalance <= 0}
                            className={`w-full sm:w-auto px-6 py-4 rounded-2xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 ${availableBalance > 0
                                    ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 cursor-pointer'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }`}
                        >
                            <ArrowUpRight size={18} />
                            <span>Solicitar Retiro de Fondos</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};