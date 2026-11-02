import React from 'react';
import { DollarSign, Award, Tag, Check, Zap } from 'lucide-react';

export const Step3PricingSettings = ({ courseData, onChange }) => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                        Paso 3: Precios y Modalidad de Acceso
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Define la estrategia comercial y los beneficios de acreditación oficial.
                    </p>
                </div>

                {/* Selector de Modalidad */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { id: 'paid', label: 'Venta Individual', desc: 'Pago único por acceso vitalicio', icon: DollarSign },
                        { id: 'subscription', label: 'Plan Suscripción', desc: 'Incluido en RutaIA Plus', icon: Zap },
                        { id: 'free', label: '100% Gratuito', desc: 'Sin costo para la comunidad', icon: Tag },
                    ].map((mode) => {
                        const Icon = mode.icon;
                        const isActive = courseData.pricingModel === mode.id;

                        return (
                            <button
                                key={mode.id}
                                type="button"
                                onClick={() => onChange('pricingModel', mode.id)}
                                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${isActive
                                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Icon size={20} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} />
                                    {isActive && <Check size={16} className="text-indigo-600 dark:text-indigo-400" />}
                                </div>
                                <div>
                                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-50 block">
                                        {mode.label}
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                        {mode.desc}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Campos de Precio Base y Oferta */}
                {courseData.pricingModel === 'paid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                Precio Base ($ USD)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={courseData.basePrice}
                                onChange={(e) => onChange('basePrice', parseFloat(e.target.value))}
                                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                Precio de Oferta ($ USD)
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={courseData.discountPrice}
                                onChange={(e) => onChange('discountPrice', parseFloat(e.target.value))}
                                className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                    </div>
                )}

                {/* Certificación Oficial */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Award size={22} className="text-emerald-500 shrink-0" />
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                Emitir Certificado con Verificación UUID
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Los alumnos recibirán un diploma oficial al completar el 100% de las lecciones.
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onChange('includesCertificate', !courseData.includesCertificate)}
                        className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${courseData.includesCertificate ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${courseData.includesCertificate ? 'right-1' : 'left-1'
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};