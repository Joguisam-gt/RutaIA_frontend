import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;