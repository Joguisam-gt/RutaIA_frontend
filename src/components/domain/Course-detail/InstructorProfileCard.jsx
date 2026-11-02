import React from 'react';
import { Star, Award, Users, PlayCircle } from 'lucide-react';

export const InstructorProfileCard = ({ instructor }) => {
    const defaultInstructor = {
        name: 'José Guillermo Rodríguez Samcam',
        title: 'Full-Stack Software Engineer & UI/UX Designer',
        bio: 'Ingeniero especializado en desarrollo de software con Node.js, Express, Strapi API, bases de datos e Inteligencia Artificial. Diseñador de planes de formación práctica en RutaIA.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        rating: 4.9,
        students: 54000,
        coursesCount: 8,
    };

    const data = instructor || defaultInstructor;

    return (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-10">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
                Instructor del curso
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                />

                <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{data.name}</h4>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 block mb-2">{data.title}</span>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="text-amber-500 fill-amber-500" />
                            <span>{data.rating} Valoración</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={14} className="text-cyan-500" />
                            <span>{data.students} Alumnos</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PlayCircle size={14} className="text-violet-500" />
                            <span>{data.coursesCount} Cursos</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {data.bio}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfileCard;