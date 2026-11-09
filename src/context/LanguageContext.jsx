// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es');

    const t = (key, fallback = key) => fallback;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback seguro si se usa fuera de un Provider
        return { 
            language: 'es', 
            setLanguage: () => {}, 
            t: (key, fallback = key) => fallback 
        };
    }
    return context;
};

export default LanguageContext;