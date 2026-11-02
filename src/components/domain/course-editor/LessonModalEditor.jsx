import React, { useState } from 'react';
import { X, Upload, Video, Paperclip, CheckCircle2, Loader2, FileCode } from 'lucide-react';

export const LessonModalEditor = ({
    lesson,
    moduleId,
    isOpen,
    onClose,
    onSave,
}) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState(lesson?.title || '');
    const [duration, setDuration] = useState(lesson?.duration || '15 min');
    const [isFreePreview, setIsFreePreview] = useState(lesson?.isFreePreview || false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleSimulateChunkUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUploading(false);
            }
        }, 400);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(moduleId, {
            id: lesson?.id || `les-${Date.now()}`,
            title,
            duration,
            isFreePreview,
            videoUrl: '#',
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                        {lesson ? 'Editar Lección' : 'Añadir Nueva Lección'}
                    </h3>
                    <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Título de la Lección</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800"
                        />
                    </div>

                    {/* Subida Chunked de Video HTML5 */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Archivo de Video (1080p Chunked Upload)</label>
                        <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center">
                            {isUploading ? (
                                <div className="space-y-2">
                                    <Loader2 size={24} className="mx-auto text-indigo-500 animate-spin" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Subiendo fragmentos ({uploadProgress}%)...</span>
                                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                    </div>
                                </div>
                            ) : uploadProgress === 100 ? (
                                <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs font-bold">
                                    <CheckCircle2 size={18} />
                                    <span>Video procesado correctamente</span>
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <Upload size={24} className="mx-auto text-slate-400 mb-1" />
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Seleccionar MP4 / MOV</span>
                                    <input type="file" accept="video/*" onChange={handleSimulateChunkUpload} className="hidden" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Toggle Vista Previa Gratis */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                        <div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Habilitar Vista Previa Gratis</span>
                            <span className="text-[10px] text-slate-400">Permite ver esta lección sin matricularse.</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFreePreview(!isFreePreview)}
                            className={`w-10 h-5 rounded-full transition-colors relative ${isFreePreview ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${isFreePreview ? 'right-0.75' : 'left-0.75'}`} />
                        </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500">Cancelar</button>
                        <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700">Guardar Lección</button>
                    </div>
                </form>
            </div>
        </div>
    );
};