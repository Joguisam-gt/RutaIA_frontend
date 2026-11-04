import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { metricApi } from '../../api/metricApi';
import { useNotification } from '../../context/NotificationContext';
import { ThemeToggle } from '../../components/common/themetoggle.jsx';
import { BarChart2, TrendingUp, Award, Clock, Loader2 } from 'lucide-react';

export const MetricsScreen = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showError } = useNotification();

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                const data = await metricApi.getStudentMetrics();
                setMetrics(data);
            } catch (err) {
                showError('No se pudieron cargar las métricas del estudiante.');
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, [showError]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/metricas" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <BarChart2 size={24} className="text-indigo-600" />
                                <span>Mi Rendimiento y Métricas</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Visualiza tus horas invertidas, certificados obtenidos y rachas de estudio.
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
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 rounded-2xl">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Horas de Estudio</span>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-50">
                                        {metrics?.totalHours || 0} hrs
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-2xl">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Certificados Ganados</span>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-50">
                                        {metrics?.certificatesCount || 0}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-2xl">
                                    <TrendingUp size={24} />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Racha Actual</span>
                                    <p className="text-xl font-black text-slate-900 dark:text-slate-50">
                                        {metrics?.currentStreak || 0} días
                                    </p>
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