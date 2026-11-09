import React, { useState } from 'react';
import { PieChart as PieIcon, BookOpen, DollarSign, Users, Sparkles } from 'lucide-react';

export const SalesByCourseTab = ({ courseSales = [] }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const defaultSales = [
        {
            courseId: 'c-101',
            title: 'Arquitectura Backend y APIs REST con Node.js & Express',
            category: 'Backend Architecture',
            studentsCount: 640,
            totalRevenue: 15360.00,
            sharePercentage: 54,
            color: '#6366f1', // Indigo
        },
        {
            courseId: 'c-102',
            title: 'Bases de Datos Vectoriales y Embeddings con pgvector & NoSQL',
            category: 'Databases & AI',
            studentsCount: 410,
            totalRevenue: 9840.00,
            sharePercentage: 35,
            color: '#06b6d4', // Cyan
        },
        {
            courseId: 'c-103',
            title: 'Agentes de IA y Orquestación RAG con n8n y LangChain',
            category: 'Artificial Intelligence',
            studentsCount: 190,
            totalRevenue: 3250.00,
            sharePercentage: 11,
            color: '#8b5cf6', // Violet
        },
    ];

    const items = courseSales.length > 0 ? courseSales : defaultSales;
    const totalRevenueAll = items.reduce((sum, item) => sum + item.totalRevenue, 0);

    // Generador de Gráfica SVG Donut (Torta)
    let cumulativeAngle = 0;
    const pieSlices = items.map((item, idx) => {
        const angle = (item.sharePercentage / 100) * 360;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + angle;
        cumulativeAngle = endAngle;

        const x1 = 100 + 80 * Math.cos((Math.PI * (startAngle - 90)) / 180);
        const y1 = 100 + 80 * Math.sin((Math.PI * (startAngle - 90)) / 180);
        const x2 = 100 + 80 * Math.cos((Math.PI * (endAngle - 90)) / 180);
        const y2 = 100 + 80 * Math.sin((Math.PI * (endAngle - 90)) / 180);

        const largeArcFlag = angle > 180 ? 1 : 0;
        const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        return { ...item, pathData, idx };
    });

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
            <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50 mb-1">
                    Distribución de Ventas por Producto Pedagógico
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Analiza el porcentaje de ingresos generado por cada curso de tu catálogo.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Gráfica de Torta SVG Donut */}
                <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                        {pieSlices.map((slice) => (
                            <path
                                key={slice.courseId}
                                d={slice.pathData}
                                fill={slice.color}
                                className="transition-opacity duration-300 cursor-pointer hover:opacity-80"
                                onMouseEnter={() => setHoveredIndex(slice.idx)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                        {/* Círculo centro para efecto Donut */}
                        <circle cx="100" cy="100" r="50" className="fill-white dark:fill-slate-900" />
                    </svg>

                    {/* Texto Central de Donut */}
                    <div className="absolute text-center pointer-events-none">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Total</span>
                        <span className="text-sm font-black text-slate-900 dark:text-slate-50">
                            ${(totalRevenueAll / 1000).toFixed(1)}k USD
                        </span>
                    </div>
                </div>

                {/* Desglose de Cursos */}
                <div className="flex-1 space-y-3 w-full">
                    {items.map((item, idx) => (
                        <div
                            key={item.courseId}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${hoveredIndex === idx
                                    ? 'bg-slate-50 dark:bg-slate-800/80 border-indigo-500 shadow-xs'
                                    : 'bg-slate-50/50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className="w-4 h-4 rounded-full shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="min-w-0">
                                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                                        {item.category}
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate block">
                                        {item.title}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right shrink-0">
                                <span className="text-sm font-black text-slate-900 dark:text-slate-50 block">
                                    ${item.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                                </span>
                                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                                    {item.sharePercentage}% del total ({item.studentsCount} alumnos)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesByCourseTab;