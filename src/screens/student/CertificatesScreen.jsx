import React from 'react';
import { useCertificates } from '../../hooks/useCertificates';
import { HeaderControls } from '../../components/common/HeaderControls';
import { CertificatesSummaryHeader } from '../../components/domain/certificates/CertificatesSummaryHeader';
import { CertificateCard } from '../../components/domain/certificates/CertificateCard';
import { CertificatePreviewModal } from '../../components/domain/certificates/CertificatePreviewModal';
import { Loader2, Award } from 'lucide-react';

export const CertificatesScreen = () => {
    const {
        certificates,
        stats,
        loading,
        error,
        selectedCert,
        copiedLink,
        isDownloading,
        handleOpenPreview,
        handleClosePreview,
        handleCopyVerifyUrl,
        handleDownloadPdf,
        handleAddToLinkedIn,
    } = useCertificates();

    // Fallback estático de diplomas si la API aún se encuentra vacía
    const fallbackCertificates = [
        {
            id: 'cert-101',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            issueDate: '28 de Octubre, 2026',
            uuid: '8f3a9b1c-4d2e-4f6a-9b1c-8f3a9b1c4d2e',
            verificationToken: 'v-rag-2026-8f3a',
            accreditedHours: 35,
            studentName: 'José Guillermo Rodríguez Samcam',
        },
        {
            id: 'cert-102',
            title: 'Arquitectura Backend y APIs REST con Node.js & Express',
            category: 'Backend Architecture',
            issueDate: '15 de Septiembre, 2026',
            uuid: '1a2b3c4d-5e6f-7a8b-9c0d-1a2b3c4d5e6f',
            verificationToken: 'v-node-2026-1a2b',
            accreditedHours: 50,
            studentName: 'José Guillermo Rodríguez Samcam',
        },
    ];

    const displayCertificates = certificates.length > 0 ? certificates : fallbackCertificates;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/app/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Mis Certificados
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-10 max-w-7xl">
                {/* Resumen de Logros & Titular */}
                <CertificatesSummaryHeader stats={stats} />

                {/* Carga o Grid de Certificados */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                        <span className="text-xs font-medium">Cargando tus certificados emitidos...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold max-w-xl mx-auto my-12">
                        {error}
                    </div>
                ) : displayCertificates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-lg mx-auto">
                        <Award size={48} className="text-slate-400 mb-3" />
                        <h3 className="text-base font-bold mb-1">Aún no tienes certificados emitidos</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                            Completa el 100% de las lecciones y aprueba el Proyecto Capstone de cualquier ruta para emitir tu diploma oficial.
                        </p>
                        <a
                            href="/app/mis-cursos"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Ir a Mis Cursos
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayCertificates.map((cert) => (
                            <CertificateCard
                                key={cert.id}
                                certificate={cert}
                                onOpenPreview={handleOpenPreview}
                                onDownloadPdf={handleDownloadPdf}
                                onAddToLinkedIn={handleAddToLinkedIn}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modal de Vista Previa & Verificación */}
            <CertificatePreviewModal
                certificate={selectedCert}
                onClose={handleClosePreview}
                copiedLink={copiedLink}
                onCopyVerifyUrl={handleCopyVerifyUrl}
                onDownloadPdf={handleDownloadPdf}
                onAddToLinkedIn={handleAddToLinkedIn}
                isDownloading={isDownloading}
            />
        </div>
    );
};

export default CertificatesScreen;