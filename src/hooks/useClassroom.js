// src/hooks/useClassroom.js
import { useState, useEffect } from 'react';
import { courseApi } from '../api/courseApi';

export const useClassroom = (courseId, lessonSlug) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassroom = async () => {
            setLoading(true);
            try {
                let title = 'Curso de RutaIA';
                if (courseId) {
                    const res = await courseApi.getCourseById(courseId);
                    title = res?.data?.title || res?.title || title;
                }
                setData({
                    courseTitle: title,
                    lessonTitle: lessonSlug ? `Lección: ${lessonSlug}` : 'Introducción y Conceptos Clave',
                    globalProgress: 40,
                    completedLessons: 4,
                    totalLessons: 10,
                    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                    modules: [
                        { title: 'Módulo 1: Fundamentos', lessons: [{ title: 'Introducción', slug: 'inicio' }] }
                    ]
                });
            } catch {
                setData({ courseTitle: 'Curso', lessonTitle: 'Lección', globalProgress: 0 });
            } finally {
                setLoading(false);
            }
        };
        fetchClassroom();
    }, [courseId, lessonSlug]);

    return { data, loading, activeBottomTab: 'resources', setActiveBottomTab: () => {} };
};