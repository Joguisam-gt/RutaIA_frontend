import React from 'react';
import { useTermsAndConditions } from '../../hooks/useTermsAndConditions';
import { HeaderControls } from '../../components/common/HeaderControls';
import { TermsActionsHeader } from '../../components/domain/terms/TermsActionsHeader';
import { TermsSidebarIndex } from '../../components/domain/terms/TermsSidebarIndex';
import { TermsContentSection } from '../../components/domain/terms/TermsContentSection';

export const TermsScreen = () => {
    const { sections, activeSection, handlePrint, handleDownloadPdf } = useTermsAndConditions();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3 print:hidden">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Términos Legales
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container Layout Legal (Sidebar Index 30% W + Columna Texto 70% W) */}
            <main className="container mx-auto px-4 py-10 max-w-6xl">
                <TermsActionsHeader
                    onPrint={handlePrint}
                    onDownloadPdf={handleDownloadPdf}
                />

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Flotante con Índice Scrollspy (30% W en escritorio) */}
                    <aside className="w-full lg:w-3/10 shrink-0 print:hidden">
                        <TermsSidebarIndex sections={sections} activeSection={activeSection} />
                    </aside>

                    {/* Columna de Texto de las Cláusulas (70% W en escritorio) */}
                    <article className="w-full lg:w-7/10">
                        <TermsContentSection />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default TermsScreen;