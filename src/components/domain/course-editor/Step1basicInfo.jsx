import React from 'react';
import { Upload, Video, Image as ImageIcon, Sparkles, Layers, Bold, Italic, List } from 'lucide-react';

export const Step1BasicInfo = ({ courseData, onChange }) => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">
                        Paso 1: Información Básica del Curso
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Completa la presentación que verán los estudiantes en el catálogo público.
                    </p>
                </div>

                {/* Título del Curso */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Título Principal del Curso
                    </label>
                    <input
                        type="text"
                        value={courseData.title}
                        onChange={(e) => onChange('title', e.target.value)}
                        placeholder="Ej. Arquitectura Backend y APIs REST con Node.js"
                        className="w-full px-4 py-3 rounded-2xl text-xs font-bold bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Subtítulo */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Subtítulo / Resumen Corto
                    </label>
                    <input
                        type="text"
                        value={courseData.subtitle}
                        onChange={(e) => onChange('subtitle', e.target.value)}
                        placeholder="Aprende a escalar microservicios y optimizar middlewares de producción."
                        className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Categoría y Nivel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Categoría
                        </label>
                        <select
                            value={courseData.category}
                            onChange={(e) => onChange('category', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
                        >
                            <option value="Backend Architecture">Backend Architecture</option>
                            <option value="Databases & AI">Databases & AI</option>
                            <option value="Frontend & Web">Frontend & Web</option>
                            <option value="Mobile Dev">Mobile Dev</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Nivel Académico
                        </label>
                        <select
                            value={courseData.level}
                            onChange={(e) => onChange('level', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:outline-none"
                        >
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="advanced">Avanzado / Profesional</option>
                        </select>
                    </div>
                </div>

                {/* Editor WYSIWYG Simplificado */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Descripción Detallada del Curso
                    </label>
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                        {/* Toolbar WYSIWYG */}
                        <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1 text-slate-500">
                            <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Bold size={14} /></button>
                            <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><Italic size={14} /></button>
                            <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><List size={14} /></button>
                        </div>
                        <textarea
                            rows={5}
                            value={courseData.description}
                            onChange={(e) => onChange('description', e.target.value)}
                            placeholder="Explica qué aprenderán los estudiantes y el temario detallado..."
                            className="w-full p-4 text-xs bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Thumbnail 16:9 & Trailer Promocional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Cover Thumbnail 16:9 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <ImageIcon size={14} className="text-indigo-500" />
                            <span>Portada 16:9 (HD)</span>
                        </label>
                        <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden relative group flex items-center justify-center">
                            {courseData.thumbnail ? (
                                <>
                                    <img src={courseData.thumbnail} alt="Portada" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-xl">Cambiar Portada</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <Upload size={24} className="mx-auto text-slate-400 mb-1" />
                                    <span className="text-xs font-bold text-slate-500">Subir Imagen 1280x720</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trailer Promocional */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <Video size={14} className="text-cyan-500" />
                            <span>Video Trailer (Opcional)</span>
                        </label>
                        <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
                            <Video size={28} className="text-slate-400 mb-2" />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                                Subir Video de Presentación
                            </span>
                            <span className="text-[10px] text-slate-400">MP4 o MOV hasta 250 MB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1BasicInfo;