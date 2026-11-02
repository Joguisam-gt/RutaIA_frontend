import { useState, useEffect, useCallback } from 'react';
import { courseDetailApi } from '../api/courseDetailApi';

export const useCourseDetail = (courseSlug) => {
    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lección activa para vista previa en modal/player
    const [previewLesson, setPreviewLesson] = useState(null);

    const fetchCourseData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const courseData = await courseDetailApi.getCourseDetail(courseSlug);
            setCourse(courseData);

            // Cargar reseñas y recomendados en paralelo
            if (courseData?.id || courseData?._id) {
                const courseId = courseData.id || courseData._id;
                const [reviewsRes, recommendedData] = await Promise.all([
                    courseDetailApi.getCourseReviews(courseId),
                    courseDetailApi.getRecommendedCourses(courseData.category, courseId),
                ]);
                setReviews(reviewsRes.data || []);
                setRecommended(recommendedData || []);
            }
        } catch (err) {
            setError(err.message || 'No se pudo cargar la información del curso.');
        } finally {
            setLoading(false);
        }
    }, [courseSlug]);

    useEffect(() => {
        fetchCourseData();
    }, [fetchCourseData]);

    return {
        course,
        reviews,
        recommended,
        loading,
        error,
        previewLesson,
        setPreviewLesson,
    };
};