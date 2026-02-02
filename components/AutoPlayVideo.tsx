"use client";

import { useRef, useEffect } from "react";

interface AutoPlayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function AutoPlayVideo({ src, poster, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch((error) => {
              console.log("Autoplay prevented:", error);
            });
          } else {
            videoElement.pause();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      muted // Required for autoplay in most browsers
      playsInline
      className={className}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
  );
}
