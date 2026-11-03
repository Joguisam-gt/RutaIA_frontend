// Principio SRP: Encapsula los proveedores de contexto globales y el proveedor de enrutamiento principal (BrowserRouter).
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppRouter } from './routes/AppRouter';

export function App() {
    return (
        // Se envuelve la aplicación dentro de BrowserRouter para proveer el contexto de rutas requerido por <Routes> y useRoutes()
        <BrowserRouter>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;