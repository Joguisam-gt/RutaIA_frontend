import React from 'react';
import { Sun, Moon, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';

export const HeaderControls = ({ showBack = true, onBack }) => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
            {showBack ? (
                <button
                    onClick={onBack || (() => window.history.back())}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>{t('back')}</span>
                </button>
            ) : (
                <div />
            )}

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Cambiar Idioma"
                >
                    <Globe size={14} />
                    <span className="uppercase">{language}</span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Cambiar Tema"
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>
        </div>
    );
};

export default HeaderControls;