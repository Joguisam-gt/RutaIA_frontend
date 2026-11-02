import { useState } from 'react';

const MOCK_POSTS = [
    {
        id: 'cambio-paradigma-programacion-agentica',
        title: 'De Scripts a Agentes de IA: El Cambio de Paradigma en la Programación Agéntica',
        slug: 'cambio-paradigma-programacion-agentica',
        excerpt: 'Cómo los flujos de trabajo autónomos con LLMs y herramientas como n8n están reemplazando la automatización secuencial tradicional.',
        content: `
      La programación agéntica representa un salto cualitativo respecto a los scripts de automatización tradicionales. 
      Mientras que un script ejecuta una secuencia rígida de instrucciones predefinidas, un agente basado en IA tiene la capacidad de razonar, evaluar respuestas intermedias y tomar decisiones adaptativas.

      ### Principales pilares de la programación agéntica:
      1. **Toma de decisiones contextual:** Evaluaciones en tiempo real mediante modelos de lenguaje.
      2. **Uso dinámico de herramientas:** Capacidad de consultar bases de datos SQL/NoSQL, consumir APIs externas e interpretar código.
      3. **Bucles de retroalimentación (Self-Correction):** Verificación de errores y reintentos autónomos antes de entregar el resultado final.
    `,
        category: 'Inteligencia Artificial',
        readTime: '6 min de lectura',
        author: {
            name: 'José Rodríguez',
            role: 'Lead Architect & Founder',
            avatar: 'https://picsum.photos/id/1005/150/150',
        },
        publishedAt: '28 de Octubre, 2026',
        coverImage: 'https://picsum.photos/id/1060/800/400',
        featured: true,
    },
    {
        id: 'patrones-resiliencia-nodejs-microservicios',
        title: 'Patrones de Resiliencia en Node.js: Circuit Breaker y Rate Limiting en Microservicios',
        slug: 'patrones-resiliencia-nodejs-microservicios',
        excerpt: 'Estrategias avanzadas para proteger tus microservicios Express ante caídas de cascada y picos inusuales de tráfico.',
        content: `
      En arquitecturas distribuidas, la tolerancia a fallos es fundamental. Si una dependencia externa cae o sufre alta latencia, puede agotar los recursos de tu servidor rápidamente.

      ### Implementación de Circuit Breaker:
      Utilizar librerías como Opossum permite envolver llamadas críticas para abrir el circuito ante un umbral de fallos acumulados, devolviendo un fallo controlado inmediatamente sin sobrecargar la red.
    `,
        category: 'Backend',
        readTime: '8 min de lectura',
        author: {
            name: 'José Rodríguez',
            role: 'Backend Architect',
            avatar: 'https://picsum.photos/id/1005/150/150',
        },
        publishedAt: '22 de Octubre, 2026',
        coverImage: 'https://picsum.photos/id/1015/800/400',
        featured: false,
    },
    {
        id: 'transacciones-acid-mongodb-vs-postgresql',
        title: 'Transacciones ACID en MongoDB vs. PostgreSQL: ¿Cuándo Usar Cada Una?',
        slug: 'transacciones-acid-mongodb-vs-postgresql',
        excerpt: 'Un análisis exhaustivo sobre consistencia de datos, rendimiento de índices y casos de uso en producción para bases de datos híbridas.',
        content: `
      Garantizar las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad) es crítico en aplicaciones financieras y plataformas educativas que gestionan inscripciones o pagos.
    `,
        category: 'Bases de Datos',
        readTime: '10 min de lectura',
        author: {
            name: 'Carlos Mendoza',
            role: 'Database Engineer',
            avatar: 'https://picsum.photos/id/1012/150/150',
        },
        publishedAt: '15 de Octubre, 2026',
        coverImage: 'https://picsum.photos/id/1033/800/400',
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