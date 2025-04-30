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
      <div className="flex flex-col lg:flex-row gap-4 p-4 min-h-screen">
        {/* Left Side - Controls in Bento Grid */}
        <div className="lg:w-[400px] grid grid-cols-2 gap-4 auto-rows-[200px]">
          {/* Artist Info - Full Width */}
          <div className="col-span-2 bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Artist Info</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10" />
              <div>
                <h3 className="text-white/90 font-medium">Artist Name</h3>
                <p className="text-white/60 text-sm">Currently Playing: Track Name</p>
              </div>
            </div>
          </div>

          {/* Tweakpane Controls - Spans Both Columns */}
          <div className="col-span-2 row-span-2 bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
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

          {/* Audio Controls - Split into Two */}
          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Input</h2>
            <button className="w-full h-[100px] rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center">
              <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>

          <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-colors p-6">
            <h2 className="text-xl font-medium text-white/90 mb-4">Output</h2>
            <div className="space-y-2">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-emerald-500/50" />
              </div>
              <div className="flex justify-between text-sm text-white/40">
                <span>0:00</span>
                <span>3:45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Main Visualization */}
        <div className="flex-1 h-[calc(100vh-2rem)]">
          <div className="bg-black rounded-2xl border border-white/[0.08] h-full overflow-hidden">
            <WaveformVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
}
