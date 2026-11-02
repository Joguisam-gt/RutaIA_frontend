import React from 'react';
import { useBlog } from '../../hooks/useBlog';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { BlogHeroPost } from '../../components/domain/blog/BlogHeroPost';
import { BlogFilterBar } from '../../components/domain/blog/BlogFilterBar';
import { ArticleCard } from '../../components/domain/blog/ArticleCard';
import { BlogSidebarConversion } from '../../components/domain/blog/BlogSidebarConversion';
import { Loader2, Newspaper } from 'lucide-react';

export const BlogScreen = () => {
    const {
        heroPost,
        articles,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        loading,
        error,
    } = useBlog();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-3">
                            <Newspaper size={32} className="text-indigo-600" />
                            <span>Blog & Novedades Tech</span>
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Artículos, guías y tutoriales sobre programación, IA y desarrollo de software.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando publicaciones...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {heroPost && <BlogHeroPost post={heroPost} />}

                        <BlogFilterBar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {articles && articles.length > 0 ? (
                                    articles.map((article) => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                        <p className="text-xs">No se encontraron artículos que coincidan con la búsqueda.</p>
                                    </div>
                                )}
                            </div>
                            <div className="lg:col-span-1">
                                <BlogSidebarConversion />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlogScreen;