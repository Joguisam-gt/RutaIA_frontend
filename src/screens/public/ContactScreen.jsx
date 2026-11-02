import React from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import { HeaderControls } from '../../components/common/HeaderControls';
import { ContactFaqRedirectWidget } from '../../components/domain/contact/ContactFaqRedirectWidget';
import { ContactFormView } from '../../components/domain/contact/ContactFormView';
import { DirectChannelsCard } from '../../components/domain/contact/DirectChannelsCard';

export const ContactScreen = () => {
    const {
        formData,
        attachments,
        quickFaqs,
        loading,
        status,
        feedbackMessage,
        errors,
        handleChange,
        handleAddFiles,
        handleRemoveFile,
        handleSubmit,
    } = useContactForm();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Contacto & Soporte
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container Layout 2 Columnas (Formulario 60% + Canales Directos 40%) */}
            <main className="container mx-auto px-4 py-10 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Columna Izquierda: Formulario (60% W) */}
                    <div className="w-full lg:w-3/5">
                        {/* Widget Desviador de FAQs Rápidas */}
                        <ContactFaqRedirectWidget quickFaqs={quickFaqs} />

                        {/* Formulario Dinámico */}
                        <ContactFormView
                            formData={formData}
                            attachments={attachments}
                            loading={loading}
                            status={status}
                            feedbackMessage={feedbackMessage}
                            errors={errors}
                            onChange={handleChange}
                            onAddFiles={handleAddFiles}
                            onRemoveFile={handleRemoveFile}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    {/* Columna Derecha: Canales Directos (40% W) */}
                    <div className="w-full lg:w-2/5">
                        <DirectChannelsCard />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactScreen;