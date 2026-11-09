import React from 'react';
import { usePricing } from '../../hooks/usePricing';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { PricingHeader } from '../../components/domain/pricing/PricingHeader';
import { PricingGrid } from '../../components/domain/pricing/PricingGrid';
import { CourseModularPricingSection } from '../../components/domain/pricing/CourseModularPricingSection';
import { PricingComparisonTable } from '../../components/domain/pricing/PricingComparisonTable';
import { PrincingFaqAccordion } from '../../components/domain/pricing/PrincingFaqAccordion';

export const PlanScreen = () => {
    const {
        billingCycle,
        toggleBillingCycle,
        plans,
    } = usePricing();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <PricingHeader
                    billingCycle={billingCycle}
                    onToggleBillingCycle={toggleBillingCycle}
                />

                <div className="space-y-16 mt-8">
                    <PricingGrid plans={plans} billingCycle={billingCycle} />
                    <CourseModularPricingSection />
                    <PricingComparisonTable />
                    <PrincingFaqAccordion />
                </div>
            </main>
        </div>
    );
};

export default PlanScreen;
