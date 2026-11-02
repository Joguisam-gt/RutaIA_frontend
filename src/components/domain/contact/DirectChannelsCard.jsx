import React from 'react';
import { Mail, MessageSquare, Clock, Globe, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';

export const DirectChannelsCard = () => {
    return (
        <aside className="space-y-6">
            {/* Tarjeta de Canales de Atención Directa */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    Canales Directos de Atención
                </h3>

                <div className="space-y-5">
                    {/* Email Soporte */}
                    <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800">
                            <Mail size={18} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                Soporte Académico & General
                            </span>
                            <a href="mailto:soporte@rutaia.edu" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                soporte@rutaia.edu
                            </a>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Respuesta en menos de 24h</span>
                        </div>
                    </div>

                    {/* Email Ventas B2B */}
                    <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 border border-violet-200 dark:border-violet-800">
                            <Globe size={18} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                Ventas & Licencias B2B
                            </span>
                            <a href="mailto:empresas@rutaia.edu" className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
                                empresas@rutaia.edu
                            </a>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Atención corporativa personalizada</span>
                        </div>
                    </div>

                    {/* Chat en Vivo */}
                    <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200 dark:border-cyan-800">
                            <MessageSquare size={18} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                Chat en Vivo Asistido por IA
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.RutaIaChat) window.RutaIaChat.open();
                                }}
                                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                            >
                                <span>Iniciar Chat Inmediato</span>
                                <Sparkles size={12} />
                            </button>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Disponible 24/7 en la plataforma</span>
                        </div>
                    </div>
                </div>

                {/* Horarios de Atención Humana */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock size={14} className="text-slate-400 shrink-0" />
                    <span>Atención Humana: Lunes a Viernes (8:00 - 18:00 CST)</span>
                </div>
            </div>

            {/* Redes Sociales Profesionales */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Comunidad & Redes
                </h4>
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="GitHub"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 transition-colors"
                        title="LinkedIn"
                    >
                        <Linkedin size={18} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="Twitter / X"
                    >
                        <Twitter size={18} />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default DirectChannelsCard;