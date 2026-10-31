// src/components/domain/landing/HeroSection.jsx
import React from 'react';
import { Sparkles, ArrowRight, Play, Code, Bot, Database, Layout } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const HeroSection = () => {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-slate-50 dark:bg-slate-950 transition-colors">
            {/* Background Subtle Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                {/* Badge Novedad */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-6">
                    <Sparkles size={14} className="text-violet-500" />
                    <span>{t('heroTag')}</span>
                </div>

                {/* H1 de Alto Impacto (SIN degradado en texto) */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight mb-6">
                    {t('heroTitle')}
                </h1>

                {/* Subtítulo */}
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                    {t('heroSubtitle')}
                </p>

                {/* CTAs con Degradado ÚNICAMENTE en el Botón Principal */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all">
                        <span>{t('btnExplore')}</span>
                        <ArrowRight size={18} />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        <Play size={16} className="text-indigo-500 fill-indigo-500" />
                        <span>{t('btnTryFree')}</span>
                    </button>
                </div>

                {/* Elemento Visual Interactivo Mockup / Demo */}
                <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 px-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="w-3 h-3 rounded-full bg-amber-500" />
                            <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-xs font-mono text-slate-400">RutaIA — Interactive Learning Environment</span>
                        <div className="flex gap-2 text-slate-400">
                            <Code size={14} />
                            <Bot size={14} className="text-violet-400" />
                            <Database size={14} />
                            <Layout size={14} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-xs p-2 bg-slate-950 rounded-xl text-slate-300">
                        <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                            <p className="text-emerald-400">// Módulo: React + Server Components</p>
                            <p className="text-indigo-400">async function <span className="text-amber-300">CourseData</span>() &#123;</p>
                            <p className="pl-4 text-slate-400">const res = await fetch('/api/v1/courses');</p>
                            <p className="pl-4 text-slate-400">return res.json();</p>
                            <p className="text-indigo-400">&#125;</p>
                        </div>
                        <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col justify-between">
                            <div className="flex items-center gap-2 text-violet-400 font-sans text-xs mb-2">
                                <Bot size={16} />
                                <span className="font-bold">Asistente IA RutaIA</span>
                            </div>
                            <p className="font-sans text-slate-300 text-xs">
                                "¡Excelente uso de Server Components! Recuerda usar revalidateTag para mantener el caché actualizado."
                            </p>
                            <span className="text-[10px] text-cyan-400 font-sans mt-2">✓ Código optimizado en tiempo real</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};