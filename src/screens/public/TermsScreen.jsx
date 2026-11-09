import React from 'react';
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { TermsActionsHeader } from '../../components/domain/terms/TermsActionsHeader';
import { TermsSidebarIndex } from '../../components/domain/terms/TermsSidebarIndex';
import { TermsContentSection } from '../../components/domain/terms/TermsContentSection';
import { Loader2 } from 'lucide-react';

export const TermsScreen = () => {
    const {
        sections,
        activeSectionId,
        setActiveSectionId,
        lastUpdated,
        loading,
    } = useTermsAndConditions();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <TermsActionsHeader lastUpdated={lastUpdated} />

                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando términos y condiciones...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                        <div className="lg:col-span-1">
                            <TermsSidebarIndex
                                sections={sections}
                                activeSectionId={activeSectionId}
                                onSelectSection={setActiveSectionId}
                            />
                        </div>
                        <div className="lg:col-span-3">
                            <TermsContentSection sections={sections} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TermsScreen;