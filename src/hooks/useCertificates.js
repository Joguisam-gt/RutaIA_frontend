import { useState, useEffect, useCallback } from 'react';
import { certificatesApi } from '../api/certificatesApi';

export const useCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [stats, setStats] = useState({
        issuedCertificates: 0,
        accreditedHours: 0,
        badgesEarned: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el modal de vista previa y verificación
    const [selectedCert, setSelectedCert] = useState(null);
    const [copiedLink, setCopiedLink] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const fetchCertificates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await certificatesApi.getCertificates();
            setCertificates(res.data || []);
            if (res.stats) {
                setStats(res.stats);
            }
        } catch (err) {
            setError(err.message || 'Error al obtener tus certificados oficiales.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    const handleOpenPreview = (cert) => {
        setSelectedCert(cert);
        setCopiedLink(false);
    };

    const handleClosePreview = () => {
        setSelectedCert(null);
    };

    const handleCopyVerifyUrl = (token) => {
        const verifyUrl = `${window.location.origin}/verify/${token}`;
        navigator.clipboard.writeText(verifyUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
    };

    const handleDownloadPdf = async (cert) => {
        try {
            setIsDownloading(true);
            await certificatesApi.downloadPdf(cert.id, cert.title);
        } catch (err) {
            // Fallback si la API aún está en simulación
            const link = document.createElement('a');
            link.href = cert.pdfUrl || '#';
            link.download = `Certificado_${cert.title.replace(/\s+/g, '_')}.pdf`;
            link.click();
        } finally {
            setIsDownloading(false);
        }
    };

    // Genera el enlace directo para añadir la certificación a la sección de Certificaciones de LinkedIn
    const handleAddToLinkedIn = (cert) => {
        const baseUrl = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME';
        const params = new URLSearchParams({
            name: cert.title,
            organizationName: 'RutaIA Academy',
            issueYear: new Date(cert.issueDate).getFullYear(),
            issueMonth: new Date(cert.issueDate).getMonth() + 1,
            certUrl: `${window.location.origin}/verify/${cert.verificationToken}`,
            certId: cert.uuid,
        });

        window.open(`${baseUrl}&${params.toString()}`, '_blank', 'noopener,noreferrer');
    };

    return {
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
        refetch: fetchCertificates,
    };
};