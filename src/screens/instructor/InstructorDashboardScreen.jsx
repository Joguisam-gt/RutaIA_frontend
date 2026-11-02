import React from 'react';
import { useInstructorDashboard } from '../../hooks/useInstructorDashboard';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { InstructorMetricCards } from '../../components/domain/instructor/InstructorMetricCards';
import { EarningsAnalyticsChart } from '../../components/domain/instructor/EarningsAnalyticsChart';
import { CoursePerformanceTable } from '../../components/domain/instructor/CoursePerformanceTable';
import { InstructorActivitySidebar } from '../../components/domain/instructor/InstructorActivitySidebar';
import { LayoutDashboard, Loader2 } from 'lucide-react';

export const InstructorDashboardScreen = () => {
    const {
        metrics,
        earningsData,
        coursePerformance,
        recentActivity,
        loading,
        error,
    } = useInstructorDashboard();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="instructor" brandTitle="RutaIA" />

            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/dashboard" />

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <LayoutDashboard size={24} className="text-indigo-600" />
                                <span>Panel del Instructor</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Resumen general de métricas, rendimiento de cursos e ingresos.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando panel de control...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <InstructorMetricCards metrics={metrics} />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <EarningsAnalyticsChart data={earningsData} />
                                    <CoursePerformanceTable courses={coursePerformance} />
                                </div>
                                <div>
                                    <InstructorActivitySidebar activities={recentActivity} />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default InstructorDashboardScreen;