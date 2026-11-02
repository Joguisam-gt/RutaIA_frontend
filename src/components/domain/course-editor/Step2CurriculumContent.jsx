import React, { useState } from 'react';
import { Plus, GripVertical, Trash2, Video, FileText, CheckCircle2, Lock, Upload, X, Loader2 } from 'lucide-react';

export const Step2CurriculumContent = ({
    courseData,
    onChange,
    onOpenLessonModal,
}) => {
    const [newModuleName, setNewModuleName] = useState('');

    const handleAddModule = () => {
        if (!newModuleName.trim()) return;
        const newMod = {
            id: `mod-${Date.now()}`,
            title: newModuleName,
            lessons: [],
        };
        onChange('modules', [...courseData.modules, newMod]);
        setNewModuleName('');
    };

    const handleRemoveModule = (modId) => {
        onChange('modules', courseData.modules.filter((m) => m.id !== modId));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                            Paso 2: Temario & Gestor de Contenidos
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Organiza los módulos y lecciones mediante arrastre estructurado.
                        </p>
                    </div>
                </div>

                {/* Lista de Módulos */}
                <div className="space-y-4">
                    {courseData.modules.map((mod, modIdx) => (
                        <div
                            key={mod.id}
                            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-4"
                        >
                            {/* Header Módulo */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                    <GripVertical size={16} className="text-slate-400 cursor-grab" />
                                    <input
                                        type="text"
                                        value={mod.title}
                                        onChange={(e) => {
                                            const updated = [...courseData.modules];
                                            updated[modIdx].title = e.target.value;
                                            onChange('modules', updated);
                                        }}
                                        className="text-xs font-extrabold bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none flex-1 border-b border-transparent focus:border-indigo-500"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveModule(mod.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Eliminar módulo"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Lecciones del Módulo */}
                            <div className="pl-6 space-y-2 border-l-2 border-indigo-500/30">
                                {mod.lessons.map((les) => (
                                    <div
                                        key={les.id}
                                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <GripVertical size={14} className="text-slate-400 cursor-grab shrink-0" />
                                            <Video size={14} className="text-indigo-500 shrink-0" />
                                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                                {les.title}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0">
                                            {les.isFreePreview && (
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                                    Vista Gratis
                                                </span>
                                            )}
                                            <span className="text-[10px] font-mono text-slate-400">{les.duration}</span>
                                            <button
                                                type="button"
                                                onClick={() => onOpenLessonModal(les, mod.id)}
                                                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                                            >
                                                Editar Video
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Botón Agregar Lección */}
                                <button
                                    type="button"
                                    onClick={() => onOpenLessonModal(null, mod.id)}
                                    className="w-full py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1 mt-2"
                                >
                                    <Plus size={14} />
                                    <span>Añadir Lección a este Módulo</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Añadir Módulo */}
                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="text"
                        value={newModuleName}
                        onChange={(e) => setNewModuleName(e.target.value)}
                        placeholder="Nombre del nuevo módulo..."
                        className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                    />
                    <button
                        type="button"
                        onClick={handleAddModule}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1 shrink-0"
                    >
                        <Plus size={14} />
                        <span>Crear Módulo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};