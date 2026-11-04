// src/screens/instructor/KnowledgeGraphScreen.jsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Network, Database, Layers, FileText, Loader2, RefreshCw, AlertCircle } from 'lucide-react';

export const KnowledgeGraphScreen = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGraph = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3000/api/v1/instructor/qdrant-graph', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });

            if (!res.ok) {
                throw new Error(`Error en el servidor: HTTP ${res.status}`);
            }

            const data = await res.json();
            setGraphData(data.data || { nodes: [], links: [] });
        } catch (err) {
            console.error('Error al cargar el grafo:', err);
            setError('No se pudo conectar con el endpoint de Qdrant. Asegúrate de que el backend (puerto 3000) esté corriendo.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGraph();
    }, []);

    const categoryNodes = graphData.nodes?.filter((n) => n.type === 'CATEGORY') || [];
    const documentNodes = graphData.nodes?.filter((n) => n.type === 'DOCUMENT' || n.group === 'qdrant_n8n') || [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/grafo-qdrant" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Network size={24} className="text-indigo-600" />
                                <span>Grafo de Nodos Qdrant (Base de Conocimiento)</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Visualización de vectores e ingestas procesadas por n8n.
                            </p>
                        </div>
                        <button
                            onClick={fetchGraph}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            <span>Sincronizar Qdrant</span>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={32} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando topología de Qdrant...</span>
                        </div>
                    ) : (
                        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 min-h-[500px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-between">
                            
                            {/* Nodo Principal Qdrant Cluster */}
                            <div className="z-10 text-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black flex items-center justify-center shadow-xl border-2 border-indigo-400/30 mx-auto mb-2">
                                    <Database size={28} />
                                </div>
                                <span className="text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
                                    RutaIA Qdrant Cluster
                                </span>
                            </div>

                            {/* Categorías Nivel 1 */}
                            <div className="w-full max-w-4xl z-10 mb-6">
                                <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest text-center mb-3">
                                    Categorías ({categoryNodes.length})
                                </span>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {categoryNodes.map((cat) => (
                                        <div key={cat.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                                            <Layers size={16} className="text-cyan-400 mx-auto mb-1" />
                                            <span className="text-[11px] font-bold text-slate-200 block truncate max-w-[140px]">
                                                {cat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Documentos Indexados */}
                            <div className="w-full z-10 space-y-3">
                                <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest text-center">
                                    Documentos Vectorizados ({documentNodes.length})
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1">
                                    {documentNodes.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5"
                                        >
                                            <FileText size={16} className="text-emerald-400 shrink-0" />
                                            <div className="overflow-hidden">
                                                <span className="block text-[11px] font-semibold text-slate-200 truncate">
                                                    {doc.label}
                                                </span>
                                                <span className="block text-[9px] text-slate-400 uppercase tracking-wider">
                                                    Vector Payload
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default KnowledgeGraphScreen;