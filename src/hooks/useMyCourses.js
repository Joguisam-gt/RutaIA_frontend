import { useState, useEffect, useCallback, useMemo } from 'react';
import { myCoursesApi } from '../api/myCoursesApi';

export const useMyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({
        totalHours: 0,
        completedCourses: 0,
        certificatesEarned: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros y Navegación
    const [activeTab, setActiveTab] = useState('in_progress'); // 'in_progress' | 'completed' | 'archived'
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('last_accessed'); // 'last_accessed' | 'progress' | 'title'

    // Menú contextual activo (ID del curso con menú `...` abierto)
    const [activeMenuId, setActiveMenuId] = useState(null);

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await myCoursesApi.getMyCourses({
                status: activeTab,
                search: searchQuery,
                sortBy,
            });

            setCourses(res.data || []);
            if (res.stats) {
                setStats(res.stats);
            }
        } catch (err) {
            setError(err.message || 'Error al obtener tus cursos matriculados.');
        } finally {
            setLoading(false);
        }
    }, [activeTab, searchQuery, sortBy]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCourses();
        }, 250);
        return () => clearTimeout(timer);
    }, [fetchCourses]);

    const handleToggleArchive = async (courseId, isArchived) => {
        try {
            setActiveMenuId(null);
            await myCoursesApi.toggleArchiveCourse(courseId, !isArchived);
            fetchCourses();
        } catch (err) {
            // Manejar error silenciosamente o notificar
        }
    };

    const tabs = useMemo(() => [
        { id: 'in_progress', label: 'En Progreso' },
        { id: 'completed', label: 'Completados' },
        { id: 'archived', label: 'Archivados' },
    ], []);

    return {
        courses,
        stats,
        loading,
        error,
        activeTab,
        setActiveTab: (tab) => {
            setActiveTab(tab);
            setActiveMenuId(null);
        },
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        tabs,
        activeMenuId,
        setActiveMenuId,
        handleToggleArchive,
        refetch: fetchCourses,
    };
};