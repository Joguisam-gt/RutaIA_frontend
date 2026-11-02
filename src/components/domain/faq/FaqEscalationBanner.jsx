import React from 'react';
import { MessageSquare, Mail, ArrowRight, Bot } from 'lucide-react';

export const FaqEscalationBanner = () => {
    return (
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="max-w-xl text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/20 text-cyan-400 text-xs font-bold mb-3 border border-indigo-500/30">
                        <Bot size={14} />
                        <span>¿No encontraste lo que buscabas?</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-50 mb-2">
                        Nuestro equipo de soporte e IA está listo para ayudarte
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        Escríbenos directamente o inicia un chat con nuestro asistente en tiempo real para resolver cualquier consulta académica o técnica.
                    </p>
                </div>

                {/* Acciones de Escalado (Degradado exclusivo en botón principal) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                    <a
                        href="/contacto"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all"
                    >
                        <Mail size={16} />
                        <span>Contacto Directo</span>
                        <ArrowRight size={14} />
                    </a>

                    <button
                        onClick={() => {
                            // Trigger modal o widget de chat
                            if (window.RutaIaChat) window.RutaIaChat.open();
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/80 border border-slate-700 hover:bg-slate-800 transition-all"
                    >
                        <MessageSquare size={16} className="text-cyan-400" />
                        <span>Chat de Soporte IA</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FaqEscalationBanner;