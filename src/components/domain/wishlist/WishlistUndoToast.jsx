import React from 'react';
import { RotateCcw, X, CheckCircle2 } from 'lucide-react';

export const WishlistUndoToast = ({ toastData, onUndo, onDismiss }) => {
    if (!toastData || !toastData.item) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center justify-between gap-4 max-w-md w-full animate-fadeIn">
            <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center shrink-0 border border-slate-700">
                    <CheckCircle2 size={18} />
                </div>
                <div className="truncate">
                    <span className="text-xs font-bold block truncate">
                        Curso eliminado de favoritos
                    </span>
                    <span className="text-[11px] text-slate-400 truncate block">
                        "{toastData.item.title}"
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={onUndo}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                    <RotateCcw size={14} />
                    <span>Deshacer</span>
                </button>

                <button
                    onClick={onDismiss}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default WishlistUndoToast;