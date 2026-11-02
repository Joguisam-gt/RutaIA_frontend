import React from 'react';
import { Search, ArrowDownLeft, ArrowUpRight, RotateCcw, Filter, Download, Calendar } from 'lucide-react';

export const TransactionsHistoryTab = ({
    transactions = [],
    transactionType,
    onTypeChange,
    searchQuery,
    onSearchChange,
}) => {
    const defaultTransactions = [
        {
            id: 'tx-901',
            description: 'Venta Individual — Arquitectura Backend y APIs REST',
            studentName: 'Carlos Mendoza',
            type: 'sale', // 'sale' | 'withdrawal' | 'refund'
            grossAmount: 49.99,
            platformFee: 7.50,
            netAmount: 42.49,
            date: '01 Nov, 2026 - 14:30',
            status: 'completed',
        },
        {
            id: 'tx-902',
            description: 'Transferencia de Retiro a IBAN (ES91 •••• 4210)',
            studentName: 'N/A',
            type: 'withdrawal',
            grossAmount: 1200.00,
            platformFee: 0.00,
            netAmount: -1200.00,
            date: '28 Oct, 2026 - 09:15',
            status: 'completed',
        },
        {
            id: 'tx-903',
            description: 'Reembolso Solicitado — Bases de Datos Vectoriales',
            studentName: 'Mariana López',
            type: 'refund',
            grossAmount: -34.99,
            platformFee: 0.00,
            netAmount: -34.99,
            date: '24 Oct, 2026 - 18:45',
            status: 'completed',
        },
    ];

    const list = transactions.length > 0 ? transactions : defaultTransactions;

    // Filtrado local por tipo de transacción y búsqueda
    const filteredList = list.filter((tx) => {
        const matchesType = transactionType === 'all' || tx.type === transactionType;
        const matchesSearch =
            tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.studentName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const renderBadgeType = (type) => {
        switch (type) {
            case 'sale':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <ArrowDownLeft size={12} />
                        <span>Venta de Curso</span>
                    </span>
                );
            case 'withdrawal':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        <ArrowUpRight size={12} />
                        <span>Retiro de Fondos</span>
                    </span>
                );
            case 'refund':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                        <RotateCcw size={12} />
                        <span>Reembolso</span>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Control Bar: Pestañas de Tipo y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                    {[
                        { id: 'all', label: 'Todas' },
                        { id: 'sale', label: 'Ventas (+)' },
                        { id: 'withdrawal', label: 'Retiros (-)' },
                        { id: 'refund', label: 'Reembolsos' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTypeChange(tab.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${transactionType === tab.id
                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por ID o concepto..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Tabla de Movimientos */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-3 px-4">ID / Concepto</th>
                            <th className="py-3 px-4">Tipo</th>
                            <th className="py-3 px-4 text-right">Monto Bruto</th>
                            <th className="py-3 px-4 text-right">Comisión RutaIA</th>
                            <th className="py-3 px-4 text-right">Monto Neto</th>
                            <th className="py-3 px-4 text-center">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {filteredList.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="py-3.5 px-4">
                                    <div>
                                        <span className="font-bold text-slate-900 dark:text-slate-100 block">
                                            {tx.description}
                                        </span>
                                        <span className="text-[10px] font-mono text-slate-400">
                                            ID: {tx.id} • {tx.studentName !== 'N/A' && `Estudiante: ${tx.studentName}`}
                                        </span>
                                    </div>
                                </td>

                                <td className="py-3.5 px-4">{renderBadgeType(tx.type)}</td>

                                <td className="py-3.5 px-4 text-right font-semibold text-slate-600 dark:text-slate-400">
                                    ${Math.abs(tx.grossAmount).toFixed(2)} USD
                                </td>

                                <td className="py-3.5 px-4 text-right font-semibold text-rose-500">
                                    {tx.platformFee > 0 ? `-$${tx.platformFee.toFixed(2)} USD` : '$0.00'}
                                </td>

                                <td className={`py-3.5 px-4 text-right font-black ${tx.netAmount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                                    }`}>
                                    {tx.netAmount > 0 ? `+$${tx.netAmount.toFixed(2)} USD` : `-$${Math.abs(tx.netAmount).toFixed(2)} USD`}
                                </td>

                                <td className="py-3.5 px-4 text-center text-[11px] font-mono text-slate-400">
                                    {tx.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsHistoryTab;