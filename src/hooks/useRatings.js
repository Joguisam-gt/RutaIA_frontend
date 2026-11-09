// src/hooks/useRatings.js
import { useState, useEffect, useCallback } from 'react';
import { ratingApi } from '../api/ratingApi';

export const useRatings = (targetId) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const fetchMyRating = useCallback(async () => {
        if (!targetId) return;
        try {
            setLoading(true);
            const data = await ratingApi.getMyRating(targetId);
            if (data) {
                setRating(data.score || data.rating || 5);
                setComment(data.comment || '');
            }
        } catch (err) {
            // Silencioso si no hay valoracion previa
        } finally {
            setLoading(false);
        }
    }, [targetId]);

    useEffect(() => {
        fetchMyRating();
    }, [fetchMyRating]);

    const submitRating = async () => {
        if (!targetId || rating < 1 || rating > 5) {
            setError('La calificacion debe ser un valor entre 1 y 5.');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            // Se envia tanto recommendationId como courseId para cumplir con RF 17
            await ratingApi.submitRating({
                recommendationId: targetId,
                courseId: targetId,
                score: Number(rating),
                comment: comment.trim() || null
            });

            setIsSuccess(true);
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'No se pudo enviar la calificacion.';
            setError(message);
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
        submitRating
    };
};

export default useRatings;