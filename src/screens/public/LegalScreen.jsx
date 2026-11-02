import React from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { ShieldCheck, FileText } from 'lucide-react';

export const LegalScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-10">
                    <ShieldCheck size={40} className="mx-auto text-indigo-600 mb-3" />
                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">
                        Aviso Legal y Politicas de Plataforma
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Informacion sobre los terminos de servicio, privacidad y proteccion de datos en RutaIA.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xs space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                            <FileText size={16} className="text-indigo-600" />
                            1. Informacion General
                        </h2>
                        <p>
                            RutaIA es una plataforma educativa orientada al desarrollo de habilidades tecnicas en inteligencia artificial, desarrollo web y bases de datos. El acceso a nuestros servicios implica la aceptacion plena de estos terminos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                            <FileText size={16} className="text-indigo-600" />
                            2. Propiedad Intelectual
                        </h2>
                        <p>
                            Todos los contenidos, modulos, material didactico e itinerarios incluidos en la plataforma son propiedad exclusiva de RutaIA o sus instructores licenciados.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LegalScreen;