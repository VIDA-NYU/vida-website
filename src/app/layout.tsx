import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DynamicBackground } from "@/components/layout/DynamicBackground";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIDA - Visualization Imaging and Data Analysis Center",
  description: "The Visualization Imaging and Data Analysis Center at NYU Tandon School of Engineering. We work in the areas of Visualization, Imaging and Data Analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300">
            <DynamicBackground />
            <FloatingNav />
            <div className="relative z-10 flex flex-1 flex-col">
              <SiteHeader />
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-4 md:px-6 md:pb-16 md:pt-8">
                {children}
              </main>
              <SiteFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
