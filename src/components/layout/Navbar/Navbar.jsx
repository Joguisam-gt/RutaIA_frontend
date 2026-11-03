import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderControls from '../../common/HeaderControls'; // Si está en src/components/common/HeaderControls.jsx
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Inicio', path: '/' },
        { label: 'Cursos', path: '/catalog' },
        { label: 'Nosotros', path: '/about' },
        { label: 'Blog', path: '/blog' },
        { label: 'Planes', path: '/pricing' },
        { label: 'Contacto', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        setIsMobileMenuOpen(false);
        navigate(path);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                            RutaIA
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors cursor-pointer ${isActive(item.path)
                                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <HeaderControls />
                        <Link
                            to="/login"
                            className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/register"
                            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
                        >
                            Registrarse
                        </Link>
                    </div>

                    <div className="flex md:hidden items-center space-x-2">
                        <HeaderControls />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Abrir menú"
                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)
                                    ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2">
                        <Link
                            to="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-md"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-center py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;