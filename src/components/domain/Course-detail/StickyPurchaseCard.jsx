import React from 'react';
import { Play, Check, ShieldCheck, Video, Download, Award, Smartphone } from 'lucide-react';

export const StickyPurchaseCard = ({ course, onOpenPreview }) => {
    if (!course) return null;

    const {
        price = 29.99,
        originalPrice = 49.99,
        thumbnail,
        previewVideoUrl,
    } = course;

    const benefits = [
        { icon: Video, text: '14.5 horas de video en alta definición' },
        { icon: Download, text: 'Recursos y archivos de proyecto descargables' },
        { icon: Smartphone, text: 'Acceso ilimitado en dispositivos móviles y TV' },
        { icon: Award, text: 'Certificado oficial de finalización verificable' },
    ];

    return (
        <div className="sticky top-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Video Preview 16:9 */}
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group cursor-pointer" onClick={onOpenPreview}>
                <img
                    src={thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover:scale-110 transition-transform">
                        <Play size={24} className="fill-white ml-1" />
                    </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white">
                    Ver Vista Previa del Curso
                </span>
            </div>

            {/* Bloque de Precios y Compra */}
            <div className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-slate-900 dark:text-slate-50">
                        ${price} USD
                    </span>
                    {originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                            ${originalPrice} USD
                        </span>
                    )}
                    <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                        40% OFF
                    </span>
                </div>

                {/* Botón con degradado */}
                <button className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all mb-3">
                    Inscribirme Ahora
                </button>

                {/* Garantía */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
                    <ShieldCheck size={16} className="text-cyan-500" />
                    <span>Garantía de devolución de 30 días</span>
                </div>

                {/* Checklist de Beneficios */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Este curso incluye:</h4>
                    {benefits.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                                <Icon size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                                <span>{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StickyPurchaseCard;