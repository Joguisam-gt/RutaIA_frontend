import React from 'react';
import { CourseCardWithHover } from '../../common/CourseCard/CourseCardWithHover';

export const RecommendedCoursesSection = ({ courses = [] }) => {
    if (!courses.length) return null;

    return (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">
                Cursos recomendados para ti
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCardWithHover key={course.id || course._id} course={course} />
                ))}
            </div>
        </div>
    );
};