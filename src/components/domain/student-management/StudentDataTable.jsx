import React from 'react';
import { Mail, BookOpen, Clock, Award, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';

export const StudentDataTable = ({
    students = [],
    onOpenDetail,
    onOpenMessageModal,
}) => {
    const defaultStudents = [
        {
            id: 'st-101',
            name: 'Carlos Mendoza',
            email: 'carlos.mendoza@dev.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
            courseTitle: 'Arquitectura Backend y APIs REST',
            progressPercentage: 62,
            lastLessonTitle: 'Middlewares de Error Globales',
            lastActivityDate: 'Hace 2 horas',
            status: 'active',
            isCertified: false,
        },
        {
            id: 'st-102',
            name: 'Valeria Gómez',
            email: 'valeria.gomez@tech.io',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
            courseTitle: 'Bases de Datos Vectoriales con pgvector',
            progressPercentage: 100,
            lastLessonTitle: 'Proyecto Final Capstone Pipeline RAG',
            lastActivityDate: 'Ayer',
            status: 'completed',
            isCertified: true,
        },
        {
            id: 'st-103',
            name: 'Roberto Ramírez',
            email: 'roberto.r@code.org',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
            courseTitle: 'Arquitectura Backend y APIs REST',
            progressPercentage: 25,
            lastLessonTitle: 'Configuración de Entorno V8',
            lastActivityDate: 'Hace 16 días',
            status: 'at_risk',
            isCertified: false,
        },
    ];

    const list = students.length > 0 ? students : defaultStudents;

    const renderStatusBadge = (status, isCertified) => {
        if (isCertified || status === 'completed') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    <Award size={12} />
                    <span>Completado</span>
                </span>
            );
        }
        if (status === 'at_risk') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30">
                    <AlertTriangle size={12} />
                    <span>En Riesgo ({'>'}14d)</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span>Activo</span>
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/50">
                            <th className="py-3.5 px-4">Estudiante</th>
                            <th className="py-3.5 px-4">Curso Matriculado</th>
                            <th className="py-3.5 px-4">Progreso</th>
                            <th className="py-3.5 px-4">Última Lección Vista</th>
                            <th className="py-3.5 px-4">Última Actividad</th>
                            <th className="py-3.5 px-4">Estado</th>
                            <th className="py-3.5 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                        {list.map((st) => (
                            <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                                {/* Estudiante & Avatar */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={st.avatar}
                                            alt={st.name}
                                            className="w-9 h-9 rounded-full object-cover border border-indigo-500 shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <span className="font-bold text-slate-900 dark:text-slate-100 block truncate">
                                                {st.name}
                                            </span>
                                            <span className="text-[10px] text-slate-400 block truncate">
                                                {st.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Curso */}
                                <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                    <span className="truncate block max-w-xs">{st.courseTitle}</span>
                                </td>

                                {/* Progreso Porcentual */}
                                <td className="py-3.5 px-4">
                                    <div className="space-y-1 w-32">
                                        <div className="flex items-center justify-between text-[11px] font-bold">
                                            <span className="text-slate-700 dark:text-slate-300">{st.progressPercentage}%</span>
                                        </div>
                                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${st.progressPercentage === 100 ? 'bg-cyan-500' : 'bg-indigo-600'
                                                    }`}
                                                style={{ width: `${st.progressPercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>

                                {/* Última Lección Vista */}
                                <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                                        <BookOpen size={13} className="text-indigo-500 shrink-0" />
                                        <span className="truncate">{st.lastLessonTitle}</span>
                                    </div>
                                </td>

                                {/* Fecha Actividad */}
                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} className="text-slate-400" />
                                        <span>{st.lastActivityDate}</span>
                                    </div>
                                </td>

                                {/* Badge Estado */}
                                <td className="py-3.5 px-4">
                                    {renderStatusBadge(st.status, st.isCertified)}
                                </td>

                                {/* Botón de Mensaje Privado y Ver Expediente */}
                                <td className="py-3.5 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <button
                                            onClick={() => onOpenMessageModal(st)}
                                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            title="Enviar mensaje privado"
                                        >
                                            <Mail size={16} />
                                        </button>
                                        <button
                                            onClick={() => onOpenDetail(st)}
                                            className="p-1.5 rounded-xl text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            title="Ver expediente académico"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDataTable;