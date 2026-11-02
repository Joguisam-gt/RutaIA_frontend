import { apiClient } from './apiClient';

export const classroomApi = {
    /**
     * Obtiene los datos detallados de una lección, video URL, recursos y la estructura del temario del curso.
     * Conecta con GET /api/v1/student/courses/:courseSlug/lessons/:lessonSlug
     */
    getLessonDetails: async (courseSlug, lessonSlug) => {
        const response = await apiClient.get(`/student/courses/${courseSlug}/lessons/${lessonSlug}`);
        return response.data.data;
    },

    /**
     * Marca una lección como completada o no completada.
     * Conecta con POST /api/v1/student/courses/:courseSlug/lessons/:lessonSlug/complete
     */
    toggleLessonCompletion: async (courseSlug, lessonSlug, completed = true) => {
        const response = await apiClient.post(`/student/courses/${courseSlug}/lessons/${lessonSlug}/complete`, {
            completed,
        });
        return response.data;
    },

    /**
     * Obtiene la lista de preguntas del foro Q&A filtradas por lección o término de búsqueda.
     */
    getForumQuestions: async (lessonSlug, search = '') => {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);

        const response = await apiClient.get(`/student/lessons/${lessonSlug}/questions?${queryParams.toString()}`);
        return response.data.data || [];
    },

    /**
     * Publica una nueva pregunta en el foro Q&A de la lección.
     */
    createQuestion: async (lessonSlug, questionData) => {
        const response = await apiClient.post(`/student/lessons/${lessonSlug}/questions`, questionData);
        return response.data.data;
    },
};