import { apiClient } from './apiClient';

export const metricApi = {
  getStudentMetrics: async () => {
    const response = await apiClient.get('/metrics/student');
    return response.data;
  },
  getInstructorMetrics: async () => {
    const response = await apiClient.get('/metrics/instructor');
    return response.data;
  },
  getCourseAnalytics: async (courseId) => {
    const response = await apiClient.get(`/metrics/course/${courseId}`);
    return response.data;
  },
};

export default metricApi;
