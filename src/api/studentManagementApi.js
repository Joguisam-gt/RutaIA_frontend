// src/api/studentManagementApi.js
import { apiClient } from './apiClient';

export const studentManagementApi = {
    getAllStudents: async (params = {}) => {
        const query = new URLSearchParams();
        if (params.page) query.append('page', params.page);
        if (params.limit) query.append('limit', params.limit);
        
        const response = await apiClient.get(`/students?${query.toString()}`);
        return response.data;
    },

    getStudentHistory: async (studentId) => {
        const response = await apiClient.get(`/students/${studentId}/history`);
        return response.data;
    }
};

export default studentManagementApi;