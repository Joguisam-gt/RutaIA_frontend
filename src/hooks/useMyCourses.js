// src/hooks/useMyCourses.js
import { useState, useEffect, useMemo } from 'react';
import { myCoursesApi } from '../api/myCoursesApi';

export const useMyCourses = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [sortBy, setSortBy] = useState('last_accessed');
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
                const response = await myCoursesApi.getMyCourses({ status: activeTab, sortBy });
                const data = response.data || response;
                setCourses(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('No se pudieron cargar tus cursos.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [activeTab, sortBy]);

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            // Filtro por Pestaña
            if (activeTab === 'in_progress' && course.isCompleted) return false;
            if (activeTab === 'completed' && !course.isCompleted) return false;

            // Filtro por Búsqueda (Título o Categoría/Tecnología)
            if (searchTerm.trim()) {
                const query = searchTerm.toLowerCase();
                const matchTitle = course.title?.toLowerCase().includes(query);
                const matchCategory = course.category?.toLowerCase().includes(query);
                return matchTitle || matchCategory;
            }

            return true;
        });
    }, [courses, activeTab, searchTerm]);

    return {
        courses: filteredCourses,
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        sortBy,
        setSortBy,
        tabs,
        loading,
        error
    };
};