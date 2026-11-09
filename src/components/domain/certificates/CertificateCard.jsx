import React from 'react';
import { Eye, Download, Calendar, ShieldCheck, Linkedin } from 'lucide-react';

export const CertificateCard = ({
    certificate,
    onOpenPreview,
    onDownloadPdf,
    onAddToLinkedIn,
}) => {
    const {
        // Campos del backend
        courseTitle,
        courseCategory,
        durationHours,
        certCode,
        validationUrl,
        issueDate,
        studentName,
        // Fallbacks por si ya vienen normalizados
        title,
        category,
        accreditedHours,
        uuid,
    } = certificate;

    // Normalización local — el backend manda courseTitle, certCode, durationHours
    const displayTitle    = courseTitle    || title    || 'Sin título';
    const displayCategory = courseCategory || category || '';
    const displayHours    = durationHours  ?? accreditedHours ?? 0;
    const displayCode     = certCode       || uuid     || '';
    const displayName     = studentName    || '';
    const displayDate     = issueDate || '';

    // Código corto para mostrar en la miniatura
    const shortCode = displayCode.length > 13 ? displayCode.slice(0, 13) + '...' : displayCode;

    return (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
            <div>
                {/* Miniatura del Diploma */}
                <div className="aspect-[16/10] w-full relative bg-slate-950 p-6 flex flex-col justify-between border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 opacity-90" />
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />

                    {/* Header Diploma Preview */}
                    <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                            RUTAIA ACADEMY DIPLOMA
                        </span>
                        <ShieldCheck size={18} className="text-emerald-400" />
                    </div>

                    {/* Cuerpo Diploma Preview */}
                    <div className="relative z-10 my-auto text-center space-y-1">
                        {displayName && (
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                                OTORGADO A {displayName.toUpperCase()}
                            </span>
                        )}
                        <h4 className="text-xs md:text-sm font-extrabold text-white line-clamp-2 px-2 leading-tight">
                            {displayTitle}
                        </h4>
                        <span className="text-[9px] font-semibold text-indigo-300 block">
                            {displayHours} Horas Lectivas Acreditadas
                        </span>
                    </div>

                    {/* Footer Diploma Preview */}
                    <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                        <span>FECHA: {displayDate}</span>
                        <span>ID: {shortCode}</span>
                    </div>

                    {/* Overlay Hover */}
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                        <button
                            onClick={() => onOpenPreview(certificate)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-lg"
                        >
                            <Eye size={14} />
                            <span>Ver Vista Previa</span>
                        </button>
                    </div>
                </div>

                {/* Info Inferior */}
                <div className="p-5">
                    {displayCategory && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                            {displayCategory}
                        </span>
                    )}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-3">
                        {displayTitle}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 text-[11px]">
                            <Calendar size={13} className="text-slate-400" />
                            <span>Emitido el {displayDate}</span>
                        </div>
                        <div className="font-mono text-[10px] text-slate-400 truncate bg-slate-50 dark:bg-slate-950 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                            ID: {displayCode}
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="px-5 pb-5 pt-2 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800/80">
                <button
                    onClick={() => onDownloadPdf(certificate)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                    title="Descargar versión en PDF"
                >
                    <Download size={14} />
                    <span>Descargar PDF</span>
                </button>

                <button
                    onClick={() => onAddToLinkedIn(certificate)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                    title="Añadir certificado a perfil de LinkedIn"
                >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                </button>
            </div>
        </div>
    );
};

export default CertificateCard;
