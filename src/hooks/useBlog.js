import { useState } from 'react';

const MOCK_POSTS = [
    {
        id: 'cambio-paradigma-programacion-agentica',
        title: 'De Scripts a Agentes de IA: El Cambio de Paradigma en la Programación Agéntica',
        slug: 'cambio-paradigma-programacion-agentica',
        excerpt: 'Cómo los flujos de trabajo autónomos con LLMs y herramientas como n8n están reemplazando la automatización secuencial tradicional.',
        content: `La programación agéntica representa un salto cualitativo respecto a los scripts de automatización tradicionales. Mientras que un script ejecuta una secuencia rígida de instrucciones predefinidas, un agente basado en IA tiene la capacidad de razonar, evaluar respuestas intermedias y tomar decisiones adaptativas.`,
        category: 'Inteligencia Artificial',
        readTime: '6 min de lectura',
        author: {
            name: 'José Rodríguez',
            role: 'Lead Architect & Founder',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        publishedAt: '28 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop',
        featured: true,
    },
    {
        id: 'patrones-resiliencia-nodejs-microservicios',
        title: 'Patrones de Resiliencia en Node.js: Circuit Breaker y Rate Limiting en Microservicios',
        slug: 'patrones-resiliencia-nodejs-microservicios',
        excerpt: 'Estrategias avanzadas para proteger tus microservicios Express ante caídas de cascada y picos inusuales de tráfico en producción.',
        content: `En arquitecturas distribuidas, la tolerancia a fallos es fundamental. Si una dependencia externa cae o sufre alta latencia, puede agotar los recursos de tu servidor rápidamente.`,
        category: 'Backend',
        readTime: '8 min de lectura',
        author: {
            name: 'José Rodríguez',
            role: 'Backend Architect',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        publishedAt: '22 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 'transacciones-acid-mongodb-vs-postgresql',
        title: 'Transacciones ACID en MongoDB vs. PostgreSQL: ¿Cuándo Usar Cada Una?',
        slug: 'transacciones-acid-mongodb-vs-postgresql',
        excerpt: 'Un análisis exhaustivo sobre consistencia de datos, rendimiento de índices y casos de uso en producción para bases de datos híbridas.',
        content: `Garantizar las propiedades ACID es crítico en aplicaciones financieras y plataformas educativas que gestionan inscripciones o pagos.`,
        category: 'Bases de Datos',
        readTime: '10 min de lectura',
        author: {
            name: 'Carlos Mendoza',
            role: 'Database Engineer',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        },
        publishedAt: '15 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 'react-19-concurrent-features-guia-practica',
        title: 'React 19 y Concurrent Features: Guía Práctica para Proyectos en Producción',
        slug: 'react-19-concurrent-features-guia-practica',
        excerpt: 'Cómo aprovechar Transitions, Suspense y el nuevo compilador de React 19 para interfaces más fluidas y performantes.',
        content: `React 19 introduce mejoras significativas en el modelo de concurrencia, permitiendo que las interfaces respondan de forma instantánea incluso durante renderizados pesados.`,
        category: 'Desarrollo Web',
        readTime: '7 min de lectura',
        author: {
            name: 'Sofía Martínez',
            role: 'Frontend Engineer',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
        },
        publishedAt: '10 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 'rag-embeddings-qdrant-produccion',
        title: 'RAG en Producción: Embeddings, Qdrant y Estrategias de Chunking que Funcionan',
        slug: 'rag-embeddings-qdrant-produccion',
        excerpt: 'Lecciones aprendidas al escalar un sistema RAG real: desde la ingesta de PDFs hasta la recuperación semántica filtrada con metadatos.',
        content: `Implementar un sistema RAG funcional en producción implica mucho más que conectar un LLM a una base de datos vectorial. La calidad del chunking, los metadatos y la estrategia de filtrado son determinantes.`,
        category: 'Inteligencia Artificial',
        readTime: '12 min de lectura',
        author: {
            name: 'José Rodríguez',
            role: 'AI Engineer',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        publishedAt: '5 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
        featured: false,
    },
    {
        id: 'design-tokens-figma-tailwind-flujo-moderno',
        title: 'Design Tokens entre Figma y Tailwind: El Flujo que Elimina la Desincronización',
        slug: 'design-tokens-figma-tailwind-flujo-moderno',
        excerpt: 'Cómo mantener colores, tipografías y espaciados perfectamente sincronizados entre el diseño y el código usando tokens automatizados.',
        content: `La brecha entre diseñadores y desarrolladores sigue siendo uno de los mayores puntos de fricción en los equipos de producto. Los design tokens son la solución.`,
        category: 'UX/UI',
        readTime: '9 min de lectura',
        author: {
            name: 'Sofía Martínez',
            role: 'Head of UX/UI',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
        },
        publishedAt: '1 de Octubre, 2026',
        coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        featured: false,
    },
];

export const useBlog = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = [
        'Todos',
        'Inteligencia Artificial',
        'Backend',
        'Desarrollo Web',
        'UX/UI',
        'Bases de Datos',
    ];

    const featuredPost = MOCK_POSTS.find((p) => p.featured) || MOCK_POSTS[0];

    const filteredPosts = MOCK_POSTS.filter((post) => {
        if (selectedCategory === 'Todos') return true;
        return post.category === selectedCategory;
    });

    return {
        posts: filteredPosts,
        categories,
        featuredPost,
        selectedCategory,
        setSelectedCategory,
    };
};

export default useBlog;