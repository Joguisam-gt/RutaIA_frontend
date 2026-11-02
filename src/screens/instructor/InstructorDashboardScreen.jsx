import React from 'react';
import { useInstructorDashboard } from '../../hooks/useInstructorDashboard';
import { HeaderControls } from '../../components/common/HeaderControls';
import { InstructorMetricCards } from '../../components/domain/instructor/InstructorMetricCards';
import { EarningsAnalyticsChart } from '../../components/domain/instructor/EarningsAnalyticsChart';
import { CoursePerformanceTable } from '../../components/domain/instructor/CoursePerformanceTable';
import { Loader2, Plus, ShieldCheck } from 'lucide-react';

export const InstructorDashboardScreen = () => {
    const {
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
    } = useInstructorDashboard();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando tu panel de instructor...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/instructor/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-violet-500" />
                            <span>RutaIA — Panel de Maestro / Admin</span>
                        </a>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Encabezado Principal y Acción Crear Curso */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                            Panel de Instructor
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Supervisa las métricas financieras, inscripciones y la satisfacción de tus estudiantes en tiempo real.
                        </p>
                    </div>

                    {/* Botón CTA Crear Curso con degradado exclusivo */}
                    <a
                        href="/instructor/cursos/nuevo"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all shrink-0"
                    >
                        <Plus size={16} />
                        <span>Crear Nuevo Curso</span>
                    </a>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold mb-6">
                        {error}
                    </div>
                )}

                {/* 1. Metric Cards (Ingresos, Estudiantes, Rating, Cursos) */}
                <InstructorMetricCards metrics={dashboardData?.metrics} />

                {/* 2. Gráfico Interactivo de Área (Ingresos vs Inscripciones) */}
                <EarningsAnalyticsChart
                    chartData={chartData}
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                    chartMetric={chartMetric}
                    onMetricChange={setChartMetric}
                    timeRangeOptions={timeRangeOptions}
                    isLoading={isChartLoading}
                />

                {/* 3. Matriz Comparativa de Cursos */}
                <CoursePerformanceTable
                    courses={dashboardData?.coursePerformance}
                    searchValue={tableSearch}
                    onSearchChange={setTableSearch}
                    sortBy={tableSortBy}
                    onSortChange={setTableSortBy}
                />
            </main>
        </div>
    );
};

export default InstructorDashboardScreen;