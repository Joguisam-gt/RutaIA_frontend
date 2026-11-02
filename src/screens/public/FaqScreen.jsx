import React from 'react';
import { useFaq } from '../../hooks/useFaq';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { FaqHeroSearch } from '../../components/domain/faq/FaqHeroSearch';
import { FaqCategoryTabs } from '../../components/domain/faq/FaqCategoryTabs';
import { FaqAccordionList } from '../../components/domain/faq/FaqAccordionList';
import { FaqEscalationBanner } from '../../components/domain/faq/FaqEscalationBanner';
import { Loader2 } from 'lucide-react';

export const FaqScreen = () => {
    const {
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        faqs,
        loading,
    } = useFaq();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <FaqHeroSearch
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <div className="mt-8">
                    <FaqCategoryTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />
                </div>

                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando preguntas frecuentes...</span>
                    </div>
                ) : (
                    <div className="mt-8 space-y-12">
                        <FaqAccordionList faqs={faqs} />
                        <FaqEscalationBanner />
                    </div>
                )}
            </main>
        </div>
    );
};

export default FaqScreen;