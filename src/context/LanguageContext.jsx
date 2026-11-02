import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        heroTag: 'Nueva Versión 2.0 con IA',
        heroTitle: 'Aprende Desarrollo de Software impulsado por Inteligencia Artificial',
        heroSubtitle: 'Rutas de aprendizaje adaptativas, proyectos reales y feedback de código en tiempo real con asistentes RAG.',
        btnExplore: 'Explorar Cursos',
        btnTryFree: 'Probar Gratis',
        testimonialsTitle: 'Lo que dicen nuestros estudiantes',
        featuredTitle: 'Cursos Destacados',
        featuredSubtitle: 'Domina las tecnologías más demandadas del mercado laboral tech.',
    },
    en: {
        heroTag: 'New Version 2.0 with AI',
        heroTitle: 'Learn Software Development powered by Artificial Intelligence',
        heroSubtitle: 'Adaptive learning paths, real projects, and real-time code feedback with RAG assistants.',
        btnExplore: 'Explore Courses',
        btnTryFree: 'Try Free',
        testimonialsTitle: 'What our students say',
        featuredTitle: 'Featured Courses',
        featuredSubtitle: 'Master the most in-demand technologies in the tech market.',
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage debe ser utilizado dentro de un LanguageProvider');
    }
    return context;
};

export default LanguageContext;