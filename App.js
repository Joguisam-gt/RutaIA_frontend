// App.js
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { AppRouter } from './src/routes/AppRouter';

export function App() {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
}

export default App;