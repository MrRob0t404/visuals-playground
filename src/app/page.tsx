'use client';

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
  return (
    <div className="min-h-screen bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 md:p-6 min-h-screen">
        {/* Left Column - Controls */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-4 auto-rows-min">
          {/* Artist Info */}
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Artist Info</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10" />
              <div>
                <h3 className="text-white/90 font-medium">Artist Name</h3>
                <p className="text-white/60 text-sm">Currently Playing: Track Name</p>
              </div>
            </div>
          </div>

          {/* Tweakpane Controls */}
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Visualization Controls</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Waveform Color
                </label>
                <input
                  type="color"
                  defaultValue="#00ff88"
                  className="w-full h-10 rounded-lg bg-transparent border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Sensitivity
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  defaultValue="2"
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Visualization Type
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white/90">
                  <option>Waveform</option>
                  <option>Frequency</option>
                  <option>Particles</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Audio Controls</h2>
            <div className="flex items-center justify-center gap-4">
              <button className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-emerald-500/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Visualization */}
        <div className="lg:col-span-3 h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)]">
          <div className="bg-black rounded-2xl border border-white/[0.08] h-full overflow-hidden">
            <WaveformVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}
