"use client";

import React, { useState } from "react";
import { Calendar, Clock, Tv, ChevronRight, Award, Flame, CheckCircle2 } from "lucide-react";
import styles from "./schedule.module.css";

const SCHEDULE_DATA = [
    { id: 1, date: "THU Jun 11", time: "03:00 PM", tournament: "FIFA World Cup 2026 - Group A", stage: "Group Stage", teamA: { name: "Mexico", flag: "🇲🇽" }, teamB: { name: "South Africa", flag: "🇿🇦" }, status: "FINISHED", score: { teamA: 2, teamB: 0 }, city: "Mexico City", stadium: "Estadio Azteca", channel: "T Sports", },
    { id: 2, date: "THU Jun 11", time: "10:00 PM", tournament: "FIFA World Cup 2026 - Group A", stage: "Group Stage", teamA: { name: "South Korea", flag: "🇰🇷" }, teamB: { name: "Czechia", flag: "🇨🇿" }, status: "FINISHED", score: { teamA: 2, teamB: 1 }, city: "Monterrey", stadium: "Estadio BBVA", channel: "Sony Sports Ten 2", },
    { id: 3, date: "FRI Jun 12", time: "03:00 PM", tournament: "FIFA World Cup 2026 - Group B", stage: "Group Stage", teamA: { name: "Canada", flag: "🇨🇦" }, teamB: { name: "Bosnia and Herzegovina", flag: "🇧🇦" }, status: "FINISHED", score: { teamA: 1, teamB: 1 }, city: "Toronto", stadium: "BMO Field", channel: "Sony Sports Ten 1", },
    { id: 4, date: "FRI Jun 12", time: "09:00 PM", tournament: "FIFA World Cup 2026 - Group D", stage: "Group Stage", teamA: { name: "United States", flag: "🇺🇸" }, teamB: { name: "Paraguay", flag: "🇵🇾" }, status: "FINISHED", score: { teamA: 4, teamB: 1 }, city: "Los Angeles", stadium: "SoFi Stadium", channel: "Fox Sports", },
    { id: 5, date: "SAT Jun 13", time: "06:00 PM", tournament: "FIFA World Cup 2026 - Group C", stage: "Group Stage", teamA: { name: "Brazil", flag: "🇧🇷" }, teamB: { name: "Morocco", flag: "🇲🇦" }, status: "FINISHED", score: { teamA: 1, teamB: 1 }, city: "Miami", stadium: "Hard Rock Stadium", channel: "Sony Sports Ten 5", },
    { id: 6, date: "SAT Jun 13", time: "09:00 PM", tournament: "FIFA World Cup 2026 - Group C", stage: "Group Stage", teamA: { name: "Haiti", flag: "🇭🇹" }, teamB: { name: "Scotland", flag: "🏴" }, status: "FINISHED", score: { teamA: 0, teamB: 1 }, city: "Dallas", stadium: "AT&T Stadium", channel: "T Sports", },
    { id: 7, date: "SUN Jun 14", time: "01:00 PM", tournament: "FIFA World Cup 2026 - Group E", stage: "Group Stage", teamA: { name: "Germany", flag: "🇩🇪" }, teamB: { name: "Curacao", flag: "🇨🇼" }, status: "FINISHED", score: { teamA: 7, teamB: 1 }, city: "Houston", stadium: "NRG Stadium", channel: "Sony Sports Ten 2", },
    { id: 8, date: "SUN Jun 14", time: "04:00 PM", tournament: "FIFA World Cup 2026 - Group F", stage: "Group Stage", teamA: { name: "Netherlands", flag: "🇳🇱" }, teamB: { name: "Japan", flag: "🇯🇵" }, status: "FINISHED", score: { teamA: 2, teamB: 2 }, city: "Seattle", stadium: "Lumen Field", channel: "Rabbitholebd", },
    { id: 9, date: "SUN Jun 14", time: "07:00 PM", tournament: "FIFA World Cup 2026 - Group E", stage: "Group Stage", teamA: { name: "Ivory Coast", flag: "🇨🇮" }, teamB: { name: "Ecuador", flag: "🇪🇨" }, status: "FINISHED", score: { teamA: 1, teamB: 0 }, city: "Vancouver", stadium: "BC Place", channel: "Sony Sports Ten 1", },
    { id: 10, date: "SUN Jun 14", time: "10:00 PM", tournament: "FIFA World Cup 2026 - Group F", stage: "Group Stage", teamA: { name: "Sweden", flag: "🇸🇪" }, teamB: { name: "Tunisia", flag: "🇹🇳" }, status: "FINISHED", score: { teamA: 5, teamB: 1 }, city: "San Francisco", stadium: "Levi's Stadium", channel: "Sports 18", }
];

const DAYS = [
    { day: "THU", date: "Jun 11" },
    { day: "FRI", date: "Jun 12" },
    { day: "SAT", date: "Jun 13" },
    { day: "SUN", date: "Jun 14" },
    { day: "MON", date: "Jun 15" },
    { day: "TUE", date: "Jun 16" },
    { day: "WED", date: "Jun 17" },
    { day: "THU", date: "Jun 18" },
    { day: "FRI", date: "Jun 19" },
    { day: "SAT", date: "Jun 20" },
    { day: "SUN", date: "Jun 21" },
    { day: "MON", date: "Jun 22" },
    { day: "TUE", date: "Jun 23" },
    { day: "WED", date: "Jun 24" },
    { day: "THU", date: "Jun 25" },
    { day: "FRI", date: "Jun 26" },
];

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState("THU Jun 11");

    const filteredMatches = SCHEDULE_DATA.filter(
        (match) => match.date === selectedDate
    );

    return (
        <div className={styles.mainContent}>

            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.iconWrapper}>
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className={styles.title}>Match Schedule</h1>
                        <p className={styles.subtitle}>
                            Don't miss any action! Check upcoming and live fixtures.
                        </p>
                    </div>
                </div>

                <div className={styles.badgeCount}>
                    <Flame className="w-4 h-4 text-orange-500" style={{ animation: "pulse 2s infinite" }} />
                    <span>Total {filteredMatches.length} Matches Found</span>
                </div>
            </div>

            {/* Timeline Filter */}
            <div className={styles.timeline}>
                {DAYS.map((d, index) => {
                    const currentString = `${d.day} ${d.date}`;
                    const isActive = selectedDate === currentString;
                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedDate(currentString)}
                            className={`${styles.dateBtn} ${isActive ? styles.dateBtnActive : ""}`}
                        >
                            <span className={styles.dayLabel}>{d.day}</span>
                            <span className={styles.dateLabel}>{d.date.split(" ")[1]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Matches List Container */}
            <div className={styles.matchList}>
                {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                        <div key={match.id} className={styles.matchCard}>

                            {/* Left Box: Tournament & Time */}
                            <div className={styles.infoBox}>
                                <span className={styles.tournamentBadge}>
                                    <Award className="w-3 h-3" style={{ marginRight: '4px' }} />
                                    {match.tournament}
                                </span>
                                <div className={styles.timeBox}>
                                    <Clock className="w-4 h-4 text-[#8892a4]" />
                                    <span className={styles.timeText}>{match.time}</span>
                                </div>
                            </div>

                            {/* Center Box: Fixture (Teams & Scoreboard Logic) */}
                            <div className={styles.fixtureBox}>
                                <div className={`${styles.teamSide} ${styles.teamLeft}`}>
                                    <span className={styles.teamName}>{match.teamA.name}</span>
                                    <span className={styles.flagBox}>{match.teamA.flag}</span>
                                </div>

                                {match.status === "FINISHED" || match.status === "LIVE" ? (
                                    <div className={styles.vsBadge} style={{ display: 'flex', gap: '8px', fontWeight: '900', color: match.status === "LIVE" ? 'var(--green-live)' : 'var(--text-primary)' }}>
                                        <span>{match.score?.teamA ?? 0}</span>
                                        <span style={{ opacity: 0.4 }}>:</span>
                                        <span>{match.score?.teamB ?? 0}</span>
                                    </div>
                                ) : (
                                    <div className={styles.vsBadge}>VS</div>
                                )}

                                <div className={`${styles.teamSide} ${styles.teamRight}`}>
                                    <span className={styles.flagBox}>{match.teamB.flag}</span>
                                    <span className={styles.teamName}>{match.teamB.name}</span>
                                </div>
                            </div>

                            {/* Right Box: Actions & Live/Upcoming/Finished Status Badges */}
                            <div className={styles.actionBox}>
                                <div className={styles.channelBox}>
                                    <Tv className="w-3.5 h-3.5 text-red-500" />
                                    <span>{match.channel}</span>
                                </div>

                                <div className={styles.statusWrapper}>
                                    {match.status === "LIVE" ? (
                                        <span className={styles.liveBadge}>
                                            <span className={styles.dot}></span>
                                            LIVE NOW
                                        </span>
                                    ) : match.status === "FINISHED" ? (
                                        <span className={styles.upcomingBadge} style={{ borderColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', background: 'rgba(34, 197, 94, 0.05)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <CheckCircle2 className="w-3 h-3" /> FINISHED
                                        </span>
                                    ) : (
                                        <span className={styles.upcomingBadge}>UPCOMING</span>
                                    )}
                                </div>

                                <ChevronRight className={`w-5 h-5 ${styles.arrowIcon}`} />
                            </div>

                        </div>
                    ))
                ) : (
                    /* Empty State View */
                    <div className={styles.emptyState}>
                        <Calendar className="w-10 h-10 text-[#4a5568]" style={{ margin: '0 auto' }} />
                        <p className={styles.emptyText}>No matches scheduled for this date.</p>
                        <p className={styles.emptySub}>Please select another day from the timeline.</p>
                    </div>
                )}
            </div>

        </div>
    );
}