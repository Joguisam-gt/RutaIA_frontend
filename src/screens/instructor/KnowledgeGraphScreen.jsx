// src/screens/instructor/KnowledgeGraphScreen.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { Network, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { courseApi } from '../../api/courseApi';
import ForceGraph2D from 'react-force-graph-2d';

export const KnowledgeGraphScreen = () => {
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    const fetchGraph = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await courseApi.getCourseGraph();
            setGraphData(data.data || { nodes: [], edges: [] });
        } catch (err) {
            console.error('Error al cargar el grafo:', err);
            const msg = err.response?.data?.message || err.message || 'No se pudo conectar con Qdrant.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGraph();
    }, []);

    // Actualiza las dimensiones del canvas al redimensionar la ventana
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [loading]);

    // Transforma los datos de Qdrant al formato fisico de ForceGraph (nodes y links)
    const obsidianData = useMemo(() => {
        const nodes = [
            { id: 'qdrant_root', label: 'Qdrant Cluster', val: 40, color: '#6366f1' } // indigo-500
        ];
        const links = [];

        if (graphData.nodes) {
            graphData.nodes.forEach((n) => {
                const isCat = n.type === 'CATEGORY' || n.type === 'category';
                nodes.push({
                    id: n.id,
                    label: n.label,
                    val: isCat ? 20 : 10,
                    color: isCat ? '#2dd4bf' : '#38bdf8' // teal-400 para categorias, sky-400 para cursos
                });

                // Conectar categorias al nodo raiz
                if (isCat) {
                    links.push({ source: 'qdrant_root', target: n.id });
                }
            });
        }

        if (graphData.edges) {
            graphData.edges.forEach((e) => {
                links.push({ source: e.source, target: e.target });
            });
        }

        return { nodes, links };
    }, [graphData]);

    // Renderizador custom para dibujar las esferas y el texto estilo Obsidian
    const drawNode = (node, ctx, globalScale) => {
        const radius = Math.sqrt(Math.max(0, node.val || 1)) * 1.5;
        
        // Dibujar el nodo (esfera)
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Dibujar el texto interactivo
        const label = node.label;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#cbd5e1'; // slate-300
        ctx.fillText(label, node.x, node.y + radius + 2);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/grafo-qdrant" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto flex flex-col h-screen overflow-hidden">
                    
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Network size={24} className="text-indigo-600" />
                                <span>Grafo de Nodos Qdrant</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Red neuronal de conocimiento (Arrastra los nodos para interactuar).
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
                        <div className="mb-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 shrink-0">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div 
                        ref={containerRef}
                        className="flex-1 bg-[#020617] border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center cursor-crosshair"
                    >
                        {loading ? (
                            <div className="flex flex-col items-center justify-center text-slate-400 z-10">
                                <Loader2 size={32} className="animate-spin text-indigo-500 mb-2" />
                                <span className="text-xs font-semibold">Cargando fisica de particulas...</span>
                            </div>
                        ) : (
                            <ForceGraph2D
                                width={dimensions.width}
                                height={dimensions.height}
                                graphData={obsidianData}
                                nodeCanvasObject={drawNode}
                                linkColor={() => '#334155'} // slate-700
                                linkWidth={1}
                                linkDirectionalParticles={2}
                                linkDirectionalParticleSpeed={0.005}
                                d3VelocityDecay={0.3} // Friccion para estabilizar la red
                                backgroundColor="#020617"
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default KnowledgeGraphScreen;