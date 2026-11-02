// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación directa especificando el archivo index
import {
    LandingScreen,
    CatalogScreen,
    CategoryScreen,
    CourseDetailScreen,
    StudentDashboardScreen,
    CoursePlayerScreen,
    InstructorDashboardScreen,
} from './screens/index.js'; // o './screens/index.jsx' si usaste esa extensión

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<LandingScreen />} />
                <Route path="/cursos" element={<CatalogScreen />} />
                <Route path="/categoria/:categorySlug" element={<CategoryScreen />} />
                <Route path="/curso/:courseId" element={<CourseDetailScreen />} />

                {/* Rutas de Estudiante */}
                <Route path="/estudiante/dashboard" element={<StudentDashboardScreen />} />
                <Route path="/estudiante/curso/:courseId/aula" element={<CoursePlayerScreen />} />

                {/* Rutas de Instructor */}
                <Route path="/instructor/dashboard" element={<InstructorDashboardScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;