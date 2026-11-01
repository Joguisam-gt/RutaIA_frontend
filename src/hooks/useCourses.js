import { useState, useEffect, useCallback } from 'react';
import { courseApi } from '../api/courseApi';

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado de los Filtros
    const [filters, setFilters] = useState({
        search: '',
        categories: [],
        levels: [],
        modality: 'all', // 'all', 'free', 'paid'
        minRating: 0,
        sort: 'popular', // 'popular', 'newest', 'rating', 'price_asc', 'price_desc'
        page: 1,
        limit: 12,
    });

    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

    // Carga de Cursos desde Backend
    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await courseApi.getCourses(filters);
            setCourses(res.data || []);
            setPagination(res.pagination || { total: res.data?.length || 0, totalPages: 1 });
        } catch (err) {
            setError(err.message || 'Error al obtener el catálogo de cursos.');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCourses();
        }, 300); // Debounce para evitar llamadas excesivas en la búsqueda
        return () => clearTimeout(timer);
    }, [fetchCourses]);

    // Autocompletado de Búsqueda
    const handleSearchChange = async (value) => {
        setFilters((prev) => ({ ...prev, search: value, page: 1 }));
        if (value.trim().length >= 2) {
            setIsSearchingSuggestions(true);
            try {
                const list = await courseApi.getSearchSuggestions(value);
                setSuggestions(list);
            } catch {
                setSuggestions([]);
            } finally {
                setIsSearchingSuggestions(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Handlers para Filtros de Sidebar
    const toggleCategory = (category) => {
        setFilters((prev) => {
            const exists = prev.categories.includes(category);
            const nextCategories = exists
                ? prev.categories.filter((c) => c !== category)
                : [...prev.categories, category];
            return { ...prev, categories: nextCategories, page: 1 };
        });
    };

    const toggleLevel = (level) => {
        setFilters((prev) => {
            const exists = prev.levels.includes(level);
            const nextLevels = exists
                ? prev.levels.filter((l) => l !== level)
                : [...prev.levels, level];
            return { ...prev, levels: nextLevels, page: 1 };
        });
    };

    const setModality = (modality) => {
        setFilters((prev) => ({ ...prev, modality, page: 1 }));
    };

    const setMinRating = (minRating) => {
        setFilters((prev) => ({ ...prev, minRating, page: 1 }));
    };

    const setSort = (sort) => {
        setFilters((prev) => ({ ...prev, sort, page: 1 }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            categories: [],
            levels: [],
            modality: 'all',
            minRating: 0,
            sort: 'popular',
            page: 1,
            limit: 12,
        });
        setSuggestions([]);
    };

    return {
        courses,
        loading,
        error,
        filters,
        pagination,
        suggestions,
        isSearchingSuggestions,
        handleSearchChange,
        toggleCategory,
        toggleLevel,
        setModality,
        setMinRating,
        setSort,
        resetFilters,
        setPage: (page) => setFilters((prev) => ({ ...prev, page })),
    };
};