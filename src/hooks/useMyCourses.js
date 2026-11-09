// src/hooks/useMyCourses.js
import { useState, useEffect, useMemo } from 'react';
import { myCoursesApi } from '../api/myCoursesApi';

export const useMyCourses = () => {
    const [rawCourses, setRawCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [sortBy, setSortBy] = useState('last_accessed');
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tabs = [
        { id: 'all', label: 'Todos' },
        { id: 'in_progress', label: 'En Progreso' },
        { id: 'completed', label: 'Completados' }
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await myCoursesApi.getMyCourses({ status: activeTab, sortBy });
                const data = response.data || response;
                // Normalizar campos del backend al formato esperado por MyCourseCard
                const normalized = (Array.isArray(data) ? data : []).map(c => ({
                    ...c,
                    id: c.courseId || c.id,           // usar courseId para navegación
                    enrollmentId: c.id,
                    progressPercentage: c.progressPct ?? c.progressPercentage ?? 0,
                    isCompleted: c.status === 'completed' || c.isCompleted === true,
                    completedLessons: c.completedLessons ?? 0,
                    totalLessons: c.totalLessons ?? 0,
                }));
                setRawCourses(normalized);
            } catch (err) {
                setError('No se pudieron cargar tus cursos.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [activeTab, sortBy]);

    const filteredCourses = useMemo(() => {
        return rawCourses.filter(course => {
            if (searchTerm.trim()) {
                const query = searchTerm.toLowerCase();
                const matchTitle = course.title?.toLowerCase().includes(query);
                const matchCategory = course.category?.toLowerCase().includes(query);
                return matchTitle || matchCategory;
            }
            return true;
        });
    }, [rawCourses, searchTerm]);

    const toggleMenu = (id) => setActiveMenuId(prev => (prev === id ? null : id));

    return {
        courses: filteredCourses,
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        sortBy,
        setSortBy,
        activeMenuId,
        toggleMenu,
        tabs,
        loading,
        error
    };
};
