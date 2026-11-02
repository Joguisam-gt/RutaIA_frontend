import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    es: {
        // Navbar
        catalog: 'Catálogo',
        blog: 'Blog',
        plans: 'Planes',
        about: 'Nosotros',
        studentPanel: 'Panel Estudiante',
        instructorPanel: 'Panel Instructor',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        logout: 'Cerrar Sesión',
        back: 'Volver',

        // Blog
        blogTitle: 'Artículos & Recursos Técnicos',
        blogSubtitle: 'Publicaciones sobre arquitectura de software, inteligencia artificial y mejores prácticas de la industria.',
        readMore: 'Leer Artículo',
        readTime: 'de lectura',

        // Cursos & Landing
        featuredTitle: 'Cursos Destacados',
        featuredSubtitle: 'Aprende las habilidades técnicas con mayor demanda en el mercado laboral.',
        viewCourse: 'Ver Curso',
        level: 'Nivel',

        // Filtros
        all: 'Todos',
        categories: 'Categorías',
        searchPlaceholder: 'Buscar por título o tecnología...',
    },
    en: {
        // Navbar
        catalog: 'Catalog',
        blog: 'Blog',
        plans: 'Pricing',
        about: 'About Us',
        studentPanel: 'Student Portal',
        instructorPanel: 'Instructor Portal',
        login: 'Log In',
        register: 'Sign Up',
        logout: 'Log Out',
        back: 'Back',

        // Blog
        blogTitle: 'Articles & Technical Resources',
        blogSubtitle: 'Publications on software architecture, artificial intelligence, and industry best practices.',
        readMore: 'Read Article',
        readTime: 'read',

        // Cursos & Landing
        featuredTitle: 'Featured Courses',
        featuredSubtitle: 'Learn the most in-demand technical skills in the job market.',
        viewCourse: 'View Course',
        level: 'Level',

        // Filtros
        all: 'All',
        categories: 'Categories',
        searchPlaceholder: 'Search by title or technology...',
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;