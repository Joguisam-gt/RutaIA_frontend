import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

export const SelectedPlanBanner = ({ selectedPlan }) => {
    if (!selectedPlan) return null;

    return (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/40 text-white shadow-md mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-cyan-400 flex items-center justify-center border border-indigo-500/30">
                        <Tag size={16} />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Plan seleccionado
                        </span>
                        <span className="text-xs font-bold text-white">
                            {selectedPlan.name}
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-xs font-black text-cyan-400 block">
                        {selectedPlan.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <Sparkles size={10} />
                        <span>{selectedPlan.badge}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SelectedPlanBanner;