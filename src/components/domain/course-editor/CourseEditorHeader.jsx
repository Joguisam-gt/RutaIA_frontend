import React from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, Eye, AlertCircle } from 'lucide-react';

export const CourseEditorHeader = ({
    currentStep,
    onStepClick,
    saveStatus,
    lastSavedTime,
    courseId,
}) => {
    const steps = [
        { number: 1, label: 'Información Básica' },
        { number: 2, label: 'Temario & Contenido' },
        { number: 3, label: 'Precios & Accesos' },
        { number: 4, label: 'Revisión & Publicación' },
    ];

    return (
        <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white px-6 py-3 shadow-lg">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Regreso & Indicador de Guardado */}
                <div className="flex items-center gap-4 shrink-0">
                    <a
                        href="/instructor/cursos"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Volver a Gestión de Cursos"
                    >
                        <ArrowLeft size={18} />
                    </a>

                    <div>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                            Editor Wizard de Cursos
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-200">
                                Borrador del Curso
                            </span>

                            {/* Indicador de Auto-Save */}
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                                {saveStatus === 'saving' ? (
                                    <>
                                        <Loader2 size={10} className="animate-spin text-indigo-400" />
                                        <span>Guardando...</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={10} className="text-emerald-400" />
                                        <span>Guardado {lastSavedTime}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stepper Bar Superior */}
                <div className="flex items-center gap-1 md:gap-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80">
                    {steps.map((step) => {
                        const isActive = currentStep === step.number;
                        const isCompleted = currentStep > step.number;

                        return (
                            <button
                                key={step.number}
                                onClick={() => onStepClick(step.number)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isActive
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : isCompleted
                                            ? 'text-cyan-400 hover:bg-slate-900'
                                            : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-white text-indigo-600' : isCompleted ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                    {isCompleted ? '✓' : step.number}
                                </span>
                                <span className="hidden lg:inline">{step.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Vista Previa Botón Header */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <a
                        href={`/cursos/${courseId}?preview=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                        <Eye size={14} />
                        <span>Vista Previa</span>
                    </a>
                </div>
            </div>
        </header>
    );
};