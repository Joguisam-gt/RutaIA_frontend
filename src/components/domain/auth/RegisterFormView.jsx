import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, GraduationCap, Compass } from 'lucide-react';
import { PasswordStrengthBar } from './PasswordStrengthBar';
import { SocialLoginButtons } from './SocialLoginButtons';

const LEVELS = [
    { value: 'PRINCIPIANTE', label: '🌱 Principiante', desc: 'Estoy empezando desde cero' },
    { value: 'INTERMEDIO',   label: '⚡ Intermedio',   desc: 'Ya tengo bases y quiero avanzar' },
    { value: 'AVANZADO',     label: '🚀 Avanzado',     desc: 'Busco dominar temas complejos' },
];

const AREAS = [
    'Desarrollo Web',
    'Inteligencia Artificial',
    'Bases de Datos',
    'Programación',
    'Automatización y Datos',
    'Diseño UX/UI',
];

export const RegisterFormView = ({
    formData: externalFormData,
    onChange: externalOnChange,
    onSubmit,
    loading,
    error
}) => {
    const [internalFormData, setInternalFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        level: 'PRINCIPIANTE',
        areaOfInterest: 'Desarrollo Web',
    });

    const formData = externalFormData || internalFormData;

    const handleChange = (e) => {
        if (externalOnChange) {
            externalOnChange(e);
        } else {
            setInternalFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    return (
        <div className="w-full max-w-md space-y-5">
            <div className="text-center space-y-1">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Crear Cuenta
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                    Únete a RutaIA y comienza tu camino de aprendizaje
                </p>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">

                {/* ── Nombre ── */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Nombre Completo
                    </label>
                    <div className="relative flex items-center">
                        <User className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-30" />
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName || ''}
                            onChange={handleChange}
                            placeholder="Juan Pérez"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-10"
                        />
                    </div>
                </div>

                {/* ── Email ── */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Correo Electrónico
                    </label>
                    <div className="relative flex items-center">
                        <Mail className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-30" />
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-10"
                        />
                    </div>
                </div>

                {/* ── Contraseña ── */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Contraseña
                    </label>
                    <div className="relative flex items-center mb-2">
                        <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none z-30" />
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password || ''}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors relative z-10"
                        />
                    </div>
                    <PasswordStrengthBar password={formData.password || ''} />
                </div>

                {/* ── Nivel de conocimiento ── */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                        ¿Cuál es tu nivel actual?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {LEVELS.map((lvl) => {
                            const isSelected = (formData.level || 'PRINCIPIANTE') === lvl.value;
                            return (
                                <button
                                    key={lvl.value}
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'level', value: lvl.value } })}
                                    className={`relative p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                        isSelected
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 ring-1 ring-indigo-500/50'
                                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-indigo-400'
                                    }`}
                                >
                                    <span className="block text-base mb-0.5">{lvl.label.split(' ')[0]}</span>
                                    <span className={`block text-[10px] font-bold ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {lvl.label.split(' ')[1]}
                                    </span>
                                    <span className="block text-[9px] text-slate-500 dark:text-slate-500 mt-0.5 leading-tight">
                                        {lvl.desc}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Área de interés ── */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-indigo-500" />
                        ¿Qué quieres aprender?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {AREAS.map((area) => {
                            const isSelected = (formData.areaOfInterest || '') === area;
                            return (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'areaOfInterest', value: area } })}
                                    className={`px-3 py-2 rounded-xl border text-[10px] font-semibold text-left transition-all cursor-pointer ${
                                        isSelected
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/50'
                                            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                                    }`}
                                >
                                    {area}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Submit ── */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 relative z-10"
                >
                    <span>{loading ? 'Creando cuenta...' : 'Registrarme'}</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <SocialLoginButtons />

            <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    Inicia sesión aquí
                </Link>
            </p>
        </div>
    );
};

export default RegisterFormView;
