import React from 'react';

export const AuthBrandingColumn = () => {
    return (
        /* Bloque adaptado para soporte de modo claro y oscuro con estilos Tailwind */
        <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Aprende Desarrollo Web e IA
                </h2>
                {/* Comentarios de branding compatibles con tema claro u oscuro */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    "La mejor plataforma para escalar tus conocimientos tecnicos con proyectos reales."
                </p>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500">
                RutaIA Platform
            </div>
        </div>
    );
};

/* Export default agregado para compatibilidad con importaciones por defecto */
export default AuthBrandingColumn;