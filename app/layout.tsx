import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIFA Live Matches - 2026",
  description: "Watch FIFA matches live",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
      }
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}