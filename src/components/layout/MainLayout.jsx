// Principio SRP (Single Responsibility Principle): Encapsula la estructura visual compartida (Navbar y contenedor principal) para todas las vistas.
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col text-white">
            {/* 1. Navbar global persistente */}
            <Navbar />

            {/* 2. Área dinámica donde se renderiza la pantalla correspondiente a la ruta activa */}
            <main className="flex-1 w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;  