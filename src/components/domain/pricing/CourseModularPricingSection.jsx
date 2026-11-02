import React from 'react';
import { BookOpen, Layers, Award, Tag } from 'lucide-react';

export const CourseModularPricingSection = () => {
    const categories = [
        { name: 'Bases de Datos SQL y NoSQL', docId: 'RUTA-DB-2026-V1' },
        { name: 'Diseño UX/UI', docId: 'RUTA-UXUI-2026-V1' },
        { name: 'Diseño y Desarrollo Web', docId: 'RUTA-WEB-2026-V1' },
        { name: 'Inteligencia Artificial & Programación Agéntica', docId: 'RUTA-AI-2026-V1' },
    ];

    return (
        <div className="bg-slate-100/70 dark:bg-slate-900/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 mb-20 max-w-6xl mx-auto">
            <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
                    <Tag size={14} />
                    <span>Compra Flexible a la Carta</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
                    ¿Prefieres comprar solo un módulo o una lección individual?
                </h2>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Nuestros programas de especialización de 4 meses (16 sesiones)[cite: 4, 6, 8, 10] te permiten inscribirte con máxima flexibilidad sin necesidad de estar suscrito[cite: 4, 6, 8, 10].
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Bloque 1: Sesión Individual */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <BookOpen size={20} className="text-indigo-500 mb-3" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                        Pago por Sesión Individual
                    </h3>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-50 block mb-2">
                        $5.00 a $12.00 USD
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Inscripción flexible por clase individual según el tema exacto de tu interés[cite: 4, 6, 8, 10]. (Principiante: $5 | Intermedio: $7-$8 | Avanzado: $10-$12)[cite: 4, 5, 6, 7, 8, 9, 10, 11].
                    </p>
                </div>

                {/* Bloque 2: Paquetes por Módulo */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Layers size={20} className="text-violet-500 mb-3" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                        Paquete por Módulo (4 Clases)
                    </h3>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-50 block mb-2">
                        $16 a $34 USD
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Descuento especial al adquirir el paquete mensual de 4 clases[cite: 4, 6, 8, 10]. (M1 Fundamentos: $16 | M2: $22 | M3: $26 | M4 Capstone: $34)[cite: 4, 5, 6, 7, 8, 9, 10, 11].
                    </p>
                </div>

                {/* Bloque 3: Pase Completo */}
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-500/60 relative overflow-hidden">
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                        Ahorras $31 USD
                    </span>
                    <Award size={20} className="text-cyan-400 mb-3" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                        Pase Completo (16 Sesiones)
                    </h3>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-50 block mb-2">
                        $89.00 USD
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Acceso total a los 4 meses de especialización con tarifa promocional y derecho al Proyecto Capstone de Certificación[cite: 4, 5, 6, 7, 8, 9, 10, 11].
                    </p>
                </div>
            </div>

            {/* Categorías Disponibles */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Aplica para todos los programas oficiales de RutaIA Academy:
                </span>
                <div className="flex flex-wrap gap-2">
                    {categories.map((c, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {c.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseModularPricingSection;