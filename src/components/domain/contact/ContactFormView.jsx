import React from 'react';
import { useContactForm } from '../../../hooks/useContactForm';
import Input from '../../common/Input/Input';

export const ContactFormView = () => {
    const contactForm = useContactForm() || {};
    const {
        formData = { name: '', email: '', subject: '', message: '' },
        errors = {},
        isSubmitting = false,
        handleChange = () => { },
        handleSubmit = (e) => e.preventDefault(),
    } = contactForm;

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800"
        >
            <Input
                label="Nombre completo"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                error={errors?.name}
            />

            <Input
                label="Correo electrónico"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                error={errors?.email}
            />

            <Input
                label="Asunto"
                name="subject"
                value={formData.subject || ''}
                onChange={handleChange}
                placeholder="Motivo de tu mensaje"
                error={errors?.subject}
            />

            <div className="w-full flex flex-col space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mensaje
                </label>
                <textarea
                    name="message"
                    rows={4}
                    value={formData.message || ''}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full px-3.5 py-2 text-sm rounded-md border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {errors?.message && (
                    <span className="text-xs text-red-500">{errors.message}</span>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md transition-colors"
            >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
        </form>
    );
};

export default ContactFormView;