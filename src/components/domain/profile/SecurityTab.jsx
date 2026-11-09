import React from 'react';
import { Shield, Key, Mail, Smartphone, Laptop, Trash2, CheckCircle2, Lock } from 'lucide-react';

export const SecurityTab = ({
    securityData,
    onChange,
    onToggle2FA,
    activeSessions,
    onRevokeSession,
    onSave,
    saving,
}) => {
    return (
        <div className="space-y-6">
            {/* Cambio de Email y Contraseña */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <Key size={18} className="text-indigo-500" />
                    <span>Credenciales y Contraseña</span>
                </h3>

                {/* Correo Electrónico */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Correo Electrónico Principal
                    </label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="email"
                            value={securityData.email}
                            onChange={(e) => onChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Cambio de Contraseña */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            value={securityData.currentPassword}
                            onChange={(e) => onChange('currentPassword', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            value={securityData.newPassword}
                            onChange={(e) => onChange('newPassword', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            value={securityData.confirmPassword}
                            onChange={(e) => onChange('confirmPassword', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        onClick={onSave}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                        Actualizar Seguridad
                    </button>
                </div>
            </div>

            {/* Autenticación en Dos Pasos (2FA) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800">
                        <Shield size={20} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                            Autenticación en Dos Pasos (2FA)
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Protege tu cuenta requiriendo un código de app autenticadora al iniciar sesión.
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => onToggle2FA(!securityData.twoFactorEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${securityData.twoFactorEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                >
                    <div
                        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${securityData.twoFactorEnabled ? 'right-1' : 'left-1'
                            }`}
                    />
                </button>
            </div>

            {/* Sesiones Activas */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                    Dispositivos y Sesiones Activas
                </h3>

                <div className="space-y-3">
                    {activeSessions.map((sess) => (
                        <div
                            key={sess.id}
                            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                {sess.device.includes('Mac') || sess.device.includes('PC') ? (
                                    <Laptop size={20} className="text-indigo-500 shrink-0" />
                                ) : (
                                    <Smartphone size={20} className="text-violet-500 shrink-0" />
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                            {sess.device} — {sess.browser}
                                        </span>
                                        {sess.current && (
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                                Sesión Actual
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[11px] text-slate-400 block">
                                        IP: {sess.ip} • {sess.location}
                                    </span>
                                </div>
                            </div>

                            {!sess.current && (
                                <button
                                    type="button"
                                    onClick={() => onRevokeSession(sess.id)}
                                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Revocar acceso"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;