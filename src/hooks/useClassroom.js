import { useState, useEffect, useCallback, useRef } from 'react';
import { classroomApi } from '../api/classroomApi';

export const useClassroom = (courseSlug = 'backend-nodejs-express', lessonSlug = 'middlewares-avanzados') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados del Reproductor HTML5
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [autoplayNext, setAutoplayNext] = useState(true);

    // Navegación en Pestañas Inferiores ('resources' | 'forum')
    const [activeBottomTab, setActiveBottomTab] = useState('resources');

    // Estado Foro Q&A
    const [forumQuestions, setForumQuestions] = useState([]);
    const [forumSearch, setForumSearch] = useState('');
    const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);

    // Carga inicial de datos de lección y plan de estudios
    const fetchLessonData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await classroomApi.getLessonDetails(courseSlug, lessonSlug);
            setData(result);
        } catch (err) {
            setError(err.message || 'No se pudo cargar el contenido de la lección.');
        } finally {
            setLoading(false);
        }
    }, [courseSlug, lessonSlug]);

    useEffect(() => {
        fetchLessonData();
    }, [fetchLessonData]);

    // Cargar preguntas del foro Q&A
    const fetchQuestions = useCallback(async () => {
        try {
            const list = await classroomApi.getForumQuestions(lessonSlug, forumSearch);
            setForumQuestions(list);
        } catch (err) {
            // Manejo silencioso en el foro
        }
    }, [lessonSlug, forumSearch]);

    useEffect(() => {
        if (activeBottomTab === 'forum') {
            fetchQuestions();
        }
    }, [activeBottomTab, fetchQuestions]);

    // Manejo de controles del reproductor
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSpeedChange = (speed) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };

    const handleSeek = (newTime) => {
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleToggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const handlePostQuestion = async (title, body) => {
        try {
            setIsSubmittingQuestion(true);
            await classroomApi.createQuestion(lessonSlug, { title, body });
            fetchQuestions();
        } catch (err) {
            // Manejo de errores
        } font - bold {
            setIsSubmittingQuestion(false);
        }
    };

    return {
        data,
        loading,
        error,
        videoRef,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        showSubtitles,
        autoplayNext,
        activeBottomTab,
        forumQuestions,
        forumSearch,
        isSubmittingQuestion,
        setCurrentTime,
        setDuration,
        setIsPlaying,
        setAutoplayNext,
        setShowSubtitles,
        setActiveBottomTab,
        setForumSearch,
        togglePlay,
        handleSpeedChange,
        handleSeek,
        handleToggleMute,
        handleVolumeChange,
        handlePostQuestion,
    };
};