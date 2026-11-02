import React from 'react';
import { HeaderControls } from '../../components/common/HeaderControls.jsx';
import { HeroSection } from '../../components/domain/landing/HeroSection.jsx';
import { ProofCounterBanner } from '../../components/domain/landing/ProofCounterBanner.jsx';
import { ValuePropsGrid } from '../../components/domain/landing/ValuePropsGrid.jsx';
import { FeaturedCoursesCarousel } from '../../components/domain/landing/FeatureCousesCarrusel.jsx';
import { TestimonialsCarousel } from '../../components/domain/landing/TestimonialsCarousel.jsx';
import { CtaBanner } from '../../components/domain/landing/CtaBanner.jsx';

export const LandingScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
            <HeaderControls showBack={false} />
            <HeroSection />
            <ProofCounterBanner />
            <ValuePropsGrid />
            <FeaturedCoursesCarousel />
            <TestimonialsCarousel />
            <CtaBanner />
        </div>
    );
};

export default LandingScreen;