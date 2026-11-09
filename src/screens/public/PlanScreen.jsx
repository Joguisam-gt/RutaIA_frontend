import React from 'react';
import { usePricing } from '../../hooks/usePricing';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { PricingHeader } from '../../components/domain/pricing/PricingHeader';
import { PricingGrid } from '../../components/domain/pricing/PricingGrid';
import { CourseModularPricingSection } from '../../components/domain/pricing/CourseModularPricingSection';
import { PricingComparisonTable } from '../../components/domain/pricing/PricingComparisonTable';
import { PrincingFaqAccordion } from '../../components/domain/pricing/PrincingFaqAccordion';
import { Loader2 } from 'lucide-react';

export const PlanScreen = () => {
    const {
        billingCycle,
        setBillingCycle,
        plans,
        featuresComparison,
        faqs,
        loading,
        error,
    } = usePricing();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <PricingHeader
                    billingCycle={billingCycle}
                    onBillingCycleChange={setBillingCycle}
                />

                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando planes de suscripción...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs mt-6">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-16 mt-8">
                        <PricingGrid plans={plans} billingCycle={billingCycle} />
                        <CourseModularPricingSection />
                        <PricingComparisonTable comparison={featuresComparison} />
                        <PrincingFaqAccordion faqs={faqs} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default PlanScreen;