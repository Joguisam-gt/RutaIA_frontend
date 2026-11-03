import React from 'react';
import { User, ShieldCheck, Mail, Lock, Eye } from 'lucide-react';

export const AuthFormColumn = () => {
    return (
        <div className="w-full flex items-center justify-center my-auto">
            <div className="w-full max-w-lg space-y-5">
                {/* Título y Subtítulo */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
                        Iniciar Sesión
                    </h1>
                    <p className="text-base text-slate-600 dark:text-slate-400 mt-1.5">
                        Ingresa tus credenciales para acceder a tu cuenta.
                    </p>
                </div>

                {/* Roles */}
                <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm"
                    >
                        <User className="w-5 h-5 text-indigo-500" />
                        <span>Estudiante</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-base font-bold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <span>Instructor</span>
                    </button>
                </div>

                {/* Botones Sociales */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all shadow-xs"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.32 7.33 24 12 24z" />
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                        </svg>
                        <span>Google</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all shadow-xs"
                    >
                        <svg className="w-5 h-5 fill-current text-slate-900 dark:text-slate-100" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                    </button>
                </div>

                {/* Separador */}
                <div className="relative flex items-center justify-center my-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <span className="relative px-3 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                        O con tu correo
                    </span>
                </div>

                {/* Formulario */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-base font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="email"
                                placeholder="tu.correo@ejemplo.com"
                                className="w-full pl-11 pr-4 py-3 rounded-xl text-base bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-base font-bold text-slate-700 dark:text-slate-300">
                                Contraseña
                            </label>
                            <a href="/auth/olvide-contrasena" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                ¿Olvidaste la clave?
                            </a>
                        </div>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="password"
                                placeholder="••••••••••••"
                                className="w-full pl-11 pr-11 py-3 rounded-xl text-base bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <button
                                type="button"
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                title="Mostrar contraseña"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-base text-slate-600 dark:text-slate-400 font-medium">Recordar mi sesión</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                        <span>Ingresar como Estudiante</span>
                    </button>
                </form>

                <div className="mt-4 text-center text-base text-slate-500 dark:text-slate-400">
                    <span>¿Aún no tienes cuenta? </span>
                    <a href="/registro" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Regístrate gratis
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthFormColumn;