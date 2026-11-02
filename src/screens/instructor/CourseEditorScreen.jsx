// src/screens/instructor/CourseEditorScreen.jsx
import React, { useState } from 'react';
import { useCourseWizard } from '../../hooks/useCourseWizard';
import { CourseEditorHeader } from '../../components/domain/course-editor/CourseEditorHeader';
import { Step1BasicInfo } from '../../components/domain/course-editor/Step1BasicInfo.jsx';
import { Step2CurriculumContent } from '../../components/domain/course-editor/Step2CurriculumContent';
import { Step3PricingSettings } from '../../components/domain/course-editor/Step3PricingSettings';
import { Step4ReviewChecklist } from '../../components/domain/course-editor/Step4ReviewChecklist';
import { LessonModalEditor } from '../../components/domain/course-editor/LessonModalEditor';
import { CourseEditorFooter } from '../../components/domain/course-editor/CourseEditorFooter';

export const CourseEditorScreen = () => {
    const {
        currentStep,
        setCurrentStep,
        saveStatus,
        lastSavedTime,
        courseData,
        setCourseData,
        editingLesson,
        setEditingLesson,
        preFlightChecklist,
        handleNext,
        handlePrev,
        isSubmitting,
        setIsSubmitting,
    } = useCourseWizard();

    const [activeModuleId, setActiveModuleId] = useState(null);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

    const handleFieldChange = (field, value) => {
        setCourseData((prev) => ({ ...prev, [field]: value }));
    };

    const handleOpenLessonModal = (lesson, moduleId) => {
        setEditingLesson(lesson);
        setActiveModuleId(moduleId);
        setIsLessonModalOpen(true);
    };

    const handleSaveLesson = (modId, lessonObj) => {
        setCourseData((prev) => {
            const updatedModules = prev.modules.map((m) => {
                if (m.id === modId) {
                    const exists = m.lessons.some((l) => l.id === lessonObj.id);
                    const newLessons = exists
                        ? m.lessons.map((l) => (l.id === lessonObj.id ? lessonObj : l))
                        : [...m.lessons, lessonObj];
                    return { ...m, lessons: newLessons };
                }
                return m;
            });
            return { ...prev, modules: updatedModules };
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24">
            {/* Header de Enfoque con Auto-save indicator & Stepper */}
            <CourseEditorHeader
                currentStep={currentStep}
                onStepClick={setCurrentStep}
                saveStatus={saveStatus}
                lastSavedTime={lastSavedTime}
                courseId={courseData.id}
            />

            {/* Main Container de Pasos Dinámicos */}
            <main className="container mx-auto px-4 py-8">
                {currentStep === 1 && (
                    <Step1BasicInfo courseData={courseData} onChange={handleFieldChange} />
                )}

                {currentStep === 2 && (
                    <Step2CurriculumContent
                        courseData={courseData}
                        onChange={handleFieldChange}
                        onOpenLessonModal={handleOpenLessonModal}
                    />
                )}

                {currentStep === 3 && (
                    <Step3PricingSettings courseData={courseData} onChange={handleFieldChange} />
                )}

                {currentStep === 4 && (
                    <Step4ReviewChecklist
                        checklist={preFlightChecklist}
                        onSubmit={() => {
                            setIsSubmitting(true);
                            setTimeout(() => {
                                setIsSubmitting(false);
                                window.location.href = '/instructor/cursos';
                            }, 1500);
                        }}
                        isSubmitting={isSubmitting}
                    />
                )}
            </main>

            {/* Modal Subida / Edición de Lección */}
            <LessonModalEditor
                lesson={editingLesson}
                moduleId={activeModuleId}
                isOpen={isLessonModalOpen}
                onClose={() => setIsLessonModalOpen(false)}
                onSave={handleSaveLesson}
            />

            {/* Sticky Footer de Navegación */}
            <CourseEditorFooter
                currentStep={currentStep}
                onPrev={handlePrev}
                onNext={handleNext}
                isLastStep={currentStep === 4}
            />
        </div>
    );
};

export default CourseEditorScreen;