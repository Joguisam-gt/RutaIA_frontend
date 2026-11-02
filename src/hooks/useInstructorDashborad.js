import { useState, useEffect, useCallback } from 'react';
import { instructorDashboardApi } from '../api/instructorDashboardApi';

export const useInstructorDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados del Activity Sidebar
    const [pendingQuestions, setPendingQuestions] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [replyingQuestionId, setReplyingQuestionId] = useState(null);

    // Filtros del Gráfico y Tabla
    const [timeRange, setTimeRange] = useState('30d');
    const [chartMetric, setChartMetric] = useState('revenue');
    const [chartData, setChartData] = useState([]);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [tableSearch, setTableSearch] = useState('');
    const [tableSortBy, setTableSortBy] = useState('revenue');

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await instructorDashboardApi.getDashboardSummary(timeRange);
            setDashboardData(data);
            if (data?.analytics) setChartData(data.analytics);
            if (data?.pendingQuestions) setPendingQuestions(data.pendingQuestions);
            if (data?.recentReviews) setRecentReviews(data.recentReviews);
        } catch (err) {
            setError(err.message || 'No se pudo cargar el panel de instructor.');
        } finally {
            setLoading(false);
        }
    }, [timeRange]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    // Enviar respuesta rápida en 1-clic a Q&A
    const handleQuickReply = async (questionId, answerText) => {
        if (!answerText.trim()) return;
        try {
            setReplyingQuestionId(questionId);
            await instructorDashboardApi.replyToPendingQuestion(questionId, answerText);
            // Eliminar de la lista de pendientes localmente tras responder
            setPendingQuestions((prev) => prev.filter((q) => q.id !== questionId));
        } catch (err) {
            // Manejo de error
        } finally {
            setReplyingQuestionId(null);
        }
    };

    const timeRangeOptions = [
        { id: '7d', label: 'Últimos 7 días' },
        { id: '30d', label: 'Últimos 30 días' },
        { id: '90d', label: 'Últimos 90 días' },
        { id: '1y', label: 'Último año' },
    ];

    return {
        dashboardData,
        loading,
        error,
        timeRange,
        setTimeRange,
        chartMetric,
        setChartMetric,
        chartData,
        isChartLoading,
        tableSearch,
        setTableSearch,
        tableSortBy,
        setTableSortBy,
        timeRangeOptions,
        pendingQuestions,
        recentReviews,
        replyingQuestionId,
        handleQuickReply,
    };
};