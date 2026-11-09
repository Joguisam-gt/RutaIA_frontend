import React from 'react';
import { useStudentDashboards } from '../../hooks/useStudentDashboards';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { HeroContinueWidget } from '../../components/domain/dashboard/HeroContinueWidget';
import { GaminificationSteakWidget } from '../../components/domain/dashboard/GaminificationSteakWidget';
import { CoursesInProgressGrid } from '../../components/domain/dashboard/CoursesInProgressGrid';
import { RecommendationsCarousel } from '../../components/domain/dashboard/RecommendationsCarousel';
import { LayoutDashboard, Loader2 } from 'lucide-react';

export const StudentDashboardScreen = () => {
    const {
        continueCourse,
        inProgressCourses,
        recommendedCourses,
        streakInfo,
        loading,
        error,
    } = useStudentDashboards();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/dashboard" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <LayoutDashboard size={24} className="text-indigo-600" />
                            <span>Panel del Estudiante</span>
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Continúa donde lo dejaste y explora nuevas rutas de aprendizaje.
                        </p>
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando tu panel principal...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <HeroContinueWidget course={continueCourse} />
                                </div>
                                <div>
                                    <GaminificationSteakWidget streak={streakInfo} />
                                </div>
                            </div>
                            <CoursesInProgressGrid courses={inProgressCourses} />
                            <RecommendationsCarousel courses={recommendedCourses} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StudentDashboardScreen;