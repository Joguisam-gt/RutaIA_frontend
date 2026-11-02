import React from 'react';
import { BookOpen, CreditCard, Award, User, Laptop } from 'lucide-react';

const iconMap = {
    cursos: BookOpen,
    pagos: CreditCard,
    certificados: Award,
    cuenta: User,
    tecnico: Laptop,
};

export const FaqCategoryTabs = ({ categories = [], activeCategory, onSelectCategory }) => {
    return (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-10">
            {categories.map((cat) => {
                const Icon = iconMap[cat.id] || BookOpen;
                const isActive = activeCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all ${isActive
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                            }`}
                    >
                        <Icon size={16} className={isActive ? 'text-white' : 'text-indigo-500'} />
                        <span>{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
};