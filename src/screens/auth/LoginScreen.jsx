import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { LoginFormView } from '../../components/domain/auth/LoginFormView';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export const LoginScreen = () => {
    const navigate = useNavigate();
    const auth = useAuth() || {};
    const notification = useNotification() || {};

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (auth.login) {
                await auth.login(formData.email, formData.password);
            }
            if (notification.showToast) {
                notification.showToast('¡Sesión iniciada con éxito!', 'success');
            }
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <LoginFormView
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </AuthLayout>
    );
};

export default LoginScreen;