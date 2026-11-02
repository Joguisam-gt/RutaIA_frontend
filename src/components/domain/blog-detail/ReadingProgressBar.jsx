import React from 'react';

export const ReadingProgressBar = ({ progress = 0 }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </div>
    );
};