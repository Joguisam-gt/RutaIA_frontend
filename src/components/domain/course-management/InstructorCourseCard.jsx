// src/components/domain/course-management/InstructorCourseCard.jsx
import React from 'react';
import { Edit3, Copy, Trash2, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '../../common/Button/Button';

export const InstructorCourseCard = ({ course, onEdit, onDuplicate, onDelete }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700 flex flex-col h-full">
            
            {/* Cabecera: Imagen y Metadatos */}
            <div className="flex flex-col gap-4 mb-4 flex-1">
                <img
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500'}
                    alt={course.title}
                    className="w-full h-32 rounded-2xl object-cover border border-slate-100 dark:border-slate-800"
                />
                
                <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            {course.category}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {course.level}
                        </span>
                    </div>
                    
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 line-clamp-2 leading-snug mb-2">
                        {course.title}
                    </h3>

                    {/* Espaciador flexible para empujar estadisticas abajo */}
                    <div className="mt-auto flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="flex items-center gap-1">
                            <Users size={12} /> {course.studentsCount || course.enrolledCount || 1}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" /> {course.rating ? Number(course.rating).toFixed(1) : '5.0'}
                        </span>
                        <span className="flex items-center gap-1">
                            <BookOpen size={12} /> {course.durationHours || 20}h
                        </span>
                    </div>
                </div>
            </div>

            {/* Pie: Acciones (Botones emparejados al fondo) */}
            <div className="grid grid-cols-3 gap-2 shrink-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-[10px] h-8 px-0"
                    onClick={() => {
                        // Tolerancia si onEdit no se paso desde la pantalla superior
                        if (onEdit) onEdit(course.id);
                        else window.location.href = `/instructor/editor-curso/${course.id}`;
                    }}
                >
                    <Edit3 size={14} className="mr-1" /> Editar
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-[10px] h-8 px-0"
                    onClick={() => onDuplicate(course.id)}
                >
                    <Copy size={14} className="mr-1" /> Duplicar
                </Button>

                <Button
                    variant="danger"
                    size="sm"
                    className="w-full text-[10px] h-8 px-0"
                    onClick={() => onDelete(course.id)}
                >
                    <Trash2 size={14} className="mr-1" /> Eliminar
                </Button>
            </div>

        </div>
    );
};

export default InstructorCourseCard;