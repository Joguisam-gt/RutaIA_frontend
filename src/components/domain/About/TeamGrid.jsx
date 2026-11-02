// src/components/domain/about/TeamGrid.jsx
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const TeamGrid = ({ team = [] }) => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3">
                        Equipo Lider & Mentores
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Profesionales comprometidos con la enseñanza técnica de calidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-0.5">
                                    {member.name}
                                </h3>
                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 block">
                                    {member.role}
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                                    {member.bio}
                                </p>

                                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                            title="GitHub Profile"
                                        >
                                            <Github size={16} />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-indigo-500 transition-colors"
                                            title="LinkedIn Profile"
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;