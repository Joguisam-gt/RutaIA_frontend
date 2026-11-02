import { useState, useEffect, useCallback } from 'react';
import { ratingApi } from '../api/ratingApi';

export const useRatings = (courseId) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchMyRating = useCallback(async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            const data = await ratingApi.getMyRating(courseId);
            if (data) {
                setRating(data.rating || 5);
                setComment(data.comment || '');
            }
        } catch (err) {
            // Sin valoracion previa
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchMyRating();
    }, [fetchMyRating]);

    const submitRating = async () => {
        if (!courseId || rating < 1) return;
        try {
            setSubmitting(true);
            setError(null);
            await ratingApi.submitRating(courseId, rating, comment);
            setIsSuccess(true);
        } catch (err) {
            setError(err.message || 'No se pudo enviar la valoracion.');
        } finally {
            setSubmitting(false);
        }
    };

    return {
        rating,
        setRating,
        comment,
        setComment,
        loading,
        submitting,
        error,
        isSuccess,
        submitRating,
    };
};