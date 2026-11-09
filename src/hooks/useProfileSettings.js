import { useState, useEffect, useCallback } from 'react';
import { profileApi } from '../api/profileApi';

export const useProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('public'); // 'public' | 'security' | 'notifications' | 'billing' | 'preferences'
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // Perfil General & Header
    const [userProfile, setUserProfile] = useState({
        name: 'José Guillermo Rodríguez Samcam',
        headline: 'Full-Stack Software Developer & API Architect',
        role: 'student', // 'student' | 'instructor' | 'admin'
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
        bio: 'Desarrollador enfocado en arquitectura de microservicios con Node.js, Express y bases de datos vectoriales RAG.',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        twitterUrl: 'https://twitter.com',
        isPublic: true,
    });

    // Modal de Recorte de Avatar
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [tempAvatarFile, setTempAvatarFile] = useState(null);
    const [cropZoom, setCropZoom] = useState(1);

    // Seguridad
    const [securityData, setSecurityData] = useState({
        email: 'jose.rodriguez@ejemplo.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
    });

    const [activeSessions, setActiveSessions] = useState([
        { id: 'sess-1', device: 'Mac mini (macOS Sequoia)', browser: 'Chrome 128.0', ip: '190.148.42.10', location: 'Ciudad de Guatemala, GT', current: true },
        { id: 'sess-2', device: 'iPhone 15 Pro', browser: 'Safari Mobile', ip: '190.148.42.12', location: 'Ciudad de Guatemala, GT', current: false },
    ]);

    // Matriz de Notificaciones (Email vs In-App)
    const [notificationsMatrix, setNotificationsMatrix] = useState({
        courseUpdates: { email: true, inApp: true },
        forumAnswers: { email: true, inApp: true },
        newsletters: { email: false, inApp: false },
        securityAlerts: { email: true, inApp: true },
    });

    // Preferencias
    const [preferences, setPreferences] = useState({
        language: 'es', // 'es' | 'en'
        theme: 'system', // 'dark' | 'light' | 'system'
    });

    // Facturación
    const [billingData, setBillingData] = useState({
        activePlan: { name: 'Plan Pro Anual', price: '$19.00 USD / mes', status: 'active', nextBilling: '28 Oct, 2027' },
        savedCards: [
            { id: 'card-1', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2028, isDefault: true },
        ],
        invoices: [
            { id: 'inv-2026-001', date: '28 Oct, 2026', amount: '$228.00 USD', pdfUrl: '#', status: 'Pagada' },
            { id: 'inv-2025-001', date: '28 Oct, 2025', amount: '$228.00 USD', pdfUrl: '#', status: 'Pagada' },
        ],
    });

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await profileApi.getProfile();
            if (res) {
                setUserProfile((prev) => ({ ...prev, ...res.publicProfile }));
                setSecurityData((prev) => ({ ...prev, email: res.email, twoFactorEnabled: res.twoFactorEnabled }));
                if (res.notifications) setNotificationsMatrix(res.notifications);
                if (res.preferences) setPreferences(res.preferences);
            }
        } catch (err) {
            // Usar datos iniciales si falla
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Guardar Perfil Público
    const handleSavePublicProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await profileApi.updatePublicProfile(userProfile);
            showToast('Perfil público actualizado con éxito.');
        } catch (err) {
            setError('Error al guardar el perfil público.');
        } finally {
            setSaving(false);
        }
    };

    // Guardar Avatar Recortado
    const handleSaveCroppedAvatar = async () => {
        try {
            setSaving(true);
            const formData = new FormData();
            formData.append('avatar', tempAvatarFile);
            await profileApi.uploadAvatar(formData);
            setUserProfile((prev) => ({ ...prev, avatar: URL.createObjectURL(tempAvatarFile) }));
            setIsAvatarModalOpen(false);
            showToast('Imagen de perfil actualizada.');
        } catch (err) {
            // Fallback local
            if (tempAvatarFile) {
                setUserProfile((prev) => ({ ...prev, avatar: URL.createObjectURL(tempAvatarFile) }));
                setIsAvatarModalOpen(false);
                showToast('Imagen de perfil cargada localmente.');
            }
        } finally {
            setSaving(false);
        }
    };

    // Revocar Sesión Activa
    const handleRevokeSession = async (sessionId) => {
        try {
            await profileApi.revokeSession(sessionId);
            setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
            showToast('Sesión revocada correctamente.');
        } catch (err) {
            setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
        }
    };

    return {
        activeTab,
        setActiveTab,
        loading,
        saving,
        error,
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
    };
};