// src/api/authRegisterApi.js
import { apiClient } from './apiClient';

export const authRegisterApi = {
    /**
     * Registra un nuevo estudiante cumpliendo estrictamente con user.schema.json
     */
    registerStudent: async (userData) => {
        const rawLevel = userData.level || 'PRINCIPIANTE';
        const normalizedLevel = rawLevel.toUpperCase();

        const response = await apiClient.post('/auth/register', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            level: ['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'].includes(normalizedLevel) 
                ? normalizedLevel 
                : 'PRINCIPIANTE',
            areaOfInterest: userData.areaOfInterest || 'Tecnología e IA',
            role: 'student'
        });
        
        // Retornamos la respuesta del backend
        return response.data;
    },

    requestInstructorAccount: async (userData) => {
        const response = await apiClient.post('/auth/instructor-request', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            specialty: userData.specialty || 'General',
            role: 'admin'
        });
        return response.data;
    }
};

export default authRegisterApi;