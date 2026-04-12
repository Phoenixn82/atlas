import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ATLAS — Web Design & SEO Agency",
  description: "ATLAS builds high-performance websites and SEO strategies that drive measurable results. We carry the weight so you reap the results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-ibm-plex-mono), 'Space Mono', 'Courier New', monospace" }}
      >
        {children}
      </body>
    </html>
  );
}
