import React from 'react';
import { User, FileText, Github, Linkedin, Twitter, Eye, Save, Loader2 } from 'lucide-react';

export const PublicProfileTab = ({
    userProfile,
    onChange,
    onSave,
    saving,
}) => {
    return (
        <form onSubmit={onSave} className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50 pb-3 border-b border-slate-100 dark:border-slate-800">
                    Información Pública de Perfil
                </h3>

                {/* Nombre Completo */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nombre Completo
                    </label>
                    <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Titular Profesional */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Titular Profesional
                    </label>
                    <input
                        type="text"
                        value={userProfile.headline}
                        onChange={(e) => onChange('headline', e.target.value)}
                        placeholder="Ej. Full-Stack Software Developer & Backend Architect"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                {/* Biografía */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Biografía
                    </label>
                    <textarea
                        rows={4}
                        value={userProfile.bio}
                        onChange={(e) => onChange('bio', e.target.value)}
                        placeholder="Describe tu trayectoria, intereses técnicos y logros principales..."
                        className="w-full p-3.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>

                {/* Enlaces Sociales */}
                <div className="space-y-4 pt-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Perfiles en Redes Profesionales
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="relative">
                            <Github size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="url"
                                value={userProfile.githubUrl}
                                onChange={(e) => onChange('githubUrl', e.target.value)}
                                placeholder="GitHub URL"
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="relative">
                            <Linkedin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="url"
                                value={userProfile.linkedinUrl}
                                onChange={(e) => onChange('linkedinUrl', e.target.value)}
                                placeholder="LinkedIn URL"
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="relative">
                            <Twitter size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input
                                type="url"
                                value={userProfile.twitterUrl}
                                onChange={(e) => onChange('twitterUrl', e.target.value)}
                                placeholder="X / Twitter URL"
                                className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Visibilidad de Perfil */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Eye size={16} className="text-indigo-500" />
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                Perfil Público Visible
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                Permite que otros estudiantes e instructores consulten tu portafolio de certificados.
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => onChange('isPublic', !userProfile.isPublic)}
                        className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${userProfile.isPublic ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${userProfile.isPublic ? 'right-1' : 'left-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Botón de Guardado con degradado exclusivo */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>Guardar Cambios de Perfil</span>
                </button>
            </div>
        </form>
    );
};