import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../api/blogApi';

export const useBlog = () => {
    const [featuredPost, setFeaturedPost] = useState(null);
    const [articles, setArticles] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado de Filtros y Búsqueda
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    // Carga del post destacado y populares
    useEffect(() => {
        let isMounted = true;
        const fetchInitialData = async () => {
            try {
                const [featured, popular] = await Promise.all([
                    blogApi.getFeaturedPost(),
                    blogApi.getPopularArticles(),
                ]);
                if (isMounted) {
                    setFeaturedPost(featured);
                    setPopularArticles(popular);
                }
            } catch (err) {
                // Fallback datos por defecto en caso de carga inicial
            }
        };

        fetchInitialData();
        return () => { isMounted = false; };
    }, []);

    // Carga del grid principal de artículos
    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await blogApi.getArticles({
                search,
                category: selectedCategory,
                page,
                limit: 6,
            });

            setArticles(res.data || []);
            setPagination(res.pagination || { total: res.data?.length || 0, totalPages: 1 });
        } catch (err) {
            setError(err.message || 'Error al obtener los artículos del blog.');
        } finally {
            setLoading(false);
        }
    }, [search, selectedCategory, page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchArticles();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchArticles]);

    const categories = [
        { id: 'all', label: 'Todos los Temas' },
        { id: 'web-dev', label: 'Desarrollo Web' },
        { id: 'ai-agents', label: 'IA & Agentes' },
        { id: 'ux-ui', label: 'Diseño UX/UI' },
        { id: 'databases', label: 'Bases de Datos' },
    ];

    return {
        featuredPost,
        articles,
        popularArticles,
        loading,
        error,
        search,
        setSearch: (val) => { setSearch(val); setPage(1); },
        selectedCategory,
        setSelectedCategory: (cat) => { setSelectedCategory(cat); setPage(1); },
        categories,
        page,
        setPage,
        pagination,
    };
};