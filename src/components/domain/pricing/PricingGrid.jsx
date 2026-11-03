import React from 'react';
import { Check } from 'lucide-react';

export const PricingGrid = () => {
    const plans = [
        {
            name: 'Básico',
            price: '$19',
            period: '/mes',
            description: 'Acceso a cursos introductorios y comunidad.',
            features: ['Cursos de nivel básico', 'Acceso a la comunidad', 'Certificados digitales'],
            popular: false,
        },
        {
            name: 'PRO IA',
            price: '$49',
            period: '/mes',
            description: 'Acceso completo a todas las rutas y tutores IA.',
            features: [
                'Acceso ilimitado a todos los cursos',
                'Tutoría personalizada con IA 24/7',
                'Proyectos con revisión de código',
                'Certificaciones verificadas',
            ],
            popular: true,
        },
        {
            name: 'Empresas',
            price: '$129',
            period: '/mes',
            description: 'Capacitación de equipos de desarrollo.',
            features: ['Todo lo del plan PRO', 'Panel de administración de equipo', 'Reportes de progreso', 'Soporte prioritario'],
            popular: false,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-stretch">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`flex flex-col justify-between p-6 rounded-lg bg-white dark:bg-slate-900 transition-colors ${plan.popular
                            ? 'border-2 border-blue-600 dark:border-blue-500 shadow-md relative'
                            : 'border border-slate-200 dark:border-slate-800'
                        }`}
                >
                    {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Más Popular
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {plan.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 min-h-[32px]">
                            {plan.description}
                        </p>
                        <div className="flex items-baseline mb-6">
                            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                                {plan.price}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">
                                {plan.period}
                            </span>
                        </div>

                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, fIndex) => (
                                <li key={fIndex} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        className={`w-full py-2.5 px-4 text-sm font-semibold rounded-md transition-colors ${plan.popular
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
                            }`}
                    >
                        Seleccionar Plan
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PricingGrid;