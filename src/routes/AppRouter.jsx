// Principio OCP (Open/Closed Principle): Permite agregar nuevas pantallas dentro de MainLayout sin modificar la logica de navegacion global.
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from "../components/layout/MainLayout";
import LandingScreen from '../screens/public/LandingScreen';
import AiQueryScreen from '../screens/student/AiQueryScreen';

export const AppRouter = () => {
    return (
        <Routes>
            {/* Ruta Padre que envuelve a todas las vistas con el Navbar mediante MainLayout */}
            <Route element={<MainLayout />}>
                {/* Vista Principal / Landing */}
                <Route path="/" element={<LandingScreen />} />

                {/* Vistas del Asistente IA */}
                <Route path="/chat" element={<AiQueryScreen />} />
                <Route path="/ai-query" element={<AiQueryScreen />} />

                {/* Redirección por defecto para URLs no mapeadas */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;