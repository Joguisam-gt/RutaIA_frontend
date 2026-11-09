import React from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { ContactFaqRedirectWidget } from '../../components/domain/contact/ContactFaqRedirectWidget';
import { ContactFormView } from '../../components/domain/contact/ContactFormView';
import { DirectChannelsCard } from '../../components/domain/contact/DirectChannelsCard';
import { MessageSquare } from 'lucide-react';

export const ContactScreen = () => {
    const {
        formData,
        handleChange,
        handleSubmit,
        isSubmitting,
        isSuccess,
    } = useContactForm();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <Navbar brandTitle="RutaIA" />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-10">
                    <MessageSquare size={40} className="mx-auto text-indigo-600 mb-3" />
                    <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">
                        Contacto y Soporte
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Estamos para ayudarte. Ponte en contacto con nuestro equipo de soporte.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ContactFormView
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isSuccess={isSuccess}
                        />
                    </div>
                    <div className="space-y-6">
                        <DirectChannelsCard />
                        <ContactFaqRedirectWidget />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactScreen;