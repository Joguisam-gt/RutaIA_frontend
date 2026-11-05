import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { metricApi } from '../../api/metricApi';
import { useNotification } from '../../context/NotificationContext';
import { ThemeToggle } from '../../components/common/themetoggle.jsx';
import { BarChart2, TrendingUp, Award, Clock, Loader2 } from 'lucide-react';

export const MetricsScreen = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const notification = useNotification();

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                // Intenta obtener métricas del estudiante o métricas generales limpias
                const data = await metricApi.getPlatformMetrics();
                setMetrics(data);
            } catch (err) {
                if (notification?.showError) {
                    notification.showError('No se pudieron cargar las métricas.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/metricas" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <BarChart2 size={24} className="text-indigo-600" />
                                <span>Métricas de la Plataforma RutaIA</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Estadísticas de consultas atendidas, efectividad del agente RAG y calificaciones.
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando estadísticas...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Tarjeta 1: Total de Consultas */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Consultas Realizadas</span>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-50">
                                        {metrics?.totalQueries || 0}
                                    </p>
                                    <span className="text-[10px] text-emerald-500 font-bold">
                                        {metrics?.answeredQueries || 0} respondidas exitosamente
                                    </span>
                                </div>
                            </div>

                            {/* Tarjeta 2: Promedio de Calificaciones */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-2xl">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Calificación Promedio</span>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-50">
                                        {metrics?.averageRating ? `${metrics.averageRating} / 5.0` : 'Sin valoraciones'}
                                    </p>
                                    <span className="text-[10px] text-slate-400">
                                        {metrics?.totalRatings || 0} valoraciones recibidas
                                    </span>
                                </div>
                            </div>

                            {/* Tarjeta 3: Curso más Recomendado */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-2xl">
                                    <TrendingUp size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Curso Más Recomendado</span>
                                    <p className="text-sm font-black text-slate-900 dark:text-slate-50 truncate" title={metrics?.mostRecommendedCourse?.title}>
                                        {metrics?.mostRecommendedCourse?.title || 'Sin recomendaciones aún'}
                                    </p>
                                    <span className="text-[10px] text-indigo-500 font-bold">
                                        Recomendado {metrics?.mostRecommendedCourse?.count || 0} veces
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MetricsScreen;