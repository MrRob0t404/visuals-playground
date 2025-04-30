import WaveformVisualizer from '@/app/sketches/WaveformVisualizer';

export default function WaveformPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Waveform Visualizer</h1>
        <div className="bg-gray-900 rounded-lg p-4">
          <WaveformVisualizer width={800} height={400} />
        </div>
      </div>
    </div>
  );
} 