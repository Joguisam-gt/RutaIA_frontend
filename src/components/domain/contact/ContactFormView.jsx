import React from 'react';
import { Send, Upload, X, CheckCircle2, AlertCircle, Loader2, FileText } from 'lucide-react';

export const ContactFormView = ({
    formData,
    attachments,
    loading,
    status,
    feedbackMessage,
    errors,
    onChange,
    onAddFiles,
    onRemoveFile,
    onSubmit,
}) => {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
                Envíanos un mensaje
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6">
                Completa el formulario y te asignaremos un asesor técnico en menos de 24 horas.
            </p>

            {/* Feedback Alert Toast Inline */}
            {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5 mb-6">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{feedbackMessage}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2.5 mb-6">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{feedbackMessage}</span>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
                {/* Selector Dinámico de Categoría */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Categoría de la Consulta
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'soporte', label: 'Soporte Técnico' },
                            { id: 'ventas', label: 'Ventas B2B' },
                            { id: 'facturacion', label: 'Facturación' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => onChange('category', cat.id)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${formData.category === cat.id
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            placeholder="Ej. José Rodríguez"
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                        {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Correo Electrónico *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            placeholder="tu.correo@ejemplo.com"
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                                }`}
                        />
                        {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                    </div>
                </div>

                {/* Asunto */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Asunto *
                    </label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => onChange('subject', e.target.value)}
                        placeholder="Resumen de tu consulta..."
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                            }`}
                    />
                    {errors.subject && <span className="text-[11px] text-rose-500 mt-1 block">{errors.subject}</span>}
                </div>

                {/* Área de Texto Mensaje */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Mensaje o Detalle de la Consulta *
                    </label>
                    <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => onChange('message', e.target.value)}
                        placeholder="Describe detalladamente tu solicitud..."
                        className={`w-full p-3.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border focus:outline-none transition-colors ${errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'
                            }`}
                    />
                    {errors.message && <span className="text-[11px] text-rose-500 mt-1 block">{errors.message}</span>}
                </div>

                {/* Dropzone de Archivos Adjuntos */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Archivos Adjuntos (Opcional - Máx. 3 archivos de 5MB)
                    </label>

                    <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center hover:border-indigo-500/50 transition-colors bg-slate-50/50 dark:bg-slate-950/50">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => onAddFiles(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload size={20} className="mx-auto text-indigo-500 mb-1.5" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                            Arrastra archivos aquí o haz clic para examinar
                        </span>
                        <span className="text-[10px] text-slate-400">Soporta PNG, JPG, PDF o TXT</span>
                    </div>

                    {/* Listado de archivos cargados */}
                    {attachments.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                            {attachments.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        <FileText size={14} className="text-indigo-500 shrink-0" />
                                        <span className="truncate">{file.name}</span>
                                        <span className="text-[10px] text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveFile(idx)}
                                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botón de Envío con degradado */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <>
                            <Send size={16} />
                            <span>Enviar Consulta</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};