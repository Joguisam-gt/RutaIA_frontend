import React from 'react';
import { useStudentDashboard } from '../../hooks/useStudentDashboard';
import { HeaderControls } from '../../components/common/HeaderControls';
import { HeroContinueWidget } from '../../components/domain/dashboard/HeroContinueWidget';
import { GamificationStreakWidget } from '../../components/domain/dashboard/GamificationStreakWidget';
import { CoursesInProgressGrid } from '../../components/domain/dashboard/CoursesInProgressGrid';
import { RecommendationsCarousel } from '../../components/domain/dashboard/RecommendationsCarousel';
import { Loader2, User } from 'lucide-react';

export const StudentDashboardScreen = () => {
    const {
        dashboardData,
        loading,
        error,
        carouselIndex,
        handleNextRecommendation,
        handlePrevRecommendation,
    } = useStudentDashboard();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando tu panel de estudio...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                            RutaIA — Panel Estudiante
                        </a>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Layout (2 Columnas Principales + Panel Lateral de Métricas) */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Saludo Estudiante */}
                <div className="mb-6">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                        ¡Hola de nuevo, José Guillermo! 👋
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Sigue avanzando en tus metas de formación tecnológica de hoy.
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold mb-6">
                        {error}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Columna Izquierda Principal (65% W en escritorio) */}
                    <div className="w-full lg:w-65/100">
                        {/* Hero Widget "Continuar Aprendiendo" */}
                        <HeroContinueWidget heroCourse={dashboardData?.heroCourse} />

                        {/* Grid "Mis Cursos en Progreso" */}
                        <CoursesInProgressGrid courses={dashboardData?.inProgressCourses} />

                        {/* Carrusel de Recomendaciones */}
                        <RecommendationsCarousel
                            recommendations={dashboardData?.recommendations}
                            currentIndex={carouselIndex}
                            onNext={handleNextRecommendation}
                            onPrev={handlePrevRecommendation}
                        />
                    </div>

                    {/* Panel Lateral de Métricas (35% W en escritorio) */}
                    <aside className="w-full lg:w-35/100 space-y-6">
                        {/* Widget de Gamificación (Streak 🔥 + Horas semanales) */}
                        <GamificationStreakWidget streakData={dashboardData?.streak} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboardScreen;