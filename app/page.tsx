"use client";

import { useState, useCallback } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import ChannelCard from "@/components/ChannelCard";
import SearchBar from "@/components/SearchBar";
import { CHANNELS } from "@/lib/channelData";
import { Channel } from "@/types/channel";
import Image from "next/image";

const GROUPS = ["All", "Sports", "News"];

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>(CHANNELS);
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const handleUrlFallback = useCallback((channelId: string) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id !== channelId) return ch;
        const next = ch.activeUrlIndex + 1;
        if (next < ch.urls.length) {
          const updated = { ...ch, activeUrlIndex: next };
          // Also update activeChannel if it's the one playing
          setActiveChannel((cur) => (cur.id === channelId ? updated : cur));
          return updated;
        }
        return ch;
      })
    );
  }, []);

  const filteredChannels = channels.filter((ch) => {
    const matchesGroup = activeGroup === "All" || ch.group === activeGroup;
    const matchesSearch =
      !search ||
      ch.name.toLowerCase().includes(search.toLowerCase()) ||
      ch.language?.toLowerCase().includes(search.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="app-layout">
      {/* Header */}
      {/* <header className="app-header">
        <div className="header-brand flex items-center gap-2">

          <div className="brand-logo-container relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="FIFA Live TV Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>

          <h1 className="brand-title">FIFA Live Mach</h1>
          <span className="brand-badge">2026</span>
        </div>

        <div className="header-live">
          <span className="pulse-dot" />
          <span>LIVE</span>
        </div>
      </header> */}

      <header className="app-header flex items-center justify-between px-6 py-4 bg-[#0d0f17] border-b border-slate-800/80 rounded-xl mb-6 shrink-0 z-10">
        {/* Left Side: Brand Logo & Title */}
        <div className="header-brand flex items-center gap-2">
          <div className="brand-logo-container relative w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black shadow-md shadow-red-900/40">
            🏆
          </div>
          <h1 className="brand-title text-base font-black tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent uppercase">
            Ajker Khela
          </h1>
          <span className="brand-badge text-[10px] bg-red-600/10 text-red-500 font-extrabold border border-red-500/20 px-1.5 py-0.5 rounded ml-1 tracking-wider flex items-center gap-1">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Right Side: Navigation Tabs (Matched from Images) */}
        <div className="flex items-center gap-6 text-xs font-bold tracking-wide text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">
            Live Now
          </span>
          <span className="text-red-500 border-b-2 border-red-500 pb-1 cursor-pointer">
            Schedule
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Highlights
          </span>
        </div>
      </header>


      <div className="app-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-top">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search channels..."
            />
            <div className="group-tabs">
              {GROUPS.map((g) => (
                <button
                  key={g}
                  className={`group-tab ${activeGroup === g ? "group-tab--active" : ""}`}
                  onClick={() => setActiveGroup(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="channel-list">
            {filteredChannels.length === 0 ? (
              <p className="no-results">No channels found</p>
            ) : (
              filteredChannels.map((ch) => (
                <ChannelCard
                  key={ch.id}
                  channel={ch}
                  isActive={activeChannel.id === ch.id}
                  onClick={() => setActiveChannel(ch)}
                />
              ))
            )}
          </div>

          <div className="sidebar-footer">
            <p>{filteredChannels.length} channels available</p>
          </div>
        </aside>

        {/* Main Player Area */}
        <main className="main-content">
          <VideoPlayer
            channel={activeChannel}
            onUrlFallback={handleUrlFallback}
          />
          <div className="now-playing-bar">
            <div className="np-logo-wrap">
              <img
                src={activeChannel.logo}
                alt={activeChannel.name}
                className="np-logo"
              />
            </div>
            <div className="np-info">
              <h2 className="np-name">{activeChannel.name}</h2>
              <div className="np-meta">
                <span className="np-tag">{activeChannel.group}</span>
                <span className="np-tag">{activeChannel.language}</span>
                <span className="np-tag np-tag--quality">{activeChannel.quality}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}