import { useState, useEffect, useCallback } from 'react';
import { wishlistApi } from '../api/wishlistApi';
import { useNotification } from '../context/NotificationContext';

export const useWishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showSuccess, showError, showToast } = useNotification();

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const data = await wishlistApi.getWishlist();
      setItems(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar la lista de deseos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (course) => {
    try {
      await wishlistApi.add(course.id);
      setItems((prev) => [...prev, course]);
      showSuccess(`"${course.title}" fue agregado a tus favoritos.`);
    } catch (err) {
      showError('No se pudo agregar el curso a la lista de deseos.');
    }
  };

  const removeFromWishlist = async (courseId) => {
    const itemToRemove = items.find((item) => item.id === courseId);
    setItems((prev) => prev.filter((item) => item.id !== courseId));

    try {
      await wishlistApi.remove(courseId);

      showToast({
        message: 'Curso eliminado de la lista de deseos.',
        type: 'info',
        undoAction: async () => {
          if (itemToRemove) {
            await wishlistApi.add(courseId);
            setItems((prev) => [...prev, itemToRemove]);
            showSuccess('Se restauro el curso en tu lista.');
          }
        },
      });
    } catch (err) {
      if (itemToRemove) {
        setItems((prev) => [...prev, itemToRemove]);
      }
      showError('No se pudo eliminar el curso.');
    }
  };

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    refetch: fetchWishlist,
  };
};
