import React from 'react';
import { AuthBrandingColumn } from './AuthBrandingColumn';

export const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="w-full lg:w-1/2 lg:min-h-screen flex flex-col">
                <AuthBrandingColumn />
            </div>

            <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 md:p-12 lg:p-16">
                <div className="w-full max-w-md my-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;