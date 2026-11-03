// src/screens/public/LandingScreen.jsx
import React from 'react';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import HeroSection from '../../components/domain/landing/HeroSection';
import ValuePropsGrid from '../../components/domain/landing/ValuePropsGrid';
import { FeaturedCoursesCarousel } from '../../components/domain/landing/FeatureCousesCarrusel';
import TestimonialsCarousel from '../../components/domain/landing/TestimonialsCarousel';
import CtaBanner from '../../components/domain/landing/CtaBanner';

export const LandingScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            {/* Componente Navbar */}
            <Navbar />

            {/* Contenido con pt-16 para no quedar tapado por el header fixed */}
            <main className="pt-16 space-y-12">
                <HeroSection />
                <ValuePropsGrid />
                <FeaturedCoursesCarousel />
                <TestimonialsCarousel />
                <CtaBanner />
            </main>
        </div>
    );
};

export default LandingScreen;