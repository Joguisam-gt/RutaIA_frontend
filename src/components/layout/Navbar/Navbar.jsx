import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

export const Navbar = ({ role = 'student', brandTitle = 'RutaIA' }) => {
    const auth = useAuth();
    const themeContext = useTheme();

    const user = auth?.user;
    const logout = auth?.logout;
    const theme = themeContext?.theme;
    const toggleTheme = themeContext?.toggleTheme;

    return (
        <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xl tracking-tight"
                    >
                        <div className="p-2 bg-indigo-600 text-white rounded-xl">
                            <BookOpen size={18} />
                        </div>
                        <span>{brandTitle}</span>
                    </Link>

                    {role === 'instructor' && (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full">
                            Panel Instructor
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {toggleTheme && (
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Cambiar tema"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}

                    {user ? (
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                            <Link
                                to={role === 'instructor' ? '/instructor/perfil' : '/app/perfil'}
                                className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black border border-indigo-200 dark:border-indigo-800">
                                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                                </div>
                                <span className="hidden sm:inline">{user.name || 'Usuario'}</span>
                            </Link>

                            {logout && (
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={18} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/registro"
                                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;