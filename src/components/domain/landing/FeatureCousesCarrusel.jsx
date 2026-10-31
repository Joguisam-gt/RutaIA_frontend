import React, { useState } from 'react';
import { CourseCard } from '../../common/CourseCard/CourseCard';
import { useLanguage } from '../../../context/LanguageContext';

const mockCourses = [
    {
        id: '1',
        title: 'React.js y Next.js: De Cero a Producción',
        category: 'Web Dev',
        level: 'Intermedio',
        instructor: 'José Rodríguez',
        rating: 4.9,
        reviewCount: 320,
        duration: '14.5 hrs',
        lessonsCount: 85,
        price: 29.99,
    },
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

export const FeaturedCoursesCarousel = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('Todos');

    const categories = ['Todos', 'Web Dev', 'Backend', 'UX/UI'];

    const filtered = activeCategory === 'Todos'
        ? mockCourses
        : mockCourses.filter((c) => c.category === activeCategory);

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">
                        {t('featuredTitle')}
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                        {t('featuredSubtitle')}
                    </p>

                    {/* Categorías Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Responsivo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filtered.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </section>
    );
};