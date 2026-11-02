import React from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Star, PlusCircle } from 'lucide-react';

export const RecommendationsCarousel = ({
    recommendations = [],
    currentIndex = 0,
    onNext,
    onPrev,
}) => {
    const defaultRecs = [
        {
            id: 'rec-1',
            title: 'Agentes de IA y Orquestación RAG con n8n y LangChain',
            category: 'Artificial Intelligence',
            rating: 4.9,
            students: '1,420 alumnos',
            price: '$39 USD',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
        },
        {
            id: 'rec-2',
            title: 'Desarrollo de Aplicaciones Móviles con React Native y Expo',
            category: 'Mobile Dev',
            rating: 4.8,
            students: '2,100 alumnos',
            price: '$45 USD',
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        },
    ];

    const items = recommendations.length > 0 ? recommendations : defaultRecs;
    const activeItem = items[currentIndex % items.length];

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-cyan-500" />
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                        Recomendados para ti
                    </h3>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={onPrev}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={onNext}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {activeItem && (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                        src={activeItem.thumbnail}
                        alt={activeItem.title}
                        className="w-full sm:w-32 h-24 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                        <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                            {activeItem.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                            {activeItem.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1 text-amber-500 font-bold">
                                <Star size={12} className="fill-amber-500" />
                                {activeItem.rating}
                            </span>
                            <span>{activeItem.students}</span>
                        </div>
                    </div>
                    <a
                        href={`/app/cursos/${activeItem.id}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shrink-0 flex items-center gap-1"
                    >
                        <PlusCircle size={14} />
                        <span>Ver Curso</span>
                    </a>
                </div>
            )}
        </div>
    );
};