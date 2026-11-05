// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Importacion limpia y unificada mediante el Barrel File
import {
    LandingScreen,
    CatalogScreen,
    CourseDetailScreen,
    AboutScreen,
    BlogScreen,
    ArticleDetailScreen,
    PlanScreen,
    ContactScreen,
    FaqScreen,
    PrivacyPolicyScreen,
    TermsScreen,
    LegalScreen,
    LoginScreen,
    RegisterScreen,
    StudentDashboardScreen,
    MyCoursesScreen,
    MetricsScreen,
    ProfileScreen,
    CertificatesScreen,
    WishlistScreen,
    ClassroomScreen,
    InstructorDashboardScreen,
    CourseManagementScreen,
    CourseEditorScreen,
    StudentManagementScreen,
    InstructorFinancesScreen,
    DocumentIngestionScreen,
    KnowledgeGraphScreen
} from '../screens';

// Componente global del Chat de IA (Importacion defensiva)
import ChatBubbleComponent from '../components/domain/ChatBubble/chatBubble.jsx';
const ChatBubble = ChatBubbleComponent?.ChatBubble || ChatBubbleComponent;

export const AppRouter = () => {
    const { user } = useAuth() || {};
    const isInstructor = user?.role === 'admin' || user?.role === 'instructor';

    return (
        <>
            <Routes>
                {/* Rutas Publicas */}
                <Route path="/" element={<LandingScreen />} />
                <Route path="/catalog" element={<CatalogScreen />} />
                <Route path="/curso/:slug" element={<CourseDetailScreen />} />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/blog" element={<BlogScreen />} />
                <Route path="/blog/:slug" element={<ArticleDetailScreen />} />
                <Route path="/pricing" element={<PlanScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/faq" element={<FaqScreen />} />
                <Route path="/privacy" element={<PrivacyPolicyScreen />} />
                <Route path="/terms" element={<TermsScreen />} />
                <Route path="/legal" element={<LegalScreen />} />

                {/* Autenticacion */}
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />

                {/* Redireccion de Dashboard segun Rol */}
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

                {/* Rutas de Instructor / Administrador */}
                <Route path="/instructor/dashboard" element={<InstructorDashboardScreen />} />
                <Route path="/instructor/cursos" element={<CourseManagementScreen />} />
                <Route path="/instructor/editor-curso/:id?" element={<CourseEditorScreen />} />
                <Route path="/instructor/estudiantes" element={<StudentManagementScreen />} />
                <Route path="/instructor/finanzas" element={<InstructorFinancesScreen />} />
                <Route path="/instructor/ingesta-n8n" element={<DocumentIngestionScreen />} />
                <Route path="/instructor/grafo-qdrant" element={<KnowledgeGraphScreen />} />

                {/* Fallback general */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Chat flotante disponible en la aplicacion */}
            {ChatBubble && <ChatBubble />}
        </>
    );
};

export default AppRouter;