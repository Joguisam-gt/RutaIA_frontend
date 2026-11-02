import React from 'react';
import { Check } from 'lucide-react';

export const PricingGrid = ({ plans = [], billingCycle = 'monthly' }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => {
                const isAnnual = billingCycle === 'annual';
                const displayPrice = isAnnual ? plan.priceAnnualMonthly : plan.priceMonthly;

                return (
                    <div
                        key={plan.id}
                        className={`relative flex flex-col rounded-2xl p-6 md:p-8 transition-colors ${plan.popular
                                ? 'bg-slate-900 text-white border-2 border-indigo-600 dark:bg-slate-900'
                                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800'
                            }`}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                {plan.badge}
                            </span>
                        )}

                        <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                        <p className={`text-xs mb-6 ${plan.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
                            {plan.description}
                        </p>

                        <div className="mb-6">
                            <span className="text-4xl font-extrabold">${displayPrice}</span>
                            <span className={`text-xs ml-1 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                / mes {isAnnual ? '(facturado anualmente)' : ''}
                            </span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1 text-xs">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <Check size={16} className={plan.popular ? 'text-indigo-400' : 'text-indigo-600 dark:text-indigo-400'} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-3 rounded-xl text-xs font-bold transition-colors ${plan.popular
                                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100'
                                }`}
                        >
                            {plan.ctaText}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default PricingGrid;