import { useState, useEffect, useCallback } from 'react';
import { articleDetailApi } from '../api/articleDetailApi';

export const useArticleDetail = (articleSlug) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para la barra de progreso de lectura (0% a 100%)
    const [readingProgress, setReadingProgress] = useState(0);

    // Estado para la sección activa en el Table of Contents (TOC)
    const [activeHeadingId, setActiveHeadingId] = useState('');

    // Estado para la confirmación de copia de código (código 1-click copy)
    const [copiedCodeId, setCopiedCodeId] = useState(null);

    // Carga inicial del artículo
    const fetchArticle = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await articleDetailApi.getArticleBySlug(articleSlug);
            setArticle(data);
        } catch (err) {
            setError(err.message || 'No se pudo cargar el artículo especificado.');
        } finally {
            setLoading(false);
        }
    }, [articleSlug]);

    useEffect(() => {
        fetchArticle();
    }, [fetchArticle]);

    // Cálculo dinámico del porcentaje de scroll de lectura
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Copia de fragmentos de código al portapapeles con confirmación de 2 segundos
    const copyToClipboard = async (codeText, codeId) => {
        try {
            await navigator.clipboard.writeText(codeText);
            setCopiedCodeId(codeId);
            setTimeout(() => setCopiedCodeId(null), 2000);
        } catch (err) {
            // Fallback si la API de clipboard no está permitida
        }
    };

    return {
        article,
        loading,
        error,
        readingProgress,
        activeHeadingId,
        setActiveHeadingId,
        copiedCodeId,
        copyToClipboard,
    };
};