import { useState } from 'react';

export const useInstructorFinances = () => {
    const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' | 'courses' | 'payouts'
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const balanceInfo = {
        availableBalance: 1280.50,
        pendingBalance: 320.00,
        totalEarnings: 8450.00,
        lastPayoutDate: '15 de Octubre, 2026',
        currency: 'USD',
    };

    const salesByCourse = [
        {
            id: 'course-1',
            title: 'React.js y Next.js: De Cero a Producción',
            studentsCount: 142,
            price: 29.99,
            revenue: 4258.58,
        },
        {
            id: 'course-2',
            title: 'Backend Profesional con Node.js y Express',
            studentsCount: 98,
            price: 34.99,
            revenue: 3429.02,
        },
        {
            id: 'course-3',
            title: 'Bases de Datos SQL y NoSQL Avanzado',
            studentsCount: 26,
            price: 29.99,
            revenue: 762.40,
        },
    ];

    const transactionsHistory = [
        {
            id: 'tx-101',
            date: '2026-10-28',
            description: 'Venta - React.js y Next.js',
            type: 'sale',
            amount: 29.99,
            status: 'completed',
        },
        {
            id: 'tx-100',
            date: '2026-10-25',
            description: 'Retiro a Cuenta Bancaria (**** 4821)',
            type: 'payout',
            amount: -500.00,
            status: 'completed',
        },
        {
            id: 'tx-099',
            date: '2026-10-22',
            description: 'Venta - Backend Profesional con Node.js',
            type: 'sale',
            amount: 34.99,
            status: 'completed',
        },
    ];

    const payoutMethods = [
        {
            id: 'payout-1',
            type: 'bank_transfer',
            accountName: 'José Rodríguez',
            details: 'Banco Industrial **** 4821',
            isDefault: true,
        },
        {
            id: 'payout-2',
            type: 'paypal',
            accountName: 'José Rodríguez',
            details: 'jose.rodriguez@example.com',
            isDefault: false,
        },
    ];

    const handleRequestWithdrawal = (amount) => {
        console.log(`Solicitud de retiro procesada por: $${amount}`);
        setIsWithdrawModalOpen(false);
    };

    return {
        activeTab,
        setActiveTab,
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        balanceInfo,
        salesByCourse,
        transactionsHistory,
        payoutMethods,
        handleRequestWithdrawal,
    };
};

export default useInstructorFinances;