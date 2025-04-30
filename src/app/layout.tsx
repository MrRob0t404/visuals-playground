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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full m-0 p-0 bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
