// src/components/domain/classroom/LessonResourcesTab.jsx
import React from 'react';
import { FileText, Download, Github, FileCode, ExternalLink } from 'lucide-react';

export const LessonResourcesTab = ({ resources = [] }) => {
    const defaultResources = [
        { type: 'pdf', title: 'Guía de Middlewares y Manejo Global de Errores.pdf', size: '2.4 MB', url: '#' },
        { type: 'zip', title: 'Código Fuente Módulo 2 - Express Starter.zip', size: '14.8 MB', url: '#' },
        { type: 'github', title: 'Repositorio GitHub Oficial RutaIA - rutaia-backend', size: 'Rama main', url: 'https://github.com' },
    ];

    const list = resources.length > 0 ? resources : defaultResources;

    return (
        <div className="space-y-6 text-slate-300 text-xs md:text-sm">
            {/* Notas de la lección */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                    <FileText size={16} />
                    <span>Notas Principales de la Lección</span>
                </h4>
                <p className="leading-relaxed text-slate-300">
                    En esta lección aprenderemos a estructurar un pipeline de middlewares global utilizando Express y Node.js. Implementaremos captura asíncrona de errores para evitar que la aplicación sufra cierres inesperados durante operaciones de base de datos.
                </p>
            </div>

            {/* Descargas y Enlaces */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Recursos Adjuntos para Descarga
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {list.map((res, idx) => (
                        <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3 truncate pr-2">
                                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                                    {res.type === 'github' ? <Github size={18} /> : res.type === 'pdf' ? <FileText size={18} /> : <FileCode size={18} />}
                                </div>
                                <div className="truncate">
                                    <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition-colors block truncate">
                                        {res.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{res.size}</span>
                                </div>
                            </div>
                            <Download size={16} className="text-slate-400 group-hover:text-white transition-colors shrink-0" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LessonResourcesTab;