import React from 'react';
import { ArrowLeft, ArrowRight, Eye, Send } from 'lucide-react';

export const CourseEditorFooter = ({
    currentStep,
    onPrev,
    onNext,
    isLastStep,
}) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 text-white py-3.5 px-6">
            <div className="container mx-auto flex items-center justify-between max-w-4xl">
                <button
                    onClick={onPrev}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentStep === 1
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        }`}
                >
                    <ArrowLeft size={16} />
                    <span>Paso Anterior</span>
                </button>

                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    Paso {currentStep} de 4
                </span>

                {!isLastStep && (
                    <button
                        onClick={onNext}
                        className="flex items-center gap-1.5 px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all"
                    >
                        <span>Siguiente Paso</span>
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </footer>
    );
};

export default CourseEditorFooter;