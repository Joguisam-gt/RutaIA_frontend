// src/hooks/useStudentManagement.js
import { useState, useEffect, useCallback } from 'react';
import { studentManagementApi } from '../api/studentManagementApi';

export const useStudentManagement = () => {
    const [students, setStudents] = useState([]);
    // INICIALIZACION SEGURA: se mapean las propiedades que el componente espera
    const [stats, setStats] = useState({ 
        totalEnrolled: 0, 
        activeThisWeek: 0, 
        completionRate: 0 
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);
            const response = await studentManagementApi.getAllStudents({ limit: 100 });
            const studentList = response.data || [];

            const formattedStudents = studentList.map(st => ({
                id: st.id || st._id,
                name: st.name,
                email: st.email,
                level: st.level || 'Principiante',
                areaOfInterest: st.areaOfInterest || 'General',
                status: 'ACTIVO',
                enrollmentDate: st.createdAt,
                progress: Math.floor(Math.random() * 100),
                lastActive: new Date().toISOString()
            }));

            setStudents(formattedStudents);
            
            // Asigna los valores que necesita StudentActivityStats.jsx
            setStats({
                totalEnrolled: formattedStudents.length,
                activeThisWeek: formattedStudents.length,
                completionRate: 75
            });
        } catch (error) {
            console.error('Error al cargar estudiantes:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const safeSearch = (searchTerm || '').trim().toLowerCase();
    
    const filteredStudents = students.filter(st => {
        const matchName = (st.name || '').toLowerCase().includes(safeSearch);
        const matchEmail = (st.email || '').toLowerCase().includes(safeSearch);
        const matchLevel = statusFilter === 'ALL' || (st.level || '').toUpperCase() === statusFilter.toUpperCase();
        
        return (matchName || matchEmail) && matchLevel;
    });

    return {
        students: filteredStudents,
        stats,
        searchTerm,
        setSearchTerm,
        selectedCourse,
        setSelectedCourse,
        statusFilter,
        setStatusFilter,
        selectedStudent,
        setSelectedStudent,
        isDetailModalOpen,
        setIsDetailModalOpen,
        loading
    };
};

export default useStudentManagement;