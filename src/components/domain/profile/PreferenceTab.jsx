import React from 'react';
import { Globe, Sun, Moon, Laptop, Save } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';

export const PreferencesTab = ({ preferences, onChange, onSave }) => {
    const { language, changeLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            {/* Selector de Idioma */}
            <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <Globe size={18} className="text-indigo-500" />
                    <span>Idioma de la Interfaz</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 max-w-md">
                    {[
                        { id: 'es', label: 'Español (Latinoamérica)', flag: '🇲🇽' },
                        { id: 'en', label: 'English (United States)', flag: '🇺🇸' },
                    ].map((lang) => (
                        <button
                            key={lang.id}
                            type="button"
                            onClick={() => {
                                onChange('language', lang.id);
                                changeLanguage(lang.id);
                            }}
                            className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2.5 ${language === lang.id
                                    ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-500 shadow-sm'
                                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                                }`}
                        >
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selector de Tema Visual (Dark / Light / System) */}
            <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <Sun size={18} className="text-amber-500" />
                    <span>Tema Visual de la Plataforma</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { id: 'light', label: 'Modo Claro', icon: Sun },
                        { id: 'dark', label: 'Modo Oscuro', icon: Moon },
                        { id: 'system', label: 'Sistema', icon: Laptop },
                    ].map((t) => {
                        const Icon = t.icon;
                        const isActive = theme === t.id;

                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => {
                                    onChange('theme', t.id);
                                    setTheme(t.id);
                                }}
                                className={`p-4 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-2 text-center ${isActive
                                        ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border-indigo-500 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-indigo-500' : 'text-slate-400'} />
                                <span>{t.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Botón Guardar Preferencias con degradado exclusivo */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={onSave}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <Save size={16} />
                    <span>Guardar Preferencias</span>
                </button>
            </div>
        </div>
    );
};