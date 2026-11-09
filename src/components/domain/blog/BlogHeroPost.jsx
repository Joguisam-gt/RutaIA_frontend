import React from 'react';
import { Clock, User, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const BlogHeroPost = ({ post }) => {
    const defaultPost = {
        slug: 'arquitectura-rag-con-node-express-vector-db',
        title: 'Cómo construir un pipeline RAG de alto rendimiento con Node.js, pgvector y Express',
        excerpt: 'Descubre paso a paso cómo integrar bases de datos vectoriales en aplicaciones backend reales para potenciar asistentes conversacionales sin alucinaciones.',
        category: 'IA & Agentes',
        author: {
            name: 'José Guillermo Rodríguez Samcam',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        },
        readTime: '8 min de lectura',
        publishedAt: '28 Oct, 2026',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    };

    const rawData = post || defaultPost;
    // Soporta tanto el campo 'image' como 'coverImage'
    const data = { ...rawData, image: rawData.image || rawData.coverImage };

    return (
        <article className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12 group transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Imagen Portada (7 Columnas en escritorio) */}
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-slate-950">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-xs font-bold">
                            <Sparkles size={14} />
                            <span>Artículo Destacado</span>
                        </span>
                    </div>
                </div>

                {/* Info y Contenido (5 Columnas en escritorio) */}
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
                                {data.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                <Clock size={12} />
                                <span>{data.readTime}</span>
                            </div>
                        </div>

                        {/* Título (Sin degradado en texto) */}
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            <a href={`/blog/${data.slug}`}>{data.title}</a>
                        </h2>

                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            {data.excerpt}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        {/* Autor */}
                        <div className="flex items-center gap-2.5">
                            <img
                                src={data.author.avatar}
                                alt={data.author.name}
                                className="w-8 h-8 rounded-full object-cover border border-indigo-500"
                            />
                            <div>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                                    {data.author.name}
                                </span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <Calendar size={10} />
                                    {data.publishedAt}
                                </span>
                            </div>
                        </div>

                        {/* Leer Más (Degradado exclusivo en botón) */}
                        <a
                            href={`/blog/${data.slug}`}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all"
                        >
                            <span>Leer</span>
                            <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogHeroPost;