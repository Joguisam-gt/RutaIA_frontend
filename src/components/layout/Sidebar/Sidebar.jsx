import React from 'react';
import { LayoutDashboard, BookOpen, Heart, Award, Settings, Users, DollarSign, PlusCircle } from 'lucide-react';

export const Sidebar = ({ currentRoute = '', role = 'student' }) => {
    const studentLinks = [
        { label: 'Mi Panel', route: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Mis Cursos', route: '/app/mis-cursos', icon: BookOpen },
        { label: 'Lista de Deseos', route: '/app/favoritos', icon: Heart },
        { label: 'Certificados', route: '/app/certificados', icon: Award },
        { label: 'Configuración', route: '/app/perfil', icon: Settings },
    ];

    const instructorLinks = [
        { label: 'Dashboard', route: '/instructor/dashboard', icon: LayoutDashboard },
        { label: 'Mis Cursos', route: '/instructor/cursos', icon: BookOpen },
        { label: 'Nuevo Curso', route: '/instructor/cursos/nuevo', icon: PlusCircle },
        { label: 'Estudiantes', route: '/instructor/estudiantes', icon: Users },
        { label: 'Finanzas', route: '/instructor/finanzas', icon: DollarSign },
    ];

    const links = role === 'instructor' ? instructorLinks : studentLinks;

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-65px)] p-4 hidden md:block">
            <div className="space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentRoute === link.route;

                    return (
                        <a
                            key={link.route}
                            href={link.route}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                        >
                            <Icon size={18} />
                            <span>{link.label}</span>
                        </a>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;