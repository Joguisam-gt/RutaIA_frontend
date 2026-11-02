import React from 'react';
import { Edit3, Copy, Trash2, Eye, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '../../common/Button/Button';

export const InstructorCourseCard = ({ course, onEdit, onDuplicate, onDelete }) => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img
                        src={course.thumbnail || '/placeholder-course.jpg'}
                        alt={course.title}
                        className="w-20 h-14 rounded-2xl object-cover shrink-0 border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            {course.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 line-clamp-1">
                            {course.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            <span className="flex items-center gap-1">
                                <Users size={12} /> {course.studentsCount || 0} estudiantes
                            </span>
                            <span className="flex items-center gap-1">
                                <Star size={12} className="text-amber-400 fill-amber-400" /> {course.rating || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                                <BookOpen size={12} /> {course.lessonsCount || 0} lecciones
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                    <Button
                        variant="outline"
                        size="sm"
                        icon={Edit3}
                        onClick={() => onEdit(course.id)}
                    >
                        Editar
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        icon={Copy}
                        onClick={() => onDuplicate(course.id)}
                    >
                        Duplicar
                    </Button>

                    <Button
                        variant="danger"
                        size="sm"
                        icon={Trash2}
                        onClick={() => onDelete(course.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCourseCard;