"use client";

import React, { useState } from "react";
import { Calendar, Clock, Tv, ChevronRight, Award, Flame } from "lucide-react";

const SCHEDULE_DATA = [
    {
        id: 1,
        time: "02:00 AM",
        date: "MON Jun 15",
        tournament: "World Cup 2026 - Group Stage",
        teamA: { name: "Netherlands", flag: "🇳🇱" },
        teamB: { name: "Japan", flag: "🇯🇵" },
        status: "LIVE",
        channel: "Sony Sports Ten 1",
    },
    {
        id: 2,
        time: "05:00 AM",
        date: "MON Jun 15",
        tournament: "World Cup 2026 - Group Stage",
        teamA: { name: "Ivory Coast", flag: "🇨🇮" },
        teamB: { name: "Ecuador", flag: "🇪🇨" },
        status: "UPCOMING",
        channel: "T Sports",
    },
    {
        id: 3,
        time: "08:00 AM",
        date: "MON Jun 15",
        tournament: "World Cup 2026 - Group Stage",
        teamA: { name: "Sweden", flag: "🇸🇪" },
        teamB: { name: "Tunisia", flag: "🇹🇳" },
        status: "UPCOMING",
        channel: "Sony Sports Ten 5",
    },
    {
        id: 4,
        time: "10:00 PM",
        date: "MON Jun 15",
        tournament: "World Cup 2026 - Group Stage",
        teamA: { name: "Spain", flag: "🇪🇸" },
        teamB: { name: "Cape Verde", flag: "🇨🇻" },
        status: "UPCOMING",
        channel: "Rabbitholebd",
    },
    {
        id: 5,
        time: "06:30 PM",
        date: "TUE Jun 16",
        tournament: "International Friendly",
        teamA: { name: "Argentina", flag: "🇦🇷" },
        teamB: { name: "Iceland", flag: "🇮🇸" },
        status: "UPCOMING",
        channel: "ESPN FC",
    },
    {
        id: 6,
        time: "09:00 PM",
        date: "WED Jun 17",
        tournament: "La Liga",
        teamA: { name: "Real Madrid", flag: "🇪🇸" },
        teamB: { name: "Barcelona", flag: "🇪🇸" },
        status: "UPCOMING",
        channel: "Sports 18",
    }
];

const DAYS = [
    { day: "FRI", date: "Jun 12" },
    { day: "SAT", date: "Jun 13" },
    { day: "SUN", date: "Jun 14" },
    { day: "MON", date: "Jun 15" },
    { day: "TUE", date: "Jun 16" },
    { day: "WED", date: "Jun 17" },
    { day: "THU", date: "Jun 18" },
    { day: "FRI", date: "Jun 19" },
    { day: "SAT", date: "Jun 20" },
];

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState("MON Jun 15");

    const filteredMatches = SCHEDULE_DATA.filter(
        (match) => match.date === selectedDate
    );

    return (
        <div className="main-content flex flex-col gap-6 p-4 md:p-6 bg-[#0a0c10] min-h-screen text-[#f0f2f8]">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600/10 rounded-xl border border-red-600/20 text-red-500">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-['Barlow_Condensed'] text-2xl md:text-3xl font-black uppercase tracking-wider bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                            Match Schedule
                        </h1>
                        <p className="text-xs text-[#8892a4] font-medium mt-0.5">
                            Don't miss any action! Check upcoming and live fixtures.
                        </p>
                    </div>
                </div>

                <div className="self-start md:self-auto flex items-center gap-2 px-3 py-1.5 bg-[#11141c] border border-white/5 rounded-lg text-xs font-semibold text-[#8892a4]">
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    <span>Total {filteredMatches.length} Matches Found</span>
                </div>
            </div>

            <div className="scrollbar-none flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                {DAYS.map((d, index) => {
                    const currentString = `${d.day} ${d.date}`;
                    const isActive = selectedDate === currentString;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedDate(currentString)}
                            className={`flex flex-col items-center min-w-[76px] py-2.5 px-3 rounded-xl border font-bold text-center transition-all duration-300 shrink-0 ${isActive
                                ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-lg shadow-red-600/20 scale-[1.02]"
                                : "bg-[#11141c] border-white/5 text-[#8892a4] hover:text-[#f0f2f8] hover:bg-[#1e2335] hover:border-white/10"
                                }`}
                        >
                            <span className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">{d.day}</span>
                            <span className="text-sm font-black">{d.date.split(" ")[1]}</span>
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                        <div
                            key={match.id}
                            className="group relative flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 md:p-5 bg-[#11141c] border border-white/5 rounded-2xl transition-all duration-300 hover:bg-[#171b26] hover:border-white/10 shadow-xl"
                        >
                            <div className="flex items-center justify-between md:justify-start gap-4 mb-4 md:mb-0 border-b border-white/5 md:border-b-0 pb-3 md:pb-0">
                                <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-red-500 bg-red-500/5 px-2 py-0.5 rounded-md w-max uppercase border border-red-500/10">
                                        <Award className="w-3 h-3" />
                                        {match.tournament}
                                    </span>
                                    <div className="flex items-center gap-2 text-[#f0f2f8] mt-1">
                                        <Clock className="w-4 h-4 text-[#8892a4]" />
                                        <span className="font-['Barlow_Condensed'] text-lg font-black tracking-wide">
                                            {match.time}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:hidden">
                                    {match.status === "LIVE" ? (
                                        <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-500 text-[11px] font-black px-2.5 py-1 rounded-full animate-pulse">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            LIVE
                                        </span>
                                    ) : (
                                        <span className="bg-white/5 text-[#8892a4] text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/5">
                                            UPCOMING
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-1 items-center justify-center gap-4 md:gap-8 max-w-xl mx-auto my-2 md:my-0 w-full">
                                {/* Team A */}
                                <div className="flex flex-1 items-center justify-end gap-3 text-right">
                                    <span className="text-sm md:text-base font-bold text-[#f0f2f8] truncate">
                                        {match.teamA.name}
                                    </span>
                                    <span className="text-2xl md:text-3xl filter drop-shadow-md select-none bg-[#0a0c10] p-1.5 rounded-xl border border-white/5 min-w-[44px] h-[44px] flex items-center justify-center">
                                        {match.teamA.flag}
                                    </span>
                                </div>

                                {/* VS স্প্লিটার */}
                                <div className="flex flex-col items-center justify-center">
                                    <div className="px-3 py-1 bg-[#0a0c10] border border-white/5 rounded-lg text-[11px] font-black text-[#8892a4] tracking-widest uppercase group-hover:border-red-500/20 group-hover:text-red-500 transition-colors duration-300">
                                        VS
                                    </div>
                                </div>

                                {/* Team B */}
                                <div className="flex flex-1 items-center justify-start gap-3 text-left">
                                    <span className="text-2xl md:text-3xl filter drop-shadow-md select-none bg-[#0a0c10] p-1.5 rounded-xl border border-white/5 min-w-[44px] h-[44px] flex items-center justify-center">
                                        {match.teamB.flag}
                                    </span>
                                    <span className="text-sm md:text-base font-bold text-[#f0f2f8] truncate">
                                        {match.teamB.name}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-4 mt-3 md:mt-0 pt-3 md:pt-0 border-t border-white/5 md:border-t-0">
                                <div className="flex items-center gap-2 text-xs text-[#8892a4] font-medium">
                                    <Tv className="w-3.5 h-3.5 text-red-500/80" />
                                    <span className="truncate max-w-[120px]">{match.channel}</span>
                                </div>

                                <div className="hidden md:block min-w-[100px] text-right">
                                    {match.status === "LIVE" ? (
                                        <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black px-3 py-1.5 rounded-xl animate-pulse">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            LIVE NOW
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-[#0a0c10] border border-white/5 text-[#8892a4] text-[11px] font-bold px-3 py-1.5 rounded-xl">
                                            UPCOMING
                                        </span>
                                    )}
                                </div>

                                <ChevronRight className="w-5 h-5 text-[#4a5568] group-hover:text-red-500 transition-colors duration-300 hidden md:block" />
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-[#11141c] border border-dashed border-white/5 rounded-2xl text-center">
                        <Calendar className="w-10 h-10 text-[#4a5568] mb-3" />
                        <p className="text-sm font-semibold text-[#8892a4]">No matches scheduled for this date.</p>
                        <p className="text-xs text-[#4a5568] mt-1">Please select another day from the timeline.</p>
                    </div>
                )}
            </div>

        </div>
    );
}










