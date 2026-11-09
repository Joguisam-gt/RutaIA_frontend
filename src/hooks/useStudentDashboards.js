import { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

/**
 * Hook que obtiene datos reales del dashboard del estudiante
 * conectando con:
 *   - GET /api/v1/students/my-courses  (cursos matriculados + progreso)
 *   - GET /api/v1/students/metrics     (estadísticas personales)
 */
export const useStudentDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [continueCourse, setContinueCourse] = useState(null);
    const [inProgressCourses, setInProgressCourses] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [streakInfo, setStreakInfo] = useState({ days: 0, label: 'Racha' });

    const [stats, setStats] = useState({
        coursesCompleted: 0,
        coursesInProgress: 0,
        hoursLearned: 0,
        certificatesEarned: 0,
        streakDays: 0,
    });

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                // Cursos en progreso y métricas en paralelo
                const [coursesRes, metricsRes] = await Promise.allSettled([
                    apiClient.get('/students/my-courses', { params: { status: 'in_progress', sortBy: 'last_accessed' } }),
                    apiClient.get('/students/metrics'),
                ]);

                // Cursos en progreso
                if (coursesRes.status === 'fulfilled') {
                    const data = coursesRes.value?.data?.data || coursesRes.value?.data || [];
                    const list = Array.isArray(data) ? data : [];
                    setInProgressCourses(list);

                    // Primer curso = el que continuar (último accedido)
                    if (list.length > 0) {
                        setContinueCourse(list[0]);
                    }
                }

                // Métricas personales
                if (metricsRes.status === 'fulfilled') {
                    const m = metricsRes.value?.data?.data || metricsRes.value?.data || {};
                    setStats({
                        coursesCompleted: m.completed ?? m.coursesCompleted ?? 0,
                        coursesInProgress: m.inProgress ?? m.coursesInProgress ?? 0,
                        hoursLearned: m.hoursCompleted ?? m.hoursLearned ?? 0,
                        certificatesEarned: m.certificates ?? m.certificatesEarned ?? 0,
                        streakDays: m.streakDays ?? 0,
                    });
                    setStreakInfo({
                        days: m.streakDays ?? 0,
                        label: 'Días de racha',
                    });
                }

            } catch (err) {
                console.error('[useStudentDashboard] Error:', err);
                setError('No se pudieron cargar los datos del panel.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return {
        loading,
        error,
        continueCourse,
        inProgressCourses,
        recommendedCourses,
        streakInfo,
        stats,
    };
};

export const useStudentDashboards = useStudentDashboard;
export default useStudentDashboard;
