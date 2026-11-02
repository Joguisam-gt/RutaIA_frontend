import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, RotateCcw } from 'lucide-react';

export const Toast = ({
    toast, // { id, message, type: 'success'|'error'|'info'|'warning', undoAction }
    onDismiss,
}) => {
    if (!toast) return null;

    const icons = {
        success: <CheckCircle2 size={18} className="text-emerald-400" />,
        error: <AlertCircle size={18} className="text-rose-400" />,
        info: <Info size={18} className="text-indigo-400" />,
        warning: <AlertCircle size={18} className="text-amber-400" />,
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl flex items-center justify-between gap-4 max-w-md w-full animate-fadeIn">
            <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">{icons[toast.type] || icons.info}</div>
                <span className="text-xs font-bold truncate">{toast.message}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {toast.undoAction && (
                    <button
                        onClick={toast.undoAction}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                        <RotateCcw size={14} />
                        <span>Deshacer</span>
                    </button>
                )}
                <button
                    onClick={() => onDismiss(toast.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;