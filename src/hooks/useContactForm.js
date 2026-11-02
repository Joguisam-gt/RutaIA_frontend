import { useState, useEffect } from 'react';
import { contactApi } from '../api/contactApi';

export const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'soporte', // 'soporte' | 'ventas' | 'facturacion'
        subject: '',
        message: '',
    });

    const [attachments, setAttachments] = useState([]);
    const [quickFaqs, setQuickFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Cargar las 3 FAQs más comunes para el widget desviador
    useEffect(() => {
        let isMounted = true;
        const fetchQuickFaqs = async () => {
            try {
                const faqs = await contactApi.getQuickFaqs();
                if (isMounted) setQuickFaqs(faqs);
            } catch (err) {
                // Fallback silencioso si no se cargan las FAQs
            }
        };

        fetchQuickFaqs();
        return () => { isMounted = false; };
    }, []);

    // Validación en tiempo real
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido.';
        if (!formData.email.trim() || !formData.email.includes('@')) {
            newErrors.email = 'Introduce un correo electrónico válido.';
        }
        if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido.';
        if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    // Manejo de archivos adjuntos en el Dropzone
    const handleAddFiles = (newFiles) => {
        const validFiles = Array.from(newFiles).filter((file) => {
            const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB Máximo
            return isSizeValid;
        });

        setAttachments((prev) => [...prev, ...validFiles].slice(0, 3)); // Máximo 3 archivos
    };

    const handleRemoveFile = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            setStatus('idle');

            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('category', formData.category);
            payload.append('subject', formData.subject);
            payload.append('message', formData.message);

            attachments.forEach((file) => {
                payload.append('attachments', file);
            });

            await contactApi.sendTicket(payload);

            setStatus('success');
            setFeedbackMessage('¡Tu ticket ha sido enviado con éxito! Nuestro equipo te responderá en menos de 24 horas.');

            // Limpiar formulario
            setFormData({
                name: '',
                email: '',
                category: 'soporte',
                subject: '',
                message: '',
            });
            setAttachments([]);
        } catch (err) {
            setStatus('error');
            setFeedbackMessage(err.message || 'Ocurrió un error al enviar tu consulta. Por favor reintenta.');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        attachments,
        quickFaqs,
        loading,
        status,
        feedbackMessage,
        errors,
        handleChange,
        handleAddFiles,
        handleRemoveFile,
        handleSubmit,
    };
};