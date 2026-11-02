import React from 'react';
import { Sparkles, Star, Quote, ShieldCheck, Code2 } from 'lucide-react';
import { useAuthTestimonials } from '../../../hooks/useAuthTestimonials';

export const AuthBrandingColumn = () => {
    const { testimonial, totalTestimonials, currentIndex, setIndex } = useAuthTestimonials();

    return (
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
            {/* Fondo con patrones geométricos sutiles y gradiente decorativo de fondo */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-950/40 via-slate-900 to-slate-950 opacity-90 pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Marca */}
            <div className="relative z-10">
                <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-black tracking-tight text-white">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                        <Code2 size={22} />
                    </div>
                    <span>RutaIA</span>
                </a>

                <div className="mt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-cyan-400 border border-indigo-500/20 mb-4">
                        <Sparkles size={14} />
                        <span>Formación Tecnológica de Alto Impacto</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight leading-tight mb-3">
                        Acelera tu carrera tech con mentoría e Inteligencia Artificial
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                        Únete a más de 50,000 profesionales en Latinoamérica construyendo el futuro del desarrollo web, bases de datos e IA Agéntica.
                    </p>
                </div>
            </div>

            {/* Bloque de Prueba Social (Testimonial Rotativo) */}
            <div className="relative z-10 my-auto">
                <div className="p-6 rounded-3xl bg-slate-800/60 backdrop-blur-md border border-slate-700/60 shadow-xl">
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400" />
                        ))}
                    </div>

                    <Quote size={24} className="text-indigo-400 mb-2 opacity-60" />

                    <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed italic mb-4">
                        "{testimonial.quote}"
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                className="w-9 h-9 rounded-full object-cover border border-indigo-500"
                            />
                            <div>
                                <span className="text-xs font-bold text-white block">
                                    {testimonial.author}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                    {testimonial.role}
                                </span>
                            </div>
                        </div>

                        {/* Puntos de navegación del carrusel */}
                        <div className="flex items-center gap-1.5">
                            {[...Array(totalTestimonials)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setIndex(idx)}
                                    aria-label={`Ver testimonio ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all ${currentIndex === idx
                                            ? 'w-6 bg-cyan-400'
                                            : 'w-1.5 bg-slate-600 hover:bg-slate-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Plataforma SSL Segura 256-bit</span>
                </span>
                <span>© 2026 RutaIA Academy</span>
            </div>
        </div>
    );
};