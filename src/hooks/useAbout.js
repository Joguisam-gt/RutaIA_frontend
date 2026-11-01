import { useState } from 'react';

export const useAbout = () => {
    const [stats] = useState([
        { label: 'Egresados Certificados', value: '+50,000' },
        { label: 'Países en Latinoamérica', value: '18+' },
        { label: 'Inserción Laboral (6 meses)', value: '94%' },
        { label: 'Horas de Práctica Grabada', value: '+1,200' },
    ]);

    const [pillars] = useState([
        {
            title: 'Aprender Haciendo (Project-Based)',
            description: 'Cero teoría aislada. Todo concepto se consolida mediante proyectos reales de código o casos de estudio de diseño UI/UX.',
            iconName: 'Code2',
        },
        {
            title: 'Acompañamiento Agéntico de IA',
            description: 'Feedback instantáneo en tiempo real sobre sintaxis, arquitectura de código y optimizaciones mediante asistentes IA.',
            iconName: 'Bot',
        },
        {
            title: 'Mentoria por Prácticos de la Industria',
            description: 'Contenido diseñado y supervisado por ingenieros y diseñadores activos en empresas tecnológicas de primer nivel.',
            iconName: 'Users',
        },
        {
            title: 'Accesibilidad e Inclusión',
            description: 'Precios justos, rutas modulares flexibilizadas y formación pensada para democratizar el acceso a empleos tech.',
            iconName: 'HeartHandshake',
        },
    ]);

    const [timeline] = useState([
        {
            year: '2024',
            title: 'Nacimiento de RutaIA',
            description: 'Lanzamiento de las primeras rutas de formación práctica en desarrollo web y bases de datos.',
        },
        {
            year: '2025',
            title: 'Integración de Asistentes IA',
            description: 'Incorporación del motor agéntico RAG para revisión y consulta contextual en tiempo real.',
        },
        {
            year: '2026',
            title: 'Expansión de Catálogo e Impacto',
            description: 'Lanzamiento de programas de IA Agéntica y UI/UX, alcanzando más de 50,000 estudiantes activos.',
        },
    ]);

    const [team] = useState([
        {
            name: 'José Guillermo Rodríguez Samcam',
            role: 'Fundador & Director de Arquitectura',
            bio: 'Full-stack software engineer especializado en Node.js, Express, Strapi API, NoSQL e Inteligencia Artificial.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
        },
        {
            name: 'Elena Rostova',
            role: 'Líder de UX/UI & Producto',
            bio: 'Diseñadora de sistemas complejos, design tokens y experiencia de usuario adaptada a copilotos de IA.',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
        },
        {
            name: 'Carlos Mendoza',
            role: 'Instructor Senior de Backend & Cloud',
            bio: 'Especialista en motores de bases de datos relacionales, NoSQL, pgvector y arquitecturas distribuidas.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
        },
    ]);

    const [companies] = useState([
        { name: 'Mercado Libre', logoText: 'MercadoLibre' },
        { name: 'Globant', logoText: 'Globant' },
        { name: 'Rappi', logoText: 'Rappi' },
        { name: 'Nubank', logoText: 'Nubank' },
        { name: 'Kavak', logoText: 'Kavak' },
    ]);

    return {
        stats,
        pillars,
        timeline,
        team,
        companies,
    };
};