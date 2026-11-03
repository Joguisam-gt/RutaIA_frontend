import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CodeXml, Sparkles, Star, Quote, ShieldCheck } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "La flexibilidad de adquirir pases por módulo me permitió especializarme en pgvector y RAG sin comprometer mi presupuesto.",
        name: "Mateo Silva",
        role: "AI Software Developer en Rappi",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
        id: 2,
        quote: "Los proyectos reales de desarrollo web y la corrección con tutores IA me ayudaron a conseguir mi primer empleo como Frontend Engineer.",
        name: "Valeria Morales",
        role: "Frontend Engineer en Mercado Libre",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
        id: 3,
        quote: "La arquitectura de bases de datos relacionales y no relacionales está explicada al máximo nivel técnico de la industria.",
        name: "Diego Hernández",
        role: "Backend Developer en Globant",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
];

export const AuthBrandingColumn = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="w-full md:w-1/2 relative bg-slate-900 text-white flex flex-col justify-between p-8 sm:p-12 rounded-3xl md:rounded-r-none border-b md:border-b-0 md:border-r border-slate-800">
            <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />

            {/* Marca y Encabezado */}
            <div className="relative z-10 space-y-6">
                <Link to="/" className="inline-flex items-center gap-3 text-2xl font-bold text-white">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                        <CodeXml className="w-7 h-7" />
                    </div>
                    <span>RutaIA</span>
                </Link>

                <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold bg-indigo-500/10 text-cyan-400 border border-indigo-500/20 mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Formación Tecnológica de Alto Impacto</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                        Acelera tu carrera tech con mentoría e Inteligencia Artificial
                    </h2>
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-3">
                        Únete a más de 50,000 profesionales en Latinoamérica construyendo el futuro del desarrollo web e IA.
                    </p>
                </div>
            </div>

            {/* Testimonio Giratorio */}
            <div className="relative z-10 my-6">
                <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-xs border border-slate-700/60 shadow-sm">
                    <div className="flex items-center gap-1.5 text-amber-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <Quote className="w-6 h-6 text-indigo-400 mb-2 opacity-70" />
                    <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed italic mb-5">
                        "{currentTestimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="flex items-center gap-3.5">
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.name}
                                className="w-11 h-11 rounded-full object-cover border border-indigo-500"
                            />
                            <div>
                                <span className="text-base font-bold text-white block leading-tight">{currentTestimonial.name}</span>
                                <span className="text-sm text-slate-400 block leading-tight">{currentTestimonial.role}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Ver testimonio ${index + 1}`}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pie de página */}
            <div className="relative z-10 flex items-center justify-between text-sm sm:text-base text-slate-400 pt-5 border-t border-slate-800">
                <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>SSL Segura 256-bit</span>
                </span>
                <span>© 2026 RutaIA Academy</span>
            </div>
        </div>
    );
};

export default AuthBrandingColumn;