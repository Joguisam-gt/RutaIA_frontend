import { useState, useEffect, useCallback, useMemo } from 'react';
import { courseManagementApi } from '../api/courseManagementApi';

export const useCourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // Filtros y Controles de Toolbar
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'published' | 'draft' | 'under_review'
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('last_updated'); // 'last_updated' | 'students' | 'revenue' | 'title'
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

    // Menú contextual abierto (ID del curso)
    const [activeMenuId, setActiveMenuId] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await courseManagementApi.getCourses({
                status: activeTab,
                search: searchQuery,
                sortBy,
            });
            setCourses(res.data || []);
        } catch (err) {
            setError(err.message || 'Error al obtener la lista de cursos.');
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

    const handleDuplicate = async (courseId) => {
        try {
            setActiveMenuId(null);
            await courseManagementApi.duplicateCourse(courseId);
            showToast('Curso duplicado con éxito en borrador.');
            fetchCourses();
        } catch (err) {
            showToast('Error al duplicar el curso.');
        }
    };

    const handleToggleArchive = async (courseId, isArchived) => {
        try {
            setActiveMenuId(null);
            await courseManagementApi.toggleArchiveCourse(courseId, !isArchived);
            showToast(isArchived ? 'Curso desarchivado.' : 'Curso archivado.');
            fetchCourses();
        } catch (err) {
            showToast('Error al cambiar estado de archivo.');
        }
    };

    const tabs = useMemo(() => [
        { id: 'all', label: 'Todos' },
        { id: 'published', label: 'Publicados' },
        { id: 'draft', label: 'Borradores' },
        { id: 'under_review', label: 'En Revisión' },
    ], []);

    return {
        courses,
        loading,
        error,
        toastMessage,
        activeTab,
        setActiveTab: (tab) => {
            setActiveTab(tab);
            setActiveMenuId(null);
        },
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        tabs,
        activeMenuId,
        setActiveMenuId,
        handleDuplicate,
        handleToggleArchive,
        refetch: fetchCourses,
    };
};