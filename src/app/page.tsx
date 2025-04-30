'use client';

import dynamic from 'next/dynamic';
import BentoGrid, { BentoGridItem } from './components/BentoGrid';

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
    <BentoGrid>
      {/* Main Visualizer */}
      <BentoGridItem span="col-span-2 row-span-2" highlight>
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <WaveformVisualizer />
          </div>
        </div>
      </BentoGridItem>

      {/* Audio Controls */}
      <BentoGridItem span="col-span-2">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-medium text-white/90 mb-4">Audio Controls</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/40 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Audio controls coming soon...
            </div>
          </div>
        </div>
      </BentoGridItem>

      {/* Visualization Library */}
      <BentoGridItem span="col-span-2">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-medium text-white/90 mb-4">Visualization Library</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/40 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              More visualizations coming soon...
            </div>
          </div>
        </div>
      </BentoGridItem>

      {/* About */}
      <BentoGridItem span="col-span-2">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-medium text-white/90 mb-4">About</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white/40 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Project information coming soon...
            </div>
          </div>
        </div>
      </BentoGridItem>
    </BentoGrid>
  );
}
