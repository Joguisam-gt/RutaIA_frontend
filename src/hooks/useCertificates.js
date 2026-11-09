// src/hooks/useCertificates.js
import { useState, useEffect } from 'react';
import { certificatesApi } from '../api/certificatesApi';

export const useCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await certificatesApi.getCertificates();
                const data = res.data || res;
                setCertificates(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('No se pudieron cargar los certificados.');
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const openModal = (cert) => {
        setSelectedCertificate(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCertificate(null);
        setIsModalOpen(false);
    };

    const downloadCertificate = async (id) => {
        const cert = certificates.find(c => c.id === id);
        if (cert) {
            try {
                await certificatesApi.downloadPdf(id, cert.courseTitle);
            } catch (err) {
                console.error('Error descargando certificado:', err);
            }
        }
    };

    return {
        certificates,
        selectedCertificate,
        isModalOpen,
        openModal,
        closeModal,
        downloadCertificate,
        loading,
        error
    };
};
