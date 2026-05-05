import type { Metadata } from "next";
import { Barlow_Condensed, Libre_Baskerville, Barlow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/navigation/ThemeProvider";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { profile } from "@/config/profile";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
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
        className={`${barlowCondensed.variable} ${libreBaskerville.variable} ${barlow.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-barlow)" }}
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
