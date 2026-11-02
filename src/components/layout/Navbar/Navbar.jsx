import React from 'react';
import { HeaderControls } from '../../common/HeaderControls';
import { ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const Navbar = ({ role = 'student', brandTitle = 'RutaIA' }) => {
    return (
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <a href={role === 'instructor' ? '/instructor/dashboard' : '/app/dashboard'} className="flex items-center gap-2 text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                    {role === 'instructor' && <ShieldCheck size={20} className="text-violet-500" />}
                    <span>{brandTitle}</span>
                </a>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
                        {role === 'student' ? (
                            <>
                                <a href="/app/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mi Panel</a>
                                <a href="/app/mis-cursos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Mis Cursos</a>
                                <a href="/app/favoritos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Favoritos</a>
                            </>
                        ) : (
                            <>
                                <a href="/instructor/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Dashboard</a>
                                <a href="/instructor/cursos" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cursos</a>
                                <a href="/instructor/estudiantes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Estudiantes</a>
                                <a href="/instructor/finanzas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Finanzas</a>
                            </>
                        )}
                    </nav>
                    <HeaderControls />
                </div>
            </div>
        </header>
    );
};

export default Navbar;