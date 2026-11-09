// src/screens/student/MyCoursesScreen.jsx
import React, { useState, useEffect } from 'react';
import { useMyCourses } from '../../hooks/useMyCourses';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { MyCoursesHeader } from '../../components/domain/my-courses/MyCoursesHeader';
import { MyCoursesControlBar } from '../../components/domain/my-courses/MyCoursesControlBar';
import { MyCourseCard } from '../../components/domain/my-courses/MyCourseCard';
import { apiClient } from '../../api/apiClient';
import { BookOpen, Loader2 } from 'lucide-react';

export const MyCoursesScreen = () => {
    const {
        courses,
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        sortBy,
        setSortBy,
        activeMenuId,
        toggleMenu,
        tabs,
        loading,
        error,
    } = useMyCourses();

    // Stats reales desde /students/metrics para el header
    const [headerStats, setHeaderStats] = useState({ totalHours: 0, completedCourses: 0, certificatesEarned: 0 });

    useEffect(() => {
        apiClient.get('/students/metrics')
            .then(res => {
                const m = res?.data?.data || res?.data || {};
                setHeaderStats({
                    totalHours: m.hoursCompleted ?? m.hoursLearned ?? 0,
                    completedCourses: m.completed ?? m.coursesCompleted ?? 0,
                    certificatesEarned: m.certificates ?? m.certificatesEarned ?? 0,
                });
            })
            .catch(() => {}); // silencioso, el header muestra 0 si falla
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/mis-cursos" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <MyCoursesHeader stats={headerStats} />
                    <MyCoursesControlBar
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        searchQuery={searchTerm}
                        onSearchChange={setSearchTerm}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando tus cursos...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-8 mt-6">
                            <BookOpen size={36} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                {activeTab === 'completed'
                                    ? 'Aún no has completado ningún curso'
                                    : activeTab === 'in_progress'
                                    ? 'No tienes cursos en progreso'
                                    : 'No tienes cursos matriculados'}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                {activeTab === 'all' && searchTerm
                                    ? 'Ningún curso coincide con tu búsqueda.'
                                    : 'Explora el catálogo de cursos y empieza a aprender hoy.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {courses.map((course) => (
                                <MyCourseCard
                                    key={course.enrollmentId || course.id}
                                    course={course}
                                    isMenuActive={activeMenuId === (course.enrollmentId || course.id)}
                                    onToggleMenu={toggleMenu}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyCoursesScreen;
