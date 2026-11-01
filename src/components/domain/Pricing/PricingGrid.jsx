// src/components/domain/pricing/PricingGrid.jsx
import React from 'react';
import { Check, ArrowRight, Zap, Building2, User } from 'lucide-react';

export const PricingGrid = ({ plans, billingCycle }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {plans.map((plan) => {
                const isAnnual = billingCycle === 'annual';
                const displayPrice = isAnnual ? plan.priceAnnualMonthly : plan.priceMonthly;

                return (
                    <div
                        key={plan.id}
                        className={`relative flex flex-col rounded-3xl p-6 md:p-8 transition-all duration-300 ${plan.highlight
                                ? 'bg-slate-900 text-white border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 dark:bg-slate-900'
                                : 'bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                    >
                        {/* Badge de Popularidad */}
                        {plan.badge && (
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md">
                                {plan.badge}
                            </div>
                        )}

                        {/* Header del Plan */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                {plan.id === 'starter' && <User size={18} className="text-indigo-500" />}
                                {plan.id === 'pro' && <Zap size={18} className="text-cyan-400" />}
                                {plan.id === 'teams' && <Building2 size={18} className="text-violet-400" />}
                                <h3 className={`text-xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
                                    {plan.name}
                                </h3>
                            </div>
                            <p className={`text-xs leading-relaxed ${plan.highlight ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                                {plan.description}
                            </p>
                        </div>

                        {/* Precio */}
                        <div className="mb-6 pb-6 border-b border-slate-200/60 dark:border-slate-800">
                            <div className="flex items-baseline gap-1">
                                <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-slate-50'}`}>
                                    ${displayPrice}
                                </span>
                                <span className={`text-xs font-semibold ${plan.highlight ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {plan.id === 'teams' ? 'USD / usuario / mes' : 'USD / mes'}
                                </span>
                            </div>
                            {isAnnual && plan.priceMonthly > 0 && (
                                <span className="text-[11px] text-emerald-500 font-semibold block mt-1">
                                    Facturado anualmente (${displayPrice * 12} USD/año)
                                </span>
                            )}
                        </div>

                        {/* Lista de Características */}
                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? 'bg-cyan-500/20 text-cyan-400' : 'bg-indigo-500/10 text-indigo-500'
                                        }`}>
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className={plan.highlight ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Botón CTA (Degradado exclusivo para botón Pro/Primary) */}
                        {plan.highlight ? (
                            <button className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                                <span>{plan.ctaText}</span>
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button className="w-full py-3.5 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                                <span>{plan.ctaText}</span>
                                <ArrowRight size={16} />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};