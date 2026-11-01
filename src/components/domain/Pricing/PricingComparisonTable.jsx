import React from 'react';
import { Check, Minus } from 'lucide-react';

export const PricingComparisonTable = () => {
    const rows = [
        {
            category: 'Acceso a Contenidos',
            features: [
                { name: 'Lecciones de prueba en abierto', starter: true, pro: true, teams: true },
                { name: 'Acceso ilimitado a +500 lecciones y 4 rutas', starter: false, pro: true, teams: true },
                { name: 'Descarga de código y archivos de proyecto', starter: false, pro: true, teams: true },
                { name: 'Nuevos cursos agregados cada mes', starter: false, pro: true, teams: true },
            ],
        },
        {
            category: 'Certificaciones y Evaluaciones',
            features: [
                { name: 'Evaluaciones interactivas por módulo', starter: true, pro: true, teams: true },
                { name: 'Certificados verificables con QR y LinkedIn', starter: false, pro: true, teams: true },
                { name: 'Revisión técnica de proyectos Capstone', starter: false, pro: true, teams: true },
            ],
        },
        {
            category: 'Herramientas de Inteligencia Artificial',
            features: [
                { name: 'Consultas al Asistente IA RAG', starter: '5 / día', pro: 'Ilimitadas', teams: 'Ilimitadas' },
                { name: 'Explicación automática de errores de código', starter: false, pro: true, teams: true },
            ],
        },
        {
            category: 'Gestión y B2B',
            features: [
                { name: 'Panel de administración de equipo', starter: false, pro: false, teams: true },
                { name: 'Reportes de avance y consumo por usuario', starter: false, pro: false, teams: true },
                { name: 'Facturación fiscal e impuestos deducibles', starter: false, pro: false, teams: true },
                { name: 'Gestor de cuenta dedicado', starter: false, pro: false, teams: true },
            ],
        },
    ];

    const renderCell = (val) => {
        if (typeof val === 'boolean') {
            return val ? (
                <Check size={18} className="text-emerald-500 mx-auto" strokeWidth={3} />
            ) : (
                <Minus size={18} className="text-slate-300 dark:text-slate-700 mx-auto" />
            );
        }
        return <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{val}</span>;
    };

    return (
        <div className="max-w-6xl mx-auto mb-20 overflow-x-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mb-2">
                    Matriz comparativa de características
                </h2>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                    Compara detalladamente lo que incluye cada nivel de suscripción.
                </p>
            </div>

            <table className="w-full text-left border-collapse bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                        <th className="p-4 text-xs font-extrabold text-slate-900 dark:text-slate-100 w-2/5">Características</th>
                        <th className="p-4 text-xs font-extrabold text-slate-900 dark:text-slate-100 text-center w-1/5">Starter</th>
                        <th className="p-4 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 text-center w-1/5">Pro</th>
                        <th className="p-4 text-xs font-extrabold text-slate-900 dark:text-slate-100 text-center w-1/5">Teams</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {rows.map((group, gIdx) => (
                        <React.Fragment key={gIdx}>
                            <tr className="bg-slate-100/50 dark:bg-slate-800/40">
                                <td colSpan={4} className="p-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                    {group.category}
                                </td>
                            </tr>
                            {group.features.map((feat, fIdx) => (
                                <tr key={fIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="p-4 text-xs text-slate-700 dark:text-slate-300 font-medium">{feat.name}</td>
                                    <td className="p-4 text-center">{renderCell(feat.starter)}</td>
                                    <td className="p-4 text-center bg-indigo-50/30 dark:bg-indigo-950/20">{renderCell(feat.pro)}</td>
                                    <td className="p-4 text-center">{renderCell(feat.teams)}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};