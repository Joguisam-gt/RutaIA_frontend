import { useState, useEffect, useCallback } from 'react';
import { financesApi } from '../api/financesApi';

export const useInstructorFinances = () => {
    const [financeData, setFinanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // Pestañas Financieras ('transactions' | 'sales_by_course' | 'payout_methods')
    const [activeTab, setActiveTab] = useState('transactions');

    // Filtros de Transacciones
    const [transactionType, setTransactionType] = useState('all'); // 'all' | 'sale' | 'withdrawal' | 'refund'
    const [transactionSearch, setTransactionSearch] = useState('');

    // Modal de Retiro de Fondos
    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
    const [isSubmittingWithdrawal, setIsSubmittingWithdrawal] = useState(false);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const fetchFinances = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const summary = await financesApi.getFinanceSummary();
            setFinanceData(summary);
        } catch (err) {
            setError(err.message || 'No se pudo obtener la información financiera.');
        } font - bold {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFinances();
    }, [fetchFinances]);

    // Manejo de Solicitud de Retiro
    const handleRequestWithdrawal = async (amount, payoutMethodId) => {
        try {
            setIsSubmittingWithdrawal(true);
            await financesApi.requestWithdrawal(amount, payoutMethodId);
            showToast(`Solicitud de retiro por $${amount.toFixed(2)} USD procesada con éxito.`);
            setIsWithdrawalModalOpen(false);
            fetchFinances();
        } catch (err) {
            showToast(err.message || 'Error al procesar la solicitud de retiro.');
        } finally {
            setIsSubmittingWithdrawal(false);
        }
    };

    return {
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
        refetch: fetchFinances,
    };
};