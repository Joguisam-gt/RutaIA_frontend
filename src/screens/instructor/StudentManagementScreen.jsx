import React from 'react';
import { useStudentManagement } from '../../hooks/useStudentManagement';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { StudentActivityStats } from '../../components/domain/student-management/StudentActivityStats';
import { StudentFilterToolbar } from '../../components/domain/student-management/StudentFilterToolbar';
import { StudentDataTable } from '../../components/domain/student-management/StudentDataTable';
import { StudentDetailModal } from '../../components/domain/student-management/StudentDetailModal';
import { Users, Loader2 } from 'lucide-react';

export const StudentManagementScreen = () => {
    const {
        students,
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
        loading,
    } = useStudentManagement();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar role="instructor" brandTitle="RutaIA" />

            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/estudiantes" />

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Users size={24} className="text-indigo-600" />
                                <span>Gestión de Estudiantes</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Monitorea el progreso, inscripciones y rendimiento de tus alumnos.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando datos de estudiantes...</span>
                        </div>
                    ) : (
                        <>
                            <StudentActivityStats stats={stats} />

                            <StudentFilterToolbar
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                selectedCourse={selectedCourse}
                                onCourseChange={setSelectedCourse}
                                statusFilter={statusFilter}
                                onStatusChange={setStatusFilter}
                            />

                            <StudentDataTable
                                students={students}
                                onSelectStudent={(student) => {
                                    setSelectedStudent(student);
                                    setIsDetailModalOpen(true);
                                }}
                            />

                            <StudentDetailModal
                                isOpen={isDetailModalOpen}
                                onClose={() => setIsDetailModalOpen(false)}
                                student={selectedStudent}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StudentManagementScreen;