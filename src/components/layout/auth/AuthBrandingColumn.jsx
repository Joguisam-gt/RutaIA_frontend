import React, { useState, useEffect } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { useAuthTestimonials } from '../../../hooks/useAuthTestimonials';

export const AuthBrandingColumn = ({ testimonials: propsTestimonials }) => {
    const { testimonials: hookTestimonials } = useAuthTestimonials() || {};

    const list = (propsTestimonials && propsTestimonials.length > 0)
        ? propsTestimonials
        : (hookTestimonials && hookTestimonials.length > 0)
            ? hookTestimonials
            : [
                {
                    id: 1,
                    quote: "RutaIA transformó completamente mi carrera. Pasé de cero a mi primer empleo como desarrollador en 6 meses.",
                    author: "Carlos Mendoza",
                    role: "Desarrollador Full-Stack",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                },
                {
                    id: 2,
                    quote: "Los cursos de IA y backend están muy bien estructurados. La plataforma es rápida y la comunidad ayuda mucho.",
                    author: "Elena Rostova",
                    role: "Ingeniera de Software",
                    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
                }
            ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (list.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % list.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [list.length]);

    const current = list[currentIndex] || list[0];

    return (
        <div className="w-full h-full min-h-full flex flex-col justify-between p-6 md:p-10 lg:p-16 bg-slate-200/60 dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-300 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 mb-8 lg:mb-0">
                <div className="flex items-center gap-2 mb-6 lg:mb-10">
                    <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        Ruta<span className="text-indigo-600 dark:text-indigo-400">IA</span>
                    </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 max-w-xl">
                    Aprende desarrollo web e inteligencia artificial con proyectos reales.
                </h2>
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-400 max-w-lg leading-relaxed">
                    Accede a nuestra plataforma educativa con mentores expertos, rutas personalizadas y una comunidad activa.
                </p>
            </div>

            <div className="relative z-10 p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800/90 backdrop-blur-md border border-slate-300 dark:border-slate-700/60 shadow-xl transition-colors duration-300 mt-auto">
                <Quote className="w-8 h-8 text-indigo-500/50 mb-3" />
                <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 italic mb-4 leading-relaxed font-medium">
                    "{current.quote || current.content || current.text}"
                </p>
                <div className="flex items-center gap-3">
                    {(current.avatar || current.image) && (
                        <img
                            src={current.avatar || current.image}
                            alt={current.author || current.name}
                            className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                        />
                    )}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {current.author || current.name || 'Estudiante RutaIA'}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            {current.role || current.title || 'Alumno'}
                        </p>
                    </div>
                </div>

                {list.length > 1 && (
                    <div className="flex gap-1.5 mt-4 justify-center">
                        {list.map((_, idx) => (
                            <span
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                                        : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthBrandingColumn;