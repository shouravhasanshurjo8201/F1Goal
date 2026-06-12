import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIFA Live TV 2026",
  description: "Watch FIFA World Cup 2026 live streams — multi-language coverage",
  icons: { icon: "⚽" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
