import React from 'react';
import HeroSection from '../../components/domain/landing/HeroSection';
import ValuePropsGrid from '../../components/domain/landing/ValuePropsGrid';
import { FeaturedCoursesCarousel } from '../../components/domain/landing/FeatureCousesCarrusel';
import TestimonialsCarousel from '../../components/domain/landing/TestimonialsCarousel';
import CtaBanner from '../../components/domain/landing/CtaBanner';

export const LandingScreen = () => {
    return (
        <div className="space-y-12">
            <HeroSection />
            <ValuePropsGrid />
            <FeaturedCoursesCarousel />
            <TestimonialsCarousel />
            <CtaBanner />
        </div>
    );
};

export default LandingScreen;