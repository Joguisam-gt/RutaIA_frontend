import React from 'react';
import { Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ContextualCourseBanner = ({ course }) => {
    const defaultCourse = {
        title: 'Aprende Node.js, Express y MongoDB de Cero a Producción',
        category: 'Backend & APIs',
        price: 29.99,
        slug: 'backend-profesional-nodejs-express-nosql',
    };

    const data = course || defaultCourse;

    return (
        <div className="my-10 p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2">
                <Rocket size={16} />
                <span>Curso Afín Recomendado</span>
            </div>

            <h3 className="text-lg font-bold text-slate-50 mb-2">
                {data.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Domina los conceptos explicados en este artículo mediante ejercicios prácticos, mentoría y certificación oficial.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 size={14} />
                    <span>Acceso Ilimitado 24/7</span>
                </div>

                {/* Botón con degradado exclusivo */}
                <a
                    href={`/cursos/${data.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/30 transition-all"
                >
                    <span>Inscribirme por ${data.price} USD</span>
                    <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
};

export default ContextualCourseBanner;