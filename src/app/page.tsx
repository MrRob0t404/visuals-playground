'use client';

import dynamic from 'next/dynamic';
import BentoGrid, { BentoGridItem } from './components/BentoGrid';

// Dynamically import components to avoid SSR issues
const WaveformVisualizer = dynamic(() => import('./sketches/WaveformVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading visualization...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <BentoGrid>
      <BentoGridItem span="col-span-2 row-span-2">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Waveform Visualizer</h2>
          <div className="flex-1">
            <WaveformVisualizer />
          </div>
        </div>
      </BentoGridItem>

      <BentoGridItem>
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Audio Controls</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">Audio controls coming soon...</div>
          </div>
        </div>
      </BentoGridItem>

      <BentoGridItem>
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visualization Library</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">More visualizations coming soon...</div>
          </div>
        </div>
      </BentoGridItem>

      <BentoGridItem span="col-span-2">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">Project information coming soon...</div>
          </div>
        </div>
      </BentoGridItem>
    </BentoGrid>
  );
}
