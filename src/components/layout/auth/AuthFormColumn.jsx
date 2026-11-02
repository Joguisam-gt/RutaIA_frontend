import React from 'react';
import { ArrowLeft, Code2 } from 'lucide-react';
import { HeaderControls } from '../../common/HeaderControls';

export const AuthFormColumn = ({ children, backUrl = '/', backText = 'Volver al inicio' }) => {
    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-between min-h-screen p-6 md:p-12 bg-slate-50 dark:bg-slate-950 transition-colors">
            {/* Top Header Controls (Navegación Móvil / Desktop) */}
            <header className="flex items-center justify-between mb-8">
                <a
                    href={backUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>{backText}</span>
                </a>

                {/* Logo exclusivo visible en vista Móvil */}
                <div className="flex lg:hidden items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                        <Code2 size={18} />
                    </div>
                    <span className="text-base font-black tracking-tight text-slate-900 dark:text-slate-50">
                        RutaIA
                    </span>
                </div>

                {/* Controles de Tema Oscuro/Claro e Idioma */}
                <HeaderControls />
            </header>

            {/* Contenedor central enfocado para Formularios (Login, Registro, Recuperar Password) */}
            <main className="w-full max-w-md mx-auto my-auto py-6">
                {children}
            </main>

            {/* Footer Móvil / Legal */}
            <footer className="text-center text-[11px] text-slate-400 dark:text-slate-500 pt-6">
                <span>Al continuar, aceptas nuestros </span>
                <a href="/terminos-y-condiciones" className="underline hover:text-indigo-500">
                    Términos de Servicio
                </a>
                <span> y </span>
                <a href="/politica-de-privacidad" className="underline hover:text-indigo-500">
                    Política de Privacidad
                </a>
                .
            </footer>
        </div>
    );
};