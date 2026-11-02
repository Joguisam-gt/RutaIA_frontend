import { apiClient } from './apiClient';

export const certificatesApi = {
    /**
     * Obtiene la lista de certificados emitidos del estudiante y las métricas de logros.
     * Conecta con GET /api/v1/student/certificates
     */
    getCertificates: async () => {
        const response = await apiClient.get('/student/certificates');
        return response.data;
    },

    /**
     * Verifica la autenticidad pública de un certificado mediante su token/UUID de validación.
     * Conecta con GET /api/v1/certificates/verify/:token
     */
    verifyCertificate: async (token) => {
        const response = await apiClient.get(`/certificates/verify/${token}`);
        return response.data.data;
    },

    /**
     * Dispara la descarga del diploma en PDF de alta resolución.
     */
    downloadPdf: async (certificateId, title) => {
        const response = await apiClient.get(`/student/certificates/${certificateId}/pdf`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Certificado_${title.replace(/\s+/g, '_')}_RutaIA.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
};