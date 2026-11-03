// src/App.jsx
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRouter from './routes/AppRouter';

export const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <NotificationProvider>
                    <AppRouter />
                </NotificationProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;