import React from 'react';
import { AuthLayout } from '../../components/layout/auth/AuthLayout';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { ForgotPasswordStepRequest } from '../../components/domain/auth/ForgotPasswordStepRequest';
import { ForgotPasswordStepConfirmation } from '../../components/domain/auth/ForgotPasswordStepConfirmation';

export const ForgotPasswordScreen = () => {
    const {
        step,
        email,
        setEmail,
        loading,
        error,
        resendTimer,
        canResend,
        handleSubmitRequest,
        handleResendEmail,
        setStep,
    } = useForgotPassword();

    return (
        <AuthLayout backUrl="/auth/login" backText="Volver al inicio de sesión">
            {step === 1 ? (
                <ForgotPasswordStepRequest
                    email={email}
                    onEmailChange={setEmail}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmitRequest}
                />
            ) : (
                <ForgotPasswordStepConfirmation
                    email={email}
                    resendTimer={resendTimer}
                    canResend={canResend}
                    loading={loading}
                    onResend={handleResendEmail}
                    onBackToStepOne={() => setStep(1)}
                />
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordScreen;