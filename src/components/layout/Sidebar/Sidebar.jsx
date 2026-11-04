// src/components/layout/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { 
    LayoutDashboard, 
    BookOpen, 
    BarChart2, 
    Award, 
    Heart, 
    User, 
    Users, 
    DollarSign, 
    UploadCloud,
    Network,
    Sun, 
    Moon, 
    LogOut 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

export const Sidebar = ({ role = 'student', currentRoute = '/app/dashboard' }) => {
    const { user, logout } = useAuth() || {};
    const { theme, toggleTheme } = useTheme() || {};
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const userRole = role || user?.role || 'student';
    const isInstructor = userRole === 'admin' || userRole === 'instructor';

    // Menú exclusivo para Alumnos (incluye Perfil)
    const studentNavItems = [
        { label: 'Dashboard', route: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Mis Cursos', route: '/app/mis-cursos', icon: BookOpen },
        { label: 'Métricas', route: '/app/metricas', icon: BarChart2 },
        { label: 'Certificados', route: '/app/certificados', icon: Award },
        { label: 'Favoritos', route: '/app/favoritos', icon: Heart },
        { label: 'Perfil', route: '/app/perfil', icon: User },
    ];

    // Menú exclusivo para Instructor / Administrador (sin Perfil)
    const instructorNavItems = [
        { label: 'Panel Instructor', route: '/instructor/dashboard', icon: LayoutDashboard },
        { label: 'Gestión de Cursos', route: '/instructor/cursos', icon: BookOpen },
        { label: 'Estudiantes', route: '/instructor/estudiantes', icon: Users },
        { label: 'Finanzas', route: '/instructor/finanzas', icon: DollarSign },
        { label: 'Ingesta n8n (RAG)', route: '/instructor/ingesta-n8n', icon: UploadCloud },
        { label: 'Grafo Qdrant', route: '/instructor/grafo-qdrant', icon: Network },
    ];

    const navItems = isInstructor ? instructorNavItems : studentNavItems;

    const handleConfirmLogout = async () => {
        try {
            if (logout) await logout();
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 flex flex-col justify-between p-4 shadow-sm z-30">
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center space-x-2 px-3 py-4 mb-2 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">RutaIA</span>
                        {isInstructor && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                                Profe / Admin
                            </span>
                        )}
                    </div>
                    <nav className="space-y-1 flex-1 overflow-y-auto pr-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentRoute === item.route;
                            return (
                                <a
                                    key={item.route}
                                    href={item.route}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                                        isActive
                                            ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0 bg-white dark:bg-slate-900">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-500" />}
                        <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
                    </button>
                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                                <LogOut size={24} />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">¿Deseas cerrar sesión?</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">Saldrás de tu cuenta activa.</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsLogoutModalOpen(false)} 
                                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleConfirmLogout} 
                                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-600 text-white"
                            >
                                Sí, salir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;