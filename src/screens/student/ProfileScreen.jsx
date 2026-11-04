import React from 'react';
import { useProfileSettings } from '../../hooks/useProfileSettings';
import { Sidebar } from '../../components/layout/Sidebar/Sidebar';
import { ProfileHeader } from '../../components/domain/profile/ProfileHeader';
import { PublicProfileTab } from '../../components/domain/profile/PublicProfileTab';
import { SecurityTab } from '../../components/domain/profile/SecurityTab';
import { NotificationsTab } from '../../components/domain/profile/NotificationsTab';
import { BillingTab } from '../../components/domain/profile/BillingTab';
import { PreferenceTab } from '../../components/domain/profile/PreferenceTab';
import { AvatarCropModal } from '../../components/domain/profile/AvatarCropModal';
import { ThemeToggle } from '../../components/common/themetoggle.jsx';
import { User, Loader2 } from 'lucide-react';

export const ProfileScreen = () => {
    const {
        user,
        activeTab,
        setActiveTab,
        isAvatarModalOpen,
        setIsAvatarModalOpen,
        handleSaveProfile,
        handlePasswordChange,
        handleAvatarChange,
        loading,
    } = useProfileSettings();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <div className="flex">
                <Sidebar role="student" currentRoute="/app/perfil" />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                                <User size={24} className="text-indigo-600" />
                                <span>Configuración de Perfil</span>
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Gestiona tu información personal, seguridad, notificaciones y preferencias.
                            </p>
                        </div>
                        <ThemeToggle />
                    </div>
                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400">
                            <Loader2 size={28} className="animate-spin text-indigo-600 mb-2" />
                            <span className="text-xs font-semibold">Cargando perfil...</span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <ProfileHeader
                                user={user}
                                onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
                            />
                            <div className="border-b border-slate-200 dark:border-slate-800 flex gap-4 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('public')}
                                    className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'public'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Perfil Público
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('security')}
                                    className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'security'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Seguridad
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('notifications')}
                                    className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'notifications'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Notificaciones
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('billing')}
                                    className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'billing'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Facturación
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('preferences')}
                                    className={`pb-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === 'preferences'
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Preferencias
                                </button>
                            </div>
                            <div className="mt-6">
                                {activeTab === 'public' && (
                                    <PublicProfileTab user={user} onSave={handleSaveProfile} />
                                )}
                                {activeTab === 'security' && (
                                    <SecurityTab onPasswordChange={handlePasswordChange} />
                                )}
                                {activeTab === 'notifications' && <NotificationsTab />}
                                {activeTab === 'billing' && <BillingTab />}
                                {activeTab === 'preferences' && <PreferenceTab />}
                            </div>
                            <AvatarCropModal
                                isOpen={isAvatarModalOpen}
                                onClose={() => setIsAvatarModalOpen(false)}
                                onSave={handleAvatarChange}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProfileScreen;