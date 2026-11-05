import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { RegisterFormView } from '../../components/domain/auth/RegisterFormView';
import { Modal } from '../../components/common/Modal/Modal';
import { useNotification } from '../../context/NotificationContext';
import { authRegisterApi } from '../../api/authRegisterApi';
import { CheckCircle, UserCheck } from 'lucide-react';

export const RegisterScreen = () => {
    const navigate = useNavigate();
    const { showToast } = useNotification() || {};

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        level: 'PRINCIPIANTE',
        areaOfInterest: 'Tecnología e IA'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.fullName || !formData.email || !formData.password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            // Llamada real al Backend MongoDB
            const response = await authRegisterApi.registerStudent({
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                level: formData.level || 'PRINCIPIANTE',
                areaOfInterest: formData.areaOfInterest || 'Tecnología e IA'
            });

            // Guardar JWT si viene en la respuesta
            const token = response.data?.token || response.token;
            if (token) {
                localStorage.setItem('rutaia_token', token);
            }

            if (showToast) {
                showToast('¡Cuenta de alumno registrada con éxito!', 'success');
            }

            setIsSuccessModalOpen(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Error al registrar la cuenta.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleModalCloseAndRedirect = () => {
        setIsSuccessModalOpen(false);
        navigate('/login');
    };

    return (
        <AuthLayout>
            <RegisterFormView
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />

            <Modal
                isOpen={isSuccessModalOpen}
                onClose={handleModalCloseAndRedirect}
                title="Registro Completado"
            >
                <div className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        ¡Bienvenido a RutaIA!
                    </h3>

                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Alumno:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Correo:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Nivel:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{formData.level}</span>
                        </div>
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Rol asignado:</span>
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                                <UserCheck className="w-3.5 h-3.5" /> Alumno / Estudiante
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tu registro como alumno ha finalizado correctamente y se ha guardado en la base de datos. Haz clic abajo para ir al inicio de sesión.
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

export default RegisterScreen;