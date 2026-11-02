import React from 'react';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { useRegister } from '../../hooks/useRegister';
import { RegisterFormView } from '../../components/domain/auth/RegisterFormView';

export const RegisterScreen = () => {
    const {
        role,
        setRole,
        formData,
        showPassword,
        toggleShowPassword,
        selectedPlan,
        passwordStrength,
        loading,
        error,
        errors,
        pendingApprovalSuccess,
        handleChange,
        handleSubmit,
        handleSocialRegister,
    } = useRegister(window.location.search);

    return (
        <AuthLayout backUrl="/" backText="Volver a la página principal">
            <RegisterFormView
                role={role}
                onRoleChange={setRole}
                formData={formData}
                showPassword={showPassword}
                onToggleShowPassword={toggleShowPassword}
                selectedPlan={selectedPlan}
                passwordStrength={passwordStrength}
                loading={loading}
                error={error}
                errors={errors}
                pendingApprovalSuccess={pendingApprovalSuccess}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onSocialRegister={handleSocialRegister}
            />
        </AuthLayout>
    );
};

export default RegisterScreen;