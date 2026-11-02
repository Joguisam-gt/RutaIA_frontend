import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { HeaderControls } from '../../common/HeaderControls';

export const ClassroomFocusNavbar = ({
    courseTitle = 'Arquitectura Backend y APIs REST',
    lessonTitle = 'Mapeo de Rutas Avanzado y Middlewares',
    globalProgress = 65,
    completedLessons = 14,
    totalLessons = 24,
}) => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800 text-white px-4 py-3 transition-colors">
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Regreso a Mis Cursos */}
                <div className="flex items-center gap-4 min-w-0">
                    <a
                        href="/app/mis-cursos"
                        className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors shrink-0 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60"
                        title="Volver a la biblioteca de Mis Cursos"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">Mis Cursos</span>
                    </a>

                    {/* Título de la Lección y del Curso */}
                    <div className="min-w-0">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider truncate block">
                            {courseTitle}
                        </span>
                        <h1 className="text-xs md:text-sm font-extrabold text-slate-50 truncate">
                            {lessonTitle}
                        </h1>
                    </div>
                </div>

                {/* Progreso Global en Porcentaje y Controles */}
                <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex items-center gap-3">
                        <div className="text-right">
                            <span className="text-xs font-bold text-slate-200 block">
                                {globalProgress}% Completado
                            </span>
                            <span className="text-[10px] text-slate-400">
                                {completedLessons} de {totalLessons} lecciones
                            </span>
                        </div>

                        <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700/50">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-300"
                                style={{ width: `${globalProgress}%` }}
                            />
                        </div>
                    </div>

                    <HeaderControls />
                </div>
            </div>
        </header>
    );
};