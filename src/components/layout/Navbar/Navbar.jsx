import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';

export const Navbar = () => {
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();
    const { isAuthenticated, user, logout } = useAuth();
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm">
                        R
                    </span>
                    <span>RutaIA</span>
                </Link>

                {/* Navegación Pública y Paneles Protegidos */}
                <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
                    <Link
                        to="/cursos"
                        className={`transition-colors ${isActive('/cursos')
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                    >
                        {t('catalog')}
                    </Link>

                    <Link
                        to="/blog"
                        className={`transition-colors ${isActive('/blog')
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                    >
                        {t('blog')}
                    </Link>

                    <Link
                        to="/planes"
                        className={`transition-colors ${isActive('/planes')
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                    >
                        {t('plans')}
                    </Link>

                    <Link
                        to="/nosotros"
                        className={`transition-colors ${isActive('/nosotros')
                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                            }`}
                    >
                        {t('about')}
                    </Link>

                    {isAuthenticated && (
                        <>
                            <span className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                            {(user?.role === 'student' || !user?.role) && (
                                <Link
                                    to="/estudiante/dashboard"
                                    className={`transition-colors ${isActive('/estudiante/dashboard')
                                            ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                        }`}
                                >
                                    {t('studentPanel')}
                                </Link>
                            )}

                            {(user?.role === 'instructor' || !user?.role) && (
                                <Link
                                    to="/instructor/dashboard"
                                    className={`transition-colors ${isActive('/instructor/dashboard')
                                            ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                        }`}
                                >
                                    {t('instructorPanel')}
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                {/* Controles de Idioma, Tema y Sesión */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Cambiar Idioma"
                    >
                        <Globe size={14} />
                        <span className="uppercase">{language}</span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Cambiar Tema"
                    >
                        {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    </button>

                    <span className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            {t('logout')}
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                {t('login')}
                            </Link>
                            <Link
                                to="/registro"
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                            >
                                {t('register')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;