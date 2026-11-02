import { useState, useEffect, useCallback } from 'react';
import { studentDashboardApi } from '../api/studentDashboardApi';

export const useStudentDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Índice activo para el carrusel de recomendaciones
    const [carouselIndex, setCarouselIndex] = useState(0);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await studentDashboardApi.getDashboardData();
            setData(res);
        } catch (err) {
            setError(err.message || 'Error al cargar el panel de aprendizaje.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const handleNextRecommendation = () => {
        if (!data?.recommendations?.length) return;
        setCarouselIndex((prev) => (prev + 1) % data.recommendations.length);
    };

    const handlePrevRecommendation = () => {
        if (!data?.recommendations?.length) return;
        setCarouselIndex((prev) => (prev - 1 + data.recommendations.length) % data.recommendations.length);
    };

    return {
        dashboardData: data,
        loading,
        error,
        carouselIndex,
        handleNextRecommendation,
        handlePrevRecommendation,
        refetch: fetchDashboard,
    };
};