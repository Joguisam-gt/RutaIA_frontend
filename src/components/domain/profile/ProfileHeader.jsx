import React from 'react';
import { Camera, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

export const ProfileHeader = ({ userProfile, onSelectAvatarFile }) => {
    const { name, headline, role, avatar } = userProfile;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onSelectAvatarFile(file);
        }
    };

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                {/* Contenedor Avatar con Uploader */}
                <div className="relative group shrink-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md bg-slate-950">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <label
                        htmlFor="avatar-upload-input"
                        className="absolute bottom-0 right-0 p-2.5 rounded-full bg-indigo-600 text-white shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors border-2 border-white dark:border-slate-900"
                        title="Cambiar foto de perfil"
                    >
                        <Camera size={16} />
                        <input
                            id="avatar-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Detalles del Usuario */}
                <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                            {name}
                        </h1>

                        {/* Badge de Rol */}
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            <ShieldCheck size={12} className="text-violet-500" />
                            <span className="capitalize">{role === 'student' ? 'Estudiante Pro' : 'Maestro'}</span>
                        </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {headline}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                            <UserCheck size={12} className="text-emerald-500" />
                            Cuenta Verificada
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-cyan-500 font-semibold">
                            <Sparkles size={12} />
                            Miembro desde Octubre 2025
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};