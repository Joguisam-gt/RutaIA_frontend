// Principio SRP: Definición de rutas y provisión de contexto global desde el archivo App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Se corrige la ruta relativa utilizando ./ en lugar de ../
import AiQueryScreen from './screens/student/AiQueryScreen';
import LandingScreen from './screens/public/LandingScreen';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/chat" element={<AiQueryScreen />} />
            <Route path="/ai-query" element={<AiQueryScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;