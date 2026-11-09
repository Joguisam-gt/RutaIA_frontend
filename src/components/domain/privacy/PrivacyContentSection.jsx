import React from 'react';
import { Sparkles, Shield, Lock, Eye, Users } from 'lucide-react';
import { ArcoRightsSection } from './ArcoRightsSection';

export const PrivacyContentSection = () => {
    return (
        <div className="space-y-12 text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
            {/* 1. Recopilación */}
            <section id="recopilacion" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    1. Recopilación de Datos Personales
                </h2>

                {/* Resumen Ejecutivo TL;DR */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1">
                        <Sparkles size={14} className="text-violet-500" />
                        <span>TL;DR (En pocas palabras):</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Solo guardamos lo necesario para que estudies: tu nombre, correo, avances en cursos y datos de pago. Nunca vendemos tu información personal a anunciantes.
                    </p>
                </div>

                <p className="mb-3">
                    RutaIA recopila información personal cuando te registras en la plataforma, te inscribes en cursos o interactúas con los asistentes de aprendizaje guiado por IA. Esto incluye tu nombre legal, correo electrónico, credenciales de inicio de sesión y datos de facturación procesados de forma cifrada.
                </p>
            </section>

            {/* 2. Uso e Integración con IA */}
            <section id="uso-datos" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    2. Uso de Datos y Protección RAG de Inteligencia Artificial
                </h2>

                {/* Resumen Ejecutivo TL;DR */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1">
                        <Sparkles size={14} className="text-violet-500" />
                        <span>TL;DR (En pocas palabras):</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Tus consultas al tutor virtual y ejercicios de código no se utilizan para entrenar modelos de IA públicos de terceros sin anonimización previa.
                    </p>
                </div>

                <p className="mb-3">
                    Los datos de interacción conversacional procesados mediante nuestra arquitectura de Recuperación Aumentada por Generación (RAG) se utilizan exclusivamente para brindarte retroalimentación técnica en tiempo real. Todos los embeddings y vectores almacenados están disociados de identificadores personales directos.
                </p>
            </section>

            {/* 3. Compartición con Terceros */}
            <section id="terceros" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    3. Compartición de Datos con Proveedores Terceros
                </h2>

                {/* Resumen Ejecutivo TL;DR */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1">
                        <Sparkles size={14} className="text-violet-500" />
                        <span>TL;DR (En pocas palabras):</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Solo compartimos información cifrada con proveedores esenciales: procesadores de pago (Stripe/PayPal) y servicios de infraestructura cloud.
                    </p>
                </div>

                <p className="mb-3">
                    RutaIA integra pasarelas de pago auditadas que cumplen con el estándar PCI-DSS. Ningún empleado de RutaIA tiene acceso directo a los números completos de tus tarjetas bancarias.
                </p>
            </section>

            {/* 4. Cookies */}
            <section id="cookies" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    4. Política de Cookies y Rastreo Técnico
                </h2>

                {/* Resumen Ejecutivo TL;DR */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1">
                        <Sparkles size={14} className="text-violet-500" />
                        <span>TL;DR (En pocas palabras):</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Usamos pequeñas cookies para recordar que iniciaste sesión. Puedes encender o apagar las cookies analíticas desde nuestro gestor interactivo.
                    </p>
                </div>

                <p className="mb-3">
                    Utilizamos cookies propias y de terceros para optimizar la velocidad de carga de clases en video, recordar tus preferencias de tema (Modo Claro/Oscuro) e idioma.
                </p>
            </section>

            {/* 5. Sección de Derechos ARCO */}
            <ArcoRightsSection />

            {/* 6. Almacenamiento y Seguridad */}
            <section id="seguridad" className="scroll-mt-24 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    6. Almacenamiento, Cifrado y Seguridad
                </h2>

                {/* Resumen Ejecutivo TL;DR */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 mb-4">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1">
                        <Sparkles size={14} className="text-violet-500" />
                        <span>TL;DR (En pocas palabras):</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                        Guardamos tu información con cifrado de grado bancario (AES-256) en servidores de alta disponibilidad con respaldos continuos.
                    </p>
                </div>

                <p>
                    Implementamos protocolos HTTPS/TLS 1.3 en todas las comunicaciones entre tu navegador y nuestros servidores backend para garantizar la integridad y confidencialidad absoluta de tus datos.
                </p>
            </section>
        </div>
    );
};

export default PrivacyContentSection;