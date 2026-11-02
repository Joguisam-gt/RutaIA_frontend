import React, { useState, useRef, useEffect } from 'react';
import { Search, HelpCircle, X, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const FaqHeroSearch = ({
    searchValue,
    onSearchChange,
    suggestions,
    isSearchingSuggestions,
}) => {
    const { t } = useLanguage();
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="py-12 md:py-16 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="container mx-auto px-4 max-w-3xl text-center">
                {/* Badge Superior */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-4">
                    <HelpCircle size={14} className="text-violet-500" />
                    <span>Centro de Ayuda & Preguntas Frecuentes</span>
                </div>

                {/* Título H1 (Sin degradado en texto) */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
                    ¿En qué podemos ayudarte hoy?
                </h1>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                    Encuentra respuestas inmediatas sobre nuestras rutas de formación, pagos, certificados y requisitos de la plataforma.
                </p>

                {/* Input Amplio de Búsqueda Predictiva */}
                <div className="relative max-w-2xl mx-auto" ref={containerRef}>
                    <div className="relative flex items-center shadow-lg rounded-2xl">
                        <Search size={20} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => {
                                onSearchChange(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Escribe tu duda (ej. certificados, métodos de pago, reembolso, Python)..."
                            className="w-full pl-12 pr-12 py-4 rounded-2xl text-xs md:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
                        />
                        {isSearchingSuggestions ? (
                            <Loader2 size={18} className="absolute right-4 text-indigo-500 animate-spin" />
                        ) : searchValue ? (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={18} />
                            </button>
                        ) : null}
                    </div>

                    {/* Dropdown Predictivo en Tiempo Real */}
                    {showDropdown && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto text-left">
                            {suggestions.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onSearchChange(item.question);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 last:border-none"
                                >
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={14} className="text-indigo-500 shrink-0" />
                                        <span>{item.question}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md capitalize">
                                        {item.category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};