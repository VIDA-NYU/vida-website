"use client";

import { useEffect, useState } from "react";

type Props = {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  showText?: boolean;
};

const SIZES = {
  sm: { logo: 32, text: "text-xs" },
  md: { logo: 48, text: "text-sm" },
  lg: { logo: 64, text: "text-base" },
  xl: { logo: 96, text: "text-lg" },
};

export function VidaLogo({ size = "md", animate = true, showText = false }: Props) {
  const [mounted, setMounted] = useState(false);
  const { logo: logoSize, text: textSize } = SIZES[size];
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Decreasing bar heights for the bar graph (bottom left of D)
  const barHeights = [100, 80, 60, 40, 25];
  
  return (
    <div className="flex items-center gap-2">
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* V - Purple */}
        <path
          d="M5 15 L15 65 L25 15"
          stroke="#6B21A8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 120 : 0,
            strokeDashoffset: animate && mounted ? 0 : 120,
            transition: "stroke-dashoffset 0.8s ease-out",
          }}
        />
        
        {/* I - Purple vertical line */}
        <path
          d="M38 20 L38 65"
          stroke="#6B21A8"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 50 : 0,
            strokeDashoffset: animate && mounted ? 0 : 50,
            transition: "stroke-dashoffset 0.6s ease-out 0.2s",
          }}
        />
        
        {/* Checkmark/tick on top of I - Green */}
        <path
          d="M30 12 L38 20 L50 5"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 40 : 0,
            strokeDashoffset: animate && mounted ? 0 : 40,
            transition: "stroke-dashoffset 0.5s ease-out 0.8s",
          }}
        />
        
        {/* D - Purple */}
        <path
          d="M55 15 L55 65 M55 15 Q80 15 80 40 Q80 65 55 65"
          stroke="#6B21A8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 150 : 0,
            strokeDashoffset: animate && mounted ? 0 : 150,
            transition: "stroke-dashoffset 0.8s ease-out 0.4s",
          }}
        />
        
        {/* Decreasing bar graph on bottom left of D - Green */}
        <g>
          {barHeights.map((height, i) => (
            <rect
              key={i}
              x={56 + i * 5}
              y={65 - height * 0.35}
              width="3.5"
              height={height * 0.35}
              fill="#22C55E"
              rx="0.5"
              style={{
                transformOrigin: `${57.75 + i * 5}px 65px`,
                transform: animate && mounted ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 0.4s ease-out ${0.6 + i * 0.08}s`,
              }}
            />
          ))}
        </g>
        
        {/* A - Purple */}
        <path
          d="M90 65 L100 15 L110 65 M93 50 L107 50"
          stroke="#6B21A8"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 150 : 0,
            strokeDashoffset: animate && mounted ? 0 : 150,
            transition: "stroke-dashoffset 0.8s ease-out 0.6s",
          }}
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-tight ${textSize}`}>
            <span className="text-purple-700">VIDA</span>
          </span>
          <span className={`text-zinc-500 dark:text-zinc-400 ${size === "sm" ? "text-[8px]" : "text-[10px]"} font-medium uppercase tracking-wider`}>
            Visualization Imaging<br />& Data Analysis
          </span>
        </div>
      )}
    </div>
  );
}

// Larger version with full text for mission section
export function VidaLogoBanner({ animate = true }: { animate?: boolean }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const barHeights = [100, 80, 60, 40, 25];
  
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <svg
        width={160}
        height={100}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* V - Purple */}
        <path
          d="M5 15 L15 65 L25 15"
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 120 : 0,
            strokeDashoffset: animate && mounted ? 0 : 120,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
        
        {/* I - Purple vertical line */}
        <path
          d="M38 20 L38 65"
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 50 : 0,
            strokeDashoffset: animate && mounted ? 0 : 50,
            transition: "stroke-dashoffset 0.8s ease-out 0.3s",
          }}
        />
        
        {/* Checkmark/tick on top of I - Green */}
        <path
          d="M30 12 L38 20 L50 5"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 40 : 0,
            strokeDashoffset: animate && mounted ? 0 : 40,
            transition: "stroke-dashoffset 0.6s ease-out 1s",
          }}
        />
        
        {/* D - Purple */}
        <path
          d="M55 15 L55 65 M55 15 Q80 15 80 40 Q80 65 55 65"
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 150 : 0,
            strokeDashoffset: animate && mounted ? 0 : 150,
            transition: "stroke-dashoffset 1s ease-out 0.5s",
          }}
        />
        
        {/* Decreasing bar graph on bottom left of D - Green */}
        <g>
          {barHeights.map((height, i) => (
            <rect
              key={i}
              x={56 + i * 5}
              y={65 - height * 0.35}
              width="3.5"
              height={height * 0.35}
              fill="#22C55E"
              rx="0.5"
              style={{
                transformOrigin: `${57.75 + i * 5}px 65px`,
                transform: animate && mounted ? "scaleY(1)" : "scaleY(0)",
                transition: `transform 0.5s ease-out ${0.8 + i * 0.1}s`,
              }}
            />
          ))}
        </g>
        
        {/* A - Purple */}
        <path
          d="M90 65 L100 15 L110 65 M93 50 L107 50"
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: animate ? 150 : 0,
            strokeDashoffset: animate && mounted ? 0 : 150,
            transition: "stroke-dashoffset 1s ease-out 0.7s",
          }}
        />
      </svg>
      
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-purple-600 dark:text-purple-400">VIDA</span>
        </h1>
        <p className="mt-1 text-sm font-medium uppercase tracking-[0.15em] text-zinc-600 dark:text-zinc-400 sm:text-base">
          Visualization Imaging<br className="sm:hidden" /> 
          <span className="hidden sm:inline">& </span>
          <span className="sm:hidden">and </span>
          Data Analysis Center
        </p>
      </div>
    </div>
  );
}
