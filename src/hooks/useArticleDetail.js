import { useState, useEffect } from 'react';

export const useArticleDetail = (articleId) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulación de carga y manejo de datos robusto con fallback local
        setLoading(true);
        try {
            const mockArticles = [
                {
                    id: 'cambio-paradigma-programacion-agentica',
                    title: 'De Scripts a Agentes de IA: El Cambio de Paradigma en la Programación Agéntica',
                    slug: 'cambio-paradigma-programacion-agentica',
                    excerpt: 'Cómo los flujos de trabajo autónomos con LLMs y herramientas como n8n están reemplazando la automatización secuencial tradicional.',
                    content: `
            La programación agéntica representa un salto cualitativo respecto a los scripts de automatización tradicionales. 
            Mientras que un script ejecuta una secuencia rígida de instrucciones predefinidas, un agente basado en IA tiene la capacidad de razonar, evaluar respuestas intermedias y tomar decisiones adaptativas.

            Principales pilares de la programación agéntica:
            1. Toma de decisiones contextual mediante modelos de lenguaje.
            2. Uso dinámico de herramientas y bases de datos.
            3. Bucles de retroalimentación (Self-Correction).
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
                },
            ];

            const found = mockArticles.find(
                (a) => a.id === articleId || a.slug === articleId
            );

            if (found) {
                setArticle(found);
            } else {
                setArticle(mockArticles[0]);
            }
            setLoading(false);
        } catch (err) {
            setError('Error al cargar el artículo.');
            setLoading(false);
        }
    }, [articleId]);

    return {
        article,
        loading,
        error,
    };
};

export default useArticleDetail;