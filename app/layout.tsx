import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keith Lee | Restaurant Partnerships",
  description: "The official partnership platform for restaurant, hospitality, destination, media, and live-event opportunities with Keith Lee.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
