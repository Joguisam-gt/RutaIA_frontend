import React from 'react';
import { Globe, Sun, Moon, Save } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export const PreferenceTab = ({ preferences = {}, onChange, onSave }) => {
    const { theme, toggleTheme } = useTheme() || {};

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Globe size={18} className="text-indigo-600" />
                    <span>Preferencias de la Plataforma</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Personaliza la apariencia visual y las configuraciones de tu entorno de aprendizaje.
                </p>
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Tema Visual</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Selecciona el esquema de colores de la interfaz (Claro u Oscuro).
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {theme === 'dark' ? (
                            <>
                                <Sun size={14} className="text-amber-400" />
                                <span>Modo Claro</span>
                            </>
                        ) : (
                            <>
                                <Moon size={14} className="text-indigo-600" />
                                <span>Modo Oscuro</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Idioma de Interfaz</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Idioma principal para las lecciones y controles de navegación.
                        </p>
                    </div>
                    <select
                        value={preferences.language || 'es'}
                        onChange={(e) => onChange && onChange('language', e.target.value)}
                        className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                    >
                        <option value="es">Español (ES)</option>
                        <option value="en">English (EN)</option>
                    </select>
                </div>
            </div>

            {onSave && (
                <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={onSave}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                        <Save size={14} />
                        <span>Guardar Preferencias</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PreferenceTab;