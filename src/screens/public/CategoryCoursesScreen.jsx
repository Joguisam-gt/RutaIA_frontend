import React, { useState } from 'react';
import { useCategoryCourses } from '../../hooks/useCategoryCourses';
import { HeaderControls } from '../../components/common/HeaderControls';
import { CategoryHeroHeader } from '../../components/domain/category/CategoryHeroHeader';
import { SubcategoryPills } from '../../components/domain/category/SubcategoryPills';
import { CourseCardWithHover } from '../../components/common/CourseCard/CourseCardWithHover';
import { CatalogBottomSheet } from '../../components/domain/catalog/CatalogBottomSheet';
import { Loader2, BookX, ArrowUpDown, SlidersHorizontal, Star, Check } from 'lucide-react';

export const CategoryCoursesScreen = ({ categorySlug = 'web-development' }) => {
    const {
        categoryMeta,
        courses,
        loading,
        error,
        selectedSubcategory,
        setSelectedSubcategory,
        filters,
        pagination,
        toggleLevel,
        setModality,
        setMinRating,
        setSort,
        resetCategoryFilters,
    } = useCategoryCourses(categorySlug);

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Hero Header de Nicho */}
            <CategoryHeroHeader categoryMeta={categoryMeta} categorySlug={categorySlug} />

            {/* Contenido Principal */}
            <main className="container mx-auto px-4 py-6">
                {/* Chips de Subcategorías */}
                <SubcategoryPills
                    subcategories={categoryMeta?.subcategories || []}
                    selectedSubcategory={selectedSubcategory}
                    onSelectSubcategory={setSelectedSubcategory}
                />

                {/* Toolbar de Control (Conteo, Ordenamiento y Trigger Móvil) */}
                <div className="flex items-center justify-between gap-4 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {pagination.total} cursos en {categoryMeta?.title || categorySlug}
                    </span>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="flex lg:hidden items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                        >
                            <SlidersHorizontal size={16} />
                            <span>Filtros</span>
                        </button>

                        <div className="relative flex items-center">
                            <ArrowUpDown size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                            <select
                                value={filters.sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="pl-8 pr-8 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                                <option value="popular">Más Populares</option>
                                <option value="newest">Más Recientes</option>
                                <option value="rating">Mejor Valorados</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid Asimétrico (Sidebar Nicho + Resultados) */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nicho (Nivel, Modalidad, Rating) */}
                    <aside className="hidden lg:block w-1/4 shrink-0">
                        <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 dark:border-slate-800">
                                Filtros de Nicho
                            </h3>

                            {/* Nivel Académico */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">Nivel</h4>
                                <div className="space-y-2">
                                    {['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'].map((lvl) => {
                                        const isChecked = filters.levels.includes(lvl);
                                        return (
                                            <label
                                                key={lvl}
                                                onClick={() => toggleLevel(lvl)}
                                                className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-colors"
                                            >
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                                                    }`}>
                                                    {isChecked && <Check size={12} strokeWidth={3} />}
                                                </div>
                                                <span className="capitalize">{lvl.toLowerCase()}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Modalidad */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">Modalidad</h4>
                                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                                    {[
                                        { key: 'all', label: 'Todos' },
                                        { key: 'free', label: 'Gratis' },
                                        { key: 'paid', label: 'De Pago' },
                                    ].map((m) => (
                                        <button
                                            key={m.key}
                                            onClick={() => setModality(m.key)}
                                            className={`py-1.5 rounded-lg font-semibold transition-all ${filters.modality === m.key
                                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                                    : 'text-slate-500 dark:text-slate-400'
                                                }`}
                                        >
                                            {m.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={resetCategoryFilters}
                                className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    </aside>

                    {/* Grid de Cursos de Nicho */}
                    <section className="flex-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                                <span className="text-xs font-medium">Cargando cursos de la categoría...</span>
                            </div>
                        ) : error ? (
                            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold">
                                {error}
                            </div>
                        ) : courses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                                <BookX size={48} className="text-slate-400 mb-4" />
                                <h3 className="text-base font-bold mb-1">Sin cursos en esta subcategoría</h3>
                                <p className="text-xs text-slate-500 mb-4">Prueba seleccionando otra rama o ajustando los filtros.</p>
                                <button
                                    onClick={resetCategoryFilters}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Ver todos los cursos de {categoryMeta?.title}
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
                filters={{ ...filters, categories: [] }}
                onToggleCategory={() => { }}
                onToggleLevel={toggleLevel}
                onSetModality={setModality}
                onResetFilters={resetCategoryFilters}
            />
        </div>
    );
};

export default CategoryCoursesScreen;