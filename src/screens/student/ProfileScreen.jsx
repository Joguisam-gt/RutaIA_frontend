// src/screens/student/ProfileScreen.jsx
import React from 'react';
import { useProfileSettings } from '../../hooks/useProfileSettings';
import { HeaderControls } from '../../components/common/HeaderControls';
import { ProfileHeader } from '../../components/domain/profile/ProfileHeader';
import { PublicProfileTab } from '../../components/domain/profile/PublicProfileTab';
import { SecurityTab } from '../../components/domain/profile/SecurityTab';
import { NotificationsTab } from '../../components/domain/profile/NotificationsTab';
import { BillingTab } from '../../components/domain/profile/BillingTab';
import { PreferencesTab } from '../../components/domain/profile/PreferencesTab';
import { AvatarCropModal } from '../../components/domain/profile/AvatarCropModal';
import { User, Shield, Bell, CreditCard, Settings, Loader2, CheckCircle2 } from 'lucide-react';

export const ProfileScreen = () => {
    const {
        activeTab,
        setActiveTab,
        loading,
        saving,
        toastMessage,
        userProfile,
        setUserProfile,
        isAvatarModalOpen,
        setIsAvatarModalOpen,
        tempAvatarFile,
        setTempAvatarFile,
        cropZoom,
        setCropZoom,
        securityData,
        setSecurityData,
        activeSessions,
        notificationsMatrix,
        setNotificationsMatrix,
        preferences,
        setPreferences,
        billingData,
        handleSavePublicProfile,
        handleSaveCroppedAvatar,
        handleRevokeSession,
        showToast,
    } = useProfileSettings();

    const tabs = [
        { id: 'public', label: 'Perfil Público', icon: User },
        { id: 'security', label: 'Cuenta & Seguridad', icon: Shield },
        { id: 'notifications', label: 'Notificaciones', icon: Bell },
        { id: 'billing', label: 'Facturación', icon: CreditCard },
        { id: 'preferences', label: 'Preferencias', icon: Settings },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando la configuración de tu cuenta...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
            {/* Toast Notificación flotante */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
                    <CheckCircle2 size={18} />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header Fijo */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <a href="/app/dashboard" className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        RutaIA — Mi Perfil & Configuración
                    </a>
                    <HeaderControls />
                </div>
            </header>

            {/* Main Container */}
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Profile Header (Avatar Uploader + Rol + Titular) */}
                <ProfileHeader
                    userProfile={userProfile}
                    onSelectAvatarFile={(file) => {
                        setTempAvatarFile(file);
                        setIsAvatarModalOpen(true);
                    }}
                />

                {/* Pestañas de Configuración */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-8">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        const isActive = activeTab === t.id;

                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all ${isActive
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                                    }`}
                            >
                                <Icon size={16} className={isActive ? 'text-white' : 'text-indigo-500'} />
                                <span>{t.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Renderizado Dinámico de Pestaña Activa */}
                <div className="space-y-6">
                    {activeTab === 'public' && (
                        <PublicProfileTab
                            userProfile={userProfile}
                            onChange={(field, val) => setUserProfile((prev) => ({ ...prev, [field]: val }))}
                            onSave={handleSavePublicProfile}
                            saving={saving}
                        />
                    )}

                    {activeTab === 'security' && (
                        <SecurityTab
                            securityData={securityData}
                            onChange={(field, val) => setSecurityData((prev) => ({ ...prev, [field]: val }))}
                            onToggle2FA={(val) => {
                                setSecurityData((prev) => ({ ...prev, twoFactorEnabled: val }));
                                showToast(val ? '2FA activado' : '2FA desactivado');
                            }}
                            activeSessions={activeSessions}
                            onRevokeSession={handleRevokeSession}
                            onSave={() => showToast('Credenciales actualizadas')}
                            saving={saving}
                        />
                    )}

                    {activeTab === 'notifications' && (
                        <NotificationsTab
                            matrix={notificationsMatrix}
                            onChange={(key, channel, val) => {
                                setNotificationsMatrix((prev) => ({
                                    ...prev,
                                    [key]: { ...prev[key], [channel]: val },
                                }));
                            }}
                            onSave={() => showToast('Preferencias de notificación guardadas')}
                        />
                    )}

                    {activeTab === 'billing' && (
                        <BillingTab billingData={billingData} />
                    )}

                    {activeTab === 'preferences' && (
                        <PreferencesTab
                            preferences={preferences}
                            onChange={(field, val) => setPreferences((prev) => ({ ...prev, [field]: val }))}
                            onSave={() => showToast('Preferencias guardadas')}
                        />
                    )}
                </div>
            </main>

            {/* Modal Recortador de Avatar */}
            <AvatarCropModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                tempFile={tempAvatarFile}
                zoom={cropZoom}
                onZoomChange={setCropZoom}
                onSave={handleSaveCroppedAvatar}
                saving={saving}
            />
        </div>
    );
};

export default ProfileScreen;