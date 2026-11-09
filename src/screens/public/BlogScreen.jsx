// src/screens/public/BlogScreen.jsx
import React from 'react';
import { useBlog } from '../../hooks/useBlog.js';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { BlogHeroPost } from '../../components/domain/blog/BlogHeroPost.jsx';
import { BlogFilterBar } from '../../components/domain/blog/BlogFilterBar.jsx';
import { ArticleCard } from '../../components/domain/blog/ArticleCard.jsx';
import { BlogSidebarConversion } from '../../components/domain/blog/BlogSidebarConversion.jsx';

export const BlogScreen = () => {
    const {
        posts = [],
        categories = [],
        featuredPost,
        selectedCategory,
        setSelectedCategory,
    } = useBlog();

    const safePosts = Array.isArray(posts) ? posts : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
            {/* Navbar Superior Público */}
            <Navbar />

            <main className="pt-20 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50">
                            Artículos & Recursos Técnicos
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400">
                            Publicaciones sobre arquitectura de software, inteligencia artificial y mejores prácticas de la industria.
                        </p>
                    </div>

                    {featuredPost && <BlogHeroPost post={featuredPost} />}

                    <BlogFilterBar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {safePosts.length > 0 ? (
                                safePosts.map((post) => (
                                    <ArticleCard key={post.id || post.slug} post={post} />
                                ))
                            ) : (
                                <div className="col-span-2 p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                                    No hay artículos disponibles para la categoría seleccionada.
                                </div>
                            )}
                        </div>
                        <BlogSidebarConversion />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogScreen;