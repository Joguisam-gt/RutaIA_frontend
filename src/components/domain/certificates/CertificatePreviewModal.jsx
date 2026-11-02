import React from 'react';
import { X, Download, Copy, Check, ShieldCheck, Linkedin, ExternalLink, Award, Sparkles } from 'lucide-react';

export const CertificatePreviewModal = ({
    certificate,
    onClose,
    copiedLink,
    onCopyVerifyUrl,
    onDownloadPdf,
    onAddToLinkedIn,
    isDownloading,
}) => {
    if (!certificate) return null;

    const {
        title,
        studentName = 'José Guillermo Rodríguez Samcam',
        issueDate,
        uuid,
        verificationToken,
        accreditedHours,
    } = certificate;

    const verifyUrl = `${window.location.origin}/verify/${verificationToken}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                            <Award size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                                Previsualización & Verificación de Diploma
                            </h3>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Acreditación firmada digitalmente por RutaIA Academy
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Previsualización Renderizada en Alta Resolución del Diploma */}
                <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-8 md:p-12 flex flex-col justify-between border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden mb-6">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header Diploma HD */}
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                                <Sparkles size={18} />
                            </div>
                            <span className="text-xs font-black tracking-widest text-white">RUTAIA ACADEMY</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                            <ShieldCheck size={14} />
                            <span>Verificado</span>
                        </div>
                    </div>

                    {/* Mensaje Central HD */}
                    <div className="my-auto text-center space-y-3 relative z-10">
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 block">
                            CERTIFICADO OFICIAL DE FINALIZACIÓN
                        </span>
                        <span className="text-xs text-slate-400 block">Este diploma certifica que</span>
                        <h2 className="text-xl md:text-3xl font-black text-slate-50 tracking-tight">
                            {studentName}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                            ha completado satisfactoriamente el programa de especialización práctica en{' '}
                            <strong className="text-indigo-400">{title}</strong>, cumpliendo {accreditedHours} horas académicas.
                        </p>
                    </div>

                    {/* Footer Diploma HD */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 pt-4 border-t border-slate-800 relative z-10 font-mono">
                        <span>EMISIÓN: {issueDate}</span>
                        <span>UUID: {uuid}</span>
                    </div>
                </div>

                {/* Sección de URL Pública de Validación (/verify/:token) */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        URL Pública de Validación Oficial
                    </span>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            readOnly
                            value={verifyUrl}
                            className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono focus:outline-none"
                        />
                        <button
                            onClick={() => onCopyVerifyUrl(verificationToken)}
                            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1 shrink-0"
                        >
                            {copiedLink ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                            <span>{copiedLink ? 'Copiado' : 'Copiar URL'}</span>
                        </button>
                        <a
                            href={`/verify/${verificationToken}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors shrink-0"
                            title="Abrir página pública de verificación"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>

                {/* Botones de Acción Modal */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => onDownloadPdf(certificate)}
                        disabled={isDownloading}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={16} />
                        <span>Descargar PDF Oficial</span>
                    </button>

                    {/* Degradado exclusivo para el botón CTA de LinkedIn */}
                    <button
                        onClick={() => onAddToLinkedIn(certificate)}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        <Linkedin size={16} />
                        <span>Añadir a Perfil de LinkedIn</span>
                    </button>
                </div>
            </div>
        </div>
    );
};