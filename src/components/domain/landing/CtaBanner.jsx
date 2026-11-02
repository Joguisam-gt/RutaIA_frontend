import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CtaBanner = () => {
    return (
        <section className="relative overflow-hidden rounded-3xl bg-indigo-600 text-white p-8 md:p-14 shadow-xl border border-indigo-500/30">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    ¿Listo para transformar tu futuro profesional?
                </h2>
                <p className="text-sm md:text-base text-indigo-100 max-w-xl mx-auto">
                    Únete a la plataforma de aprendizaje con rutas guiadas e inteligencia artificial para dominar el desarrollo de software y tecnología.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <Link
                        to="/registro"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-indigo-600 font-extrabold text-xs hover:bg-slate-100 transition-colors shadow-md"
                    >
                        <span>Comenzar Ahora</span>
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/contacto"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-bold text-xs transition-colors border border-indigo-400/30"
                    >
                        <MessageSquare size={16} />
                        <span>Hablar con Soporte</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CtaBanner;