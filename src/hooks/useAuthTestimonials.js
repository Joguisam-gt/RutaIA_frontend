import { useState, useEffect } from 'react';

export const useAuthTestimonials = () => {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    const testimonials = [
        {
            quote: "Gracias a las rutas de bases de datos e IA en RutaIA, logré pasar de maquetador junior a backend API architect en 6 meses.",
            author: "Carlos Eduardo Mendoza",
            role: "Backend Engineer en Mercado Libre",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            rating: 5,
        },
        {
            quote: "El sistema de feedback inmediato por agentes de IA y los proyectos capstone me dieron el portafolio real que necesitaba para destacar.",
            author: "Valeria Gómez",
            role: "UX/UI Lead en Globant",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            rating: 5,
        },
        {
            quote: "La flexibilidad de adquirir pases por módulo me permitió especializarme en pgvector y RAG sin comprometer mi presupuesto.",
            author: "Mateo Silva",
            role: "AI Software Developer en Rappi",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            rating: 5,
        },
    ];

    // Rotación automática de testimonios cada 6 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return {
        testimonial: testimonials[currentTestimonialIndex],
        totalTestimonials: testimonials.length,
        currentIndex: currentTestimonialIndex,
        setIndex: setCurrentTestimonialIndex,
    };
};