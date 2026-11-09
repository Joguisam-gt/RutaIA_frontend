import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export const ClassroomFocusNavbar = ({
    courseTitle = 'Arquitectura Backend y APIs REST',
    progressPercentage = 0,
    backRoute = '/app/mis-cursos',
}) => {
    const themeContext = useTheme();
    const theme = themeContext?.theme;
    const toggleTheme = themeContext?.toggleTheme;

    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
            <div className="flex items-center gap-4">
                <Link
                    to={backRoute}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Volver a Mis Cursos"
                >
                    <ArrowLeft size={18} />
                </Link>

                <div className="border-l border-slate-800 pl-4">
                    <h1 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                        {courseTitle}
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-24 sm:w-32 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[11px] font-semibold">
                    <CheckCircle2 size={14} />
                    <span>Modo Enfoque</span>
                </div>

                {toggleTheme && (
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                        aria-label="Cambiar tema"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                )}
            </div>
        </header>
    );
};

export default ClassroomFocusNavbar;