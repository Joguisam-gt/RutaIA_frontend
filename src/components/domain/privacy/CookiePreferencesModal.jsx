import React from 'react';
import { X, Cookie, ShieldCheck, Check, Info } from 'lucide-react';

export const CookiePreferencesModal = ({
    isOpen,
    onClose,
    preferences,
    onToggle,
    onSave,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center border border-amber-200 dark:border-amber-800">
                            <Cookie size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                                Preferencias de Cookies
                            </h3>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Personaliza la recolección de datos técnicos
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Opciones de Cookies */}
                <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-1">
                    {/* Esenciales */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                                Cookies Esenciales (Requeridas)
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                Necesarias para mantener tu sesión activa y asegurar la autenticación en la plataforma.
                            </p>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                            Siempre Activas
                        </div>
                    </div>

                    {/* Analíticas */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div className="pr-4">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                                Rendimiento y Analítica
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                Nos permiten evaluar métricas de uso anónimas para mejorar las lecciones e interfaz.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onToggle('analytics')}
                            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${preferences.analytics ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                                }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${preferences.analytics ? 'right-1' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Personalización por IA */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div className="pr-4">
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                                Personalización con IA RAG
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                Adapta las sugerencias del tutor virtual en función de tus rutas de estudio previas.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onToggle('aiPersonalization')}
                            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${preferences.aiPersonalization ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                                }`}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${preferences.aiPersonalization ? 'right-1' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Footer y Guardado */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                    >
                        <Check size={14} />
                        <span>Guardar Preferencias</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePreferencesModal;