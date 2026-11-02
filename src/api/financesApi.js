import { apiClient } from './apiClient';

export const financesApi = {
    /**
     * Obtiene la visión financiera general del instructor: saldos, resumen de retiros y estado fiscal W-8BEN.
     * Conecta con GET /api/v1/instructor/finances/summary
     */
    getFinanceSummary: async () => {
        const response = await apiClient.get('/instructor/finances/summary');
        return response.data.data;
    },

    /**
     * Obtiene la lista detallada de movimientos financieros (ventas, retiros, comisiones y reembolsos).
     * Conecta con GET /api/v1/instructor/finances/transactions
     */
    getTransactions: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.type && params.type !== 'all') queryParams.append('type', params.type); // 'sale' | 'withdrawal' | 'refund'
        if (params.search) queryParams.append('search', params.search);

        const response = await apiClient.get(`/instructor/finances/transactions?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Obtiene el desglose de ventas por curso pedagógico y distribución porcentual.
     * Conecta con GET /api/v1/instructor/finances/sales-by-course
     */
    getSalesByCourse: async () => {
        const response = await apiClient.get('/instructor/finances/sales-by-course');
        return response.data.data;
    },

    /**
     * Actualiza o agrega un método de cobro (IBAN Bancario o PayPal).
     * Conecta con POST /api/v1/instructor/finances/payout-methods
     */
    savePayoutMethod: async (methodData) => {
        const response = await apiClient.post('/instructor/finances/payout-methods', methodData);
        return response.data;
    },

    /**
     * Envía el formulario fiscal W-8BEN completado.
     * Conecta con POST /api/v1/instructor/finances/tax-w8ben
     */
    submitTaxForm: async (formData) => {
        const response = await apiClient.post('/instructor/finances/tax-w8ben', formData);
        return response.data;
    },

    /**
     * Solicita una transferencia de retiro de fondos hacia la cuenta bancaria o PayPal vinculada.
     * Conecta con POST /api/v1/instructor/finances/withdraw
     */
    requestWithdrawal: async (amount, payoutMethodId) => {
        const response = await apiClient.post('/instructor/finances/withdraw', {
            amount,
            payoutMethodId,
        });
        return response.data;
    },
};