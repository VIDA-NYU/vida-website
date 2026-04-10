"use client";

import { useState, useRef, useEffect } from "react";

type Video = {
  id: string;
  title: string;
  description: string;
};

export function VideoBanner({ videos }: { videos: Video[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const VIDEO_DURATION = 12000; // 12 seconds per video

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= VIDEO_DURATION) {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, videos]);

  const handlePrevious = () => {
    if (!videos || videos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    if (!videos || videos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (!videos || videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-black">
      {/* Video Player */}
      <div className="relative aspect-[21/9] w-full group">
        <iframe
          key={currentVideo.id}
          src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${currentVideo.id}&modestbranding=1&start=0&end=15`}
          title={currentVideo.title}
          className="absolute inset-0 h-full w-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Navigation arrows (show on hover) */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Current video info */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
          <h3 className="text-xl font-bold text-white drop-shadow-md md:text-3xl lg:text-4xl">
            {currentVideo.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-200 drop-shadow-md md:text-base lg:text-lg max-w-2xl">
            {currentVideo.description}
          </p>
        </div>
      </div>
    </div>
  );
}
