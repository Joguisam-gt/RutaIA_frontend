import React from 'react';
import { useAbout } from '../../hooks/useAbout';
import { HeaderControls } from '../../components/common/HeaderControls';
import { AboutHero } from '../../components/domain/about/AboutHero';
import { AboutStatsCounter } from '../../components/domain/about/AboutStatsCounter';
import { EducationalPillars } from '../../components/domain/about/EducationalPillars';
import { CompanyTimeline } from '../../components/domain/about/CompanyTimeline';
import { TeamGrid } from '../../components/domain/about/TeamGrid';
import { AlumniLogoCloud } from '../../components/domain/about/AlumniLogoCloud';

export const AboutScreen = () => {
  const { stats, pillars, timeline, team, companies } = useAbout();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header Fijo */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
            RutaIA
          </a>
          <HeaderControls />
        </div>
      </header>

      {/* Secciones de la vista Nosotros */}
      <main>
        <AboutHero />
        <AboutStatsCounter stats={stats} />
        <EducationalPillars pillars={pillars} />
        <CompanyTimeline timeline={timeline} />
        <TeamGrid team={team} />
        <AlumniLogoCloud companies={companies} />
      </main>
    </div>
  );
};

export default AboutScreen;