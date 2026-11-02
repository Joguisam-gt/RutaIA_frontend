import { useState, useEffect, useCallback } from 'react';
import { instructorDashboardApi } from '../api/instructorDashboardApi';

export const useInstructorDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros del Gráfico de Analítica
    const [timeRange, setTimeRange] = useState('30d'); // '7d' | '30d' | '90d' | '1y'
    const [chartMetric, setChartMetric] = useState('revenue'); // 'revenue' | 'enrollments'
    const [chartData, setChartData] = useState([]);
    const [isChartLoading, setIsChartLoading] = useState(false);

    // Filtros de la Tabla de Rendimiento
    const [tableSearch, setTableSearch] = useState('');
    const [tableSortBy, setTableSortBy] = useState('revenue'); // 'revenue' | 'students' | 'rating' | 'title'

    // Carga general de métricas principales
    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await instructorDashboardApi.getDashboardSummary(timeRange);
            setDashboardData(data);
            if (data?.analytics) {
                setChartData(data.analytics);
            }
        } catch (err) {
            setError(err.message || 'No se pudo cargar el panel de administración del instructor.');
        } finally {
            setLoading(false);
        }
    }, [timeRange]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    // Recarga exclusiva del gráfico al cambiar tipo de métrica o rango
    const fetchAnalytics = useCallback(async () => {
        try {
            setIsChartLoading(true);
            const data = await instructorDashboardApi.getAnalyticsData(timeRange, chartMetric);
            setChartData(data || []);
        } catch (err) {
            // Mantiene datos previos en caso de falla momentánea
        } finally {
            setIsChartLoading(false);
        }
    }, [timeRange, chartMetric]);

    useEffect(() => {
        if (!loading) {
            fetchAnalytics();
        }
    }, [timeRange, chartMetric, fetchAnalytics, loading]);

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
        refetch: fetchDashboard,
    };
};