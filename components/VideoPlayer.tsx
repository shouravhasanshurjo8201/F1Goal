"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Channel, PlayerStatus } from "@/types/channel";

interface VideoPlayerProps {
    channel: Channel;
    onUrlFallback: (channelId: string) => void;
}

export default function VideoPlayer({
    channel,
    onUrlFallback,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [status, setStatus] = useState<PlayerStatus>("loading");
    const [isMuted, setIsMuted] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const currentUrl = channel.urls[channel.activeUrlIndex];

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !currentUrl) return;

        setStatus("loading");

        const loadStream = async () => {
            try {
                // 🧹 Cleanup previous HLS instance
                if (hlsRef.current) {
                    hlsRef.current.destroy();
                    hlsRef.current = null;
                }

                video.pause();
                video.removeAttribute("src");
                video.load();

                const isHls =
                    currentUrl.includes(".m3u8") ||
                    currentUrl.includes("m3u");

                if (isHls) {
                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            enableWorker: true,
                            lowLatencyMode: true,
                            backBufferLength: 90,
                            debug: false,
                        });

                        hlsRef.current = hls;

                        // 🎯 Better error debugging
                        hls.on(Hls.Events.ERROR, (_, data) => {
                            console.log("🔥 TYPE:", data.type);
                            console.log("DETAILS:", data.details);
                            console.log("FATAL:", data.fatal);

                            if (data.response) {
                                console.log("STATUS:", data.response.code);
                                console.log("URL:", data.response.url);
                            }

                            if (data.fatal) {
                                setStatus("error");
                                onUrlFallback(channel.id);

                                if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                                    hls.startLoad();
                                } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                                    hls.recoverMediaError();
                                } else {
                                    hls.destroy();
                                }
                            }
                        });

                        hls.on(Hls.Events.MANIFEST_PARSED, async () => {
                            try {
                                video.muted = true;
                                setIsMuted(true);

                                await video.play();
                                setStatus("playing");
                            } catch (err) {
                                console.error("Play Error:", err);
                                setStatus("error");
                            }
                        });

                        hls.loadSource(currentUrl);
                        hls.attachMedia(video);
                    }

                    // 🍎 Safari fallback
                    else if (
                        video.canPlayType(
                            "application/vnd.apple.mpegurl"
                        )
                    ) {
                        video.src = currentUrl;

                        video.onloadedmetadata = async () => {
                            try {
                                video.muted = true;
                                setIsMuted(true);

                                await video.play();
                                setStatus("playing");
                            } catch (err) {
                                console.error("Safari Play Error:", err);
                                setStatus("error");
                            }
                        };
                    }
                } else {
                    // normal video
                    video.src = currentUrl;

                    video.onloadeddata = async () => {
                        try {
                            video.muted = true;
                            setIsMuted(true);

                            await video.play();
                            setStatus("playing");
                        } catch (err) {
                            console.error("Video Play Error:", err);
                            setStatus("error");
                        }
                    };
                }
            } catch (err) {
                console.error("Stream Load Error:", err);
                setStatus("error");
            }
        };

        loadStream();

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [currentUrl, channel.id, onUrlFallback]);

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div ref={containerRef} className="video-container">
            <video
                ref={videoRef}
                className="video-element"
                playsInline
                controls
                autoPlay
                muted={isMuted}
            />

            {status === "loading" && <p>Loading stream...</p>}
            {status === "error" && <p>Stream unavailable</p>}

            <div className="controls">
                <button onClick={toggleMute}>
                    {isMuted ? "🔇" : "🔊"}
                </button>

                <button onClick={toggleFullscreen}>
                    {isFullscreen ? "⊠" : "⛶"}
                </button>
            </div>
        </div>
    );
}