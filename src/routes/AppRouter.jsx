// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LandingScreen from '../screens/public/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import MyCoursesScreen from '../screens/student/MyCoursesScreen';
import MetricsScreen from '../screens/student/MetricsScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import CertificatesScreen from '../screens/student/CertificatesScreen';
import WishlistScreen from '../screens/student/WishlistScreen';
import ClassroomScreen from '../screens/student/ClassroomScreen';

import InstructorDashboardScreen from '../screens/instructor/InstructorDashboardScreen';
import CourseManagementScreen from '../screens/instructor/CourseManagementScreen';
import StudentManagementScreen from '../screens/instructor/StudentManagementScreen';
import InstructorFinancesScreen from '../screens/instructor/InstructorFinancesScreen';
import CourseEditorScreen from '../screens/instructor/CourseEditorScreen';
import DocumentIngestionScreen from '../screens/instructor/DocumentIngestionScreen';
import KnowledgeGraphScreen from '../screens/instructor/KnowledgeGraphScreen';

export const AppRouter = () => {
    const { user } = useAuth() || {};
    const isInstructor = user?.role === 'admin' || user?.role === 'instructor';

    return (
        <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route 
                path="/app/dashboard" 
                element={isInstructor ? <Navigate to="/instructor/dashboard" replace /> : <StudentDashboardScreen />} 
            />

            {/* Rutas de Estudiante */}
            <Route path="/student/dashboard" element={<StudentDashboardScreen />} />
            <Route path="/app/mis-cursos" element={<MyCoursesScreen />} />
            <Route path="/app/metricas" element={<MetricsScreen />} />
            <Route path="/app/perfil" element={<ProfileScreen />} />
            <Route path="/app/certificados" element={<CertificatesScreen />} />
            <Route path="/app/favoritos" element={<WishlistScreen />} />
            <Route path="/app/aprender/:courseSlug?/:lessonSlug?" element={<ClassroomScreen />} />

            {/* Rutas de Instructor / Maestro */}
            <Route path="/instructor/dashboard" element={<InstructorDashboardScreen />} />
            <Route path="/instructor/cursos" element={<CourseManagementScreen />} />
            <Route path="/instructor/editor-curso/:id?" element={<CourseEditorScreen />} />
            <Route path="/instructor/estudiantes" element={<StudentManagementScreen />} />
            <Route path="/instructor/finanzas" element={<InstructorFinancesScreen />} />
            <Route path="/instructor/ingesta-n8n" element={<DocumentIngestionScreen />} />
            <Route path="/instructor/grafo-qdrant" element={<KnowledgeGraphScreen />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;