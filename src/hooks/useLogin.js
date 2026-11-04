// src/hooks/useLogin.js
import { useState, useMemo } from 'react';
import { authApi } from '../api/authApi';

export const useLogin = (locationSearch = '') => {
    const [role, setRole] = useState('student'); // 'student' (Estudiante/Usuario) | 'admin' (Maestro/Admin)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    // Extraer el parámetro redirect_to de la URL para la Return Logic
    const redirectTo = useMemo(() => {
        const params = new URLSearchParams(locationSearch);
        return params.get('redirect_to') || (role === 'admin' ? '/admin/dashboard' : '/app/dashboard');
    }, [locationSearch, role]);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
        console.log(field)
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim() || !formData.email.includes('@')) {
            newErrors.email = 'Introduce un correo electrónico válido.';
        }
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            setError(null);

            const response = await authApi.login({
                email: formData.email,
                password: formData.password,
                role,
                rememberMe: formData.rememberMe,
            });

            // Guardar token y redireccionar según return_to o panel del rol
            if (response.token) {
                localStorage.setItem('rutaia_token', response.token);
            }

            const destination = response.redirectTo || redirectTo;
            window.location.href = destination;
        } catch (err) {
            setError(err.message || 'Credenciales inválidas. Revisa tu correo y contraseña.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        authApi.loginWithProvider(provider, role, redirectTo);
    };

    return {
        role,
        setRole,
        formData,
        showPassword,
        toggleShowPassword,
        loading,
        error,
        errors,
        redirectTo,
        handleChange,
        handleSubmit,
        handleSocialLogin,
    };
};