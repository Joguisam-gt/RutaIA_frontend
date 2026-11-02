import { useState, useEffect, useCallback, useMemo } from 'react';
import { courseEditorApi } from '../api/courseEditorApi';

export const useCourseWizard = (initialCourseId = 'new-draft-101') => {
    const [currentStep, setCurrentStep] = useState(1); // 1: Info Básica, 2: Temario, 3: Precios, 4: Revisión
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'error'
    const [lastSavedTime, setLastSavedTime] = useState('Justo ahora');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado global del borrador del curso
    const [courseData, setCourseData] = useState({
        id: initialCourseId,
        title: 'Arquitectura Backend Avanzada con Node.js & Express',
        subtitle: 'Aprende a escalar microservicios y optimizar middlewares de producción.',
        description: '<p>En este programa práctico construirás un backend de nivel empresarial...</p>',
        category: 'Backend Architecture',
        subCategory: 'Node.js',
        level: 'intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        modules: [
            {
                id: 'mod-1',
                title: 'Módulo 1: Fundamentos y Middlewares',
                lessons: [
                    { id: 'les-1', title: '1. Configuración del entorno V8', duration: '12 min', isFreePreview: true, videoUrl: '#' },
                    { id: 'les-2', title: '2. Middlewares de error globales', duration: '18 min', isFreePreview: false, videoUrl: '#' },
                ],
            },
        ],
        pricingModel: 'paid', // 'paid' | 'subscription' | 'free'
        basePrice: 49.99,
        discountPrice: 29.99,
        includesCertificate: true,
    });

    // Modal de edición/subida de lección
    const [editingLesson, setEditingLesson] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Autosave simulado con debounce de 2 segundos
    useEffect(() => {
        setSaveStatus('saving');
        const timer = setTimeout(async () => {
            try {
                await courseEditorApi.autoSaveDraft(courseData.id, courseData);
                setSaveStatus('saved');
                setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            } catch (err) {
                setSaveStatus('saved'); // Fallback gracioso
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [courseData]);

    // Pre-flight Checklist Automatizado (Paso 4)
    const preFlightChecklist = useMemo(() => {
        const hasTitle = Boolean(courseData.title.trim().length >= 10);
        const hasSubtitle = Boolean(courseData.subtitle.trim().length >= 15);
        const hasCategory = Boolean(courseData.category);
        const hasThumbnail = Boolean(courseData.thumbnail);
        const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        const hasMinLessons = totalLessons >= 2;
        const hasPrice = courseData.pricingModel === 'free' || courseData.basePrice > 0;

        const items = [
            { id: 'title', label: 'Título descriptivo (mínimo 10 caracteres)', isValid: hasTitle },
            { id: 'subtitle', label: 'Subtítulo o resumen del curso', isValid: hasSubtitle },
            { id: 'category', label: 'Categoría y nivel asignados', isValid: hasCategory },
            { id: 'thumbnail', label: 'Imagen de portada en resolución 16:9', isValid: hasThumbnail },
            { id: 'lessons', label: 'Al menos 2 lecciones en el temario', isValid: hasMinLessons },
            { id: 'pricing', label: 'Configuración de precio o gratuidad válida', isValid: hasPrice },
        ];

        const isAllValid = items.every((i) => i.isValid);
        return { items, isAllValid };
    }, [courseData]);

    const handleNext = () => setCurrentStep((prev) => Math.min(4, prev + 1));
    const handlePrev = () => setCurrentStep((prev) => Math.max(1, prev - 1));

    return {
        currentStep,
        setCurrentStep,
        saveStatus,
        lastSavedTime,
        courseData,
        setCourseData,
        editingLesson,
        setEditingLesson,
        uploadProgress,
        setUploadProgress,
        preFlightChecklist,
        handleNext,
        handlePrev,
        isSubmitting,
        setIsSubmitting,
    };
};