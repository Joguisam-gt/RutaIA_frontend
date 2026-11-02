import React from 'react';
import { Copy, Check, Quote } from 'lucide-react';
import { ContextualCourseBanner } from './ContextualCourseBanner';

export const ArticleProseContent = ({ contentSections = [], onCopyCode, copiedCodeId }) => {
    // Contenido por defecto con sintaxis enriquecida en caso de no provenir de API
    const defaultSections = [
        {
            type: 'paragraph',
            text: 'En el desarrollo moderno de software con Inteligencia Artificial, la arquitectura RAG (Retrieval-Augmented Generation) se ha consolidado como el estándar para conectar modelos LLM con fuentes de datos privadas y vectoriales sin incurrir en alucinaciones.',
        },
        {
            type: 'heading',
            id: 'arquitectura-base',
            level: 2,
            text: '1. Arquitectura Base y Selección de Herramientas',
        },
        {
            type: 'paragraph',
            text: 'Para implementar un pipeline seguro en producción, combinamos Node.js para la capa de servicios HTTP REST, PostgreSQL con la extensión pgvector para almacenamiento de vectores multidimensionales, y Express para la exposición de endpoints asíncronos.',
        },
        {
            type: 'code',
            id: 'code-snippet-1',
            language: 'javascript',
            code: `// Ejemplo de consulta de similitud de coseno con pgvector en Node.js
import { db } from '../config/database.js';

export async function searchSimilarEmbeddings(vectorArray, limit = 5) {
  const query = \`
    SELECT id, content, 1 - (embedding <=> $1::vector) AS similarity
    FROM document_chunks
    ORDER BY similarity DESC
    LIMIT $2;
  \`;
  const result = await db.query(query, [JSON.stringify(vectorArray), limit]);
  return result.rows;
}`,
        },
        {
            type: 'quote',
            text: 'La calidad del pipeline RAG depende directamente de la estrategia de fragmentación (chunking) y la precisión de los embeddings seleccionados.',
            author: 'Manual de Arquitectura RutaIA 2026',
        },
        {
            type: 'banner',
        },
        {
            type: 'heading',
            id: 'optimizacion-indices',
            level: 2,
            text: '2. Optimización de Índices HNSW para Altas Cargas',
        },
        {
            type: 'paragraph',
            text: 'Al escalar a millones de vectores, las búsquedas secuenciales dejan de ser viables. Se requiere construir índices HNSW (Hierarchical Navigable Small World) para reducir la latencia de respuesta a milisegundos.',
        },
    ];

    const sections = contentSections.length > 0 ? contentSections : defaultSections;

    return (
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-6">
            {sections.map((section, idx) => {
                if (section.type === 'paragraph') {
                    return <p key={idx}>{section.text}</p>;
                }

                if (section.type === 'heading') {
                    const Tag = section.level === 3 ? 'h3' : 'h2';
                    return (
                        <Tag
                            key={idx}
                            id={section.id}
                            className={`font-extrabold text-slate-900 dark:text-slate-50 tracking-tight pt-4 ${section.level === 3 ? 'text-lg' : 'text-xl md:text-2xl'
                                }`}
                        >
                            {section.text}
                        </Tag>
                    );
                }

                if (section.type === 'code') {
                    const isCopied = copiedCodeId === section.id;
                    return (
                        <div key={idx} className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs my-6">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
                                <span>{section.language || 'code'}</span>
                                <button
                                    onClick={() => onCopyCode(section.code, section.id)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                                    title="Copiar código en 1 clic"
                                >
                                    {isCopied ? (
                                        <>
                                            <Check size={14} className="text-emerald-400" />
                                            <span className="text-[11px] text-emerald-400 font-semibold">Copiado</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            <span className="text-[11px]">Copiar</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre className="p-4 overflow-x-auto">
                                <code>{section.code}</code>
                            </pre>
                        </div>
                    );
                }

                if (section.type === 'quote') {
                    return (
                        <blockquote key={idx} className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 my-6">
                            <Quote size={20} className="text-indigo-500 mb-2" />
                            <p className="text-slate-800 dark:text-slate-200 font-medium italic mb-1">
                                "{section.text}"
                            </p>
                            {section.author && (
                                <cite className="text-xs text-indigo-600 dark:text-indigo-400 font-bold not-italic">
                                    — {section.author}
                                </cite>
                            )}
                        </blockquote>
                    );
                }

                if (section.type === 'banner') {
                    return <ContextualCourseBanner key={idx} />;
                }

                return null;
            })}
        </div>
    );
};