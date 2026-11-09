// src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative">
            {/* Header Fijo */}
            <Navbar />

            {/* Contenido Dinámico con Padding para la Navbar */}
            <main className="flex-1 pt-16">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;