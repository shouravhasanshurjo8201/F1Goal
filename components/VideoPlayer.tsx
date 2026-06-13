"use client";

import { useEffect, useRef, useState } from "react";
import { Channel, PlayerStatus } from "@/types/channel";

interface VideoPlayerProps {
    channel: Channel;
    onUrlFallback: (channelId: string) => void;
}

export default function VideoPlayer({ channel, onUrlFallback }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<unknown>(null);
    const [status, setStatus] = useState<PlayerStatus>("loading");
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentUrl = channel.urls[channel.activeUrlIndex];

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentUrl) return;

        setStatus("loading");

        const loadHls = async () => {
            // Cleanup previous instance
            if (hlsRef.current) {
                (hlsRef.current as { destroy: () => void }).destroy();
                hlsRef.current = null;
            }

            if (currentUrl.includes(".m3u8") || currentUrl.includes("m3u")) {
                const Hls = (await import("hls.js")).default;
                if (Hls.isSupported()) {
                    const hls = new Hls({
                        enableWorker: true,
                        lowLatencyMode: true,
                        backBufferLength: 90,
                    });
                    hlsRef.current = hls;
                    hls.loadSource(currentUrl);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        setStatus("playing");
                        video.play().catch(() => setStatus("error"));
                    });

                    hls.on(Hls.Events.ERROR, (_: unknown, data: { fatal: boolean }) => {
                        if (data.fatal) {
                            setStatus("error");
                            onUrlFallback(channel.id);
                        }
                    });
                } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                    // Safari native HLS
                    video.src = currentUrl;
                    video.addEventListener("loadedmetadata", () => {
                        setStatus("playing");
                        video.play().catch(() => setStatus("error"));
                    });
                }
            } else {
                video.src = currentUrl;
                video.play()
                    .then(() => setStatus("playing"))
                    .catch(() => setStatus("error"));
            }
        };

        loadHls();

        return () => {
            if (hlsRef.current) {
                (hlsRef.current as { destroy: () => void }).destroy();
            }
        };
    }, [currentUrl, channel.id, onUrlFallback]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div ref={containerRef} className="video-container">
            {status === "loading" && (
                <div className="player-overlay">
                    <div className="spinner" />
                    <p className="loading-text">Connecting to stream...</p>
                </div>
            )}

            {status === "error" && (
                <div className="player-overlay">
                    <div className="error-icon">⚠️</div>
                    <p className="error-text">Stream unavailable</p>
                    <p className="error-sub">Trying next source...</p>
                </div>
            )}

            <video
                ref={videoRef}
                className="video-element"
                playsInline
                muted={isMuted}
            />

            {status === "playing" && (
                <div className="player-controls">
                    <div className="control-buttons">
                        <button onClick={toggleMute} className="ctrl-btn" title={isMuted ? "Unmute" : "Mute"}>
                            {isMuted ? "🔇" : "🔊"}
                        </button>
                        <button onClick={toggleFullscreen} className="ctrl-btn" title="Fullscreen">
                            {isFullscreen ? "⊠" : "⛶"}
                        </button>
                    </div>
                    {channel.urls.length > 1 && (
                        <div className="source-info">
                            Source {channel.activeUrlIndex + 1}/{channel.urls.length}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
