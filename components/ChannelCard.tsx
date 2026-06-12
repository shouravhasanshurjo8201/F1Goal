"use client";

import Image from "next/image";
import { Channel } from "@/types/channel";

interface ChannelCardProps {
    channel: Channel;
    isActive: boolean;
    onClick: () => void;
}

export default function ChannelCard({ channel, isActive, onClick }: ChannelCardProps) {
    return (
        <button
            onClick={onClick}
            className={`channel-card ${isActive ? "channel-card--active" : ""}`}
            title={channel.name}
        >
            <div className="channel-logo-wrap">
                <Image
                    src={channel.logo}
                    alt={channel.name}
                    width={48}
                    height={48}
                    className="channel-logo"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-logo.png";
                    }}
                    unoptimized
                />
            </div>
            <div className="channel-info">
                <span className="channel-name">{channel.name}</span>
                <div className="channel-meta">
                    <span className="channel-lang">{channel.language}</span>
                    <span className="channel-quality">{channel.quality}</span>
                </div>
            </div>
            {isActive && <span className="active-indicator" />}
        </button>
    );
}
