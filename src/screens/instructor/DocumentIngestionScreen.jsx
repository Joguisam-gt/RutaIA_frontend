// src/screens/instructor/DocumentIngestionScreen.jsx
import React, { useState, useRef } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { apiClient } from '../../api/apiClient';
import {
    UploadCloud, CheckCircle2, AlertCircle, Loader2, FileText,
    Brain, Sparkles, ArrowRight, RotateCcw, BookOpen, Clock,
    BarChart2, Tag, Info, Send
} from 'lucide-react';

const CATEGORIES = [
    'Desarrollo Web', 'Inteligencia Artificial', 'Bases de Datos',
    'Programación', 'Automatización y Datos', 'Diseño UX/UI', 'DevOps', 'Ciberseguridad'
];
const LEVELS = ['BÁSICO', 'INTERMEDIO', 'AVANZADO'];

// ── Fase 1: Subir PDF ─────────────────────────────────────────────────────────
const PhaseUpload = ({ onAnalyzed, onError }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f?.type === 'application/pdf') setFile(f);
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const form = new FormData();
            form.append('file', file);
            const res = await apiClient.post('/instructor/analyze-pdf', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 180000,
            });
            onAnalyzed(res.data?.data || res.data, file.name);
        } catch (err) {
            onError(err.response?.data?.message || 'No se pudo analizar el PDF. Verifica que n8n esté activo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            {/* Cabecera de fase */}
            <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Brain size={18} className="text-white" />
                </div>
                <div>
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Paso 1 — Análisis con Gemini vía n8n</p>
                    <p className="text-[11px] text-indigo-600/70 dark:text-indigo-400/70 mt-0.5">
                        Sube el PDF del curso. La IA extrae título, categoría, nivel y duración automáticamente.
                    </p>
                </div>
            </div>

            {/* Drop zone */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
                    ${file
                        ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                />
                {file ? (
                    <>
                        <FileText size={40} className="mx-auto text-indigo-500 mb-3" />
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{file.name}</p>
                        <p className="text-xs text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB — Listo para analizar</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="mt-3 text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                        >
                            Cambiar archivo
                        </button>
                    </>
                ) : (
                    <>
                        <UploadCloud size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Arrastra tu PDF aquí</p>
                        <p className="text-xs text-slate-400 mt-1">o haz clic para seleccionar — máx. 20 MB</p>
                    </>
                )}
            </div>

            <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-lg shadow-indigo-500/20"
            >
                {loading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Analizando con Gemini... puede tardar unos segundos</span>
                    </>
                ) : (
                    <>
                        <Sparkles size={16} />
                        <span>Analizar PDF con IA</span>
                        <ArrowRight size={16} />
                    </>
                )}
            </button>
        </div>
    );
};

// ── Fase 2: Revisar y confirmar datos ─────────────────────────────────────────
const PhaseReview = ({ data, fileName, onConfirm, onReset, loading }) => {
    const [form, setForm] = useState({
        title:         data?.title         || fileName?.replace(/\.[^/.]+$/, '') || '',
        description:   data?.description   || '',
        category:      data?.category      || 'Programación',
        level:         data?.level         || 'INTERMEDIO',
        durationHours: data?.durationHours || 20,
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="max-w-2xl space-y-6">
            {/* Cabecera de fase */}
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-white" />
                </div>
                <div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Paso 2 — Revisa los datos extraídos por Gemini</p>
                    <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">
                        Ajusta cualquier campo antes de guardar en MongoDB e indexar en Qdrant.
                    </p>
                </div>
            </div>

            {/* Badge de archivo */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                <FileText size={14} className="text-indigo-500" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{fileName}</span>
                <span className="text-[10px] text-emerald-500 font-bold ml-1">✓ Analizado</span>
            </div>

            {/* Formulario editable */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                {/* Título */}
                <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <BookOpen size={12} className="text-indigo-500" /> Título del Curso
                    </label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={e => set('title', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <Info size={12} className="text-indigo-500" /> Descripción
                    </label>
                    <textarea
                        rows={3}
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Categoría */}
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            <Tag size={12} className="text-indigo-500" /> Categoría
                        </label>
                        <select
                            value={form.category}
                            onChange={e => set('category', e.target.value)}
                            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Nivel */}
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            <BarChart2 size={12} className="text-indigo-500" /> Nivel
                        </label>
                        <select
                            value={form.level}
                            onChange={e => set('level', e.target.value)}
                            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {LEVELS.map(l => <option key={l}>{l}</option>)}
                        </select>
                    </div>

                    {/* Duración */}
                    <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            <Clock size={12} className="text-indigo-500" /> Horas
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={500}
                            value={form.durationHours}
                            onChange={e => set('durationHours', Number(e.target.value))}
                            className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <RotateCcw size={14} />
                    Subir otro PDF
                </button>
                <button
                    onClick={() => onConfirm(form)}
                    disabled={!form.title || loading}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-40 shadow-lg shadow-indigo-500/20"
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Guardando en MongoDB e indexando en Qdrant...</span>
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            <span>Confirmar e Indexar Curso</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

// ── Fase 3: Éxito ─────────────────────────────────────────────────────────────
const PhaseSuccess = ({ courseTitle, onReset }) => (
    <div className="max-w-2xl">
        <div className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">¡Curso indexado con éxito!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                <strong className="text-slate-700 dark:text-slate-200">"{courseTitle}"</strong> fue guardado en MongoDB
                e indexado en Qdrant. Ya está disponible para las recomendaciones del asistente IA.
            </p>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> MongoDB</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> Qdrant Vector Store</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> n8n RAG</span>
            </div>
            <button
                onClick={onReset}
                className="mt-4 flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-colors border border-indigo-200 dark:border-indigo-800"
            >
                <UploadCloud size={14} />
                Indexar otro curso
            </button>
        </div>
    </div>
);

// ── Pantalla principal ────────────────────────────────────────────────────────
export const DocumentIngestionScreen = () => {
    const [phase, setPhase]         = useState('upload');   // upload | review | success
    const [analyzedData, setAnalyzedData] = useState(null);
    const [fileName, setFileName]   = useState('');
    const [confirming, setConfirming] = useState(false);
    const [error, setError]         = useState('');
    const [successTitle, setSuccessTitle] = useState('');

    const handleAnalyzed = (data, name) => {
        setAnalyzedData(data);
        setFileName(name);
        setError('');
        setPhase('review');
    };

    const handleConfirm = async (formData) => {
        setConfirming(true);
        setError('');
        try {
            await apiClient.post('/instructor/ingest', {
                ...formData,
                fileName,
                status: 'ACTIVO',
            });
            setSuccessTitle(formData.title);
            setPhase('success');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el curso. Revisa la conexión con n8n.');
        } finally {
            setConfirming(false);
        }
    };

    const reset = () => {
        setPhase('upload');
        setAnalyzedData(null);
        setFileName('');
        setError('');
        setSuccessTitle('');
    };

    // Stepper visual
    const steps = ['Subir PDF', 'Revisar datos', 'Confirmado'];
    const stepIdx = phase === 'upload' ? 0 : phase === 'review' ? 1 : 2;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/ingesta-n8n" />
                <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <Brain size={24} className="text-indigo-600" />
                                Ingesta de Cursos con IA (RAG)
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Sube el PDF del curso — Gemini extrae los datos — se indexa en Qdrant automáticamente.
                            </p>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mb-8">
                        {steps.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all
                                    ${i === stepIdx
                                        ? 'bg-indigo-600 text-white'
                                        : i < stepIdx
                                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                    }`}>
                                    {i < stepIdx ? <CheckCircle2 size={12} /> : <span>{i + 1}</span>}
                                    {s}
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`h-px flex-1 ${i < stepIdx ? 'bg-emerald-300 dark:bg-emerald-700' : 'bg-slate-200 dark:bg-slate-700'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Error global */}
                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs max-w-2xl">
                            <AlertCircle size={16} className="flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Fase activa */}
                    {phase === 'upload' && (
                        <PhaseUpload
                            onAnalyzed={handleAnalyzed}
                            onError={(msg) => setError(msg)}
                        />
                    )}
                    {phase === 'review' && (
                        <PhaseReview
                            data={analyzedData}
                            fileName={fileName}
                            onConfirm={handleConfirm}
                            onReset={reset}
                            loading={confirming}
                        />
                    )}
                    {phase === 'success' && (
                        <PhaseSuccess courseTitle={successTitle} onReset={reset} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default DocumentIngestionScreen;
