import { apiClient } from './apiClient';

export const studentApi = {
    getProfile: async () => {
        const response = await apiClient.get('/students/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await apiClient.put('/students/profile', data);
        return response.data;
    },
    getEnrolledCourses: async () => {
        const response = await apiClient.get('/students/courses');
        return response.data;
    },
};

export default studentApi;