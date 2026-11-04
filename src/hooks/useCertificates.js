// src/hooks/useCertificates.js
import { useState, useEffect } from 'react';
import { studentApi } from '../api/studentApi';

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
                const res = await studentApi.getCertificates();
                const data = res.data || res;
                setCertificates(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('No se pudieron cargar los certificados.');
            } flex: {
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

    const downloadCertificate = (id) => {
        console.log('Descargando certificado:', id);
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