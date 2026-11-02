import React from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { HeroSection } from '../../components/domain/landing/HeroSection';
import { ProofCounterBanner } from '../../components/domain/landing/ProofCounterBanner';
import { ValuePropsGrid } from '../../components/domain/landing/ValuePropsGrid';
import { FeatureCousesCarrusel } from '../../components/domain/landing/FeatureCousesCarrusel';
import { TestimonialsCarousel } from '../../components/domain/landing/TestimonialsCarousel';
import { CtaBanner } from '../../components/domain/landing/CtaBanner';

export const LandingScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="space-y-16 py-8">
                <HeroSection />
                <ProofCounterBanner />
                <ValuePropsGrid />
                <FeatureCousesCarrusel />
                <TestimonialsCarousel />
                <CtaBanner />
            </main>
        </div>
    );
};

export default LandingScreen;