import React, { useState } from 'react';
import { Mail, Flame, Rocket, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { blogApi } from '../../../api/blogApi';

export const BlogSidebarConversion = ({ popularArticles = [] }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        try {
            setStatus('loading');
            await blogApi.subscribeNewsletter(email);
            setStatus('success');
            setMessage('¡Gracias por suscribirte al boletín de RutaIA!');
            setEmail('');
        } catch (err) {
            setStatus('error');
            setMessage('Error al suscribir el correo. Intenta nuevamente.');
        }
    };

    const defaultPopular = [
        { slug: 'guia-definitiva-tailwind-v4', title: 'Guía práctica de migración a Tailwind CSS v4', readTime: '6 min' },
        { slug: 'normalizacion-3fn-postgres', title: 'Domina la 3FN e integridad en PostgreSQL', readTime: '10 min' },
        { slug: 'figma-auto-layout-componentes', title: 'Auto Layout y Design Tokens en Figma', readTime: '7 min' },
    ];

    const popularList = popularArticles.length > 0 ? popularArticles : defaultPopular;

    return (
        <aside className="space-y-6">
            {/* Widget 1: Captura de Newsletter */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                    <Mail size={20} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                    Boletín Tecnológico Semanal
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Recibe artículos sobre desarrollo web, IA y UX/UI directo en tu bandeja sin spam.
                </p>

                {status === 'success' ? (
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        <span>{message}</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu.correo@ejemplo.com"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-950 text-white border border-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                        {/* Botón con degradado */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                        >
                            {status === 'loading' ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                <>
                                    <span>Suscribirme Gratis</span>
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

            {/* Widget 2: Ranking de Más Leídos */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Flame size={16} className="text-amber-500" />
                    <span>Más Leídos</span>
                </div>

                <div className="space-y-3">
                    {popularList.map((item, idx) => (
                        <a
                            key={idx}
                            href={`/blog/${item.slug}`}
                            className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="text-sm font-black text-indigo-500/40 group-hover:text-indigo-500 transition-colors">
                                0{idx + 1}
                            </span>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-indigo-500 transition-colors">
                                    {item.title}
                                </h4>
                                <span className="text-[10px] text-slate-400">{item.readTime}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Widget 3: Promocional de Cursos */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 text-white relative overflow-hidden">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                    <Rocket size={16} />
                    <span>Aprende Haciendo</span>
                </div>
                <h3 className="text-sm font-bold mb-2">
                    Pasa de la lectura al código de producción
                </h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Accede a las 4 rutas de formación especializadas con mentores activos y ejercicios guiados por IA.
                </p>
                <a
                    href="/cursos"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md"
                >
                    <span>Ver Catálogo</span>
                    <ArrowRight size={14} />
                </a>
            </div>
        </aside>
    );
};