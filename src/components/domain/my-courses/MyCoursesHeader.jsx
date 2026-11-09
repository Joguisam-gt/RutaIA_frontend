import React from 'react';
import { Clock, Award, BookCheck, GraduationCap } from 'lucide-react';

export const MyCoursesHeader = ({ stats }) => {
    const data = stats || { totalHours: 0, completedCourses: 0, certificatesEarned: 0 };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-8">
            <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                    <GraduationCap size={14} />
                    <span>Biblioteca Académica</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                    Mi Aprendizaje
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    Gestiona tus cursos matriculados, retoma lecciones pendientes y consulta tus certificados.
                </p>
            </div>

            {/* Tarjetas de Resumen Metrico */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800">
                        <Clock size={20} />
                    </div>
                    <div>
                        <span className="text-base font-black text-slate-900 dark:text-slate-50 block leading-none mb-1">
                            {data.totalHours}h
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Horas Estudiadas
                        </span>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                        <Award size={20} />
                    </div>
                    <div>
                        <span className="text-base font-black text-slate-900 dark:text-slate-50 block leading-none mb-1">
                            {data.certificatesEarned}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Certificados
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCoursesHeader;
