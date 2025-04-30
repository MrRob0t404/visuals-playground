import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Visual</h1>
        <p className="text-gray-400">Interactive Music Reactive Sketches</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example sketch card - will be replaced with dynamic content */}
        <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
          <h2 className="text-xl font-semibold mb-2">Waveform Visualizer</h2>
          <p className="text-gray-400 mb-4">A Three.js sketch that visualizes audio waveforms in real-time</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Three.js</span>
            <Link 
              href="/sketches/waveform" 
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              View
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
