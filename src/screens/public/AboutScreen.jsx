import React from 'react';
import { useAbout } from '../../hooks/useAbout';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { AboutHero } from '../../components/domain/About/AboutHero';
import { AboutStatsCounter } from '../../components/domain/About/AboutStatsCounter';
import { EducationalPillars } from '../../components/domain/About/EducationalPillars';
import { CompanyTimeline } from '../../components/domain/About/CompanyTimeline';
import { TeamGrid } from '../../components/domain/About/TeamGrid';
import { AlumniLogoCloud } from '../../components/domain/About/AlumniLogoCloud';
import { Loader2 } from 'lucide-react';

export const AboutScreen = () => {
  const {
    stats,
    pillars,
    timelineEvents,
    teamMembers,
    alumniLogos,
    loading,
    error,
  } = useAbout();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar brandTitle="RutaIA" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
            <span className="text-xs font-semibold">Cargando información...</span>
          </div>
        ) : error ? (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        ) : (
          <div className="space-y-16">
            <AboutHero />
            <AboutStatsCounter stats={stats} />
            <EducationalPillars pillars={pillars} />
            <CompanyTimeline events={timelineEvents} />
            <TeamGrid team={teamMembers} />
            <AlumniLogoCloud logos={alumniLogos} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AboutScreen;