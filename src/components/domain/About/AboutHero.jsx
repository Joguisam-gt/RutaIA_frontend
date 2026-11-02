import React from 'react';
import { Target, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutHero = () => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-14 text-white shadow-xl">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                    <Sparkles size={14} />
                    <span>Transformando la Educación Tech</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
                    Empoderando a la próxima generación de profesionales en tecnología
                </h1>

                <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    En RutaIA combinamos metodologías de aprendizaje adaptativo e inteligencia artificial para ofrecer rutas de estudio efectivas, diseñadas para responder a las exigencias reales de la industria tecnológica.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        to="/catalogo"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-600/20"
                    >
                        <span>Explorar Cursos</span>
                        <ArrowRight size={16} />
                    </Link>
                    <a
                        href="#pilares"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700"
                    >
                        <Target size={16} />
                        <span>Nuestros Pilares</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;