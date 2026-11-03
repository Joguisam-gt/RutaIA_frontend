import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

import LandingScreen from '../screens/public/LandingScreen';
import CatalogScreen from '../screens/public/CatalogScreen';
import CourseDetailScreen from '../screens/public/CourseDetailScreen';
import AboutScreen from '../screens/public/AboutScreen';
import ContactScreen from '../screens/public/ContactScreen';
import BlogScreen from '../screens/public/BlogScreen';
import PlanScreen from '../screens/public/PlanScreen';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import MyCoursesScreen from '../screens/student/MyCoursesScreen';
import ClassroomScreen from '../screens/student/ClassroomScreen';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="/cursos" element={<CatalogScreen />} />
                    <Route path="/cursos/:id" element={<CourseDetailScreen />} />
                    <Route path="/nosotros" element={<AboutScreen />} />
                    <Route path="/contacto" element={<ContactScreen />} />
                    <Route path="/blog" element={<BlogScreen />} />
                    <Route path="/planes" element={<PlanScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/registro" element={<RegisterScreen />} />
                    <Route path="/estudiante/dashboard" element={<StudentDashboardScreen />} />
                    <Route path="/estudiante/mis-cursos" element={<MyCoursesScreen />} />
                </Route>

                <Route path="/estudiante/aula/:courseId" element={<ClassroomScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;