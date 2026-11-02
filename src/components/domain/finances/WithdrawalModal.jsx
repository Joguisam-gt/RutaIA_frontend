import React, { useState } from 'react';
import { X, ArrowUpRight, DollarSign, Building, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export const WithdrawalModal = ({
    isOpen,
    onClose,
    availableBalance = 3840.50,
    onSubmitWithdrawal,
    isSubmitting,
}) => {
    if (!isOpen) return null;

    const [amount, setAmount] = useState(availableBalance.toString());
    const [selectedMethod, setSelectedMethod] = useState('iban-1');

    const numericAmount = parseFloat(amount) || 0;
    const isAmountValid = numericAmount >= 50 && numericAmount <= availableBalance;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAmountValid) return;
        onSubmitWithdrawal(numericAmount, selectedMethod);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                            <ArrowUpRight size={18} />
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                            Solicitar Retiro de Fondos
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Campo Monto a Retirar */}
                    <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            <span>Monto a Transferir ($ USD)</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                                Disponible: ${availableBalance.toFixed(2)} USD
                            </span>
                        </div>

                        <div className="relative">
                            <DollarSign size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="number"
                                step="0.01"
                                min="50"
                                max={availableBalance}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-20 py-3 rounded-2xl text-base font-extrabold bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setAmount(availableBalance.toString())}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800"
                            >
                                Máximo
                            </button>
                        </div>
                    </div>

                    {/* Selector Método de Destino */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Cuenta de Destino
                        </label>
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Building size={18} className="text-indigo-500" />
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                    IBAN ES91 •••• 4210 (BBVA Bank)
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                Sin comisión
                            </span>
                        </div>
                    </div>

                    {/* Desglose de Comisiones y Tiempos */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                            <span>Monto Solicitado:</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">${numericAmount.toFixed(2)} USD</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                            <span>Comisión de Transferencia:</span>
                            <span className="font-bold text-emerald-500">$0.00 USD</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800 font-bold">
                            <span>Tiempo Estimado de Procesamiento:</span>
                            <span className="text-cyan-500">1 a 3 días hábiles</span>
                        </div>
                    </div>

                    {/* Botones de Acción Modal con degradado exclusivo */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={!isAmountValid || isSubmitting}
                            className={`px-6 py-3 rounded-2xl text-xs font-bold text-white transition-all flex items-center gap-1.5 ${isAmountValid
                                    ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 cursor-pointer'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Procesando...</span>
                                </>
                            ) : (
                                <>
                                    <ArrowUpRight size={16} />
                                    <span>Confirmar Retiro</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};