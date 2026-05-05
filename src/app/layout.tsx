import type { Metadata } from "next";
import { Space_Mono, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/navigation/ThemeProvider";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { profile } from "@/config/profile";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Living Engineering Archive`,
    template: `%s — ${profile.name}`,
  },
  description: profile.heroDescription,
  metadataBase: new URL("https://yashkarthiya.in"),
  openGraph: {
    title: `${profile.name} — Living Engineering Archive`,
    description: profile.heroDescription,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Living Engineering Archive`,
    description: profile.heroDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceMono.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-newsreader), serif" }}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <CommandPalette />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
