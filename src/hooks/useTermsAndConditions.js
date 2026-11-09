import { useState, useEffect } from 'react';

export const useTermsAndConditions = () => {
    const [activeSection, setActiveSection] = useState('aceptacion');

    const sections = [
        { id: 'aceptacion', title: '1. Aceptación de Términos' },
        { id: 'cuentas', title: '2. Cuentas de Usuario y Registro' },
        { id: 'propiedad-intelectual', title: '3. Propiedad Intelectual' },
        { id: 'pagos-reembolsos', title: '4. Pagos, Suscripciones y Reembolsos' },
        { id: 'uso-aceptable', title: '5. Uso Aceptable de la Plataforma' },
        { id: 'cancelacion', title: '6. Cancelación y Suspensión' },
        { id: 'responsabilidad', title: '7. Limitación de Responsabilidad' },
        { id: 'ley-aplicable', title: '8. Ley Aplicable y Jurisdicción' },
    ];

    // Scrollspy: Detecta la sección visible en pantalla durante el desplazamiento
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

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

    // Función para disparar la impresión nativa del documento
    const handlePrint = () => {
        window.print();
    };

    // Función para descargar la versión en PDF del documento legal
    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = '/docs/terminos-y-condiciones-rutaia.pdf';
        link.download = 'Terminos_y_Condiciones_RutaIA.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return {
        sections,
        activeSection,
        handlePrint,
        handleDownloadPdf,
    };
};