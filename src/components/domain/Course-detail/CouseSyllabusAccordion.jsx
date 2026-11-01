import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Lock, FileText, Clock } from 'lucide-react';

export const CourseSyllabusAccordion = ({ modules = [], onSelectPreviewLesson }) => {
    const [openModules, setOpenModules] = useState([0]); // Primer módulo abierto por defecto

    const toggleModule = (index) => {
        setOpenModules((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const defaultModules = [
        {
            title: 'Módulo 1: Fundamentos y Entorno de Trabajo',
            lessons: [
                { title: '1.1 Bienvenida e Instalación del Entorno', duration: '08:30', isFree: true, type: 'video' },
                { title: '1.2 Estructura del Proyecto y Arquitectura', duration: '12:15', isFree: true, type: 'video' },
                { title: '1.3 Lectura: Guía de Estilos y Buenas Prácticas', duration: '05:00', isFree: false, type: 'article' },
            ],
        },
        {
            title: 'Módulo 2: Componentes y Gestión de Estado',
            lessons: [
                { title: '2.1 Hooks Avanzados en React', duration: '15:45', isFree: false, type: 'video' },
                { title: '2.2 Implementación de Zustand y Context API', duration: '20:10', isFree: false, type: 'video' },
            ],
        },
    ];

    const syllabusList = modules.length > 0 ? modules : defaultModules;

    return (
        <div className="mb-10">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
                Contenido del curso
            </h3>

            <div className="space-y-3">
                {syllabusList.map((mod, idx) => {
                    const isOpen = openModules.includes(idx);
                    return (
                        <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                            <button
                                onClick={() => toggleModule(idx)}
                                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                            >
                                <span>{mod.title}</span>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <span className="text-[11px] font-normal">{mod.lessons?.length || 0} clases</span>
                                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                                    {mod.lessons.map((lesson, lIdx) => (
                                        <div key={lIdx} className="flex items-center justify-between p-3.5 text-xs text-slate-700 dark:text-slate-300">
                                            <div className="flex items-center gap-2.5">
                                                {lesson.type === 'video' ? (
                                                    <Play size={14} className="text-indigo-500" />
                                                ) : (
                                                    <FileText size={14} className="text-violet-500" />
                                                )}
                                                <span>{lesson.title}</span>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                {lesson.isFree ? (
                                                    <button
                                                        onClick={() => onSelectPreviewLesson(lesson)}
                                                        className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                                                    >
                                                        Vista Previa Gratis
                                                    </button>
                                                ) : (
                                                    <Lock size={14} className="text-slate-400" />
                                                )}
                                                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                                                    <Clock size={12} />
                                                    {lesson.duration}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};