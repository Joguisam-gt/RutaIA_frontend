import { useState, useEffect } from 'react';

export const usePrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('recopilacion');
    const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

    // Estado para las preferencias de cookies
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true, // Siempre activas
        analytics: true,
        marketing: false,
        aiPersonalization: true,
    });

    const [cookieSavedToast, setCookieSavedToast] = useState(false);

    const sections = [
        { id: 'recopilacion', title: '1. Recopilación de Datos' },
        { id: 'uso-datos', title: '2. Uso e Integración con IA' },
        { id: 'terceros', title: '3. Compartición con Terceros' },
        { id: 'cookies', title: '4. Cookies y Rastreo' },
        { id: 'derechos-arco', title: '5. Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición)' },
        { id: 'seguridad', title: '6. Almacenamiento y Seguridad' },
    ];

    // Scrollspy: Actualiza la sección activa conforme el usuario se desplaza
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 220;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleCookieModal = () => {
        setIsCookieModalOpen((prev) => !prev);
    };

    const handleCookieToggle = (key) => {
        if (key === 'essential') return; // No modificable
        setCookiePreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const saveCookiePreferences = () => {
        localStorage.setItem('rutaia_cookie_prefs', JSON.stringify(cookiePreferences));
        setIsCookieModalOpen(false);
        setCookieSavedToast(true);
        setTimeout(() => setCookieSavedToast(false), 3000);
    };

    return {
        sections,
        activeSection,
        isCookieModalOpen,
        toggleCookieModal,
        cookiePreferences,
        handleCookieToggle,
        saveCookiePreferences,
        cookieSavedToast,
    };
};