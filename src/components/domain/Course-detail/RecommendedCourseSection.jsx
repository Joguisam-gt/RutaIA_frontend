import React from 'react';
import { CourseCard } from '../../common/CourseCard/CourseCard.jsx';

const mockRecommendedCourses = [
    {
        id: '2',
        title: 'Backend Profesional con Node.js, Express y NoSQL',
        category: 'Backend',
        level: 'Avanzado',
        instructor: 'José Rodríguez',
        rating: 4.8,
        reviewCount: 210,
        duration: '18.0 hrs',
        lessonsCount: 92,
        price: 34.99,
    },
    {
        id: '3',
        title: 'Diseño UX/UI de Sistemas Complejos y Design Systems',
        category: 'UX/UI',
        level: 'Principiante',
        instructor: 'José Rodríguez',
        rating: 4.9,
        reviewCount: 180,
        duration: '12.0 hrs',
        lessonsCount: 60,
        price: 0,
    },
];

export const RecommendedCourseSection = () => {
    return (
        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
                Cursos recomendados para continuar tu ruta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockRecommendedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
};

// Alias de exportación para dar soporte a llamadas en plural y exportación por defecto
export const RecommendedCoursesSection = RecommendedCourseSection;
export default RecommendedCourseSection;