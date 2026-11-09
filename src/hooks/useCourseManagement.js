// src/hooks/useCourseManagement.js
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

export const useCourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingCourseId, setDeletingCourseId] = useState(null);

    // Consulta los cursos reales desde MongoDB (RF 03 y RF 04)
    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Llama a la ruta oficial del backend
            const response = await apiClient.get('/courses?limit=100');
            const rawList = response.data?.data || response.data || [];

            // Normaliza _id a id para que InstructorCourseCard no falle
            const formatted = rawList.map(c => ({
                id: c._id || c.id,
                _id: c._id || c.id,
                title: c.title || c.name || 'Curso sin título',
                description: c.description || '',
                category: c.category || 'General',
                level: c.level || 'INTERMEDIO',
                durationHours: c.durationHours || c.duration || 20,
                status: c.status || 'ACTIVO',
                isVisible: c.isVisible !== false,
                rating: c.averageRating || 5.0,
                enrolledCount: c.totalRatings || 1
            }));

            setCourses(formatted);
        } catch (err) {
            console.error('Error cargando cursos de instructor:', err);
            setError(err.response?.data?.message || 'Error al obtener los cursos de la base de datos.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Modal de confirmacion de eliminacion
    const confirmDeleteCourse = (courseId) => {
        setDeletingCourseId(courseId);
    };

    const cancelDeleteCourse = () => {
        setDeletingCourseId(null);
    };

    // Desactivacion logica en backend (RF 03)
    const executeDeleteCourse = async () => {
        if (!deletingCourseId) return;

        try {
            await apiClient.delete(`/courses/${deletingCourseId}`);
            
            // Actualiza la lista en memoria eliminando o marcando como inactivo
            setCourses(prev => prev.filter(c => c.id !== deletingCourseId));
            setDeletingCourseId(null);
        } catch (err) {
            console.error('Error al desactivar el curso:', err);
            alert(err.response?.data?.message || 'No se pudo desactivar el curso.');
        }
    };

    const duplicateCourse = async (courseId) => {
        const target = courses.find(c => c.id === courseId);
        if (!target) return;

        try {
            await apiClient.post('/courses', {
                title: `${target.title} (Copia)`,
                description: target.description,
                category: target.category,
                level: target.level,
                durationHours: target.durationHours,
                status: 'ACTIVO',
                isVisible: true
            });
            fetchCourses();
        } catch (err) {
            alert('Error al duplicar el curso.');
        }
    };

    return {
        courses,
        loading,
        error,
        deletingCourseId,
        duplicateCourse,
        confirmDeleteCourse,
        cancelDeleteCourse,
        executeDeleteCourse,
        refetch: fetchCourses
    };
};

export default useCourseManagement;