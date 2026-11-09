// src/components/domain/ChatBubble/chatBubble.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Loader2, Sparkles, Trash2, Star, BookOpen, UserPlus, CheckCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import useAiQuery from '../../../hooks/useAiQuery';
import { enrollCourseApi } from '../../../api/enrollApi';

const ASSISTANT_NAME = 'RutaBot';

/* ─────────────────── Modal de Calificación ─────────────────── */
const RatingModal = ({ onSubmit, onSkip }) => {
    const [stars, setStars]     = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [sending, setSending] = useState(false);
    const labels = ['', 'Muy mala', 'Mala', 'Regular', 'Buena', '¡Excelente!'];

    const handleSubmit = async () => {
        if (!stars) return;
        setSending(true);
        await onSubmit(stars, comment);
    };

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/85 backdrop-blur-sm rounded-2xl">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mx-4 w-full max-w-[300px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                        <Sparkles size={15} className="text-white" />
                    </div>
                    <h4 className="text-sm font-bold text-white">¿Cómo fue tu experiencia?</h4>
                </div>
                <p className="text-xs text-gray-400 mb-4">Califica tu conversación con {ASSISTANT_NAME} antes de reiniciar.</p>
                <div className="flex justify-center gap-1.5 mb-1">
                    {[1,2,3,4,5].map(n => (
                        <button key={n} type="button"
                            onClick={() => setStars(n)}
                            onMouseEnter={() => setHovered(n)}
                            onMouseLeave={() => setHovered(0)}
                            className="transition-transform hover:scale-110 active:scale-95">
                            <Star size={28} className={n <= (hovered || stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                        </button>
                    ))}
                </div>
                <p className="text-center text-[11px] text-yellow-400 font-medium h-4 mb-3">{labels[hovered || stars] || ''}</p>
                <textarea value={comment} onChange={e => setComment(e.target.value)}
                    maxLength={500} rows={3}
                    placeholder="Deja un comentario opcional... (máx 500 caracteres)"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none mb-3" />
                <div className="flex gap-2">
                    <button type="button" onClick={onSkip}
                        className="flex-1 py-2 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors">
                        Omitir
                    </button>
                    <button type="button" onClick={handleSubmit} disabled={!stars || sending}
                        className="flex-1 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5">
                        {sending ? <Loader2 size={12} className="animate-spin" /> : <Star size={12} />}
                        {sending ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────── Modal Inscripción (autenticado) ─────────────────── */
const EnrollModal = ({ course, onEnroll, onSkip }) => {
    const [loading, setLoading] = useState(false);
    const [done, setDone]       = useState(false);

    const handleEnroll = async () => {
        setLoading(true);
        const ok = await onEnroll(course.courseId);
        setLoading(false);
        if (ok) setDone(true);
    };

    if (done) return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/85 backdrop-blur-sm rounded-2xl">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mx-4 w-full max-w-[300px] text-center animate-in fade-in zoom-in-95">
                <CheckCircle size={36} className="text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-white mb-1">¡Inscripción exitosa!</p>
                <p className="text-xs text-gray-400 mb-4">Ya puedes ver <span className="text-white font-semibold">"{course.title}"</span> en tu dashboard.</p>
                <button onClick={onSkip}
                    className="w-full py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors">
                    ¡Genial, ir a Mis Cursos!
                </button>
            </div>
        </div>
    );

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/85 backdrop-blur-sm rounded-2xl">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mx-4 w-full max-w-[300px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                        <BookOpen size={15} className="text-white" />
                    </div>
                    <h4 className="text-sm font-bold text-white">¿Te inscribes ahora?</h4>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                    RutaBot te recomendó este curso. ¿Quieres agregarlo a tu aprendizaje?
                </p>
                <div className="p-3 rounded-xl bg-gray-800 border border-gray-700 mb-4">
                    <p className="text-xs font-bold text-white truncate">"{course.title}"</p>
                    <div className="flex gap-3 mt-1">
                        <span className="text-[10px] text-gray-400">{course.category}</span>
                        <span className="text-[10px] text-blue-400">{course.level}</span>
                        <span className="text-[10px] text-gray-400">{course.durationHours}h</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={onSkip}
                        className="flex-1 py-2 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors">
                        No, gracias
                    </button>
                    <button type="button" onClick={handleEnroll} disabled={loading}
                        className="flex-1 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5">
                        {loading ? <Loader2 size={12} className="animate-spin" /> : <BookOpen size={12} />}
                        {loading ? 'Inscribiendo...' : '¡Inscribirme!'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────── Modal Registro (anónimo) ─────────────────── */
const RegisterPromptModal = ({ onRegister, onSkip }) => (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-950/85 backdrop-blur-sm rounded-2xl">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mx-4 w-full max-w-[300px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                    <UserPlus size={15} className="text-white" />
                </div>
                <h4 className="text-sm font-bold text-white">¡Únete a RutaIA!</h4>
            </div>
            <p className="text-xs text-gray-400 mb-4">
                Crea una cuenta gratuita y obtén recomendaciones personalizadas según tu nivel e intereses. ¡Te esperamos!
            </p>
            <div className="space-y-2 mb-4">
                {['Recomendaciones personalizadas a tu nivel','Guarda tu historial de aprendizaje','Accede a cursos gratuitos y de pago','Certificados al completar cursos'].map(b => (
                    <div key={b} className="flex items-center gap-2 text-[11px] text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {b}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={onSkip}
                    className="flex-1 py-2 text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors">
                    Ahora no
                </button>
                <button type="button" onClick={onRegister}
                    className="flex-1 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5">
                    <UserPlus size={12} />
                    Registrarme
                </button>
            </div>
        </div>
    </div>
);

/* ─────────────────── ChatBubble principal ─────────────────── */
export const ChatBubble = () => {
    const [isOpen, setIsOpen]       = useState(false);
    const [inputText, setInputText] = useState('');
    // Modal de inscripción: null | { courseId, title, category, level, durationHours }
    const [enrollTarget, setEnrollTarget]           = useState(null);
    // Modal de registro anónimo al cerrar
    const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);

    const { user } = useAuth() || {};
    const navigate = useNavigate();
    const location = useLocation();
    const messagesEndRef = useRef(null);

    const {
        messages, loading, sendMessage,
        clearHistory, pendingRating, submitRating, skipRating
    } = useAiQuery(user);

    const isAuthenticated = !!(user?.id || user?._id);

    useEffect(() => {
        if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading, isOpen]);

    // Ocultar en vistas de instructor/admin
    const isAdmin = user?.role === 'admin' || user?.role === 'instructor';
    if (location.pathname.startsWith('/instructor') || isAdmin) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;
        sendMessage(inputText.trim());
        setInputText('');
    };

    /* Al cerrar el chat:
       - Si hay mensajes: autenticado → inscripción del último curso / anónimo → modal registro
       - Sin mensajes: cierra normal */
    const handleClose = () => {
        if (messages.length > 0) {
            if (isAuthenticated) {
                // Buscar el último curso recomendado en los mensajes del bot
                const lastCourseMsg = [...messages].reverse().find(
                    m => m.sender === 'bot' && m.sources && m.sources.length > 0
                );
                if (lastCourseMsg) {
                    const topCourse = lastCourseMsg.sources[0];
                    setEnrollTarget(topCourse);
                    return; // No cerrar todavía — mostrar modal inscripción
                }
            } else {
                setShowRegisterPrompt(true);
                return; // No cerrar todavía — mostrar modal registro
            }
        }
        setIsOpen(false);
    };

    const handleEnroll = async (courseId) => {
        try {
            await enrollCourseApi(courseId);
            return true;
        } catch (err) {
            console.warn('[ChatBubble] Error al inscribir:', err.message);
            return false;
        }
    };

    const handleEnrollDone = () => {
        setEnrollTarget(null);
        setIsOpen(false);
        navigate('/app/mis-cursos');
    };

    const handleEnrollSkip = () => {
        setEnrollTarget(null);
        setIsOpen(false);
    };

    const handleRegisterSkip = () => {
        setShowRegisterPrompt(false);
        setIsOpen(false);
    };

    const handleGoRegister = () => {
        setShowRegisterPrompt(false);
        setIsOpen(false);
        navigate('/register');
    };

    const anyModalOpen = pendingRating || !!enrollTarget || showRegisterPrompt;

    return (
        <div className="fixed bottom-6 right-6 z-50">

            {isOpen && (
                <div className="relative w-[360px] sm:w-[420px] h-[540px] max-h-[85vh] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">

                    {/* ── Modales superpuestos ── */}
                    {pendingRating && <RatingModal onSubmit={submitRating} onSkip={skipRating} />}
                    {!pendingRating && enrollTarget && (
                        <EnrollModal course={enrollTarget} onEnroll={handleEnroll} onSkip={handleEnrollSkip} />
                    )}
                    {!pendingRating && !enrollTarget && showRegisterPrompt && (
                        <RegisterPromptModal onRegister={handleGoRegister} onSkip={handleRegisterSkip} />
                    )}

                    {/* ── Header ── */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700 shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-white">{ASSISTANT_NAME}</h3>
                                <span className="text-[10px] text-emerald-400 font-medium block">Disponible</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {messages.length > 0 && (
                                <button type="button" onClick={clearHistory} title="Reiniciar conversación"
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors">
                                    <Trash2 size={15} />
                                </button>
                            )}
                            <button type="button" onClick={handleClose}
                                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* ── Mensajes ── */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                        {messages.length === 0 && !loading && (
                            <div className="text-center text-gray-400 py-12 px-4 space-y-2">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto text-blue-400 mb-3">
                                    <Bot size={24} />
                                </div>
                                <p className="font-semibold text-gray-200">Hola, soy {ASSISTANT_NAME} 👋</p>
                                <p className="text-[11px] text-gray-400">
                                    Tu asistente de aprendizaje en RutaIA. Cuéntame qué quieres aprender y te recomendaré el curso ideal.
                                </p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : msg.isError
                                            ? 'bg-red-950 text-red-300 border border-red-800 rounded-bl-none'
                                            : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                                }`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>

                                    {/* Cursos recomendados */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-3 pt-2.5 border-t border-gray-700/80 space-y-1.5">
                                            <span className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                                Cursos Recomendados
                                            </span>
                                            {msg.sources.map((src, idx) => (
                                                <div key={src.courseId || idx}
                                                    className="p-2 rounded-lg bg-gray-900 border border-gray-700/70 flex items-center justify-between gap-2">
                                                    <div className="overflow-hidden">
                                                        <span className="block font-semibold text-gray-200 truncate text-[11px]">{src.title}</span>
                                                        <span className="block text-[9px] text-gray-400">{src.category || 'General'}</span>
                                                    </div>
                                                    {/* Botón rápido de inscripción por curso */}
                                                    {isAuthenticated && src.courseId && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEnrollTarget(src)}
                                                            title="Inscribirme en este curso"
                                                            className="shrink-0 px-2 py-1 text-[9px] font-bold rounded-lg bg-emerald-900/60 hover:bg-emerald-700 text-emerald-300 border border-emerald-700/50 transition-colors">
                                                            + Inscribir
                                                        </button>
                                                    )}
                                                    {src.similarity > 0 && !isAuthenticated && (
                                                        <span className="shrink-0 px-2 py-0.5 text-[9px] font-bold rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                                                            {Math.round(src.similarity * 100)}%
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-3.5 py-2.5 text-gray-400 flex items-center gap-2">
                                    <Loader2 size={14} className="animate-spin text-blue-400 shrink-0" />
                                    <span className="text-[11px]">Consultando la base de conocimientos...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* ── Input ── */}
                    <form onSubmit={handleSubmit}
                        className="p-3 bg-gray-950 border-t border-gray-800 flex items-center gap-2 shrink-0">
                        <input
                            type="text"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            placeholder="Escribe lo que deseas aprender..."
                            disabled={loading || anyModalOpen}
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                        />
                        <button type="submit" disabled={loading || !inputText.trim() || anyModalOpen}
                            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white transition-colors shrink-0 flex items-center justify-center">
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            )}

            {/* ── Botón flotante ── */}
            {!isOpen && (
                <button type="button" aria-label={`Abrir ${ASSISTANT_NAME}`}
                    onClick={() => setIsOpen(true)}
                    className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95 relative">
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </div>
                    <Bot size={24} />
                </button>
            )}
        </div>
    );
};

export default ChatBubble;
