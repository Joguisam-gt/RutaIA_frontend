import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ChatBubble from '../domain/ChatBubble/chatBubble.jsx';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative">
            {/* Header Fijo */}
            <Navbar />

            {/* Contenido Dinámico con Padding para la Navbar */}
            <main className="flex-1 pt-16">
                <Outlet />
            </main>

            {/* Widget Flotante de Chat IA */}
            <ChatBubble />
        </div>
    );
};

export default MainLayout;