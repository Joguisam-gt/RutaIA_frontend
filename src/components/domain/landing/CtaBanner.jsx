import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export const CtaBanner = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-slate-900 relative overflow-hidden text-white border-t border-slate-800">
            <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-50">
                    {t('ctaTitle')}
                </h2>
                <p className="text-sm md:text-base text-slate-400 mb-8 max-w-xl mx-auto">
                    {t('ctaSubtitle')}
                </p>

                {/* Botón con degradado */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-indigo-500/30 transition-all">
                        <span>{t('ctaBtnRegister')}</span>
                        <ArrowRight size={18} />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-all">
                        <MessageSquare size={16} />
                        <span>{t('ctaBtnAdvisor')}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};