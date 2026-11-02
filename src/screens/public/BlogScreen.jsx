// src/screens/public/BlogScreen.jsx
import React from 'react';
import { useBlog } from '../../hooks/useBlog';
import { HeaderControls } from '../../components/common/HeaderControls';
import { BlogHeroPost } from '../../components/domain/blog/BlogHeroPost';
import { BlogFilterBar } from '../../components/domain/blog/BlogFilterBar';
import { ArticleCard } from '../../components/domain/blog/ArticleCard';
import { BlogSidebarConversion } from '../../components/domain/blog/BlogSidebarConversion';
import { Loader2, BookX } from 'lucide-react';

export const BlogScreen = () => {
    const {
        featuredPost,
        articles,
        popularArticles,
        loading,
        error,
        search,
        setSearch,
        selectedCategory,
        setSelectedCategory,
        categories,
        page,
        setPage,
        pagination,
    } = useBlog();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Blog & Recursos
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Post Destacado (Hero Post) */}
                <BlogHeroPost post={featuredPost} />

                {/* Barra de Filtros y Búsqueda */}
                <BlogFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    categories={categories}
                />

                {/* Layout Asimétrico: Main Grid (2 Columnas - 65%) + Sidebar (35%) */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Grid de Artículos */}
                    <section className="w-full lg:w-2/3">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                                <span className="text-xs font-medium">Cargando publicaciones...</span>
                            </div>
                        ) : error ? (
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center text-xs font-semibold">
                                {error}
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <BookX size={40} className="text-slate-400 mb-3" />
                                <h3 className="text-sm font-bold mb-1">No se encontraron artículos</h3>
                                <p className="text-xs text-slate-500 mb-3">Prueba buscando con otro término o seleccionando otra categoría.</p>
                                <button
                                    onClick={() => { setSearch(''); setSelectedCategory('all'); }}
                                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600"
                                >
                                    Restablecer Filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {articles.map((article) => (
                                    <ArticleCard key={article.id || article.slug} article={article} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Sidebar de Conversión (35%) */}
                    <div className="w-full lg:w-1/3">
                        <BlogSidebarConversion popularArticles={popularArticles} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogScreen;