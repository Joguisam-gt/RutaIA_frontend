import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

export const StudentReviewsSection = ({ reviews = [] }) => {
    const defaultReviews = [
        {
            name: 'Carlos Martínez',
            date: 'Hace 2 semanas',
            rating: 5,
            comment: 'El mejor curso de desarrollo web que he tomado. El enfoque práctico y las explicaciones de la arquitectura son impecables.',
        },
        {
            name: 'Elena Rostova',
            date: 'Hace 1 mes',
            rating: 5,
            comment: 'La integración con la API y los ejemplos del mundo real me permitieron aplicar los conceptos de inmediato en mi trabajo.',
        },
    ];

    const items = reviews.length > 0 ? reviews : defaultReviews;

    return (
        <div className="mb-10">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
                Opiniones de estudiantes
            </h3>

            <div className="space-y-4">
                {items.map((rev, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.name}</span>
                            <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 mb-2">
                            {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={14} className="fill-amber-500" />
                            ))}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                            "{rev.comment}"
                        </p>

                        <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-indigo-500 transition-colors">
                            <ThumbsUp size={12} />
                            <span>Útil</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentReviewsSection;