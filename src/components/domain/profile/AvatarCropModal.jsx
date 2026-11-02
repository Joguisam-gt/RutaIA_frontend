import React from 'react';
import { X, ZoomIn, ZoomOut, Check, Upload, Image as ImageIcon } from 'lucide-react';

export const AvatarCropModal = ({
    isOpen,
    onClose,
    tempFile,
    zoom,
    onZoomChange,
    onSave,
    saving,
}) => {
    if (!isOpen) return null;

    const previewUrl = tempFile ? URL.createObjectURL(tempFile) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
                {/* Header Modal */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-2">
                        <ImageIcon size={18} className="text-indigo-500" />
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-50">
                            Recortar Foto de Perfil
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Área de Recorte Circular */}
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-indigo-500 shadow-inner bg-slate-950 mb-6 flex items-center justify-center">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Vista previa de foto"
                            className="w-full h-full object-cover transition-transform duration-200"
                            style={{ transform: `scale(${zoom})` }}
                        />
                    ) : (
                        <Upload size={32} className="text-slate-500" />
                    )}
                </div>

                {/* Slider de Zoom */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <span className="flex items-center gap-1">
                            <ZoomOut size={14} /> Zoom
                        </span>
                        <span>{(zoom * 100).toFixed(0)}%</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="2.5"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg accent-indigo-600 cursor-pointer"
                    />
                </div>

                {/* Botones de Acción */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancelar
                    </button>

                    {/* Botón CTA con degradado exclusivo */}
                    <button
                        onClick={onSave}
                        disabled={saving || !tempFile}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                    >
                        <Check size={14} />
                        <span>Guardar Foto</span>
                    </button>
                </div>
            </div>
        </div>
    );
};