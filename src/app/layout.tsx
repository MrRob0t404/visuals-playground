import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visual - Interactive Music Reactive Sketches",
  description: "A platform for interactive, music-reactive creative coding sketches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
