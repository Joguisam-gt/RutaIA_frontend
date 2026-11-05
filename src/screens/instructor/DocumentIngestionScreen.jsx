// src/screens/instructor/DocumentIngestionScreen.jsx
import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, FileCode } from 'lucide-react';
import apiClient from '../../api/apiClient';

export const DocumentIngestionScreen = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('Inteligencia Artificial');
    const [status, setStatus] = useState('IDLE');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setStatus('UPLOADING');
        setErrorMessage('');

        try {
            const fileName = selectedFile.name.replace(/\.[^/.]+$/, '');
            
            // Payload limpio en formato JSON que Express entiende nativamente
            const payload = {
                title: fileName,
                fileName: selectedFile.name,
                category: category,
                description: `Documento pedagógico ingresado para indexación: ${selectedFile.name}`,
                level: 'AVANZADO',
                durationHours: 20
            };

            // Enviamos a la ruta especializada de ingesta del instructor
            await apiClient.post('/instructor/ingest', payload);

            setStatus('SUCCESS');
        } catch (err) {
            console.error('Error durante la ingesta:', err);
            setStatus('ERROR');
            setErrorMessage(err.response?.data?.message || 'Error al procesar el archivo en n8n y Qdrant.');
        }
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
                            Envía documentos o cursos para indexación vectorial en Qdrant vía n8n.
                        </p>
                    </div>

                    <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    Categoría Académica
                                </label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                                >
                                    <option value="Desarrollo Web">Desarrollo Web</option>
                                    <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                                    <option value="Bases de Datos">Bases de Datos</option>
                                    <option value="Programación">Programación</option>
                                    <option value="Automatización y Datos">Automatización y Datos</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors">
                                <FileCode size={36} className="mx-auto text-indigo-500 mb-2" />
                                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    {selectedFile ? selectedFile.name : 'Selecciona un documento PDF o texto'}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf,.txt,.doc"
                                    onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                                    className="mt-3 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-950 dark:file:text-indigo-300 hover:file:bg-indigo-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'UPLOADING' || !selectedFile}
                                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status === 'UPLOADING' ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Indexando documento en Qdrant vía n8n...</span>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud size={16} />
                                        <span>Procesar e Indexar Documento</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {status === 'SUCCESS' && (
                            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                <span>Documento procesado e indexado con éxito.</span>
                            </div>
                        )}

                        {status === 'ERROR' && (
                            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                                <AlertCircle size={16} />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DocumentIngestionScreen;