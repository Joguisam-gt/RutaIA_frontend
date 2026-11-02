import React from 'react';
import { Bell, Mail, Smartphone, Save } from 'lucide-react';

export const NotificationsTab = ({ matrix, onChange, onSave }) => {
    const categories = [
        { key: 'courseUpdates', title: 'Novedades y Anuncios de Cursos', desc: 'Notificaciones sobre nuevas lecciones o actualizaciones de contenidos.' },
        { key: 'forumAnswers', title: 'Respuestas en Foro Q&A', desc: 'Avisos cuando un instructor o estudiante responde a tus preguntas.' },
        { key: 'newsletters', title: 'Boletines Académicos Semanales', desc: 'Resúmenes de lanzamientos, artículos del blog y recomendaciones de IA.' },
        { key: 'securityAlerts', title: 'Alertas de Seguridad de Cuenta', desc: 'Avisos sobre inicios de sesión en nuevos dispositivos o cambios de clave.' },
    ];

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                        Matriz de Preferencias de Notificaciones
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Elige los canales de comunicación para cada tipo de evento en RutaIA.
                    </p>
                </div>

                {/* Botón CTA con degradado exclusivo */}
                <button
                    onClick={onSave}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                >
                    <Save size={14} />
                    <span>Guardar Matriz</span>
                </button>
            </div>

            {/* Encabezados de Columna */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="col-span-8">Tipo de Notificación</div>
                <div className="col-span-2 text-center flex items-center justify-center gap-1">
                    <Mail size={14} /> Email
                </div>
                <div className="col-span-2 text-center flex items-center justify-center gap-1">
                    <Smartphone size={14} /> In-App
                </div>
            </div>

            {/* Filas de la Matriz */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-4 sm:space-y-0">
                {categories.map((cat) => {
                    const current = matrix[cat.key] || { email: false, inApp: false };

                    return (
                        <div key={cat.key} className="pt-4 sm:pt-3 pb-3 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                            <div className="sm:col-span-8">
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                                    {cat.title}
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {cat.desc}
                                </span>
                            </div>

                            {/* Switches Celda Email */}
                            <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-2">
                                <span className="sm:hidden text-xs text-slate-500">Por Email:</span>
                                <button
                                    type="button"
                                    onClick={() => onChange(cat.key, 'email', !current.email)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${current.email ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                >
                                    <div
                                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${current.email ? 'right-0.75' : 'left-0.75'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Switches Celda In-App */}
                            <div className="sm:col-span-2 flex items-center justify-between sm:justify-center gap-2">
                                <span className="sm:hidden text-xs text-slate-500">Notificación In-App:</span>
                                <button
                                    type="button"
                                    onClick={() => onChange(cat.key, 'inApp', !current.inApp)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${current.inApp ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                                        }`}
                                >
                                    <div
                                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${current.inApp ? 'right-0.75' : 'left-0.75'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationsTab;