import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Clock, MessageSquare, BookOpen, Mail, Award, Loader2 } from 'lucide-react';

export const StudentDetailModal = ({
    student,
    detailData,
    isLoading,
    onClose,
    onOpenMessage,
}) => {
    if (!student) return null;

    const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'qa'

    const defaultDetail = {
        modulesProgress: [
            {
                title: 'Módulo 1: Fundamentos y Entorno Node.js',
                completedLessons: 4,
                totalLessons: 4,
                isCompleted: true,
            },
            {
                title: 'Módulo 2: Middlewares y Rutas en Express',
                completedLessons: 3,
                totalLessons: 5,
                isCompleted: false,
            },
            {
                title: 'Módulo 3: Proyecto Capstone RAG Ingestion',
                completedLessons: 0,
                totalLessons: 3,
                isCompleted: false,
            },
        ],
        qaHistory: [
            {
                id: 'q-1',
                lessonTitle: 'Middlewares de Error Globales',
                question: '¿Por qué Express requiere 4 parámetros en el middleware de error?',
                askedDate: '28 Oct, 2026',
                isAnswered: true,
            },
        ],
    };

    const data = detailData || defaultDetail;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Header Modal Expediente */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shrink-0"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                                    Expediente Académico — {student.name}
                                </h3>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">
                                {student.email} • Matriculado en <strong className="text-indigo-600 dark:text-indigo-400">{student.courseTitle}</strong>
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {isLoading ? (
                    <div className="py-16 text-center text-slate-400">
                        <Loader2 size={32} className="text-indigo-500 animate-spin mx-auto mb-2" />
                        <span className="text-xs font-semibold">Cargando avance detallado del estudiante...</span>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Banner Resumen de Progreso */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                                    Progreso Global del Curso
                                </span>
                                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                                    {student.progressPercentage}% Completado
                                </span>
                            </div>

                            {/* Botón Acción Enviar Mensaje con degradado exclusivo */}
                            <button
                                onClick={() => {
                                    onClose();
                                    onOpenMessage(student);
                                }}
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                            >
                                <Mail size={14} />
                                <span>Mensaje Privado</span>
                            </button>
                        </div>

                        {/* Pestañas internas: Avance por Módulos vs Historial Q&A */}
                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                            <button
                                onClick={() => setActiveTab('modules')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'modules'
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                <BookOpen size={14} />
                                <span>Avance por Módulos</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('qa')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'qa'
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                <MessageSquare size={14} />
                                <span>Historial de Preguntas Q&A</span>
                            </button>
                        </div>

                        {/* Contenido Pestaña Módulos */}
                        {activeTab === 'modules' ? (
                            <div className="space-y-3">
                                {data.modulesProgress.map((mod, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2"
                                    >
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                                {mod.isCompleted ? (
                                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                                ) : (
                                                    <Clock size={16} className="text-indigo-500" />
                                                )}
                                                <span>{mod.title}</span>
                                            </span>
                                            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                                {mod.completedLessons} / {mod.totalLessons} lecciones
                                            </span>
                                        </div>

                                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${mod.isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                                                    }`}
                                                style={{ width: `${(mod.completedLessons / mod.totalLessons) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Contenido Pestaña Historial Q&A */
                            <div className="space-y-3">
                                {data.qaHistory.map((q) => (
                                    <div
                                        key={q.id}
                                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                                            <span className="font-bold text-indigo-600 dark:text-indigo-400">{q.lessonTitle}</span>
                                            <span>{q.askedDate}</span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                            "{q.question}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};