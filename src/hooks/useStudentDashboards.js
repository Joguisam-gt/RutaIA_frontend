import { useState } from 'react';

export const useStudentDashboard = () => {
    // Inicialización a 0 para alumnos nuevos sin historial
    const [stats, setStats] = useState({
        coursesCompleted: 0,
        coursesInProgress: 0,
        hoursLearned: 0,
        certificatesEarned: 0,
        streakDays: 0,
    });

    // Sin cursos ni recomendaciones simulados por defecto
    const [inProgressCourses, setInProgressCourses] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    return {
        stats,
        setStats,
        inProgressCourses,
        setInProgressCourses,
        recommendations,
        setRecommendations,
    };
};

export const useStudentDashboards = useStudentDashboard;
export default useStudentDashboard;