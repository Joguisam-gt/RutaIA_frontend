import React, { useState } from 'react';
import { useCourses } from '../../hooks/useCourses.js';
import { CatalogSearchHeader } from '../../components/domain/Catalog/CatalogSearchHeader.jsx';
import { CatalogSidebarFilters } from '../../components/domain/Catalog/CatalogSidebarFilters.jsx';
import { CourseCard } from '../../components/common/CourseCard/CourseCard.jsx';

export const CatalogScreen = () => {
    const { courses } = useCourses();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedLevel, setSelectedLevel] = useState('Todos');
    const [selectedPrice, setSelectedPrice] = useState('Todos');

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('Todos');
        setSelectedLevel('Todos');
        setSelectedPrice('Todos');
    };

    const filteredCourses = (courses || []).filter((course) => {
        const matchesSearch =
            !searchQuery ||
            course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === 'Todos' || course.category === selectedCategory;

        const matchesLevel =
            selectedLevel === 'Todos' || course.level === selectedLevel;

        const matchesPrice =
            selectedPrice === 'Todos' ||
            (selectedPrice === 'Gratis' ? course.price === 0 : course.price > 0);

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8">
            <div className="container mx-auto px-4">
                <CatalogSearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                    <CatalogSidebarFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                        onResetFilters={handleResetFilters}
                    />

                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogScreen;