import { useState } from 'react';

export const useStudentDashboard = () => {
    const [stats, setStats] = useState({
        coursesCompleted: 4,
        coursesInProgress: 3,
        hoursLearned: 48.5,
        certificatesEarned: 2,
        streakDays: 7,
    });

    const [inProgressCourses, setInProgressCourses] = useState([
        {
            id: '1',
            title: 'React.js y Next.js: De Cero a Producción',
            category: 'Web Dev',
            progress: 68,
            nextLessonTitle: 'Server Components y Revalidación de Caché',
            lastAccessed: 'Hace 2 horas',
        },
        {
            id: '2',
            title: 'Backend Profesional con Node.js, Express y NoSQL',
            category: 'Backend',
            progress: 42,
            nextLessonTitle: 'Transacciones ACID con MongoDB y Mongoose',
            lastAccessed: 'Ayer',
        },
    ]);

    const [recommendations, setRecommendations] = useState([
        {
            id: '3',
            title: 'Arquitectura de Agentes de IA con n8n y LangChain',
            category: 'Inteligencia Artificial',
            level: 'Avanzado',
            rating: 4.9,
        },
    ]);

    return {
        stats,
        inProgressCourses,
        recommendations,
    };
};

// Aliases de exportación para asegurar compatibilidad con llamadas en singular o plural
export const useStudentDashboards = useStudentDashboard;
export default useStudentDashboard;