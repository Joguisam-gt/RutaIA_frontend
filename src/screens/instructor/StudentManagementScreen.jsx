import React from 'react';
import { useStudentManagement } from '../../hooks/useStudentManagement';
import { HeaderControls } from '../../components/common/HeaderControls';
import { StudentActivityStats } from '../../components/domain/student-management/StudentActivityStats';
import { StudentFilterToolbar } from '../../components/domain/student-management/StudentFilterToolbar';
import { StudentDataTable } from '../../components/domain/student-management/StudentDataTable';
import { StudentDetailModal } from '../../components/domain/student-management/StudentDetailModal';
import { PrivateMessageModal } from '../../components/domain/student-management/PrivateMessageModal';
import { Loader2, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';

export const StudentManagementScreen = () => {
    const {
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
    } = useStudentManagement();

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando el expediente de estudiantes...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Toast Notificación */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/instructor/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-violet-500" />
                            <span>RutaIA — Gestión de Estudiantes</span>
                        </a>
                    </div>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                        Expediente & Seguimiento Académico
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Monitorea el progreso por lección, identifica alumnos en riesgo y comunícate directamente con tu comunidad.
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold mb-6">
                        {error}
                    </div>
                )}

                {/* 1. Activity Stats (Matriculados, Activos semana, Certificados, Riesgo) */}
                <StudentActivityStats stats={stats} />

                {/* 2. Filter Toolbar (Cursos, Estados, Buscador, Exportar CSV) */}
                <StudentFilterToolbar
                    selectedCourse={selectedCourse}
                    onCourseChange={setSelectedCourse}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onExportCSV={handleExportCSV}
                />

                {/* 3. Data Table de Alumnos */}
                <StudentDataTable
                    students={students}
                    onOpenDetail={handleOpenDetailModal}
                    onOpenMessageModal={setMessagingStudent}
                />
            </main>

            {/* 4. Student Detail Modal (Expediente académico detallado) */}
            <StudentDetailModal
                student={selectedStudent}
                detailData={studentDetailData}
                isLoading={isDetailLoading}
                onClose={handleCloseDetailModal}
                onOpenMessage={setMessagingStudent}
            />

            {/* 5. Private Message Modal */}
            <PrivateMessageModal
                student={messagingStudent}
                onClose={() => setMessagingStudent(null)}
                onSend={handleSendPrivateMessage}
            />
        </div>
    );
};

export default StudentManagementScreen;