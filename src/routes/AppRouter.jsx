import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Screens - Autenticación
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Screens - Públicas
import LandingScreen from '../screens/public/LandingScreen';
import CatalogScreen from '../screens/public/CatalogScreen';
import CategoryCoursesScreen from '../screens/public/CategoryCoursesScreen';
import CourseDetailScreen from '../screens/public/CourseDetailScreen';
import BlogScreen from '../screens/public/BlogScreen';
import ArticleDetailScreen from '../screens/public/ArticleDetailScreen';
import PlanScreen from '../screens/public/PlanScreen';
import AboutScreen from '../screens/public/AboutScreen';
import ContactScreen from '../screens/public/ContactScreen';
import FaqScreen from '../screens/public/FaqScreen';
import PrivacyPolicyScreen from '../screens/public/PrivacyPolicyScreen';
import TermsScreen from '../screens/public/TermsScreen';
import LegalScreen from '../screens/public/LegalScreen';

// Screens - Estudiante
import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import MyCoursesScreen from '../screens/student/MyCoursesScreen';
import ClassroomScreen from '../screens/student/ClassroomScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import WishlistScreen from '../screens/student/WishlistScreen';
import CertificatesScreen from '../screens/student/CertificatesScreen';
import AiQueryScreen from '../screens/student/AiQueryScreen';
import MetricsScreen from '../screens/student/MetricsScreen';

// Screens - Instructor
import InstructorDashboardScreen from '../screens/instructor/InstructorDashboardScreen';
import CourseManagementScreen from '../screens/instructor/CourseManagementScreen';
import CourseEditorScreen from '../screens/instructor/CourseEditorScreen';
import StudentManagementScreen from '../screens/instructor/StudentManagementScreen';
import InstructorFinancesScreen from '../screens/instructor/InstructorFinancesScreen';

// Componentes Guard de Ruta Protegida
const ProtectedRoute = ({ children, allowedRole = null }) => {
    const { isAuthenticated, isLoading, role } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-sans">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-xs font-semibold">Cargando aplicación...</span>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && role !== allowedRole && role !== 'admin') {
        return <Navigate to={role === 'instructor' ? '/instructor/dashboard' : '/app/dashboard'} replace />;
    }

    return children;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* ==================== RUTAS PÚBLICAS ==================== */}
                <Route path="/" element={<LandingScreen />} />
                <Route path="/catalogo" element={<CatalogScreen />} />
                <Route path="/categoria/:categoryId" element={<CategoryCoursesScreen />} />
                <Route path="/cursos/:courseId" element={<CourseDetailScreen />} />
                <Route path="/blog" element={<BlogScreen />} />
                <Route path="/blog/:articleId" element={<ArticleDetailScreen />} />
                <Route path="/planes" element={<PlanScreen />} />
                <Route path="/nosotros" element={<AboutScreen />} />
                <Route path="/contacto" element={<ContactScreen />} />
                <Route path="/faq" element={<FaqScreen />} />
                <Route path="/privacidad" element={<PrivacyPolicyScreen />} />
                <Route path="/terminos" element={<TermsScreen />} />
                <Route path="/legal" element={<LegalScreen />} />

                {/* ==================== RUTAS DE AUTENTICACIÓN ==================== */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/registro" element={<RegisterScreen />} />
                <Route path="/recuperar-contrasena" element={<ForgotPasswordScreen />} />

                {/* ==================== RUTAS DE ESTUDIANTE ==================== */}
                <Route
                    path="/app/dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentDashboardScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/mis-cursos"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <MyCoursesScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/clase/:courseId"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <ClassroomScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/perfil"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <ProfileScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/favoritos"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <WishlistScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/certificados"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <CertificatesScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/ai-query"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <AiQueryScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/app/metricas"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <MetricsScreen />
                        </ProtectedRoute>
                    }
                />

                {/* ==================== RUTAS DE INSTRUCTOR ==================== */}
                <Route
                    path="/instructor/dashboard"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorDashboardScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/cursos"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <CourseManagementScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/cursos/nuevo"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <CourseEditorScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/cursos/:courseId/editar"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <CourseEditorScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/estudiantes"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <StudentManagementScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/instructor/finanzas"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFinancesScreen />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback Redirección */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;