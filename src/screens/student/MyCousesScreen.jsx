import React from 'react';
import { useMyCourses } from '../../hooks/useMyCourses';
import { HeaderControls } from '../../components/common/HeaderControls';
import { MyCoursesHeader } from '../../components/domain/my-courses/MyCoursesHeader';
import { MyCoursesControlBar } from '../../components/domain/my-courses/MyCoursesControlBar';
import { MyCourseCard } from '../../components/domain/my-courses/MyCourseCard';
import { Loader2, BookOpen } from 'lucide-react';

export const MyCoursesScreen = () => {
    const {
        courses,
        stats,
        loading,
        error,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        tabs,
        activeMenuId,
        setActiveMenuId,
        handleToggleArchive,
    } = useMyCourses();

    // Datos de fallback estáticos en caso de inicialización sin API poblada
    const fallbackCourses = [
        {
            id: 'c-101',
            title: 'Arquitectura Backend y APIs REST con Node.js & Express',
            category: 'Backend Architecture',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
            progressPercentage: 62,
            completedLessons: 14,
            totalLessons: 24,
            lastLessonTitle: 'Mapeo de Rutas Avanzado y Middlewares de Error Globales',
            lastLessonId: 'les-402',
            isCompleted: false,
            isArchived: false,
        },
        {
            id: 'c-102',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500',
            progressPercentage: 100,
            completedLessons: 12,
            totalLessons: 12,
            lastLessonTitle: 'Proyecto Final Capstone RAG Ingestion Pipeline',
            lastLessonId: 'les-12',
            isCompleted: true,
            isArchived: false,
            certificateUrl: '/app/certificados/cert-rag-2026',
        },
    ];

    const displayCourses = courses.length > 0 ? courses : fallbackCourses;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/app/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Mi Aprendizaje
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-10 max-w-7xl">
                {/* Header con Titular y Resumen Estadístico */}
                <MyCoursesHeader stats={stats} />

                {/* Control Bar: Pestañas de Estado, Buscador y Filtro de Orden */}
                <MyCoursesControlBar
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {/* Carga o Grid de Cursos */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                        <span className="text-xs font-medium">Cargando tus cursos...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold max-w-xl mx-auto my-12">
                        {error}
                    </div>
                ) : displayCourses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
                        <BookOpen size={44} className="text-slate-400 mb-3" />
                        <h3 className="text-base font-bold mb-1">No hay cursos en esta sección</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                            {searchQuery
                                ? `No encontramos coincidencias para "${searchQuery}".`
                                : 'Explora nuestro catálogo para matricularte en nuevas rutas de formación.'}
                        </p>
                        <a
                            href="/cursos"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Explorar Catálogo de Cursos
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayCourses.map((course) => (
                            <MyCourseCard
                                key={course.id}
                                course={course}
                                isMenuActive={activeMenuId === course.id}
                                onToggleMenu={setActiveMenuId}
                                onToggleArchive={handleToggleArchive}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyCoursesScreen;