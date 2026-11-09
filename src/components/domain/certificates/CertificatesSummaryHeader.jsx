import React from 'react';
import { Award, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const CertificatesSummaryHeader = ({ stats }) => {
    const defaultStats = {
        issuedCertificates: 3,
        accreditedHours: 85,
        badgesEarned: 6,
    };

    const data = stats || defaultStats;

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
            <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                    <ShieldCheck size={14} />
                    <span>Acreditación Oficial Criptográfica</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                    Mis Certificados
                </h1>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    Consulta, descarga y valida tus diplomas de especialización técnica con verificación UUID pública.
                </p>
            </div>

            {/* Grid de Resumen de Logros */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[100px]">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2 border border-indigo-200 dark:border-indigo-800">
                        <Award size={18} />
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-slate-50 block leading-none mb-1">
                        {data.issuedCertificates}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Emitidos
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[100px]">
                    <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-2 border border-cyan-200 dark:border-cyan-800">
                        <Clock size={18} />
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-slate-50 block leading-none mb-1">
                        {data.accreditedHours}h
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Horas
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center min-w-[100px]">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto mb-2 border border-violet-200 dark:border-violet-800">
                        <Sparkles size={18} />
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-slate-50 block leading-none mb-1">
                        {data.badgesEarned}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Insignias
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CertificatesSummaryHeader;