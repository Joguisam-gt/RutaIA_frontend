import { useState } from 'react';

export const useClassroom = (courseId) => {
    const [currentLesson, setCurrentLesson] = useState({
        id: 'lesson-1',
        title: '1. Introducción al ecosistema y arquitectura',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        duration: '12:45',
        moduleTitle: 'Módulo 1: Fundamentos Básicos',
    });

    const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'forum' | 'notes'
    const [completedLessons, setCompletedLessons] = useState(['lesson-1']);
    const [notes, setNotes] = useState('');
    const [forumPosts, setForumPosts] = useState([
        {
            id: 'post-1',
            author: 'Carlos Gómez',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
            date: 'Hace 2 días',
            comment: '¿Cuál es la diferencia principal entre Renderizado en Servidor (SSR) y Estático (SSG)?',
            repliesCount: 3,
        },
    ]);

    const toggleLessonCompletion = (lessonId) => {
        setCompletedLessons((prev) =>
            prev.includes(lessonId)
                ? prev.filter((id) => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    const handleAddForumPost = (commentText) => {
        if (!commentText.trim()) return;

        const newPost = {
            id: `post-${Date.now()}`,
            author: 'Estudiante',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            date: 'Ahora mismo',
            comment: commentText,
            repliesCount: 0,
        };

        setForumPosts((prev) => [newPost, ...prev]);
    };

    const handleSaveNotes = (newNoteText) => {
        setNotes(newNoteText);
    };

    return {
        currentLesson,
        setCurrentLesson,
        activeTab,
        setActiveTab,
        completedLessons,
        toggleLessonCompletion,
        notes,
        handleSaveNotes,
        forumPosts,
        handleAddForumPost,
    };
};

export default useClassroom;