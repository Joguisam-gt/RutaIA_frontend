import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CourseCard } from '../../common/CourseCard/CourseCard.jsx';

const mockCourses = [
    {
        id: '1',
        title: 'Desarrollo Web Full-Stack y Arquitectura API',
        category: 'Desarrollo Web',
        level: 'Intermedio',
        duration: '4 meses',
        rating: 4.9,
        studentsCount: 1240,
        price: 49,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: '2',
        title: 'Diseño UX/UI y Sistemas de Diseño Responsivos',
        category: 'Diseño UX/UI',
        level: 'Principiante',
        duration: '4 meses',
        rating: 4.8,
        studentsCount: 980,
        price: 39,
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: '3',
        title: 'Bases de Datos SQL & NoSQL con Node.js',
        category: 'Bases de Datos',
        level: 'Avanzado',
        duration: '4 meses',
        rating: 4.95,
        studentsCount: 850,
        price: 59,
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: '4',
        title: 'Programación de Agentes y Asistentes con IA',
        category: 'Inteligencia Artificial',
        level: 'Intermedio',
        duration: '4 meses',
        rating: 5.0,
        studentsCount: 1510,
        price: 69,
        image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    },
];

export const FeaturedCoursesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? mockCourses.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === mockCourses.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 mb-3 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Cursos Destacados</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Aprende las habilidades más demandadas
                        </h2>
                        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                            Programas de 4 meses con currículum actualizado y proyectos reales.
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 self-end">
                        <button
                            onClick={prevSlide}
                            aria-label="Anterior curso"
                            className="p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Siguiente curso"
                            className="p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.slice(currentIndex, currentIndex + 3).map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const FeatureCousesCarrusel = FeaturedCoursesCarousel;

export default FeaturedCoursesCarousel;