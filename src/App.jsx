// src/App.jsx
import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import ChatBubble from './components/domain/ChatBubble/chatBubble';

export function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <NotificationProvider>
                    <AppRouter />
                    <ChatBubble />
                </NotificationProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;