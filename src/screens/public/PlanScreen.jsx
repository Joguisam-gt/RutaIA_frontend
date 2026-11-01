import React from 'react';
import { usePricing } from '../../hooks/usePricing';
import { HeaderControls } from '../../components/common/HeaderControls';
import { PricingHeader } from '../../components/domain/pricing/PricingHeader';
import { PricingGrid } from '../../components/domain/pricing/PricingGrid';
import { CourseModularPricingSection } from '../../components/domain/pricing/CourseModularPricingSection';
import { PricingComparisonTable } from '../../components/domain/pricing/PricingComparisonTable';
import { PricingFaqAccordion } from '../../components/domain/pricing/PricingFaqAccordion';

export const PlansScreen = () => {
    const { billingCycle, toggleBillingCycle, plans } = usePricing();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Navbar Superior Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <PricingHeader
                    billingCycle={billingCycle}
                    onToggleBillingCycle={toggleBillingCycle}
                />

                <PricingGrid
                    plans={plans}
                    billingCycle={billingCycle}
                />

                <CourseModularPricingSection />

                <PricingComparisonTable />

                <PricingFaqAccordion />
            </main>
        </div>
    );
};

export default PlansScreen;