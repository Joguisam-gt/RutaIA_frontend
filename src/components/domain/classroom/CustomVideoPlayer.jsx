import React, { useState, useRef } from 'react';
import {
    Play, Pause, Volume2, VolumeX, Maximize, Subtitles, Settings, SkipForward, RotateCcw
} from 'lucide-react';

export const CustomVideoPlayer = ({
    videoRef,
    src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    showSubtitles,
    autoplayNext,
    onTogglePlay,
    onSeek,
    onSpeedChange,
    onToggleMute,
    onVolumeChange,
    onToggleSubtitles,
    onToggleAutoplay,
    onNextLesson,
    onTimeUpdate,
    onLoadedMetadata,
}) => {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [hoverTime, setHoverTime] = useState(null);
    const [hoverPosition, setHoverPosition] = useState(0);
    const progressBarRef = useRef(null);

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleProgressBarMouseMove = (e) => {
        if (!progressBarRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setHoverPosition(e.clientX - rect.left);
        setHoverTime(pos * duration);
    };

    const handleProgressBarClick = (e) => {
        if (!progressBarRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        onSeek(pos * duration);
    };

    const toggleFullscreen = () => {
        const container = document.getElementById('video-player-container');
        if (container) {
            if (!document.fullscreenElement) {
                container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div
            id="video-player-container"
            className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden group shadow-2xl border border-slate-800"
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain cursor-pointer"
                onClick={onTogglePlay}
                onTimeUpdate={(e) => onTimeUpdate(e.target.currentTime)}
                onLoadedMetadata={(e) => onLoadedMetadata(e.target.duration)}
            />

            {/* Marca de Agua de Resolución 1080p HD */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-cyan-400 border border-cyan-500/30">
                    FULL HD 1080p
                </span>
            </div>

            {/* Overlay de Controles al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
                {/* Play/Pause Central Overlay */}
                <div className="flex items-center justify-center my-auto">
                    <button
                        onClick={onTogglePlay}
                        className="w-14 h-14 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center backdrop-blur-md transition-transform transform hover:scale-110 shadow-lg shadow-indigo-600/40"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1 fill-white" />}
                    </button>
                </div>

                {/* Barra Inferior de Controles */}
                <div className="space-y-3">
                    {/* Seekbar con Tooltip Preview de Tiempo */}
                    <div
                        ref={progressBarRef}
                        onClick={handleProgressBarClick}
                        onMouseMove={handleProgressBarMouseMove}
                        onMouseLeave={() => setHoverTime(null)}
                        className="relative w-full h-2 bg-slate-800/80 rounded-full cursor-pointer group/bar flex items-center"
                    >
                        {/* Tooltip Hover Preview */}
                        {hoverTime !== null && (
                            <div
                                className="absolute bottom-4 -translate-x-1/2 px-2 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold border border-slate-700 pointer-events-none shadow-md"
                                style={{ left: `${hoverPosition}px` }}
                            >
                                {formatTime(hoverTime)}
                            </div>
                        )}

                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full relative"
                            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform" />
                        </div>
                    </div>

                    {/* Botones de Control Inferiores */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <div className="flex items-center gap-3">
                            <button onClick={onTogglePlay} className="hover:text-cyan-400 transition-colors">
                                {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
                            </button>

                            <button onClick={onNextLesson} className="hover:text-cyan-400 transition-colors" title="Siguiente Lección">
                                <SkipForward size={18} />
                            </button>

                            {/* Volumen */}
                            <div className="flex items-center gap-1.5 group/vol">
                                <button onClick={onToggleMute} className="hover:text-cyan-400 transition-colors">
                                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={isMuted ? 0 : volume}
                                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                                    className="w-16 h-1 bg-slate-700 accent-indigo-500 rounded-lg cursor-pointer opacity-80 group-hover/vol:opacity-100"
                                />
                            </div>

                            {/* Tiempo transcurrido / Total */}
                            <span className="text-[11px] font-mono text-slate-300">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 relative">
                            {/* Toggle Subtítulos (CC) */}
                            <button
                                onClick={onToggleSubtitles}
                                className={`p-1 rounded-md transition-colors ${showSubtitles ? 'text-indigo-400 bg-indigo-500/20 font-bold' : 'hover:text-cyan-400'
                                    }`}
                                title="Subtítulos (CC)"
                            >
                                <Subtitles size={18} />
                            </button>

                            {/* Velocidad de Reproducción (0.75x a 2x) */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                                    className="px-2 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-[11px] font-bold border border-slate-700/60"
                                >
                                    {playbackSpeed}x
                                </button>

                                {showSettingsMenu && (
                                    <div className="absolute bottom-full right-0 mb-2 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-1 z-30">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5 py-1 border-b border-slate-800">
                                            Velocidad
                                        </span>
                                        {[0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                                            <button
                                                key={speed}
                                                onClick={() => {
                                                    onSpeedChange(speed);
                                                    setShowSettingsMenu(false);
                                                }}
                                                className={`w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${playbackSpeed === speed ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                                                    }`}
                                            >
                                                {speed}x {speed === 1 && '(Normal)'}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Fullscreen */}
                            <button onClick={toggleFullscreen} className="hover:text-cyan-400 transition-colors">
                                <Maximize size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;