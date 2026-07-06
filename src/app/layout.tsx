import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Browser Optimizer MCP — Smarter Browser Automation for AI",
  description:
    "Browser Optimizer MCP is an optimization middleware that sits between AI agents and browser automation frameworks to dramatically reduce token usage, execution latency, and inference costs while preserving workflow quality.",
  keywords: [
    "browser optimization",
    "MCP",
    "AI agents",
    "Playwright",
    "token compression",
    "browser automation",
    "FastMCP",
    "inference cost reduction",
  ],
  authors: [{ name: "Browser Optimizer MCP" }],
  openGraph: {
    title: "Browser Optimizer MCP — Smarter Browser Automation for AI",
    description:
      "Optimization middleware that dramatically reduces token usage, execution latency, and inference costs for AI-powered browser automation.",
    type: "website",
    siteName: "Browser Optimizer MCP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browser Optimizer MCP",
    description:
      "Optimization middleware for AI-powered browser automation. 70% fewer tokens. 2.4× faster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-white">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
