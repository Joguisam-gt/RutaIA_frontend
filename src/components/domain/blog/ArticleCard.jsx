import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';

export const ArticleCard = (props) => {
    const articleData = props.article || props.post;

    if (!articleData) {
        return null;
    }

    const {
        id,
        slug,
        title,
        excerpt,
        category,
        readTime,
        publishedAt,
        coverImage,
        author,
    } = articleData;

    return (
        <article className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            {coverImage && (
                <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50">
                        {category || 'General'}
                    </span>
                    {readTime && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <Clock size={12} />
                            {readTime}
                        </span>
                    )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                    <Link
                        to={`/blog/${id || slug}`}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                        {title}
                    </Link>
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-1">
                    {excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                    {author && (
                        <div className="flex items-center gap-2">
                            {author.avatar && (
                                <img
                                    src={author.avatar}
                                    alt={author.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            )}
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                {author.name}
                            </span>
                        </div>
                    )}

                    {publishedAt && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Calendar size={12} />
                            {publishedAt}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ArticleCard;