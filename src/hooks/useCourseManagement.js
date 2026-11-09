// src/hooks/useCourseManagement.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiClient } from '../api/apiClient';

export const useCourseManagement = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);
    const [deletingCourseId, setDeletingCourseId] = useState(null);

    // Filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab]     = useState('all');

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get('/courses?limit=200');
            const rawList = response.data?.data || response.data || [];

            const formatted = rawList.map(c => ({
                id:           c._id  || c.id,
                _id:          c._id  || c.id,
                title:        c.title        || 'Curso sin título',
                description:  c.description  || '',
                category:     c.category     || 'General',
                level:        c.level        || 'INTERMEDIO',
                durationHours: c.durationHours || 20,
                status:       c.status       || 'ACTIVO',
                isVisible:    c.isVisible !== false,
                rating:       c.averageRating || 5.0,
                enrolledCount: c.totalRatings || 0,
            }));

            setAllCourses(formatted);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al obtener los cursos.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCourses(); }, [fetchCourses]);

    // Filtrado reactivo — tab + búsqueda por texto
    const courses = useMemo(() => {
        let list = allCourses;

        // Filtro por tab
        if (activeTab === 'published') {
            list = list.filter(c => c.status === 'ACTIVO' && c.isVisible);
        } else if (activeTab === 'draft') {
            list = list.filter(c => c.status !== 'ACTIVO' || !c.isVisible);
        }

        // Filtro por búsqueda
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            list = list.filter(c =>
                c.title.toLowerCase().includes(q)       ||
                c.category.toLowerCase().includes(q)    ||
                c.level.toLowerCase().includes(q)       ||
                c.description.toLowerCase().includes(q)
            );
        }

        return list;
    }, [allCourses, activeTab, searchQuery]);

    // Eliminar
    const confirmDeleteCourse = (id) => setDeletingCourseId(id);
    const cancelDeleteCourse  = ()  => setDeletingCourseId(null);

    const executeDeleteCourse = async () => {
        if (!deletingCourseId) return;
        try {
            await apiClient.delete(`/courses/${deletingCourseId}`);
            setAllCourses(prev => prev.filter(c => c.id !== deletingCourseId));
            setDeletingCourseId(null);
        } catch (err) {
            alert(err.response?.data?.message || 'No se pudo eliminar el curso.');
        }
    };

    // Duplicar
    const duplicateCourse = async (courseId) => {
        const target = allCourses.find(c => c.id === courseId);
        if (!target) return;
        try {
            await apiClient.post('/courses', {
                title:        `${target.title} (Copia)`,
                description:  target.description,
                category:     target.category,
                level:        target.level,
                durationHours: target.durationHours,
                status:       'ACTIVO',
                isVisible:    true,
            });
            fetchCourses();
        } catch {
            alert('Error al duplicar el curso.');
        }
    };

    return {
        courses,
        loading,
        error,
        deletingCourseId,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        duplicateCourse,
        confirmDeleteCourse,
        cancelDeleteCourse,
        executeDeleteCourse,
        refetch: fetchCourses,
    };
};

export default useCourseManagement;
