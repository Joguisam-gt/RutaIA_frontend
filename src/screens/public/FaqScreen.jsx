import React from 'react';
import { useFaq } from '../../hooks/useFaq';
import { HeaderControls } from '../../components/common/HeaderControls';
import { FaqHeroSearch } from '../../components/domain/faq/FaqHeroSearch';
import { FaqCategoryTabs } from '../../components/domain/faq/FaqCategoryTabs';
import { FaqAccordionList } from '../../components/domain/faq/FaqAccordionList';
import { FaqEscalationBanner } from '../../components/domain/faq/FaqEscalationBanner';
import { Loader2, HelpCircle } from 'lucide-react';

export const FaqScreen = () => {
    const {
        faqs,
        loading,
        error,
        search,
        handleSearchChange,
        suggestions,
        isSearchingSuggestions,
        activeCategory,
        setActiveCategory,
        categories,
        openFaqIds,
        toggleAccordion,
        userFeedback,
        handleVote,
    } = useFaq();

    // Preguntas estáticas de fallback si la API aún no está poblada
    const fallbackFaqs = [
        {
            id: 'faq-1',
            question: '¿Cómo obtengo mi certificado oficial de finalización?',
            answer: 'Para emitir tu certificado criptográfico verificable, debes completar el 100% de las clases grabadas del curso y aprobar el Proyecto Capstone práctico.',
            highlights: [
                'Incluye código QR de verificación única',
                'Integración directa en 1 clic para tu perfil de LinkedIn',
                'Descarga en formato PDF de alta resolución',
            ],
        },
        {
            id: 'faq-2',
            question: '¿Qué métodos de pago están disponibles?',
            answer: 'Aceptamos tarjetas de crédito y débito internacionales (Visa, MasterCard, Amex), PayPal y transferencias bancarias para licencias corporativas.',
            highlights: [
                'Transacciones cifradas con SSL de 256 bits',
                'Garantía de reembolso de 30 días sin preguntas',
            ],
        },
        {
            id: 'faq-3',
            question: '¿Necesito conocimientos previos para empezar?',
            answer: 'No necesariamente. Contamos con módulos de Fundamentos (Módulo 1) diseñados para principantes desde cero, así como niveles avanzados para profesionales.',
            highlights: ['Paso a paso guiado desde la instalación del entorno'],
        },
    ];

    const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Preguntas Frecuentes
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Hero & Buscador Predictivo */}
            <FaqHeroSearch
                searchValue={search}
                onSearchChange={handleSearchChange}
                suggestions={suggestions}
                isSearchingSuggestions={isSearchingSuggestions}
            />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Pestañas de Categoría (si no hay búsqueda activa) */}
                {!search && (
                    <FaqCategoryTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />
                )}

                {/* Carga o Resultados */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                        <span className="text-xs font-medium">Cargando respuestas...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold max-w-xl mx-auto mb-12">
                        {error}
                    </div>
                ) : displayFaqs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-xl mx-auto mb-12">
                        <HelpCircle size={40} className="text-slate-400 mb-3" />
                        <h3 className="text-sm font-bold mb-1">Sin coincidencias para "{search}"</h3>
                        <p className="text-xs text-slate-500 mb-4">Intenta con otro término o utiliza los accesos de soporte directo.</p>
                        <button
                            onClick={() => handleSearchChange('')}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Ver Todas las Preguntas
                        </button>
                    </div>
                ) : (
                    <FaqAccordionList
                        faqs={displayFaqs}
                        openIds={openFaqIds}
                        onToggle={toggleAccordion}
                        userFeedback={userFeedback}
                        onVote={handleVote}
                    />
                )}

                {/* Banner de Escalado a Soporte y Contacto */}
                <FaqEscalationBanner />
            </main>
        </div>
    );
};

export default FaqScreen;