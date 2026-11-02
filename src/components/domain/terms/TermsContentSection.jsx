import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export const TermsContentSection = () => {
    return (
        <div className="space-y-12 text-slate-700 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
            {/* 1. Aceptación */}
            <section id="aceptacion" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    1. Aceptación de los Términos
                </h2>
                <p className="mb-3">
                    Al acceder, registrarse o utilizar la plataforma web y móvil de <strong>RutaIA Academy</strong>, el usuario acepta de manera expresa y sin reservas quedar vinculado por los presentes Términos y Condiciones, así como por nuestra Política de Privacidad.
                </p>
                <p>
                    Si el usuario no está de acuerdo con alguna de las disposiciones contenidas en este documento, deberá abstenerse inmediatamente de ingresar o utilizar los servicios y programas de formación expuestos.
                </p>
            </section>

            {/* 2. Cuentas */}
            <section id="cuentas" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    2. Cuentas de Usuario y Registro
                </h2>
                <p className="mb-3">
                    Para acceder a los cursos y funcionalidades avanzadas de IA, el estudiante debe crear una cuenta personal proporcionando información veraz, precisa y actualizada.
                </p>
                <ul className="space-y-2 mb-3">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span>Las credenciales de acceso son personales e intransferibles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span>El usuario es el único responsable de mantener la confidencialidad de su contraseña.</span>
                    </li>
                </ul>
            </section>

            {/* 3. Propiedad Intelectual */}
            <section id="propiedad-intelectual" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    3. Propiedad Intelectual
                </h2>
                <p className="mb-3">
                    Todo el contenido disponible en RutaIA —incluyendo videos en resolución 4K, guías escritas, código fuente de ejemplo, interfaces visuales, componentes UX/UI y modelos de IA— está protegido por las leyes de propiedad intelectual e industrial.
                </p>
                <p>
                    Queda estrictamente prohibida la reproducción, distribución, venta o transmisión no autorizada de cualquier material sin la autorización previa por escrito del equipo directivo de RutaIA.
                </p>
            </section>

            {/* 4. Pagos y Reembolsos */}
            <section id="pagos-reembolsos" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    4. Pagos, Suscripciones y Reembolsos
                </h2>
                <p className="mb-3">
                    Ofrecemos dos modelos de inversión: suscripciones globales ilimitadas (Pro/Teams) y compra a la carta por pases de especialización de 4 meses (16 sesiones).
                </p>
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 mb-3">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1">Garantía de Devolución de 30 Días</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        El estudiante podrá solicitar el 100% del reembolso de su dinero dentro de los primeros 30 días posteriores a su compra si el contenido no cumple sus expectativas.
                    </p>
                </div>
            </section>

            {/* 5. Uso Aceptable */}
            <section id="uso-aceptable" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    5. Uso Aceptable de la Plataforma
                </h2>
                <p className="mb-3">
                    Los usuarios se comprometen a utilizar los asistentes de Inteligencia Artificial RAG y las herramientas de la plataforma de manera legal y ética.
                </p>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                        <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>Prohibido inyectar prompts maliciosos o intentar extraer código fuente del backend.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>Prohibido revender o compartir acceso corporativo con terceros no autorizados.</span>
                    </li>
                </ul>
            </section>

            {/* 6. Cancelación */}
            <section id="cancelacion" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    6. Cancelación y Suspensión de Servicio
                </h2>
                <p>
                    RutaIA se reserva el derecho de suspender o cancelar temporal o definitivamente el acceso a cualquier usuario que viole de forma reiterada los presentes Términos y Condiciones o incurra en conductas fraudulentas.
                </p>
            </section>

            {/* 7. Responsabilidad */}
            <section id="responsabilidad" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    7. Limitación de Responsabilidad
                </h2>
                <p>
                    Si bien garantizamos estándares de disponibilidad superiores al 99.9%, RutaIA no se hace responsable por interrupciones temporales causadas por mantenimiento programado o fallos en proveedores de infraestructura cloud de terceros.
                </p>
            </section>

            {/* 8. Ley Aplicable */}
            <section id="ley-aplicable" className="scroll-mt-24 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    8. Ley Aplicable y Jurisdicción
                </h2>
                <p>
                    Cualquier controversia relacionada con la interpretación o ejecución de los presentes términos se someterá a la legislación mercantil vigente y a los tribunales competentes fijados por la entidad operadora de RutaIA.
                </p>
            </section>
        </div>
    );
};