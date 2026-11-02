import React, { useState } from "react";
import { useCourseDetail } from "../../hooks/useCourseDetail.js";
import { HeaderControls } from "../../components/common/HeaderControls.jsx";
import { CourseHeader } from "../../components/domain/Course-detail/CourseHeader.jsx";
import { StickyPurchaseCard } from "../../components/domain/Course-detail/StickyPurchaseCard.jsx";
import { WhatYouWillLearn } from "../../components/domain/Course-detail/WhatYouWillLearn.jsx";
import { CourseSyllabusAccordion } from "../../components/domain/Course-detail/CourseSyllabusAccordion.jsx";
import { CoursePrerequisites } from "../../components/domain/Course-detail/CoursePrerequisites.jsx";
import { InstructorProfileCard } from "../../components/domain/Course-detail/InstructorProfileCard.jsx";
import { StudentReviewsSection } from "../../components/domain/Course-detail/StudentReviewsSection.jsx";
import { RecommendedCourseSection } from "../../components/domain/Course-detail/RecommendedCourseSection.jsx";
import { Loader2, X, Play } from "lucide-react";

export const CourseDetailScreen = ({ courseSlug = 'react-nextjs-cero-a-produccion' }) => {
    const {
        course,
        reviews,
        recommended,
        loading,
        error,
        previewLesson,
        setPreviewLesson,
    } = useCourseDetail(courseSlug);

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando detalle del curso...</span>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 text-center">
                <p className="text-rose-500 text-sm font-semibold mb-4">{error || 'Curso no encontrado'}</p>
                <a href="/cursos" className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600">
                    Volver al Catálogo
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Navbar Superior */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Header del Curso */}
            <CourseHeader course={course} />

            {/* Layout Principal de 2 Columnas (Contenido 65% + Sticky Purchase Card 35%) */}
            <main className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Columna Principal de Contenido (65%) */}
                    <div className="w-full lg:w-2/3">
                        <WhatYouWillLearn learningGoals={course.learningGoals} />
                        <CoursePrerequisites requirements={course.requirements} />
                        <CourseSyllabusAccordion
                            modules={course.modules}
                            onSelectPreviewLesson={(lesson) => {
                                setPreviewLesson(lesson);
                                setIsPreviewModalOpen(true);
                            }}
                        />
                        <InstructorProfileCard instructor={course.instructorDetails} />
                        <StudentReviewsSection reviews={reviews} />
                    </div>

                    {/* Columna Lateral de Compra Sticky (35%) */}
                    <div className="w-full lg:w-1/3">
                        <StickyPurchaseCard
                            course={course}
                            onOpenPreview={() => setIsPreviewModalOpen(true)}
                        />
                    </div>
                </div>

                {/* Sección de Cursos Recomendados */}
                <RecommendedCoursesSection courses={recommended} />
            </main>

            {/* Modal de Vista Previa de Lección / Trailer */}
            {isPreviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="w-full max-w-3xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-white">
                        <div className="flex items-center justify-between p-4 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <Play size={16} className="text-indigo-500 fill-indigo-500" />
                                <span className="text-xs font-bold">
                                    {previewLesson ? previewLesson.title : 'Vista Previa del Curso'}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsPreviewModalOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="relative aspect-video bg-black flex items-center justify-center">
                            <p className="text-xs text-slate-400">
                                [ Reproductor de Video de Prueba HTML5 ]
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetailScreen;