import React from 'react';
import { useArticleDetail } from '../../hooks/useArticleDetail';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { ReadingProgressBar } from '../../components/domain/blog-detail/ReadingProgressBar';
import { ArticleHeroHeader } from '../../components/domain/blog-detail/ArticleHeroHeader';
import { ArticleProseContent } from '../../components/domain/blog-detail/ArticleProseContent';
import { TableOfContentes } from '../../components/domain/blog-detail/TableOfContentes';
import { ContextualCourseBanner } from '../../components/domain/blog-detail/ContextualCourseBanner';
import { Loader2 } from 'lucide-react';

export const ArticleDetailScreen = () => {
    const {
        article,
        readingProgress,
        headings,
        relatedCourse,
        loading,
        error,
    } = useArticleDetail();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />
            <ReadingProgressBar progress={readingProgress} />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                        <span className="text-xs font-semibold">Cargando artículo...</span>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-rose-600 dark:text-rose-400 text-xs">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <ArticleHeroHeader article={article} />

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1">
                                <TableOfContentes headings={headings} />
                            </div>
                            <div className="lg:col-span-3 space-y-8">
                                <ArticleProseContent content={article?.content} />
                                {relatedCourse && (
                                    <ContextualCourseBanner course={relatedCourse} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ArticleDetailScreen;