import React from 'react';
import AuthBrandingColumn from './AuthBrandingColumn';

export const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="w-full max-w-6xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto min-h-[580px]">
                <AuthBrandingColumn />
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex items-center justify-center">
                    <div className="w-full max-w-lg space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;