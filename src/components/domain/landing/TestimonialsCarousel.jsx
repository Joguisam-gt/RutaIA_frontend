import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const testimonials = [
    {
        name: 'Ana Gómez',
        role: 'Frontend Developer',
        company: 'Tech Solutions',
        quote: 'Gracias a los proyectos prácticos y la revisión de IA de RutaIA, logré pasar mis entrevistas técnicas en menos de 3 meses.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
        name: 'Carlos Mendoza',
        role: 'Backend Engineer',
        company: 'DataCorp',
        quote: 'La claridad en temas de bases de datos y arquitectura Node.js fue la clave para mi ascenso profesional.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
];

export const TestimonialsCarousel = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-12">
                    {t('testimonialsTitle')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex gap-1 text-amber-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-amber-500" />
                                    ))}
                                </div>
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-full object-cover border border-indigo-500"
                                />
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            {item.name}
                                        </span>
                                        <ShieldCheck size={14} className="text-cyan-500" title="Alumno Verificado" />
                                    </div>
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                                        {item.role} en {item.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;