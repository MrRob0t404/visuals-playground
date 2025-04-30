'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const WaveformVisualizer = dynamic(() => import('./sketches/WaveformVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-white/40">Loading visualization...</div>
    </div>
  ),
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Update on mount and window resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Check initial size
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#141414]/80 backdrop-blur-sm rounded-[24px] border border-white/[0.08] shadow-xl p-8 max-w-md">
          <svg className="w-16 h-16 text-white/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-xl font-medium text-white/90 mb-2">Better on Larger Screens</h2>
          <p className="text-white/60">This audio visualization experience is optimized for larger devices. Please view on a screen wider than 640px for the best experience.</p>
        </div>
      </main>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#0A0A0A] overflow-hidden">
      <div className="flex-1 flex gap-4 p-4">
        {/* Left Side - Two Boxes */}
        <div className="w-[320px] flex flex-col gap-4 min-h-0">
          {/* Artist Info Box */}
          <div className="bg-[#141414]/80 backdrop-blur-sm rounded-[24px] border border-white/[0.08] shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-medium text-white/90">Artist Info</h2>
              <button className="text-white/40 hover:text-white/60 transition-colors p-2 rounded-xl hover:bg-white/5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0">
                {/* Artist Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white/90 font-medium truncate text-lg">Artist Name</h3>
                <p className="text-white/50 text-sm mt-2 truncate">Currently Playing: Track Name</p>
              </div>
            </div>
          </div>

          {/* Controls Box */}
          <div className="flex-1 bg-[#141414]/80 backdrop-blur-sm rounded-[24px] border border-white/[0.08] shadow-xl flex flex-col min-h-0">
            <div className="px-8 py-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white/90">Visualization Controls</h2>
                <button className="text-white/40 hover:text-white/60 transition-colors p-2 rounded-xl hover:bg-white/5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 min-h-0">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-white/60 mb-3 w-full">
                  Waveform Color
                </label>
                <input
                  type="color"
                  defaultValue="#00ff88"
                  className="w-full h-12 rounded-xl bg-black/20 border border-white/10 cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-white/60 mb-3 w-full">
                  Sensitivity
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  defaultValue="2"
                  className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-white/60 mb-3 w-full">
                  Visualization Type
                </label>
                <select className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white/90">
                  <option>Waveform</option>
                  <option>Frequency</option>
                  <option>Particles</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Main Visualization */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#141414]/80 backdrop-blur-sm rounded-[24px] border border-white/[0.08] shadow-xl h-full p-4">
            <WaveformVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}
