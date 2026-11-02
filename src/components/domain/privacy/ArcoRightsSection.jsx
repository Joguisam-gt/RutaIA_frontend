import React, { useState } from 'react';
import { ShieldCheck, Mail, FileCheck, RefreshCw, Trash2, Eye, Send, CheckCircle2 } from 'lucide-react';

export const ArcoRightsSection = () => {
    const [arcoForm, setArcoForm] = useState({
        rightType: 'acceso', // 'acceso' | 'rectificacion' | 'cancelacion' | 'oposicion'
        email: '',
        details: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitArco = (e) => {
        e.preventDefault();
        if (!arcoForm.email || !arcoForm.details) return;
        setSubmitted(true);
    };

    return (
        <section id="derechos-arco" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs mb-8">
            {/* Header Sección */}
            <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={22} className="text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-50">
                    5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
                </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Como titular de tus datos personales, tienes el derecho de controlar la información que compartes con RutaIA. A continuación se detallan tus derechos ARCO y cómo ejercerlos:
            </p>

            {/* Grid de Derechos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">
                        <Eye size={16} className="text-indigo-500" />
                        <span>Acceso</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Conocer exactamente qué información personal tenemos almacenada en tus perfiles y registros de progreso.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">
                        <RefreshCw size={16} className="text-violet-500" />
                        <span>Rectificación</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Solicitar la corrección o actualización de datos inexactos (nombre, correo o historial de certificados).
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">
                        <Trash2 size={16} className="text-rose-500" />
                        <span>Cancelación (Eliminación)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Solicitar el borrado definitivo de tu cuenta y purga completa de datos de nuestros servidores.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100 mb-1">
                        <FileCheck size={16} className="text-cyan-500" />
                        <span>Oposición</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Oponerte al tratamiento de tus datos para fines promocionales o entrenamiento no esencial de modelos de IA.
                    </p>
                </div>
            </div>

            {/* Formulario Exprés para Solicitud ARCO */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-2">
                    Enviar Solicitud Directa de Derechos ARCO
                </h3>

                {submitted ? (
                    <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        <span>Tu solicitud ARCO ha sido recibida. El oficial de privacidad procesará tu petición en un plazo máximo de 72 horas.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmitArco} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Derecho a Ejercer
                                </label>
                                <select
                                    value={arcoForm.rightType}
                                    onChange={(e) => setArcoForm({ ...arcoForm, rightType: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                                >
                                    <option value="acceso">Acceso a Mis Datos</option>
                                    <option value="rectificacion">Rectificación de Datos</option>
                                    <option value="cancelacion">Cancelación / Borrado de Cuenta</option>
                                    <option value="oposicion">Oposición a Tratamiento de Datos</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                    Correo Electrónico Vinculado
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={arcoForm.email}
                                    onChange={(e) => setArcoForm({ ...arcoForm, email: e.target.value })}
                                    placeholder="tu.correo@ejemplo.com"
                                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                Detalle de la Petición
                            </label>
                            <textarea
                                rows={3}
                                required
                                value={arcoForm.details}
                                onChange={(e) => setArcoForm({ ...arcoForm, details: e.target.value })}
                                placeholder="Describe el alcance de tu solicitud o los datos específicos que deseas rectificar o borrar..."
                                className="w-full p-3 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                            />
                        </div>

                        {/* Botón de Envío con degradado */}
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                        >
                            <Send size={14} />
                            <span>Enviar Solicitud ARCO</span>
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default ArcoRightsSection;