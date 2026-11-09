// src/hooks/useWishlist.js
import { useState, useEffect } from 'react';
import { studentApi } from '../api/studentApi';

export const useWishlist = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                setLoading(true);
                const res = await studentApi.getWishlist();
                const data = res.data || res;
                setItems(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('No se pudo cargar la lista de deseos.');
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    const removeFromWishlist = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return { items, loading, error, removeFromWishlist };
};