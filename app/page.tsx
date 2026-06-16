"use client";

import { useState, useCallback } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import ChannelCard from "@/components/ChannelCard";
import SearchBar from "@/components/SearchBar";
import { CHANNELS } from "@/lib/channelData";
import { Channel } from "@/types/channel";

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