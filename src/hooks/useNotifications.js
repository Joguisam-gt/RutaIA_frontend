import { useState, useEffect, useCallback } from 'react';
import { notificationApi } from '../api/notificationApi';

export const useNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 'notif-1',
            title: 'Nuevo recurso publicado',
            message: 'El instructor ha subido la plantilla de arquitectura en el modulo 2.',
            createdAt: 'Hace 10 min',
            isRead: false,
            type: 'course',
        },
        {
            id: 'notif-2',
            title: 'Respuesta en el foro Q&A',
            message: 'Tu pregunta sobre los middlewares de error ha sido respondida.',
            createdAt: 'Hace 2 horas',
            isRead: false,
            type: 'qa',
        },
    ]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const data = await notificationApi.getNotifications();
            if (data && data.length > 0) {
                setNotifications(data);
            }
        } catch (err) {
            // Mantiene fallback
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const markAsRead = async (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        try {
            await notificationApi.markAsRead(id);
        } catch (err) {
            // Silencioso
        }
    };

    const markAllAsRead = async () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        try {
            await notificationApi.markAllAsRead();
        } catch (err) {
            // Silencioso
        }
    };

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return {
        notifications,
        loading,
        unreadCount,
        markAsRead,
        markAllAsRead,
        refetch: fetchNotifications,
    };
};