import { useState, useEffect, useCallback } from 'react';
import { studentManagementApi } from '../api/studentManagementApi';

export const useStudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({
        totalEnrolled: 0,
        activeThisWeek: 0,
        certificatesDelivered: 0,
        atRiskCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros Toolbar
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'active' | 'completed' | 'at_risk' | 'inactive'
    const [searchQuery, setSearchQuery] = useState('');

    // Modal Expediente Detallado
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentDetailData, setStudentDetailData] = useState(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    // Modal Mensaje Privado
    const [messagingStudent, setMessagingStudent] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await studentManagementApi.getStudents({
                courseId: selectedCourse,
                status: selectedStatus,
                search: searchQuery,
            });
            setStudents(res.data || []);
            if (res.stats) {
                setStats(res.stats);
            }
        } catch (err) {
            setError(err.message || 'Error al obtener el listado de estudiantes.');
        } finally {
            setLoading(false);
        }
    }, [selectedCourse, selectedStatus, searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchStudents();
        }, 250);
        return () => clearTimeout(timer);
    }, [fetchStudents]);

    // Carga de detalle de alumno al abrir modal
    const handleOpenDetailModal = async (student) => {
        setSelectedStudent(student);
        try {
            setIsDetailLoading(true);
            const detail = await studentManagementApi.getStudentDetail(student.id);
            setStudentDetailData(detail);
        } catch (err) {
            // Usar datos preliminares en caso de fallback
            setStudentDetailData(null);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleCloseDetailModal = () => {
        setSelectedStudent(null);
        setStudentDetailData(null);
    };

    const handleSendPrivateMessage = async (studentId, text) => {
        try {
            await studentManagementApi.sendPrivateMessage(studentId, text);
            showToast('Mensaje privado enviado con éxito.');
            setMessagingStudent(null);
        } catch (err) {
            showToast('No se pudo enviar el mensaje privado.');
        }
    };

    const handleExportCSV = async () => {
        try {
            await studentManagementApi.exportStudentsCSV({
                courseId: selectedCourse,
                status: selectedStatus,
            });
            showToast('Reporte CSV descargado correctamente.');
        } catch (err) {
            showToast('Error al exportar el CSV.');
        }
    };

    return {
        students,
        stats,
        loading,
        error,
        toastMessage,
        selectedCourse,
        setSelectedCourse,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        selectedStudent,
        studentDetailData,
        isDetailLoading,
        messagingStudent,
        setMessagingStudent,
        handleOpenDetailModal,
        handleCloseDetailModal,
        handleSendPrivateMessage,
        handleExportCSV,
        refetch: fetchStudents,
    };
};