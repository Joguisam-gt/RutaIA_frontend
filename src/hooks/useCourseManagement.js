import { useState, useEffect, useCallback } from 'react';
import { courseManagementApi } from '../api/courseManagementApi';
import { useNotification } from '../context/NotificationContext';

export const useCourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingCourseId, setDeletingCourseId] = useState(null);
    const { showSuccess, showError } = useNotification();

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            const data = await courseManagementApi.getInstructorCourses();
            setCourses(data || []);
        } catch (err) {
            setError(err.message || 'Error al cargar tus cursos.');
            showError('No se pudieron obtener los cursos del instructor.');
        } fienerally {
            setLoading(false);
        }
    }, [showError]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const duplicateCourse = async (courseId) => {
        try {
            const duplicated = await courseManagementApi.duplicateCourse(courseId);
            setCourses((prev) => [duplicated, ...prev]);
            showSuccess('Curso duplicado exitosamente.');
        } catch (err) {
            showError('Ocurrio un error al duplicar el curso.');
        }
    };

    const confirmDeleteCourse = (courseId) => {
        setDeletingCourseId(courseId);
    };

    const cancelDeleteCourse = () => {
        setDeletingCourseId(null);
    };

    const executeDeleteCourse = async () => {
        if (!deletingCourseId) return;

        try {
            await courseManagementApi.deleteCourse(deletingCourseId);
            setCourses((prev) => prev.filter((c) => c.id !== deletingCourseId));
            showSuccess('El curso fue eliminado permanentemente.');
        } catch (err) {
            showError('No se pudo eliminar el curso.');
        } finally {
            setDeletingCourseId(null);
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
        refetch: fetchCourses,
    };
};