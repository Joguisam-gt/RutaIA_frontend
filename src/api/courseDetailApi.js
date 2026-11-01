import { apiClient } from './apiClient';

export const courseDetailApi = {
  /**
   * Obtiene la ficha técnica completa del curso por su slug.
   * Conecta con GET /api/v1/courses/:slug
   */
  getCourseDetail: async (courseSlug) => {
    const response = await apiClient.get(`/courses/${courseSlug}`);
    return response.data.data;
  },

  /**
   * Obtiene las valoraciones y reseñas de estudiantes del curso.
   * Conecta con GET /api/v1/ratings/course/:courseId
   */
  getCourseReviews: async (courseId, page = 1, limit = 5) => {
    const response = await apiClient.get(`/ratings/course/${courseId}?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Obtiene los cursos recomendados basados en la categoría del curso actual.
   */
  getRecommendedCourses: async (categoryId, currentCourseId) => {
    const response = await apiClient.get(`/courses?category=${categoryId}&limit=3&exclude=${currentCourseId}`);
    return response.data.data || [];
  }
};