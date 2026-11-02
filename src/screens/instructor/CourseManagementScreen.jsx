import React from 'react';
import { useCourseManagement } from '../../hooks/useCourseManagement';
import { HeaderControls } from '../../components/common/HeaderControls';
import { CourseManagementToolbar } from '../../components/domain/course-management/CourseManagementToolbar';
import { InstructorCourseCard } from '../../components/domain/course-management/InstructorCourseCard';
import { Loader2, Plus, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';

export const CourseManagementScreen = () => {
    const {
        courses,
        loading,
        error,
        toastMessage,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        tabs,
        activeMenuId,
        setActiveMenuId,
        handleDuplicate,
        handleToggleArchive,
    } = useCourseManagement();

    // Fallback estático en caso de carga inicial sin datos de backend
    const fallbackCourses = [
        {
            id: 'c-101',
            title: 'Arquitectura Backend y APIs REST con Node.js & Express',
            category: 'Backend Architecture',
            status: 'published',
            totalLessons: 24,
            totalHours: 18,
            studentsCount: 640,
            rating: 4.9,
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
        },
        {
            id: 'c-102',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            status: 'published',
            totalLessons: 12,
            totalHours: 10,
            studentsCount: 410,
            rating: 4.8,
            thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500',
        },
        {
            id: 'c-103',
            title: 'Patrones de Diseño SOLID y Microservicios en TypeScript',
            category: 'Software Architecture',
            status: 'draft',
            totalLessons: 8,
            totalHours: 6,
            studentsCount: 0,
            rating: 0,
            thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
        },
        {
            id: 'c-104',
            title: 'Agentes de IA y Orquestación RAG con n8n y LangChain',
            category: 'Artificial Intelligence',
            status: 'under_review',
            totalLessons: 20,
            totalHours: 15,
            studentsCount: 0,
            rating: 0,
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
        },
    ];

    const displayCourses = courses.length > 0 ? courses : fallbackCourses;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Toast Notificación */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/instructor/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-violet-500" />
                            <span>RutaIA — Gestión de Cursos</span>
                        </a>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Encabezado Principal */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                            Catálogo de Cursos Creados
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Administra el contenido, estados de publicación y duplicación de tus programas de formación.
                        </p>
                    </div>

                    {/* Botón CTA Crear Curso con degradado exclusivo */}
                    <a
                        href="/instructor/cursos/nuevo"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all shrink-0"
                    >
                        <Plus size={16} />
                        <span>Nuevo Curso</span>
                    </a>
                </div>

                {/* Toolbar de Filtros */}
                <CourseManagementToolbar
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Carga o Grid / Tabla de Cursos */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                        <span className="text-xs font-medium">Cargando tu catálogo de cursos...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold max-w-xl mx-auto my-12">
                        {error}
                    </div>
                ) : displayCourses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
                        <Layers size={44} className="text-slate-400 mb-3" />
                        <h3 className="text-base font-bold mb-1">No se encontraron cursos</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                            {searchQuery
                                ? `No existen coincidencias para "${searchQuery}".`
                                : 'No tienes cursos guardados en esta categoría.'}
                        </p>
                        <a
                            href="/instructor/cursos/nuevo"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Crear primer curso
                        </a>
                    </div>
                ) : viewMode === 'table' ? (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/50">
                                        <th className="py-3 px-4">Curso / Categoría</th>
                                        <th className="py-3 px-4">Estado</th>
                                        <th className="py-3 px-4">Métricas</th>
                                        <th className="py-3 px-4">Estudiantes</th>
                                        <th className="py-3 px-4">Rating</th>
                                        <th className="py-3 px-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayCourses.map((course) => (
                                        <InstructorCourseCard
                                            key={course.id}
                                            course={course}
                                            viewMode="table"
                                            isMenuActive={activeMenuId === course.id}
                                            onToggleMenu={setActiveMenuId}
                                            onDuplicate={handleDuplicate}
                                            onToggleArchive={handleToggleArchive}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayCourses.map((course) => (
                            <InstructorCourseCard
                                key={course.id}
                                course={course}
                                viewMode="grid"
                                isMenuActive={activeMenuId === course.id}
                                onToggleMenu={setActiveMenuId}
                                onDuplicate={handleDuplicate}
                                onToggleArchive={handleToggleArchive}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default CourseManagementScreen;