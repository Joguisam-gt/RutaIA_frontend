import { useState, useEffect } from 'react';
import { authResetApi } from '../api/authResetApi';

export const useForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Solicitud | 2: Confirmación de envío
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Temporizador de 60 segundos para reenvío
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval = null;
        if (step === 2 && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, resendTimer]);

    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError('Por favor introduce una dirección de correo válida.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await authResetApi.requestPasswordReset(email);
            setStep(2);
            setResendTimer(60);
            setCanResend(false);
        } catch (err) {
            setError(err.message || 'No se pudo enviar el correo de recuperación. Revisa el correo ingresado.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = async () => {
        if (!canResend || loading) return;

        try {
            setLoading(true);
            setError(null);
            await authResetApi.requestPasswordReset(email);
            setResendTimer(60);
            setCanResend(false);
        } catch (err) {
            setError(err.message || 'Error al reenviar el correo.');
        } finally {
            setLoading(false);
        }
    };

    return {
        step,
        email,
        setEmail: (val) => { setEmail(val); setError(null); },
        loading,
        error,
        resendTimer,
        canResend,
        handleSubmitRequest,
        handleResendEmail,
        setStep,
    };
};