import { useState, useEffect, useCallback } from 'react';
import { categoryApi } from '../api/categoryApi';

export const useCategoryCourses = (categorySlug) => {
    const [categoryMeta, setCategoryMeta] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [filters, setFilters] = useState({
        levels: [],
        modality: 'all',
        minRating: 0,
        sort: 'popular',
        page: 1,
        limit: 12,
    });

    const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

    // Carga inicial de metadatos de la categoría
    useEffect(() => {
        let isMounted = true;
        const fetchCategoryDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await categoryApi.getCategoryBySlug(categorySlug);
                if (isMounted) {
                    setCategoryMeta(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'No se pudo cargar la información de la categoría.');
                }
            }
        };

        fetchCategoryDetails();
        return () => { isMounted = false; };
    }, [categorySlug]);

    // Carga de cursos según la subcategoría seleccionada y filtros
    const fetchCategoryCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await categoryApi.getCategoryCourses(categorySlug, {
                ...filters,
                subcategory: selectedSubcategory === 'all' ? null : selectedSubcategory,
            });

            setCourses(res.data || []);
            setPagination(res.pagination || { total: res.data?.length || 0, totalPages: 1 });
        } catch (err) {
            setError(err.message || 'Error al obtener los cursos de la categoría.');
        } finally {
            setLoading(false);
        }
    }, [categorySlug, selectedSubcategory, filters]);

    useEffect(() => {
        fetchCategoryCourses();
    }, [fetchCategoryCourses]);

    const toggleLevel = (level) => {
        setFilters((prev) => {
            const exists = prev.levels.includes(level);
            const nextLevels = exists
                ? prev.levels.filter((l) => l !== level)
                : [...prev.levels, level];
            return { ...prev, levels: nextLevels, page: 1 };
        });
    };

    const resetCategoryFilters = () => {
        setSelectedSubcategory('all');
        setFilters({
            levels: [],
            modality: 'all',
            minRating: 0,
            sort: 'popular',
            page: 1,
            limit: 12,
        });
    };

    return {
        categoryMeta,
        courses,
        loading,
        error,
        selectedSubcategory,
        setSelectedSubcategory: (sub) => {
            setSelectedSubcategory(sub);
            setFilters((prev) => ({ ...prev, page: 1 }));
        },
        filters,
        pagination,
        toggleLevel,
        setModality: (modality) => setFilters((prev) => ({ ...prev, modality, page: 1 })),
        setMinRating: (minRating) => setFilters((prev) => ({ ...prev, minRating, page: 1 })),
        setSort: (sort) => setFilters((prev) => ({ ...prev, sort, page: 1 })),
        resetCategoryFilters,
    };
};