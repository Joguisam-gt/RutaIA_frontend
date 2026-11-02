import { apiClient } from './apiClient';

export const studentDashboardApi = {
    /**
     * Obtiene la vista consolidada del estudiante: último curso, cursos en progreso, métricas de racha y recomendaciones.
     * Conecta con GET /api/v1/student/dashboard
     */
    getDashboardData: async () => {
        const response = await apiClient.get('/student/dashboard');
        return response.data.data;
    },

    /**
     * Actualiza la meta diaria de tiempo de estudio del estudiante (en minutos).
     * Conecta con PATCH /api/v1/student/goals
     */
    updateDailyGoal: async (targetMinutes) => {
        const response = await apiClient.patch('/student/goals', { targetMinutes });
        return response.data;
    },
};