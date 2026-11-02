import { useState } from 'react';

export const usePricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
    const [selectedPlanId, setSelectedPlanId] = useState('pro');

    const plans = [
        {
            id: 'basic',
            name: 'Plan Cursos Individuales',
            badge: 'Básico',
            description: 'Acceso modular a cursos específicos sin suscripción recurrente.',
            priceMonthly: 29,
            priceAnnualMonthly: 24,
            popular: false,
            features: [
                'Acceso de por vida al curso adquirido',
                'Asistente de IA para dudas en tiempo real',
                'Certificado de finalización verificado',
                'Proyectos prácticos para tu portafolio',
                'Soporte en foros de la comunidad',
            ],
            ctaText: 'Comprar Curso',
        },
        {
            id: 'pro',
            name: 'Plan Pro Suscripción',
            badge: 'Más Popular',
            description: 'Acceso ilimitado a todas las rutas de desarrollo de software e Inteligencia Artificial.',
            priceMonthly: 49,
            priceAnnualMonthly: 39,
            popular: true,
            features: [
                'Acceso ilimitado a todos los cursos de la plataforma',
                'Tutor de IA con revisión automatizada de código',
                'Rutas de aprendizaje guiadas por rol (Frontend, Backend, IA)',
                'Descarga de materiales y proyectos finales',
                'Certificados profesionales emitidos en Blockchain',
                'Soporte prioritario por mentores en vivo',
            ],
            ctaText: 'Comenzar Prueba Gratis',
        },
        {
            id: 'team',
            name: 'Plan Equipos & Empresas',
            badge: 'Empresas',
            description: 'Capacitación para equipos de desarrollo con dashboard de seguimiento y métricas.',
            priceMonthly: 99,
            priceAnnualMonthly: 79,
            popular: false,
            features: [
                'Todas las características del Plan Pro',
                'Dashboard de métricas y avance de miembros del equipo',
                'Asignación personalizada de rutas y capstones',
                'Facturación centralizada y gestión de licencias',
                'Sesiones mensuales Q&A exclusivas con instructores',
            ],
            ctaText: 'Contactar a Ventas',
        },
    ];

    const toggleBillingCycle = () => {
        setBillingCycle((prev) => (prev === 'monthly' ? 'annual' : 'monthly'));
    };

    return {
        billingCycle,
        setBillingCycle,
        toggleBillingCycle,
        selectedPlanId,
        setSelectedPlanId,
        plans,
    };
};

export default usePricing;