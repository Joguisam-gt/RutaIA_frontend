// src/screens/instructor/CourseManagementScreen.jsx
import React from 'react';
import { useCourseManagement } from '../../hooks/useCourseManagement';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { CourseManagementToolbar } from '../../components/domain/course-management/CourseManagementToolbar';
import { InstructorCourseCard } from '../../components/domain/course-management/InstructorCourseCard';
import { Modal } from '../../components/common/Modal/Modal';
import { BookOpen, Loader2, AlertTriangle } from 'lucide-react';

export const CourseManagementScreen = () => {
    const {
        courses,
        loading,
        error,
        deletingCourseId,
        duplicateCourse,
        confirmDeleteCourse,
        cancelDeleteCourse,
        executeDeleteCourse,
    } = useCourseManagement();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/cursos" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <BookOpen size={24} className="text-indigo-600" />
                                <span>Gestión de Cursos</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Crea, edita y gestiona el contenido e itinerario de tus programas educativos.
                            </p>
                        </div>
                    </div>
                    <CourseManagementToolbar />
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
                                Aún no has creado ningún curso
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                Haz clic en "Nuevo Curso" para comenzar a diseñar tu primer plan de estudio.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {courses.map((course) => (
                                <InstructorCourseCard
                                    key={course.id}
                                    course={course}
                                    onDuplicate={() => duplicateCourse(course.id)}
                                    onDelete={() => confirmDeleteCourse(course.id)}
                                />
                            ))}
                        </div>
                    )}
                    <Modal
                        isOpen={Boolean(deletingCourseId)}
                        onClose={cancelDeleteCourse}
                        title="Confirmar eliminación"
                        subtitle="Esta acción no se puede deshacer"
                        footer={
                            <>
                                <button
                                    type="button"
                                    onClick={cancelDeleteCourse}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={executeDeleteCourse}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                                >
                                    Eliminar permanentemente
                                </button>
                            </>
                        }
                    >
                        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl text-amber-800 dark:text-amber-300">
                            <AlertTriangle size={20} className="shrink-0 text-amber-600 dark:text-amber-400" />
                            <p className="text-xs">
                                ¿Estás seguro de que deseas eliminar este curso? Se perderán todas las lecciones y recursos asociados.
                            </p>
                        </div>
                    </Modal>
                </main>
            </div>
        </div>
    );
};

export default CourseManagementScreen;