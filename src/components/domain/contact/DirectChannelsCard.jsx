import React from 'react';
import { MessageSquare, Mail, Globe, Github, Twitter, Linkedin } from 'lucide-react';

export const DirectChannelsCard = () => {
    const channels = [
        {
            icon: MessageSquare,
            title: 'Comunidad en Discord',
            detail: 'Únete a más de 5,000 estudiantes e instructores.',
            linkText: 'Entrar al servidor',
            href: '#',
        },
        {
            icon: Mail,
            title: 'Soporte Directo',
            detail: 'Respuesta promedio en menos de 24 horas.',
            linkText: 'soporte@rutaia.com',
            href: 'mailto:soporte@rutaia.com',
        },
        {
            icon: Globe,
            title: 'Oficina Central',
            detail: 'Ciudad de Guatemala, Guatemala.',
            linkText: 'Ver en mapas',
            href: '#',
        },
    ];

    const socials = [
        { icon: Github, label: 'GitHub', href: '#' },
        { icon: Twitter, label: 'Twitter', href: '#' },
        { icon: Linkedin, label: 'LinkedIn', href: '#' },
    ];

    return (
        <div className="w-full space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Canales Directos
                </h3>
                <div className="space-y-4">
                    {channels.map((channel, index) => {
                        const IconComponent = channel.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start space-x-3 p-3 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                            >
                                <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                                        {channel.title}
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                        {channel.detail}
                                    </p>
                                    <a
                                        href={channel.href}
                                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {channel.linkText}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Comunidad & Redes
                </h3>
                <div className="flex items-center space-x-3">
                    {socials.map((social, index) => {
                        const SocialIcon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                className="p-2.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <SocialIcon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DirectChannelsCard;