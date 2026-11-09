import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, CheckCircle2, Lock, Clock, BookOpen } from 'lucide-react';

export const CurriculumSidebar = ({
    modules = [],
    currentLessonSlug,
    courseSlug,
    onSelectLesson,
}) => {
    const defaultModules = [
        {
            id: 'mod-1',
            title: 'Módulo 1: Fundamentos y Entorno Node.js',
            lessons: [
                { slug: 'instalacion-entorno', title: '1. Configuración del Entorno Mac & Docker', duration: '12 min', isCompleted: true, isLocked: false },
                { slug: 'arquitectura-event-loop', title: '2. Entendiendo el Event Loop en V8', duration: '18 min', isCompleted: true, isLocked: false },
            ],
        },
        {
            id: 'mod-2',
            title: 'Módulo 2: Middlewares y Rutas en Express',
            lessons: [
                { slug: 'middlewares-avanzados', title: '3. Middlewares Globales y Manejo de Errores', duration: '25 min', isCompleted: false, isLocked: false },
                { slug: 'validacion-zod-express', title: '4. Validación de Esquemas con Zod', duration: '15 min', isCompleted: false, isLocked: false },
            ],
        },
        {
            id: 'mod-3',
            title: 'Módulo 3: Proyecto Capstone RAG Ingestion',
            lessons: [
                { slug: 'pipeline-vectorial-pgvector', title: '5. Pipeline Vectorial con pgvector', duration: '30 min', isCompleted: false, isLocked: true },
            ],
        },
    ];

    const list = modules.length > 0 ? modules : defaultModules;
    const [openModules, setOpenModules] = useState(['mod-1', 'mod-2']);

    const toggleModule = (id) => {
        setOpenModules((prev) =>
            prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-white flex flex-col h-full shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-indigo-400" />
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                        Índice del Curso
                    </h3>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    Temario Interactivo
                </span>
            </div>

            <div className="divide-y divide-slate-800/80 overflow-y-auto max-h-[600px] scrollbar-thin">
                {list.map((mod) => {
                    const isOpen = openModules.includes(mod.id);

                    return (
                        <div key={mod.id} className="bg-slate-900/40">
                            <button
                                onClick={() => toggleModule(mod.id)}
                                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-bold text-slate-200 hover:bg-slate-800/60 transition-colors"
                            >
                                <span className="pr-2">{mod.title}</span>
                                {isOpen ? <ChevronUp size={16} className="text-indigo-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-500 shrink-0" />}
                            </button>

                            {isOpen && (
                                <div className="bg-slate-950/60 divide-y divide-slate-900/50">
                                    {mod.lessons.map((les) => {
                                        const isActive = les.slug === currentLessonSlug;

                                        return (
                                            <button
                                                key={les.slug}
                                                disabled={les.isLocked}
                                                onClick={() => onSelectLesson(les.slug)}
                                                className={`w-full flex items-center justify-between p-3 text-left text-xs transition-colors ${isActive
                                                        ? 'bg-indigo-600/20 text-indigo-300 font-bold border-l-4 border-indigo-500'
                                                        : les.isLocked
                                                            ? 'opacity-40 cursor-not-allowed'
                                                            : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2.5 truncate pr-2">
                                                    {les.isCompleted ? (
                                                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                                    ) : les.isLocked ? (
                                                        <Lock size={14} className="text-slate-500 shrink-0" />
                                                    ) : (
                                                        <PlayCircle size={16} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                                                    )}
                                                    <span className="truncate">{les.title}</span>
                                                </div>

                                                <span className="text-[10px] text-slate-500 shrink-0 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {les.duration}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CurriculumSidebar;