import React from 'react';
import { useMyCourses } from '../../hooks/useMyCourses';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { MyCoursesHeader } from '../../components/domain/my-courses/MyCoursesHeader';
import { MyCoursesControlBar } from '../../components/domain/my-courses/MyCoursesControlBar';
import { MyCourseCard } from '../../components/domain/my-courses/MyCourseCard';
import { BookOpen, Loader2 } from 'lucide-react';

export const MyCoursesScreen = () => {
    const {
        courses,
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        loading,
        error,
    } = useMyCourses();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="student" brandTitle="RutaIA" />

            <div className="flex">
                <Sidebar role="student" currentRoute="/app/mis-cursos" />

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <MyCoursesHeader />

                    <MyCoursesControlBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
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
                                No tienes cursos en esta sección
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                Explora el catálogo e inscríbete en nuevos programas para continuar aprendiendo.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {courses.map((course) => (
                                <MyCourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyCoursesScreen;