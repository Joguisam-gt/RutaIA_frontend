import React from 'react';
import { AboutHero } from '../../components/domain/About/AboutHero.jsx';
import { AboutStatsCounter } from '../../components/domain/About/AboutStatsCounter.jsx';
import { EducationalPillars } from '../../components/domain/About/EducationalPillars.jsx';
import { CompanyTimeline } from '../../components/domain/About/CompanyTimeline.jsx';
import { TeamGrid } from '../../components/domain/About/TeamGrid.jsx';

const publicTimeline = [
  {
    year: '2024',
    title: 'Fundación de RutaIA',
    description: 'Nace la plataforma con el objetivo de democratizar la educación en Inteligencia Artificial y Desarrollo Web en Latinoamérica.',
  },
  {
    year: '2025',
    title: 'Lanzamiento de Curriculas por Rol',
    description: 'Estructuración de 4 especialidades con proyectos prácticos e integración de tutores de IA en tiempo real.',
  },
  {
    year: '2026',
    title: 'Certificación Blockchain y Expansión',
    description: 'Implementación de certificados emitidos en Blockchain y alianzas con empresas para inserción laboral.',
  },
];

const teamMembers = [
  {
    name: 'José Rodríguez',
    role: 'Fundador & Lead Backend Architect',
    bio: 'Especialista en Node.js, arquitectura de microservicios y sistemas de IA aplicados a la educación.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Sofía Martínez',
    role: 'Head of UX/UI & Product Design',
    bio: 'Diseñadora de sistemas de diseño escalables y experiencias de aprendizaje intuitivas.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Carlos Mendoza',
    role: 'AI Engineer & Mentor de Agentes',
    bio: 'Investigador en LLMs, workflows automatizados con n8n e integración de APIs de Inteligencia Artificial.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
];

export const AboutScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <AboutHero />
      <AboutStatsCounter />
      <EducationalPillars />
      <CompanyTimeline timeline={publicTimeline} />
      <TeamGrid team={teamMembers} />
    </div>
  );
};

export default AboutScreen;