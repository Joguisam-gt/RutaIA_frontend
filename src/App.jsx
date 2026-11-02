import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Proveedores de contexto
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';

// Importación centralizada desde screens/index.js
import {
    LandingScreen,
    CatalogScreen,
    CategoryCoursesScreen,
    CourseDetailScreen,
    AboutScreen,
    ArticleDetailScreen,
    BlogScreen,
    ContactScreen,
    FaqScreen,
    LegalScreen,
    PlanScreen,
    PrivacyPolicyScreen,
    TermsScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    StudentDashboardScreen,
    ClassroomScreen,
    MyCoursesScreen,
    ProfileScreen,
    WishlistScreen,
    CertificatesScreen,
    AiQueryScreen,
    MetricsScreen,
    InstructorDashboardScreen,
    CourseEditorScreen,
    CourseManagementScreen,
    InstructorFinancesScreen,
    StudentManagementScreen,
} from './screens/index.js';

export function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <NotificationProvider>
                        <BrowserRouter>
                            <Routes>
                                {/* Rutas Públicas */}
                                <Route path="/" element={<LandingScreen />} />
                                <Route path="/cursos" element={<CatalogScreen />} />
                                <Route path="/categoria/:categorySlug" element={<CategoryCoursesScreen />} />
                                <Route path="/curso/:courseId" element={<CourseDetailScreen />} />
                                <Route path="/nosotros" element={<AboutScreen />} />
                                <Route path="/blog" element={<BlogScreen />} />
                                <Route path="/blog/:articleId" element={<ArticleDetailScreen />} />
                                <Route path="/contacto" element={<ContactScreen />} />
                                <Route path="/faq" element={<FaqScreen />} />
                                <Route path="/planes" element={<PlanScreen />} />
                                <Route path="/legal" element={<LegalScreen />} />
                                <Route path="/privacidad" element={<PrivacyPolicyScreen />} />
                                <Route path="/terminos" element={<TermsScreen />} />

                                {/* Rutas de Autenticación */}
                                <Route path="/login" element={<LoginScreen />} />
                                <Route path="/registro" element={<RegisterScreen />} />
                                <Route path="/recuperar-password" element={<ForgotPasswordScreen />} />

                                {/* Rutas de Estudiante */}
                                <Route path="/estudiante/dashboard" element={<StudentDashboardScreen />} />
                                <Route path="/estudiante/mis-cursos" element={<MyCoursesScreen />} />
                                <Route path="/estudiante/aula/:courseId" element={<ClassroomScreen />} />
                                <Route path="/estudiante/perfil" element={<ProfileScreen />} />
                                <Route path="/estudiante/deseos" element={<WishlistScreen />} />
                                <Route path="/estudiante/certificados" element={<CertificatesScreen />} />
                                <Route path="/estudiante/ia-consultas" element={<AiQueryScreen />} />
                                <Route path="/estudiante/metricas" element={<MetricsScreen />} />

                                {/* Rutas de Instructor */}
                                <Route path="/instructor/dashboard" element={<InstructorDashboardScreen />} />
                                <Route path="/instructor/gestion-cursos" element={<CourseManagementScreen />} />
                                <Route path="/instructor/editor-curso" element={<CourseEditorScreen />} />
                                <Route path="/instructor/editor-curso/:courseId" element={<CourseEditorScreen />} />
                                <Route path="/instructor/finanzas" element={<InstructorFinancesScreen />} />
                                <Route path="/instructor/estudiantes" element={<StudentManagementScreen />} />
                            </Routes>
                        </BrowserRouter>
                    </NotificationProvider>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;