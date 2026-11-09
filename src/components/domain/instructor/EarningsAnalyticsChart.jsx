import React, { useState } from 'react';
import { DollarSign, Users, Calendar, Loader2, Sparkles, TrendingUp } from 'lucide-react';

export const EarningsAnalyticsChart = ({
    chartData = [],
    timeRange,
    onTimeRangeChange,
    chartMetric,
    onMetricChange,
    timeRangeOptions = [],
    isLoading = false,
}) => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    // Datos simulados por defecto si el backend aún no provee el array de series temporales
    const defaultSeries = [
        { label: 'Sem 1', revenue: 640, enrollments: 18 },
        { label: 'Sem 2', revenue: 920, enrollments: 26 },
        { label: 'Sem 3', revenue: 1150, enrollments: 34 },
        { label: 'Sem 4', revenue: 880, enrollments: 22 },
        { label: 'Sem 5', revenue: 1420, enrollments: 41 },
        { label: 'Sem 6', revenue: 1680, enrollments: 48 },
    ];

    const series = chartData.length > 0 ? chartData : defaultSeries;
    const activeKey = chartMetric === 'revenue' ? 'revenue' : 'enrollments';

    // Cálculos para la gráfica SVG interactiva
    const maxValue = Math.max(...series.map((d) => d[activeKey] || 0), 1);
    const chartHeight = 220;
    const chartWidth = 700;
    const paddingX = 40;
    const paddingY = 30;

    const points = series.map((item, index) => {
        const x = paddingX + (index / (series.length - 1 || 1)) * (chartWidth - paddingX * 2);
        const value = item[activeKey] || 0;
        const y = chartHeight - paddingY - (value / maxValue) * (chartHeight - paddingY * 2);
        return { x, y, value, label: item.label, raw: item };
    });

    const pathD = points.reduce((acc, p, i) => {
        return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    const areaD = points.length > 0
        ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
        : '';

    const totalPeriodSum = series.reduce((sum, d) => sum + (d[activeKey] || 0), 0);

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            {/* Controles del Gráfico: Alternador de Métrica y Filtro de Rango */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                            Analítica de Rendimiento
                        </h3>
                        {isLoading && <Loader2 size={16} className="text-indigo-500 animate-spin" />}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        Total en el periodo: <strong className="text-slate-900 dark:text-slate-100">{chartMetric === 'revenue' ? `$${totalPeriodSum.toLocaleString()} USD` : `${totalPeriodSum} estudiantes`}</strong>
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Alternador de Métrica: Ingresos ($) vs Inscripciones (#) */}
                    <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-1">
                        <button
                            onClick={() => onMetricChange('revenue')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${chartMetric === 'revenue'
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <DollarSign size={14} />
                            <span>Ingresos</span>
                        </button>

                        <button
                            onClick={() => onMetricChange('enrollments')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${chartMetric === 'enrollments'
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <Users size={14} />
                            <span>Inscripciones</span>
                        </button>
                    </div>

                    {/* Selector de Rango Temporal */}
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <Calendar size={14} className="text-slate-400 shrink-0" />
                        <select
                            value={timeRange}
                            onChange={(e) => onTimeRangeChange(e.target.value)}
                            className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                        >
                            {timeRangeOptions.map((opt) => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Gráfico de Área SVG Interactivo */}
            <div className="relative pt-6 overflow-x-auto">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-56 overflow-visible"
                >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>

                    {/* Líneas Horizontales de Guía */}
                    {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                        const yVal = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                        return (
                            <line
                                key={idx}
                                x1={paddingX}
                                y1={yVal}
                                x2={chartWidth - paddingX}
                                y2={yVal}
                                className="stroke-slate-100 dark:stroke-slate-800/60"
                                strokeDasharray="4 4"
                            />
                        );
                    })}

                    {/* Relleno del Área */}
                    {areaD && <path d={areaD} fill="url(#areaGradient)" />}

                    {/* Trazo de Línea Principal */}
                    {pathD && (
                        <path
                            d={pathD}
                            fill="none"
                            stroke="#6366f1"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}

                    {/* Puntos Interactivos */}
                    {points.map((p, idx) => (
                        <g key={idx} className="cursor-pointer">
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r={hoveredPoint?.index === idx ? '6' : '4'}
                                className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 stroke-2 transition-all"
                                onMouseEnter={() => setHoveredPoint({ ...p, index: idx })}
                                onMouseLeave={() => setHoveredPoint(null)}
                            />

                            {/* Etiqueta del Eje X */}
                            <text
                                x={p.x}
                                y={chartHeight - 8}
                                textAnchor="middle"
                                className="text-[10px] font-bold fill-slate-400 font-sans"
                            >
                                {p.label}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Tooltip Flotante de Punto Seleccionado */}
                {hoveredPoint && (
                    <div
                        className="absolute z-20 pointer-events-none p-2.5 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xl text-xs font-bold -translate-x-1/2 -translate-y-full mb-2 animate-fadeIn"
                        style={{
                            left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                            top: `${(hoveredPoint.y / chartHeight) * 100}%`,
                        }}
                    >
                        <span className="text-[10px] text-slate-400 uppercase block mb-0.5">
                            {hoveredPoint.label}
                        </span>
                        <span className="text-cyan-400 flex items-center gap-1">
                            <TrendingUp size={12} />
                            {chartMetric === 'revenue'
                                ? `$${hoveredPoint.value.toLocaleString()} USD`
                                : `${hoveredPoint.value} inscripciones`}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EarningsAnalyticsChart;