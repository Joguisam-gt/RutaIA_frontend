// src/screens/student/MetricsScreen.jsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { metricApi } from '../../api/metricApi';
import { BarChart2, BookOpen, Award, Clock, TrendingUp, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';

export const MetricsScreen = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await metricApi.getStudentMetrics();
                setMetrics(data);
            } catch (err) {
                setError('No se pudieron cargar tus métricas.');
            } finally {
                setLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    const cards = metrics ? [
        {
            icon: BookOpen,
            color: 'indigo',
            label: 'Cursos Matriculados',
            value: metrics.totalEnrolled ?? 0,
            sub: `${metrics.inProgress ?? 0} en progreso`,
        },
        {
            icon: CheckCircle2,
            color: 'emerald',
            label: 'Cursos Completados',
            value: metrics.completed ?? 0,
            sub: `${metrics.avgProgress ?? 0}% progreso promedio`,
        },
        {
            icon: Award,
            color: 'violet',
            label: 'Certificados Obtenidos',
            value: metrics.certificates ?? 0,
            sub: 'Diplomas digitales emitidos',
        },
        {
            icon: Clock,
            color: 'amber',
            label: 'Horas de Estudio',
            value: metrics.hoursCompleted ?? 0,
            sub: 'En cursos completados',
        },
        {
            icon: TrendingUp,
            color: 'cyan',
            label: 'Progreso General',
            value: `${metrics.avgProgress ?? 0}%`,
            sub: 'Promedio de todos los cursos',
        },
        {
            icon: MessageSquare,
            color: 'rose',
            label: 'Consultas al Asistente IA',
            value: metrics.queriesAsked ?? 0,
            sub: 'Preguntas realizadas al RAG',
        },
    ] : [];

    const colorMap = {
        indigo: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400',
        violet: 'bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400',
        amber: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
        cyan: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400',
        rose: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400',
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/metricas" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <BarChart2 size={24} className="text-indigo-600" />
                                Mi Progreso de Aprendizaje
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Estadísticas personales de tu avance académico en RutaIA.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando tus estadísticas...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : (
                        <>
                            {/* Barra de progreso general */}
                            {metrics && (
                                <div className="mb-8 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Progreso General</span>
                                        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{metrics.avgProgress ?? 0}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 transition-all duration-700"
                                            style={{ width: `${metrics.avgProgress ?? 0}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        {metrics.completed ?? 0} de {metrics.totalEnrolled ?? 0} cursos completados
                                    </p>
                                </div>
                            )}

                            {/* Tarjetas de métricas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cards.map((card, i) => {
                                    const Icon = card.icon;
                                    return (
                                        <div
                                            key={i}
                                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4"
                                        >
                                            <div className={`p-3 rounded-2xl flex-shrink-0 ${colorMap[card.color]}`}>
                                                <Icon size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{card.label}</span>
                                                <p className="text-2xl font-black text-slate-900 dark:text-slate-50">{card.value}</p>
                                                <span className="text-[10px] text-slate-400 font-medium">{card.sub}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MetricsScreen;
