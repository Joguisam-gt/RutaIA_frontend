import React from 'react';
import { Search, HelpCircle, X } from 'lucide-react';

export const FaqHeroSearch = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                    <HelpCircle size={14} />
                    <span>Centro de Ayuda</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                    ¿En qué podemos ayudarte hoy?
                </h1>

                <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    Busca entre nuestras preguntas frecuentes o navega por las categorías para encontrar respuestas inmediatas.
                </p>

                <div className="relative max-w-xl mx-auto pt-2">
                    <div className="relative flex items-center">
                        <Search size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery || ''}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Buscar por palabra clave, tema o duda..."
                            className="w-full pl-11 pr-10 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => onSearchChange('')}
                                className="absolute right-3.5 p-1 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqHeroSearch;