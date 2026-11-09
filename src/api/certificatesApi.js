// src/api/certificatesApi.js
import { apiClient } from './apiClient';

export const certificatesApi = {
    /**
     * Certificados del estudiante autenticado
     * GET /api/v1/students/certificates
     */
    getCertificates: async () => {
        const response = await apiClient.get('/students/certificates');
        return response.data;
    },

    /**
     * Descarga PDF del certificado generando un HTML imprimible en el cliente.
     * No requiere endpoint adicional en el backend.
     */
    downloadPdf: async (certificateId, title) => {
        // Obtener todos los certs y encontrar el específico
        const response = await apiClient.get('/students/certificates');
        const data = response.data?.data || response.data || [];
        const cert = Array.isArray(data)
            ? data.find(c => c.id === certificateId || String(c.id) === String(certificateId))
            : null;

        if (!cert) throw new Error('Certificado no encontrado');

        const issueDate = cert.issueDate
            ? new Date(cert.issueDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
            : new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Certificado – ${cert.courseTitle || title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Lato', sans-serif; background: #fff; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .cert { width: 1000px; padding: 60px; border: 12px solid #4f46e5; outline: 3px solid #c7d2fe; outline-offset: -20px; text-align: center; position: relative; }
    .logo { font-family: 'Cinzel', serif; font-size: 28px; font-weight: 700; color: #4f46e5; letter-spacing: 4px; margin-bottom: 10px; }
    .subtitle { font-size: 11px; letter-spacing: 6px; text-transform: uppercase; color: #6366f1; margin-bottom: 40px; }
    h1 { font-family: 'Cinzel', serif; font-size: 42px; color: #1e1b4b; margin-bottom: 20px; }
    .presented { font-size: 14px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
    .student-name { font-family: 'Cinzel', serif; font-size: 36px; color: #312e81; border-bottom: 2px solid #c7d2fe; display: inline-block; padding-bottom: 8px; margin-bottom: 20px; }
    .course-label { font-size: 14px; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
    .course-title { font-size: 24px; font-weight: 700; color: #1e1b4b; margin-bottom: 6px; }
    .meta { font-size: 13px; color: #6366f1; margin-bottom: 40px; }
    .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
    .footer-block { text-align: center; }
    .footer-line { width: 200px; border-top: 1px solid #94a3b8; margin-bottom: 6px; }
    .footer-label { font-size: 11px; color: #64748b; letter-spacing: 1px; text-transform: uppercase; }
    .code { font-size: 10px; color: #94a3b8; margin-top: 30px; letter-spacing: 1px; }
    @media print { body { background: white; } .cert { border-color: #4f46e5; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="logo">RUTA IA</div>
    <div class="subtitle">Academia de Desarrollo &amp; Inteligencia Artificial</div>
    <h1>Certificado de Finalización</h1>
    <div class="presented">Se otorga el presente certificado a</div>
    <div class="student-name">${cert.studentName || 'Estudiante'}</div>
    <div class="course-label">Por completar satisfactoriamente el curso</div>
    <div class="course-title">${cert.courseTitle || title}</div>
    <div class="meta">${cert.courseCategory || ''} · ${cert.courseLevel || ''} · ${cert.durationHours || 0} horas</div>
    <div class="footer">
      <div class="footer-block">
        <div class="footer-line"></div>
        <div class="footer-label">${cert.instructorName || 'Instructor'}</div>
        <div class="footer-label" style="font-size:10px;color:#94a3b8">Instructor del Curso</div>
      </div>
      <div class="footer-block">
        <div style="font-size:13px;color:#1e1b4b;font-weight:600">${issueDate}</div>
        <div class="footer-label" style="font-size:10px;color:#94a3b8">Fecha de Emisión</div>
      </div>
      <div class="footer-block">
        <div class="footer-line"></div>
        <div class="footer-label">Plataforma RutaIA</div>
        <div class="footer-label" style="font-size:10px;color:#94a3b8">Validado Digitalmente</div>
      </div>
    </div>
    <div class="code">Código de verificación: ${cert.certCode || certificateId}</div>
  </div>
</body>
</html>`;

        // Crear ventana de impresión
        const printWin = window.open('', '_blank', 'width=1100,height=800');
        if (!printWin) throw new Error('El navegador bloqueó la ventana emergente. Permite pop-ups para descargar.');
        printWin.document.write(html);
        printWin.document.close();
        setTimeout(() => {
            printWin.focus();
            printWin.print();
        }, 500);
    },
};
