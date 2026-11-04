import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { ForgotPasswordStepRequest } from '../../components/domain/auth/ForgotPasswordStepRequest';
import { ForgotPasswordStepConfirmation } from '../../components/domain/auth/ForgotPasswordStepConfirmation';
import { Modal } from '../../components/common/Modal/Modal';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const ForgotPasswordScreen = () => {
    const navigate = useNavigate();
    const { showToast } = useNotification();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor ingresa tu correo electrónico');
            return;
        }
        setError(null);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 800);
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setError(null);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showToast('¡Contraseña actualizada correctamente!', 'success');
            setIsSuccessModalOpen(true);
        }, 1000);
    };

    const handleModalCloseAndRedirect = () => {
        setIsSuccessModalOpen(false);
        navigate('/login');
    };

    return (
        <AuthLayout>
            {step === 1 ? (
                <ForgotPasswordStepRequest
                    email={email}
                    setEmail={setEmail}
                    onSubmit={handleRequestSubmit}
                    loading={loading}
                    error={error}
                />
            ) : (
                <ForgotPasswordStepConfirmation
                    newPassword={newPassword}
                    setNewPassword={setNewPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onSubmit={handleResetSubmit}
                    loading={loading}
                    error={error}
                />
            )}

            <Modal
                isOpen={isSuccessModalOpen}
                onClose={handleModalCloseAndRedirect}
                title="Restablecimiento Exitoso"
            >
                <div className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Tu clave ha sido actualizada
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Usuario / Email:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{email}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Estado:</span>
                            <span className="font-semibold text-emerald-500 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" /> Modificado
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Ya puedes acceder a tu cuenta utilizando tu nueva contraseña.
                    </p>

                    <button
                        onClick={handleModalCloseAndRedirect}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Ir a Iniciar Sesión
                    </button>
                </div>
            </Modal>
        </AuthLayout>
    );
};

export default ForgotPasswordScreen;