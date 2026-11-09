import { apiClient } from './apiClient';

export const courseEditorApi = {
    /**
     * Obtiene la estructura completa de un curso borrador para edición.
     * Conecta con GET /api/v1/instructor/courses/:courseId/builder
     */
    getCourseDraft: async (courseId) => {
        const response = await apiClient.get(`/instructor/courses/${courseId}/builder`);
        return response.data.data;
    },

    /**
     * Guarda automáticamente los cambios del borrador.
     * Conecta con PATCH /api/v1/instructor/courses/:courseId/builder
     */
    autoSaveDraft: async (courseId, draftData) => {
        const response = await apiClient.patch(`/instructor/courses/${courseId}/builder`, draftData);
        return response.data;
    },

    /**
     * Sube fragmentos de video (chunked upload) para evitar límites de tamaño en HTTP.
     * Conecta con POST /api/v1/instructor/lessons/upload-chunk
     */
    uploadVideoChunk: async (chunkFormData, onProgress) => {
        const response = await apiClient.post('/instructor/lessons/upload-chunk', chunkFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            },
        });
        return response.data;
    },

    /**
     * Envía el curso a revisión o lo publica directamente tras validar el pre-flight.
     * Conecta con POST /api/v1/instructor/courses/:courseId/publish
     */
    submitForReview: async (courseId) => {
        const response = await apiClient.post(`/instructor/courses/${courseId}/publish`);
        return response.data;
    },
};