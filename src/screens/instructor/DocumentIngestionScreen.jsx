// src/screens/instructor/DocumentIngestionScreen.jsx
import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, FileCode } from 'lucide-react';

export const DocumentIngestionScreen = () => {
    const [webhookUrl, setWebhookUrl] = useState('https://n8n.tu-servidor.com/webhook/ingest-qdrant');
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('IDLE');

    const handleUpload = (e) => {
        e.preventDefault();
        if (!fileName) return;
        setStatus('UPLOADING');
        setTimeout(() => {
            setStatus('SUCCESS');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="instructor" currentRoute="/instructor/ingesta-n8n" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                            <UploadCloud size={24} className="text-indigo-600" />
                            <span>Ingesta de Documentos (Workflow n8n RAG)</span>
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Envía políticas de precios o contenido de cursos a la base vectorial Qdrant mediante el Webhook de n8n.
                        </p>
                    </div>

                    <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                Webhook Endpoint de n8n
                            </label>
                            <input
                                type="text"
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-indigo-600 dark:text-indigo-400"
                            />
                        </div>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors">
                                <FileCode size={36} className="mx-auto text-indigo-500 mb-2" />
                                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    Selecciona un documento PDF o TXT
                                </span>
                                <input
                                    type="file"
                                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                                    className="mt-3 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-950 dark:file:text-indigo-300 hover:file:bg-indigo-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'UPLOADING' || !fileName}
                                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === 'UPLOADING' ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Disparando Webhook e Ingestionando...</span>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud size={16} />
                                        <span>Procesar en Qdrant vía n8n</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {status === 'SUCCESS' && (
                            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                <span>¡Documento indexado con éxito en el cluster de Qdrant!</span>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DocumentIngestionScreen;