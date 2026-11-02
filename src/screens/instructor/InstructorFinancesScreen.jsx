// src/screens/instructor/InstructorFinancesScreen.jsx
import React from 'react';
import { useInstructorFinances } from '../../hooks/useInstructorFinances';
import { HeaderControls } from '../../components/common/HeaderControls';
import { BalanceHeroCard } from '../../components/domain/finances/BalanceHeroCard';
import { TransactionsHistoryTab } from '../../components/domain/finances/TransactionsHistoryTab';
import { SalesByCourseTab } from '../../components/domain/finances/SalesByCourseTab';
import { PayoutMethodsTab } from '../../components/domain/finances/PayoutMethodsTab';
import { WithdrawalModal } from '../../components/domain/finances/WithdrawalModal';
import { Loader2, ShieldCheck, DollarSign, PieChart, CreditCard, CheckCircle2 } from 'lucide-react';

export const InstructorFinancesScreen = () => {
    const {
        financeData,
        loading,
        error,
        toastMessage,
        activeTab,
        setActiveTab,
        transactionType,
        setTransactionType,
        transactionSearch,
        setTransactionSearch,
        isWithdrawalModalOpen,
        setIsWithdrawalModalOpen,
        isSubmittingWithdrawal,
        handleRequestWithdrawal,
    } = useInstructorFinances();

    const tabs = [
        { id: 'transactions', label: 'Historial de Transacciones', icon: DollarSign },
        { id: 'sales_by_course', label: 'Ventas por Curso', icon: PieChart },
        { id: 'payout_methods', label: 'Métodos de Cobro & Fiscal', icon: CreditCard },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando el estado financiero...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Toast Notificación */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/instructor/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-violet-500" />
                            <span>RutaIA — Finanzas & Retiros</span>
                        </a>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Encabezado Principal */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                        Gestión Financiera e Ingresos
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Administra tus saldos disponibles, solicitudes de retiro e historial de facturación pedagógica.
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold mb-6">
                        {error}
                    </div>
                )}

                {/* Balance Hero Card */}
                <BalanceHeroCard
                    availableBalance={financeData?.availableBalance || 3840.50}
                    pendingCustodyBalance={financeData?.pendingCustodyBalance || 920.00}
                    lifetimeEarnings={financeData?.lifetimeEarnings || 28450.00}
                    onOpenWithdrawalModal={() => setIsWithdrawalModalOpen(true)}
                />

                {/* Pestañas Financieras */}
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-8 overflow-x-auto scrollbar-none">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${isActive
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                                    }`}
                            >
                                <Icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Renderizado Dinámico de Pestaña Activa */}
                <div>
                    {activeTab === 'transactions' && (
                        <TransactionsHistoryTab
                            transactions={financeData?.transactions}
                            transactionType={transactionType}
                            onTypeChange={setTransactionType}
                            searchQuery={transactionSearch}
                            onSearchChange={setTransactionSearch}
                        />
                    )}

                    {activeTab === 'sales_by_course' && (
                        <SalesByCourseTab courseSales={financeData?.salesByCourse} />
                    )}

                    {activeTab === 'payout_methods' && <PayoutMethodsTab />}
                </div>
            </main>

            {/* Modal Formulario de Retiro de Fondos */}
            <WithdrawalModal
                isOpen={isWithdrawalModalOpen}
                onClose={() => setIsWithdrawalModalOpen(false)}
                availableBalance={financeData?.availableBalance || 3840.50}
                onSubmitWithdrawal={handleRequestWithdrawal}
                isSubmitting={isSubmittingWithdrawal}
            />
        </div>
    );
};

export default InstructorFinancesScreen;