import React from 'react';
import { usePrivacyPolicy } from '../../hooks/usePrivacyPolicy';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { PrivacyStickyNav } from '../../components/domain/privacy/PrivacyStickyNav';
import { PrivacyContentSection } from '../../components/domain/privacy/PrivacyContentSection';
import { ArcoRightsSection } from '../../components/domain/privacy/ArcoRightsSection';
import { CookiePreferencesModal } from '../../components/domain/privacy/CookiePreferencesModal';
import { ShieldCheck, Loader2 } from 'lucide-react';

export const PrivacyPolicyScreen = () => {
    const {
        sections,
        activeSectionId,
        setActiveSectionId,
        isCookieModalOpen,
        setIsCookieModalOpen,
        loading,
    } = usePrivacyPolicy();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-10">
                    <ShieldCheck size={40} className="mx-auto text-indigo-600 mb-3" />
                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">
                        Política de Privacidad
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Transparencia sobre la recolección, uso y protección de tus datos personales.
                    </p>
                </div>

                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando políticas de privacidad...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <PrivacyStickyNav
                                sections={sections}
                                activeSectionId={activeSectionId}
                                onSelectSection={setActiveSectionId}
                                onOpenCookieModal={() => setIsCookieModalOpen(true)}
                            />
                        </div>
                        <div className="lg:col-span-3 space-y-8">
                            <PrivacyContentSection sections={sections} />
                            <ArcoRightsSection />
                        </div>
                    </div>
                )}

                <CookiePreferencesModal
                    isOpen={isCookieModalOpen}
                    onClose={() => setIsCookieModalOpen(false)}
                />
            </main>
        </div>
    );
};

export default PrivacyPolicyScreen;