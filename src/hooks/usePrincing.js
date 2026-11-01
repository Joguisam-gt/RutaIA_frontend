// src/hooks/usePricing.js
import { useState } from 'react';

export const usePricing = () => {
    const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

    const toggleBillingCycle = () => {
        setBillingCycle((prev) => (prev === 'monthly' ? 'annual' : 'monthly'));
    };

    // Precios base mensuales y anuales (con 20% descuento en anual)
    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            badge: null,
            description: 'Ideal para explorar la plataforma y tomar las primeras lecciones de prueba.',
            priceMonthly: 0,
            priceAnnualMonthly: 0,
            highlight: false,
            ctaText: 'Comenzar Gratis',
            ctaVariant: 'secondary',
            features: [
                'Acceso a lecciones de prueba en abierto',
                'Acceso a la comunidad en Discord',
                'Asistente de IA (consultas básicas)',
                'Sin tarjeta de crédito requerida',
            ],
        },
        {
            id: 'pro',
            name: 'Pro',
            badge: 'Más Popular',
            description: 'Acceso ilimitado a todas las rutas tecnológicas, certificados y recursos.',
            priceMonthly: 19,
            priceAnnualMonthly: 15, // 20% de ahorro ($180/año)
            highlight: true,
            ctaText: 'Obtener Plan Pro',
            ctaVariant: 'primary',
            features: [
                'Acceso ilimitado a las 4 rutas de especialización',
                '+500 clases grabadas en 4K',
                'Certificados oficiales con código QR y LinkedIn',
                'Descarga de código fuente y proyectos',
                'Consultas ilimitadas con el Asistente IA RAG',
                'Revisión automática de código',
            ],
        },
        {
            id: 'teams',
            name: 'Teams',
            badge: 'Empresas',
            description: 'Para equipos de desarrollo y diseño que buscan escalar sus competencias.',
            priceMonthly: 49,
            priceAnnualMonthly: 39,
            highlight: false,
            ctaText: 'Contactar Ventas B2B',
            ctaVariant: 'secondary',
            features: [
                'Todo lo incluido en el Plan Pro',
                'Panel de administración de equipo',
                'Reportes de progreso y métricas de retención',
                'Facturación B2B e impuestos deducibles',
                'Gestor de cuenta y soporte prioritario',
                'Licencias transferibles entre miembros',
            ],
        };

    return {
        billingCycle,
        toggleBillingCycle,
        plans,
    };
};