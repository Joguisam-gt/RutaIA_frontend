import React from 'react';
import { useCertificates } from '../../hooks/useCertificates';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { CertificateCard } from '../../components/domain/certificates/CertificateCard';
import { CertificatePreviewModal } from '../../components/domain/certificates/CertificatePreviewModal';
import { ThemeToggle } from '../../components/common/themetoggle.jsx';
import { Award, Loader2 } from 'lucide-react';

export const CertificatesScreen = () => {
    const {
        certificates,
        selectedCertificate,
        isModalOpen,
        openModal,
        closeModal,
        downloadCertificate,
        loading,
        error,
    } = useCertificates();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/certificados" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Award size={24} className="text-indigo-600" />
                                <span>Mis Certificados</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Visualiza y descarga las acreditaciones de los cursos completados.
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando certificados...</span>
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                            {error}
                        </div>
                    ) : certificates.length === 0 ? (
                        <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 p-8 mt-6">
                            <Award size={36} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Aún no has obtenido certificados
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                                Completa al 100% tus cursos inscritos para desbloquear tus diplomas digitales.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {certificates.map((cert) => (
                                <CertificateCard
                                    key={cert.id}
                                    certificate={cert}
                                    onPreview={() => openModal(cert)}
                                    onDownload={() => downloadCertificate(cert.id)}
                                />
                            ))}
                        </div>
                    )}
                    <CertificatePreviewModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        certificate={selectedCertificate}
                        onDownload={downloadCertificate}
                    />
                </main>
            </div>
        </div>
    );
};

export default CertificatesScreen;