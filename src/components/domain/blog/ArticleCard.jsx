import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const ArticleCard = ({ article }) => {
  const {
    slug,
    title,
    excerpt,
    category,
    author,
    readTime = '5 min de lectura',
    publishedAt = 'Ayer',
    thumbnail = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
  } = article;

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-xs font-bold text-cyan-400 border border-cyan-500/30">
            {category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <Clock size={12} />
          <span>{readTime}</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <a href={`/blog/${slug}`}>{title}</a>
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {excerpt}
        </p>

        {/* Footer Autor y Leer */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={author?.name || 'Autor'}
              className="w-6 h-6 rounded-full object-cover border border-indigo-500"
            />
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
              {author?.name || 'José Rodríguez'}
            </span>
          </div>

          <a
            href={`/blog/${slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>Leer</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
};