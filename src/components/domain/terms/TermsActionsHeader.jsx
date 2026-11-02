import React from 'react';
import { Printer, Download, Calendar, Shield } from 'lucide-react';

export const TermsActionsHeader = ({ onPrint, onDownloadPdf, lastUpdated = '1 de Noviembre, 2026' }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
            <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                    <Shield size={14} />
                    <span>Marco Regulatorio & Términos Legal del Servicio</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
                    Términos y Condiciones de Uso
                </h1>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    Última actualización de cláusulas: {lastUpdated}
                </span>
            </div>

            {/* Botones de Acción (Degradado exclusivo para descarga PDF) */}
            <div className="flex items-center gap-3 shrink-0 print:hidden">
                <button
                    onClick={onPrint}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs"
                    title="Imprimir documento legal"
                >
                    <Printer size={16} />
                    <span>Imprimir</span>
                </button>

                <button
                    onClick={onDownloadPdf}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all"
                    title="Descargar versión PDF oficial"
                >
                    <Download size={16} />
                    <span>Descargar PDF</span>
                </button>
            </div>
        </div>
    );
};