// src/components/domain/finances/TransactionsHistoryTab.jsx
import React, { useState } from 'react';
import { Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const TransactionsHistoryTab = ({ transactions = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const safeList = Array.isArray(transactions) ? transactions : [];
    const filteredList = safeList.filter((tx) => {
        const query = (searchQuery || '').toLowerCase();
        const matchTitle = (tx.description || tx.title || '').toLowerCase().includes(query);
        const matchId = (tx.id || '').toLowerCase().includes(query);
        return matchTitle || matchId;
    });

    return (
        <div className="space-y-4">
            <div className="relative max-w-sm">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrar transacciones..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/50">
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Descripción</th>
                            <th className="p-4">Fecha</th>
                            <th className="p-4 text-right">Monto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-medium">
                        {filteredList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate-400">
                                    No hay transacciones registradas.
                                </td>
                            </tr>
                        ) : (
                            filteredList.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    <td className="p-4 flex items-center gap-2">
                                        {tx.type === 'EARNING' ? (
                                            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                                                <ArrowDownLeft size={14} />
                                            </div>
                                        ) : (
                                            <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600">
                                                <ArrowUpRight size={14} />
                                            </div>
                                        )}
                                        <span className="font-bold">{tx.type === 'EARNING' ? 'Venta' : 'Retiro'}</span>
                                    </td>
                                    <td className="p-4 text-slate-700 dark:text-slate-300">{tx.description}</td>
                                    <td className="p-4 text-slate-400">{tx.date}</td>
                                    <td className={`p-4 text-right font-black ${tx.type === 'EARNING' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                                        {tx.type === 'EARNING' ? `+$${tx.amount}` : `-$${tx.amount}`}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsHistoryTab;