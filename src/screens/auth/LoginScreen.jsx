import React from 'react';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { useLogin } from '../../hooks/useLogin';
import { LoginFormView } from '../../components/domain/auth/LoginFormView';

export const LoginScreen = () => {
    const {
        role,
        setRole,
        formData,
        showPassword,
        toggleShowPassword,
        loading,
        error,
        errors,
        handleChange,
        handleSubmit,
        handleSocialLogin,
    } = useLogin(window.location.search);

    return (
        <AuthLayout backUrl="/" backText="Volver a la página principal">
            <LoginFormView
                role={role}
                onRoleChange={setRole}
                formData={formData}
                showPassword={showPassword}
                onToggleShowPassword={toggleShowPassword}
                loading={loading}
                error={error}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onSocialLogin={handleSocialLogin}
            />
        </AuthLayout>
    );
};

export default LoginScreen;