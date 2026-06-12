'use client';

import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        if (videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                autoplay: true,
                fluid: true,
                responsive: true,
                preload: 'auto',
                sources: [{ src, type: 'application/x-mpegURL' }] // HLS (.m3u8) Stream
            });
        } else if (playerRef.current) {
            playerRef.current.src({ src, type: 'application/x-mpegURL' });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [src]);

    return (
        <div data-vjs-player className="w-full h-full overflow-hidden rounded-xl shadow-2xl border border-slate-700">
            <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-city" />
        </div>
    );
}