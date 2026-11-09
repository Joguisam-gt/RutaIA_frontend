// src/api/enrollApi.js
import apiClient from './apiClient';

/**
 * Inscribe al estudiante autenticado en un curso recomendado por el chat.
 * POST /api/v1/students/enroll
 */
export const enrollCourseApi = async (courseId) => {
    const response = await apiClient.post('/students/enroll', { courseId });
    return response.data;
};

export default { enrollCourseApi };
