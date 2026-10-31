import React from 'react';
import { HeaderControls } from '../../components/common/HeaderControls';
import { HeroSection } from '../../components/domain/landing/HeroSection';
import { ProofCounterBanner } from '../../components/domain/landing/ProofCounterBanner';
import { FeaturedCoursesCarousel } from '../../components/domain/landing/FeaturedCoursesCarousel';
import { ValuePropsGrid } from '../../components/domain/landing/ValuePropsGrid';
import { TestimonialsCarousel } from '../../components/domain/landing/TestimonialsCarousel';
import { CtaBanner } from '../../components/domain/landing/CtaBanner';

export const LandingScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo con Controles de Tema e Idioma */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                            RutaIA
                        </span>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Secciones de la Landing Page */}
            <main>
                <HeroSection />
                <ProofCounterBanner />
                <FeaturedCoursesCarousel />
                <ValuePropsGrid />
                <TestimonialsCarousel />
                <CtaBanner />
            </main>
        </div>
    );
};

export default LandingScreen;