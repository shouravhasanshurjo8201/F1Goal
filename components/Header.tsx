"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavItem {
    label: string;
    path: string;
}

export default function Header() {
    const pathname = usePathname();

    const navItems: NavItem[] = [
        { label: "Live Match", path: "/" },
        { label: "Schedule", path: "/schedule" },
        { label: "Highlights", path: "/highlights" },
    ];

    return (
        <header className="app-header">
            {/* Left Side: Brand Logo & Title */}
            <div className="header-brand">
                <div className="brand-logo-container">
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

            {/* Right Side: Navigation Button Bar */}
            <nav className="group-tabs-nav">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link key={item.path} href={item.path} passHref>
                            <button
                                type="button"
                                className={`nav-btn ${isActive ? "active" : ""}`}
                            >
                                {/* Shimmer Effect inside Active Button */}
                                {isActive && <span className="shimmer-effect" />}
                                <span className="btn-text">{item.label}</span>
                            </button>
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}