// Principios SOLID: Aplicación del Single Responsibility Principle (SRP) al delegar la provisión del enrutador al punto de entrada (index.jsx) y concentrar App.jsx en la composición de providers y vistas.
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './routes/AppRouter';

export function App() {
    return (
        // Se elimina el <BrowserRouter> anidado que causaba conflicto con el enrutador raíz de index.jsx
        <ThemeProvider>
            <AppRouter />
        </ThemeProvider>
    );
}

export default App;