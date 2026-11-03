import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';

// Pantallas públicas
import LandingScreen from '../screens/public/LandingScreen';
import AboutScreen from '../screens/public/AboutScreen';
import CatalogScreen from '../screens/public/CatalogScreen';
import CourseDetailScreen from '../screens/public/CourseDetailScreen';
import BlogScreen from '../screens/public/BlogScreen';
import ArticleDetailScreen from '../screens/public/ArticleDetailScreen';
import ContactScreen from '../screens/public/ContactScreen';
import FaqScreen from '../screens/public/FaqScreen';
import PlanScreen from '../screens/public/PlanScreen';
import TermsScreen from '../screens/public/TermsScreen';
import PrivacyPolicyScreen from '../screens/public/PrivacyPolicyScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Pantallas de estudiante
import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import MyCoursesScreen from '../screens/student/MyCoursesScreen';
import ClassroomScreen from '../screens/student/ClassroomScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import CertificatesScreen from '../screens/student/CertificatesScreen';
import WishlistScreen from '../screens/student/WishlistScreen';
import MetricsScreen from '../screens/student/MetricsScreen';
import AiQueryScreen from '../screens/student/AiQueryScreen';

// Pantallas de instructor
import InstructorDashboardScreen from '../screens/instructor/InstructorDashboardScreen';
import CourseManagementScreen from '../screens/instructor/CourseManagementScreen';
import CourseEditorScreen from '../screens/instructor/CourseEditorScreen';
import InstructorFinancesScreen from '../screens/instructor/InstructorFinancesScreen';
import StudentManagementScreen from '../screens/instructor/StudentManagementScreen';

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Rutas Públicas */}
                <Route path="/" element={<LandingScreen />} />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/catalog" element={<CatalogScreen />} />
                <Route path="/courses/:id" element={<CourseDetailScreen />} />
                <Route path="/blog" element={<BlogScreen />} />
                <Route path="/blog/:id" element={<ArticleDetailScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/faq" element={<FaqScreen />} />
                <Route path="/pricing" element={<PlanScreen />} />
                <Route path="/terms" element={<TermsScreen />} />
                <Route path="/privacy" element={<PrivacyPolicyScreen />} />

                {/* Chat IA */}
                <Route path="/chat" element={<AiQueryScreen />} />
                <Route path="/ai-query" element={<AiQueryScreen />} />

                {/* Auth */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

                {/* Estudiantes */}
                <Route path="/student/dashboard" element={<StudentDashboardScreen />} />
                <Route path="/student/courses" element={<MyCoursesScreen />} />
                <Route path="/student/classroom/:courseId" element={<ClassroomScreen />} />
                <Route path="/student/profile" element={<ProfileScreen />} />
                <Route path="/student/certificates" element={<CertificatesScreen />} />
                <Route path="/student/wishlist" element={<WishlistScreen />} />
                <Route path="/student/metrics" element={<MetricsScreen />} />
                <Route path="/student/chat" element={<AiQueryScreen />} />

                {/* Instructores */}
                <Route path="/instructor/dashboard" element={<InstructorDashboardScreen />} />
                <Route path="/instructor/courses" element={<CourseManagementScreen />} />
                <Route path="/instructor/editor" element={<CourseEditorScreen />} />
                <Route path="/instructor/finances" element={<InstructorFinancesScreen />} />
                <Route path="/instructor/students" element={<StudentManagementScreen />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;