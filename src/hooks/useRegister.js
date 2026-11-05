import { useState, useMemo } from 'react';
import { authRegisterApi } from '../api/authRegisterApi';

export const useRegister = (locationSearch = '') => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        level: 'PRINCIPIANTE',
        areaOfInterest: 'Desarrollo Web',
        termsAccepted: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [pendingApprovalSuccess, setPendingApprovalSuccess] = useState(false);

    const selectedPlan = useMemo(() => {
        const params = new URLSearchParams(locationSearch);
        const planKey = params.get('plan');

        const planMap = {
            pro: { name: 'Plan Pro', price: '$19/mes', badge: 'Acceso Ilimitado' },
            teams: { name: 'Plan Teams', price: '$49/mes', badge: 'Licencia B2B' },
            pase_completo: { name: 'Pase Completo de Especialización', price: '$89.00 USD', badge: '16 Sesiones' },
        };

        return planKey ? planMap[planKey.toLowerCase()] || null : null;
    }, [locationSearch]);

    const passwordStrength = useMemo(() => {
        const pass = formData.password;
        if (!pass) return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-800' };

        let score = 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        switch (score) {
            case 1:
                return { score: 25, label: 'Débil', color: 'bg-rose-500' };
            case 2:
                return { score: 50, label: 'Regular', color: 'bg-amber-500' };
            case 3:
                return { score: 75, label: 'Buena', color: 'bg-cyan-500' };
            case 4:
                return { score: 100, label: 'Excelente y Segura', color: 'bg-emerald-500' };
            default:
                return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-800' };
        }
    }, [formData.password]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre completo es requerido.';
        if (!formData.email.trim() || !formData.email.includes('@')) {
            newErrors.email = 'Introduce un correo electrónico válido.';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'Debes aceptar los Términos y la Política de Privacidad.';
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

            if (role === 'student') {
                const response = await authRegisterApi.registerStudent({
                    ...formData,
                    plan: selectedPlan ? selectedPlan.name : 'starter',
                });

                // Extracción correcta del token enviado por el backend en response.data.token
                const token = response.data?.token || response.token;
                if (token) {
                    localStorage.setItem('rutaia_token', token);
                }

                window.location.href = response.redirectTo || '/app/dashboard';
            } else {
                await authRegisterApi.requestInstructorAccount(formData);
                setPendingApprovalSuccess(true);
            }
        } catch (err) {
            const apiMessage = err.response?.data?.message || err.message;
            setError(apiMessage || 'Error al procesar la solicitud de registro.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialRegister = (provider) => {
        authRegisterApi.registerWithProvider(provider, selectedPlan ? selectedPlan.name : '');
    };

    return {
        role,
        setRole,
        formData,
        showPassword,
        toggleShowPassword: () => setShowPassword((prev) => !prev),
        selectedPlan,
        passwordStrength,
        loading,
        error,
        errors,
        pendingApprovalSuccess,
        handleChange,
        handleSubmit,
        handleSocialRegister,
    };
};