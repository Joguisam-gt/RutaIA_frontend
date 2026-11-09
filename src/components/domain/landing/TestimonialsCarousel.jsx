import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Carlos Mendoza',
        role: 'Desarrollador Frontend',
        company: 'TechStudio',
        comment: 'La integración de tutores IA y las rutas de aprendizaje práctico transformaron la forma en que construyo interfaces y consumo APIs.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Sofia Ramírez',
        role: 'Diseñadora UX/UI',
        company: 'CreativeLab',
        comment: 'Aprender la estructura de diseño adaptativo y conectar con backend relacional me dio la confianza necesaria para liderar proyectos reales.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Alejandro Gómez',
        role: 'Ingeniero de Software',
        company: 'DevSolutions',
        comment: 'Los módulos de bases de datos y arquitectura de agentes son extremadamente completos. Recomendado para cualquier desarrollador.',
        rating: 5,
    },
];

export const TestimonialsCarousel = () => {
    return (
        <section className="py-12 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 mb-4 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Testimonios de la Comunidad</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Lo que dicen nuestros estudiantes
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                        Experiencias reales de profesionales que aceleraron su carrera técnica con RutaIA.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col justify-between p-6 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors"
                        >
                            <div>
                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                                    "{item.comment}"
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {item.name}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {item.role} • {item.company}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;