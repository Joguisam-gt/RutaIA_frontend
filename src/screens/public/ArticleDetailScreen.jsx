import React from 'react';
import { useArticleDetail } from '../../hooks/useArticleDetail';
import { HeaderControls } from '../../components/common/HeaderControls';
import { ReadingProgressBar } from '../../components/domain/blog-detail/ReadingProgressBar';
import { ArticleHeroHeader } from '../../components/domain/blog-detail/ArticleHeroHeader';
import { TableOfContents } from '../../components/domain/blog-detail/TableOfContents';
import { ArticleProseContent } from '../../components/domain/blog-detail/ArticleProseContent';
import { Loader2, ArrowLeft } from 'lucide-react';

export const ArticleDetailScreen = ({ articleSlug = 'arquitectura-rag-con-node-express-vector-db' }) => {
    const {
        article,
        loading,
        error,
        readingProgress,
        activeHeadingId,
        copiedCodeId,
        copyToClipboard,
    } = useArticleDetail(articleSlug);

    const headings = [
        { id: 'arquitectura-base', text: '1. Arquitectura Base y Selección de Herramientas', level: 2 },
        { id: 'optimizacion-indices', text: '2. Optimización de Índices HNSW para Altas Cargas', level: 2 },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando artículo...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 text-center">
                <p className="text-rose-500 text-sm font-semibold mb-4">{error}</p>
                <a href="/blog" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600">
                    <ArrowLeft size={14} />
                    <span>Volver al Blog</span>
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Barra de Progreso de Lectura (2px en top) */}
            <ReadingProgressBar progress={readingProgress} />

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/blog" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                        <ArrowLeft size={18} />
                        <span>Volver al Blog</span>
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container Lectura Inmersiva (70% W + 30% W Sidebar Flotante) */}
            <main className="container mx-auto px-4 py-10 max-w-6xl">
                <ArticleHeroHeader article={article} />

                <div className="flex flex-col lg:flex-row gap-12 mt-10">
                    {/* Columna Principal de Lectura (70% W) */}
                    <article className="w-full lg:w-7/10">
                        <ArticleProseContent
                            contentSections={article?.sections}
                            onCopyCode={copyToClipboard}
                            copiedCodeId={copiedCodeId}
                        />
                    </article>

                    {/* Sidebar Flotante Navegable (30% W) */}
                    <aside className="w-full lg:w-3/10">
                        <TableOfContents headings={headings} activeId={activeHeadingId} />
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default ArticleDetailScreen;