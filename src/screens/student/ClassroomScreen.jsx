import React from 'react';
import { useClassroom } from '../../hooks/useClassroom';
import { ClassroomFocusNavbar } from '../../components/domain/classroom/ClassroomFocusNavbar';
import { CustomVideoPlayer } from '../../components/domain/classroom/CustomVideoPlayer';
import { CurriculumSidebar } from '../../components/domain/classroom/CurriculumSidebar';
import { LessonResourcesTab } from '../../components/domain/classroom/LessonResourcesTab';
import { LessonForumTab } from '../../components/domain/classroom/LessonForumTab';
import { Loader2, FileText, MessageSquare } from 'lucide-react';

export const ClassroomScreen = ({ courseSlug = 'backend-nodejs-express', lessonSlug = 'middlewares-avanzados' }) => {
    const {
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
    } = useClassroom(courseSlug, lessonSlug);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <Loader2 size={36} className="text-indigo-500 animate-spin mb-3" />
                <span className="text-xs font-medium">Cargando el Aula Virtual...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Navbar de Enfoque */}
            <ClassroomFocusNavbar
                courseTitle={data?.courseTitle}
                lessonTitle={data?.lessonTitle}
                globalProgress={data?.globalProgress || 65}
                completedLessons={data?.completedLessons || 14}
                totalLessons={data?.totalLessons || 24}
            />

            {/* Main Grid: Reproductor HTML5 + Sidebar Lateral Temario */}
            <main className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {/* Reproductor de Video Custom (70% W en escritorio) */}
                    <div className="w-full lg:w-7/10">
                        <CustomVideoPlayer
                            videoRef={videoRef}
                            src={data?.videoUrl}
                            isPlaying={isPlaying}
                            currentTime={currentTime}
                            duration={duration}
                            playbackSpeed={playbackSpeed}
                            volume={volume}
                            isMuted={isMuted}
                            showSubtitles={showSubtitles}
                            autoplayNext={autoplayNext}
                            onTogglePlay={togglePlay}
                            onSeek={handleSeek}
                            onSpeedChange={handleSpeedChange}
                            onToggleMute={handleToggleMute}
                            onVolumeChange={handleVolumeChange}
                            onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
                            onToggleAutoplay={() => setAutoplayNext(!autoplayNext)}
                            onNextLesson={() => window.location.href = `/app/aprender/${courseSlug}/siguiente`}
                            onTimeUpdate={setCurrentTime}
                            onLoadedMetadata={setDuration}
                        />
                    </div>

                    {/* Sidebar Lateral de Índice de Módulos (30% W en escritorio) */}
                    <div className="w-full lg:w-3/10">
                        <CurriculumSidebar
                            modules={data?.modules}
                            currentLessonSlug={lessonSlug}
                            courseSlug={courseSlug}
                            onSelectLesson={(slug) => window.location.href = `/app/aprender/${courseSlug}/${slug}`}
                        />
                    </div>
                </div>

                {/* Pestañas Inferiores: Descripción/Recursos y Foro Q&A */}
                <div className="w-full lg:w-7/10 bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                        <button
                            onClick={() => setActiveBottomTab('resources')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeBottomTab === 'resources'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white bg-slate-900'
                                }`}
                        >
                            <FileText size={16} />
                            <span>Descripción y Recursos</span>
                        </button>

                        <button
                            onClick={() => setActiveBottomTab('forum')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeBottomTab === 'forum'
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white bg-slate-900'
                                }`}
                        >
                            <MessageSquare size={16} />
                            <span>Foro Q&A de la Lección</span>
                        </button>
                    </div>

                    {/* Contenido Dinámico de la Pestaña Activa */}
                    {activeBottomTab === 'resources' ? (
                        <LessonResourcesTab resources={data?.resources} />
                    ) : (
                        <LessonForumTab
                            questions={forumQuestions}
                            searchValue={forumSearch}
                            onSearchChange={setForumSearch}
                            isSubmitting={isSubmittingQuestion}
                            onSubmitQuestion={handlePostQuestion}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default ClassroomScreen;