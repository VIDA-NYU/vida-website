"use client";

import { useState, useRef, useEffect } from "react";

type Video = {
  id: string;
  title: string;
  description: string;
};

const VIDEOS: Video[] = [
  {
    id: "5Zg-C8AAIGg",
    title: "The Beauty of Data Visualization",
    description: "David McCandless on turning data into art",
  },
  {
    id: "jbkSRLYSojo",
    title: "200 Countries, 200 Years",
    description: "Hans Rosling's legendary data storytelling",
  },
  {
    id: "hVimVzgtD6w",
    title: "The Best Stats You've Ever Seen",
    description: "Hans Rosling challenges preconceptions with data",
  },
  {
    id: "aircAruvnKk",
    title: "What is a Neural Network?",
    description: "3Blue1Brown explains deep learning visually",
  },
  {
    id: "N00g9Q9stBo",
    title: "A Brief History of Data Visualization",
    description: "How we learned to see data",
  },
  {
    id: "fSgEeI2Xpdc",
    title: "How Humans See Data",
    description: "John Rauser on perception and visualization",
  },
  {
    id: "ll5LY7wI_Xc",
    title: "Can AI Catch What Doctors Miss?",
    description: "Eric Topol on AI in healthcare",
  },
];

export function VideoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const VIDEO_DURATION = 12000; // 12 seconds per video

  useEffect(() => {
    if (isPlaying) {
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / VIDEO_DURATION) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= VIDEO_DURATION) {
          setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
          setProgress(0);
        }
      }, 50);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  const handleVideoSelect = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
    setProgress(0);
  };

  const currentVideo = VIDEOS[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      {/* Video Player */}
      <div className="relative aspect-[21/9] w-full">
        <iframe
          key={currentVideo.id}
          src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${currentVideo.id}&modestbranding=1&start=0&end=15`}
          title={currentVideo.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
        
        {/* Navigation arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Current video info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white drop-shadow-lg sm:text-xl">
            {currentVideo.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-300 drop-shadow-lg">
            {currentVideo.description}
          </p>
        </div>
      </div>
      
      {/* Video selector thumbnails */}
      <div className="flex gap-2 overflow-x-auto p-3 bg-zinc-950">
        {VIDEOS.map((video, index) => (
          <button
            key={video.id}
            onClick={() => handleVideoSelect(index)}
            className={`relative shrink-0 overflow-hidden rounded-lg transition-all ${
              index === currentIndex
                ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-zinc-950"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="h-14 w-24 object-cover sm:h-16 sm:w-28"
            />
            {index === currentIndex && (
              <div className="absolute bottom-0 left-0 h-1 bg-sky-500" style={{ width: `${progress}%` }} />
            )}
          </button>
        ))}
      </div>
      
      {/* Play/Pause control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
      >
        {isPlaying ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
