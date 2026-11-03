// src/routes/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AiQueryScreen from '../screens/student/AiQueryScreen';
// Otros imports de pantallas...

export const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas existentes */}

            {/* Ruta agregada para el Chat IA */}
            <Route path="/chat" element={<AiQueryScreen />} />
            <Route path="/ai-query" element={<AiQueryScreen />} />

        </Routes>
    );
};

export default AppRouter;