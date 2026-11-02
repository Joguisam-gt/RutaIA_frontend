import React from 'react';
import { AuthBrandingColumn } from './AuthBrandingColumn';
import { AuthFormColumn } from './AuthFormColumn';

export const AuthLayout = ({ children, backUrl = '/', backText = 'Volver al inicio' }) => {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
            {/* Columna Izquierda (50% W escritorio, oculta en móvil) */}
            <AuthBrandingColumn />

            {/* Columna Derecha (50% W escritorio, 100% W móvil) */}
            <AuthFormColumn backUrl={backUrl} backText={backText}>
                {children}
            </AuthFormColumn>
        </div>
    );
};

export default AuthLayout;