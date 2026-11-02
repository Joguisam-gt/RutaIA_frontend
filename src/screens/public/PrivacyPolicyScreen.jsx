import React from 'react';
import { usePrivacyPolicy } from '../../hooks/usePrivacyPolicy';
import { HeaderControls } from '../../components/common/HeaderControls';
import { PrivacyStickyNav } from '../../components/domain/privacy/PrivacyStickyNav';
import { PrivacyContentSection } from '../../components/domain/privacy/PrivacyContentSection';
import { CookiePreferencesModal } from '../../components/domain/privacy/CookiePreferencesModal';
import { Shield, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyScreen = () => {
    const {
        sections,
        activeSection,
        isCookieModalOpen,
        toggleCookieModal,
        cookiePreferences,
        handleCookieToggle,
        saveCookiePreferences,
        cookieSavedToast,
    } = usePrivacyPolicy();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Toast Notificación de Guardado de Cookies */}
            {cookieSavedToast && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
                    <CheckCircle2 size={18} />
                    <span>Preferencias de cookies guardadas correctamente</span>
                </div>
            )}

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Política de Privacidad
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container Layout Legal (Sticky Navigation + Columna Normativa) */}
            <main className="container mx-auto px-4 py-10 max-w-6xl">
                {/* Banner Superior */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                        <Shield size={14} />
                        <span>Protección de Datos & Transparencia</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                        Política de Privacidad y Protección de Datos
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        Explicación clara y legalmente vinculante sobre cómo gestionamos y protegemos tu información.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sticky Navigation (30% W en escritorio) */}
                    <aside className="w-full lg:w-3/10 shrink-0">
                        <PrivacyStickyNav
                            sections={sections}
                            activeSection={activeSection}
                            onOpenCookieModal={toggleCookieModal}
                        />
                    </aside>

                    {/* Columna Normativa (70% W en escritorio) */}
                    <article className="w-full lg:w-7/10">
                        <PrivacyContentSection />
                    </article>
                </div>
            </main>

            {/* Gestor Interactivo de Cookies Modal */}
            <CookiePreferencesModal
                isOpen={isCookieModalOpen}
                onClose={toggleCookieModal}
                preferences={cookiePreferences}
                onToggle={handleCookieToggle}
                onSave={saveCookiePreferences}
            />
        </div>
    );
};

export default PrivacyPolicyScreen;