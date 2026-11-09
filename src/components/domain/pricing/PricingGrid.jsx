import React from 'react';
import { Check } from 'lucide-react';

export const PricingGrid = ({ plans = [], billingCycle = 'monthly' }) => {
    const isAnnual = billingCycle === 'annual';

    const defaultPlans = [
        {
            id: 'basic',
            name: 'Básico',
            badge: 'Básico',
            description: 'Acceso modular a cursos específicos sin suscripción recurrente.',
            priceMonthly: 29,
            priceAnnualMonthly: 24,
            popular: false,
            features: [
                'Acceso de por vida al curso adquirido',
                'Asistente de IA para dudas en tiempo real',
                'Certificado de finalización verificado',
                'Proyectos prácticos para tu portafolio',
                'Soporte en foros de la comunidad',
            ],
            ctaText: 'Comprar Curso',
        },
        {
            id: 'pro',
            name: 'Plan Pro',
            badge: 'Más Popular',
            description: 'Acceso ilimitado a todas las rutas de desarrollo e Inteligencia Artificial.',
            priceMonthly: 49,
            priceAnnualMonthly: 39,
            popular: true,
            features: [
                'Acceso ilimitado a todos los cursos de la plataforma',
                'Tutor de IA con revisión automatizada de código',
                'Rutas de aprendizaje guiadas por rol (Frontend, Backend, IA)',
                'Descarga de materiales y proyectos finales',
                'Certificados profesionales emitidos en Blockchain',
                'Soporte prioritario por mentores en vivo',
            ],
            ctaText: 'Comenzar Prueba Gratis',
        },
        {
            id: 'team',
            name: 'Equipos & Empresas',
            badge: 'Empresas',
            description: 'Capacitación para equipos con dashboard de seguimiento y métricas.',
            priceMonthly: 99,
            priceAnnualMonthly: 79,
            popular: false,
            features: [
                'Todas las características del Plan Pro',
                'Dashboard de métricas y avance del equipo',
                'Asignación personalizada de rutas y capstones',
                'Facturación centralizada y gestión de licencias',
                'Sesiones mensuales Q&A con instructores',
            ],
            ctaText: 'Contactar a Ventas',
        },
    ];

    const displayPlans = plans.length > 0 ? plans : defaultPlans;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-stretch">
            {displayPlans.map((plan) => {
                const monthlyPrice = plan.priceMonthly;
                const annualPrice = plan.priceAnnualMonthly ?? Math.round(monthlyPrice * 0.8);
                const displayPrice = isAnnual ? annualPrice : monthlyPrice;

                return (
                    <div
                        key={plan.id}
                        className={`flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 transition-colors relative ${plan.popular
                                ? 'border-2 border-indigo-600 dark:border-indigo-500 shadow-lg shadow-indigo-500/10'
                                : 'border border-slate-200 dark:border-slate-800'
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                                {plan.badge || 'Más Popular'}
                            </div>
                        )}

                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                                {plan.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 min-h-[32px]">
                                {plan.description}
                            </p>

                            {/* Price block */}
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                    ${displayPrice}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">/mes</span>

                                {/* Original price crossed out when annual */}
                                {isAnnual && (
                                    <span className="text-sm text-slate-400 dark:text-slate-500 line-through ml-1">
                                        ${monthlyPrice}
                                    </span>
                                )}
                            </div>

                            {/* Annual savings badge */}
                            {isAnnual && (
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-5">
                                    Ahorras ${(monthlyPrice - annualPrice) * 12}/año
                                </div>
                            )}

                            <ul className="space-y-2.5 mb-6">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                        <Check className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all ${plan.popular
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30'
                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                                }`}
                        >
                            {plan.ctaText || 'Seleccionar Plan'}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default PricingGrid;
