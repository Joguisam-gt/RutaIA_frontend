import React, { useState } from 'react';
import { MessageSquare, Search, Send, Award, CheckCircle2, User, Loader2 } from 'lucide-react';

export const LessonForumTab = ({
    questions = [],
    searchValue,
    onSearchChange,
    isSubmitting,
    onSubmitQuestion,
}) => {
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newBody.trim()) return;
        onSubmitQuestion(newTitle, newBody);
        setNewTitle('');
        setNewBody('');
        setShowForm(false);
    };

    const defaultQuestions = [
        {
            id: 'q-1',
            author: 'Carlos Mendoza',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            title: '¿Por qué el middleware de error debe tener 4 parámetros?',
            body: 'Noté que en Express si no incluyo el parámetro err en primer lugar, el middleware no captura los throw err.',
            answers: [
                {
                    author: 'José Guillermo Rodríguez (Instructor)',
                    isInstructor: true,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
                    body: '¡Hola Carlos! Express identifica los middlewares de manejo de errores revisando la aridad de la función (fun.length === 4). Por eso es obligatorio mantener la firma (err, req, res, next).',
                },
            ],
        },
    ];

    const list = questions.length > 0 ? questions : defaultQuestions;

    return (
        <div className="space-y-6">
            {/* Header Foro y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar dudas en esta lección..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                    <MessageSquare size={14} />
                    <span>{showForm ? 'Cancelar' : 'Hacer una Pregunta'}</span>
                </button>
            </div>

            {/* Formulario de Nueva Pregunta */}
            {showForm && (
                <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white">Publicar duda académica</h4>
                    <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Título resumido de tu duda..."
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-100"
                    />
                    <textarea
                        rows={3}
                        required
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        placeholder="Describe en detalle tu inquietud o pega el error de la consola..."
                        className="w-full p-3 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-100"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 flex items-center gap-1.5"
                    >
                        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                        <span>Publicar Pregunta</span>
                    </button>
                </form>
            )}

            {/* Listado de Preguntas */}
            <div className="space-y-4">
                {list.map((q) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex items-center gap-2.5">
                            <img src={q.avatar} alt={q.author} className="w-7 h-7 rounded-full object-cover border border-indigo-500" />
                            <span className="text-xs font-bold text-slate-200">{q.author}</span>
                        </div>
                        <h5 className="text-xs font-extrabold text-white">{q.title}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed">{q.body}</p>

                        {/* Respuestas de Instructores Destacadas */}
                        {q.answers && q.answers.length > 0 && (
                            <div className="pl-4 border-l-2 border-indigo-500 space-y-3 pt-2">
                                {q.answers.map((ans, idx) => (
                                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <img src={ans.avatar} alt={ans.author} className="w-6 h-6 rounded-full object-cover border border-cyan-400" />
                                            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                                                {ans.author}
                                                {ans.isInstructor && <Award size={12} className="text-amber-400" />}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-300">{ans.body}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};