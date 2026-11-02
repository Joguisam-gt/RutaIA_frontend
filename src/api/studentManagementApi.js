import { apiClient } from './apiClient';

export const studentManagementApi = {
    /**
     * Obtiene las métricas generales de estudiantes y el listado filtrado de alumnos.
     * Conecta con GET /api/v1/instructor/students
     */
    getStudents: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.courseId && params.courseId !== 'all') queryParams.append('courseId', params.courseId);
        if (params.status && params.status !== 'all') queryParams.append('status', params.status); // 'active' | 'completed' | 'at_risk' | 'inactive'
        if (params.search) queryParams.append('search', params.search);

        const response = await apiClient.get(`/instructor/students?${queryParams.toString()}`);
        return response.data;
    },

    /**
     * Obtiene el expediente académico detallado de un alumno (avance por módulos e historial Q&A).
     * Conecta con GET /api/v1/instructor/students/:studentId/record
     */
    getStudentDetail: async (studentId) => {
        const response = await apiClient.get(`/instructor/students/${studentId}/record`);
        return response.data.data;
    },

    /**
     * Envía un mensaje privado directo a un estudiante.
     * Conecta con POST /api/v1/instructor/students/:studentId/message
     */
    sendPrivateMessage: async (studentId, messageText) => {
        const response = await apiClient.post(`/instructor/students/${studentId}/message`, {
            message: messageText,
        });
        return response.data;
    },

    /**
     * Genera y descarga el reporte consolidado de estudiantes en formato CSV.
     */
    exportStudentsCSV: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.courseId) queryParams.append('courseId', params.courseId);
        if (params.status) queryParams.append('status', params.status);

        const response = await apiClient.get(`/instructor/students/export-csv?${queryParams.toString()}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Estudiantes_RutaIA_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
};