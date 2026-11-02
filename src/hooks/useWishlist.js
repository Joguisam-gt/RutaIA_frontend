import { useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '../api/wishlistApi';

export const useWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modo de visualización: 'grid' (tarjetas en cuadrícula) | 'list' (filas horizontales)
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('added_at'); // 'added_at' | 'rating' | 'price_low' | 'price_high'

    // Notificación Toast de eliminación con capacidad de deshacer (Undo)
    const [undoToast, setUndoToast] = useState(null); // { item: courseObject, timerId }

    const fetchWishlist = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await wishlistApi.getWishlist({ sortBy });
            setWishlistItems(res.data || []);
        } catch (err) {
            setError(err.message || 'No se pudo cargar tu lista de cursos favoritos.');
        } finally {
            setLoading(false);
        }
    }, [sortBy]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    // Elimina un elemento con soporte para notificación Toast y Deshacer
    const removeItem = async (course) => {
        const originalItems = [...wishlistItems];
        setWishlistItems((prev) => prev.filter((item) => item.id !== course.id));

        // Si había un toast previo, limpiar el timeout anterior
        if (undoToast?.timerId) {
            clearTimeout(undoToast.timerId);
        }

        try {
            await wishlistApi.removeFromWishlist(course.id);

            const timerId = setTimeout(() => {
                setUndoToast(null);
            }, 5000);

            setUndoToast({
                item: course,
                timerId,
            });
        } catch (err) {
            setWishlistItems(originalItems);
        }
    };

    // Deshacer la eliminación reciente
    const undoRemove = async () => {
        if (!undoToast?.item) return;

        const restoredCourse = undoToast.item;
        if (undoToast.timerId) clearTimeout(undoToast.timerId);

        try {
            await wishlistApi.addToWishlist(restoredCourse.id);
            setWishlistItems((prev) => [restoredCourse, ...prev]);
        } catch (err) {
            // Manejo de error de restauración
        } finally {
            setUndoToast(null);
        }
    };

    // Vaciar toda la lista de deseos
    const clearAll = async () => {
        const originalItems = [...wishlistItems];
        setWishlistItems([]);
        try {
            await wishlistApi.clearWishlist();
            setUndoToast(null);
        } catch (err) {
            setWishlistItems(originalItems);
        }
    };

    return {
        wishlistItems,
        loading,
        error,
        viewMode,
        setViewMode,
        sortBy,
        setSortBy,
        undoToast,
        dismissToast: () => setUndoToast(null),
        removeItem,
        undoRemove,
        clearAll,
        refetch: fetchWishlist,
    };
};