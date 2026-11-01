import React, { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import { HeaderControls } from '../../components/common/HeaderControls';
import { CatalogSearchHeader } from '../../components/domain/catalog/CatalogSearchHeader';
import { CatalogSidebarFilters } from '../../components/domain/catalog/CatalogSidebarFilters';
import { CatalogBottomSheet } from '../../components/domain/catalog/CatalogBottomSheet';
import { CourseCardWithHover } from '../../components/common/CourseCard/CourseCardWithHover';
import { Loader2, BookX } from 'lucide-react';

export const CatalogScreen = () => {
    const {
        courses,
        loading,
        error,
        filters,
        pagination,
        suggestions,
        isSearchingSuggestions,
        handleSearchChange,
        toggleCategory,
        toggleLevel,
        setModality,
        setMinRating,
        setSort,
        resetFilters,
    } = useCourses();

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Navbar Superior */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <span className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Catálogo
                    </span>
                    <HeaderControls />
                </div>
            </header>

            {/* Layout Principal Asimétrico (Sidebar 25% + Main Grid 75%) */}
            <main className="container mx-auto px-4 py-8">
                {/* Header de Búsqueda y Ordenamiento */}
                <CatalogSearchHeader
                    searchValue={filters.search}
                    onSearchChange={handleSearchChange}
                    suggestions={suggestions}
                    isSearchingSuggestions={isSearchingSuggestions}
                    sortValue={filters.sort}
                    onSortChange={setSort}
                    totalResults={pagination.total}
                    onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
                />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar de Filtros (25% en escritorio) */}
                    <div className="hidden lg:block w-1/4 shrink-0">
                        <CatalogSidebarFilters
                            filters={filters}
                            onToggleCategory={toggleCategory}
                            onToggleLevel={toggleLevel}
                            onSetModality={setModality}
                            onSetMinRating={setMinRating}
                            onResetFilters={resetFilters}
                        />
                    </div>

                    {/* Grid de Resultados Main Content (75% en escritorio) */}
                    <section className="flex-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                                <span className="text-xs font-medium">Cargando cursos desde la API de RutaIA...</span>
                            </div>
                        ) : error ? (
                            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold">
                                {error}
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                                <BookX size={48} className="text-slate-400 mb-4" />
                                <h3 className="text-base font-bold mb-1">No se encontraron cursos</h3>
                                <p className="text-xs text-slate-500 mb-4">Intenta ajustar los filtros de búsqueda.</p>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Restablecer Filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCardWithHover key={course.id || course._id} course={course} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Bottom Sheet Móvil para Filtros */}
            <CatalogBottomSheet
                isOpen={isMobileFiltersOpen}
                onClose={() => setIsMobileFiltersOpen(false)}
                filters={filters}
                onToggleCategory={toggleCategory}
                onToggleLevel={toggleLevel}
                onSetModality={setModality}
                onResetFilters={resetFilters}
            />
        </div>
    );
};

export default CatalogScreen;