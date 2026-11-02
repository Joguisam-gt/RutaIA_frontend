import React from 'react';
import { useInstructorFinances } from '../../hooks/useInstructorFinances';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { BalanceHeroCard } from '../../components/domain/finances/BalanceHeroCard';
import { PayoutMethodsTab } from '../../components/domain/finances/PayoutMethodsTab';
import { SalesByCourseTab } from '../../components/domain/finances/SalesByCourseTab';
import { TransactionsHistoryTab } from '../../components/domain/finances/TransactionsHistoryTab';
import { WithdrawalModal } from '../../components/domain/finances/WithdrawalModal';
import { DollarSign, Loader2 } from 'lucide-react';

export const InstructorFinancesScreen = () => {
    const {
        balance,
        transactions,
        salesByCourse,
        payoutMethods,
        activeTab,
        setActiveTab,
        isModalOpen,
        openWithdrawalModal,
        closeWithdrawalModal,
        handleWithdrawal,
        loading,
    } = useInstructorFinances();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="instructor" brandTitle="RutaIA" />

            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/finanzas" />

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <DollarSign size={24} className="text-emerald-500" />
                                <span>Gestión de Finanzas</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Administra tus ingresos, solicitudes de retiro y métodos de cobro.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando datos financieros...</span>
                        </div>
                    ) : (
                        <>
                            <BalanceHeroCard
                                balance={balance}
                                onWithdrawClick={openWithdrawalModal}
                            />

                            <div className="mt-8 border-b border-slate-200 dark:border-slate-800 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('transactions')}
                                    className={`pb-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'transactions'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Historial de Transacciones
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('sales')}
                                    className={`pb-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'sales'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Ventas por Curso
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('payouts')}
                                    className={`pb-3 text-xs font-bold border-b-2 transition-colors ${activeTab === 'payouts'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Métodos de Cobro
                                </button>
                            </div>

                            <div className="mt-6">
                                {activeTab === 'transactions' && (
                                    <TransactionsHistoryTab transactions={transactions} />
                                )}
                                {activeTab === 'sales' && (
                                    <SalesByCourseTab sales={salesByCourse} />
                                )}
                                {activeTab === 'payouts' && (
                                    <PayoutMethodsTab payoutMethods={payoutMethods} />
                                )}
                            </div>

                            <WithdrawalModal
                                isOpen={isModalOpen}
                                onClose={closeWithdrawalModal}
                                onSubmit={handleWithdrawal}
                                availableBalance={balance?.available || 0}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default InstructorFinancesScreen;