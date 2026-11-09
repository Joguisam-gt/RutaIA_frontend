import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const levelLabel = {
    PRINCIPIANTE: { label: "Principiante", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
    INTERMEDIO:   { label: "Intermedio",   color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
    AVANZADO:     { label: "Avanzado",     color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" },
};

export const CourseCard = ({ course }) => {
    const { _id, id, title, description, category, level, durationHours, price } = course;
    const courseId = _id || id;

    const lvl = levelLabel[level?.toUpperCase()] || { label: level || "—", color: "bg-slate-100 text-slate-500" };
    const isFree = price === 0 || price === undefined || price === null;
    const priceDisplay = isFree ? "Gratis" : `$${Number(price).toFixed(2)} USD`;

    return (
        <div className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex flex-1 flex-col p-5">
                {/* Categoría y nivel */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {category && (
                        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                            {category}
                        </span>
                    )}
                    {category && level && <span className="text-slate-300 dark:text-slate-600">·</span>}
                    {level && (
                        <span className={"text-xs font-semibold px-2 py-0.5 rounded-full " + lvl.color}>
                            {lvl.label}
                        </span>
                    )}
                </div>

                {/* Título */}
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>

                {/* Descripción */}
                {description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                        {description}
                    </p>
                )}

                {/* Duración */}
                {durationHours && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
                        <Clock size={13} />
                        <span>{durationHours}h de contenido</span>
                    </div>
                )}

                {/* Footer: precio + botón */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className={"text-2xl font-extrabold " + (isFree ? "text-emerald-500" : "text-slate-900 dark:text-slate-50")}>
                        {priceDisplay}
                    </span>
                    <Link
                        to={courseId ? `/curso/${courseId}` : '/catalog'}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-90 shadow-md shadow-indigo-500/20 transition-all"
                    >
                        <span>Ver Curso</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
