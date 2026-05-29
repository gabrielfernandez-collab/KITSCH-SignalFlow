import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "KITSCH SignalFlow",
  description: "Premium Executive Intelligence Platform for KITSCH leadership"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
