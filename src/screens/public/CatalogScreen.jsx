// src/screens/public/CatalogScreen.jsx
import React, { useState } from "react";
import { useCourses } from "../../hooks/useCourses.js";
import { Navbar } from "../../components/layout/Navbar/Navbar";
import { CatalogSearchHeader } from "../../components/domain/Catalog/CatalogSearchHeader.jsx";
import { CatalogSidebarFilters } from "../../components/domain/Catalog/CatalogSidebarFilters.jsx";
import { CourseCard } from "../../components/common/CourseCard/CourseCard.jsx";

export const CatalogScreen = () => {
    const { courses, loading, error } = useCourses();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedLevel, setSelectedLevel] = useState("Todos");
    const [selectedPrice, setSelectedPrice] = useState("Todos");

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("Todos");
        setSelectedLevel("Todos");
        setSelectedPrice("Todos");
    };

    const filteredCourses = (courses || []).filter((course) => {
        const matchesSearch =
            !searchQuery ||
            course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "Todos" || course.category === selectedCategory;

        const matchesLevel =
            selectedLevel === "Todos" ||
            course.level?.toUpperCase() === selectedLevel?.toUpperCase();

        const matchesPrice =
            selectedPrice === "Todos" ||
            (course.price === undefined
                ? true
                : selectedPrice === "Gratis"
                ? course.price === 0
                : course.price > 0);

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    const renderContent = () => {
        if (loading) {
            return (
                <div className="lg:col-span-3 flex items-center justify-center py-24">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">Cargando cursos...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="lg:col-span-3 flex items-center justify-center py-24">
                    <div className="text-center">
                        <p className="text-red-500 font-medium mb-2">No se pudieron cargar los cursos</p>
                        <p className="text-slate-400 text-sm">{error}</p>
                    </div>
                </div>
            );
        }

        if (filteredCourses.length === 0) {
            return (
                <div className="lg:col-span-3 flex items-center justify-center py-24">
                    <div className="text-center">
                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">
                            No se encontraron cursos
                        </p>
                        <p className="text-slate-400 text-sm">
                            Intenta con otros filtros o busca otro término.
                        </p>
                        <button
                            onClick={handleResetFilters}
                            className="mt-4 text-blue-500 hover:underline text-sm"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="order-1 lg:order-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <CourseCard key={course._id || course.id} course={course} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
            <Navbar />
            <main className="pt-20 pb-12 container mx-auto px-4">
                <CatalogSearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                    {renderContent()}
                    <CatalogSidebarFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                        onResetFilters={handleResetFilters}
                    />
                </div>
            </main>
        </div>
    );
};

export default CatalogScreen;
