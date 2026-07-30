// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Topbar from "./_components/topbar";
import SmoothBackground from "./_components/smooth";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code"});

export const metadata: Metadata = {
  title: "Johnny Stouffer Portfolio",
  description: "Personal portfolio website for Johnny Stouffer to showcase experience and projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Providers>
          <SmoothBackground></SmoothBackground>
          <div className="relative z-10">
            <Topbar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
