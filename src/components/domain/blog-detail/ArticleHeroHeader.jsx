import React, { useState } from 'react';
import { Clock, Calendar, ChevronRight, Share2, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

export const ArticleHeroHeader = ({ article }) => {
    const [copiedLink, setCopiedLink] = useState(false);

    if (!article) return null;

    const {
        title,
        category,
        author,
        publishedAt = '28 Oct, 2026',
        readTime = '8 min de lectura',
        thumbnail,
    } = article;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <header className="mb-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                <a href="/" className="hover:text-indigo-500 transition-colors">Inicio</a>
                <ChevronRight size={14} />
                <a href="/blog" className="hover:text-indigo-500 transition-colors">Blog</a>
                <ChevronRight size={14} />
                <span className="text-indigo-600 dark:text-indigo-400">{category}</span>
            </nav>

            {/* Badge de Categoría */}
            <span className="inline-block px-3 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold mb-3">
                {category}
            </span>

            {/* Título H1 del Artículo (Sin degradado en texto) */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight mb-6">
                {title}
            </h1>

            {/* Barra de Metadatos y Compartir Social */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800 mb-8">
                {/* Perfil del Autor */}
                <div className="flex items-center gap-3">
                    <img
                        src={author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                        alt={author?.name || 'Autor'}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                            {author?.name || 'José Guillermo Rodríguez Samcam'}
                        </span>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {publishedAt}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {readTime}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Botones de Compartir */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
                        <Share2 size={14} />
                        <span>Compartir:</span>
                    </span>
                    <button
                        onClick={handleCopyLink}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors"
                        title="Copiar Enlace"
                    >
                        {copiedLink ? <Check size={16} className="text-emerald-500" /> : <LinkIcon size={16} />}
                    </button>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                        title="Compartir en X / Twitter"
                    >
                        <Twitter size={16} />
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors"
                        title="Compartir en LinkedIn"
                    >
                        <Linkedin size={16} />
                    </a>
                </div>
            </div>

            {/* Imagen Principal de Portada */}
            {thumbnail && (
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </header>
    );
};