// src/screens/auth/LoginScreen.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth() || {};
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setErrorMsg('Por favor completa todos los campos.');
            return;
        }

        setErrorMsg('');
        setLoading(true);

        try {
            let userData = null;
            if (login) {
                userData = await login(email, password);
            }

            // Fallback si no devuelve objeto directo en el login
            const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const currentUser = userData || savedUser;
            const role = currentUser?.role || 'student';

            // Redirección inteligente por Rol
            if (role === 'admin' || role === 'instructor') {
                navigate('/instructor/dashboard', { replace: true });
            } else {
                navigate('/app/dashboard', { replace: true });
            }
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setErrorMsg('Credenciales inválidas. Verifica tu correo y contraseña.');
        } finally {
            setLoading(false);
        }
    };

    // Botones de auto-llenado para pruebas rápidas
    const handleQuickLogin = (quickEmail, quickPassword) => {
        setEmail(quickEmail);
        setPassword(quickPassword);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Luces de Fondo */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
                {/* Header Marca */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/30 mb-3">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">RutaIA</h1>
                    <p className="text-xs text-slate-400 mt-1">Ingresa a tu plataforma adaptativa de aprendizaje</p>
                </div>

                {/* Mensaje de Error */}
                {errorMsg && (
                    <div className="mb-6 p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                        <AlertCircle size={16} className="shrink-0 text-rose-400" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu.correo@rutaia.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Iniciando Sesión...</span>
                            </>
                        ) : (
                            <>
                                <LogIn size={16} />
                                <span>Ingresar a la Plataforma</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Acceso Rápido para Pruebas */}
                <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
                        Probar con Cuentas de Demo:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickLogin('jose.rodriguez@rutaia.com', 'Password123!')}
                            className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-left transition-colors flex items-center gap-2"
                        >
                            <User size={14} className="text-cyan-400 shrink-0" />
                            <div className="overflow-hidden">
                                <span className="block text-[11px] font-bold text-slate-200 truncate">Estudiante</span>
                                <span className="block text-[9px] text-slate-400 truncate">José Rodríguez</span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleQuickLogin('admin.maestro@rutaia.com', 'Password123!')}
                            className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-left transition-colors flex items-center gap-2"
                        >
                            <ShieldCheck size={14} className="text-violet-400 shrink-0" />
                            <div className="overflow-hidden">
                                <span className="block text-[11px] font-bold text-slate-200 truncate">Maestro / Admin</span>
                                <span className="block text-[9px] text-slate-400 truncate">Prof. Samcam</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer del Modal */}
                <div className="mt-6 text-center text-xs text-slate-400">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;