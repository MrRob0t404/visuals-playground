'use client';

import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Three.js component to avoid SSR issues
const VisualSketch = dynamic(() => import('@/components/VisualSketch'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const visualContainer = document.querySelector('.visual-container');
    if (!visualContainer) return;

    if (!isFullscreen) {
      if (visualContainer.requestFullscreen) {
        visualContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-2rem)]">
          {/* Main Visual Sketch - Full width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[calc(100%-450px)] bg-white rounded-xl overflow-hidden shadow-lg h-[50vh] lg:h-auto relative visual-container"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M15 15v4.5M15 15H4.5M15 15h4.5M9 15v4.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              <VisualSketch />
            </Suspense>
          </motion.div>

          {/* Side Panels Container */}
          <div className="lg:w-[450px] flex flex-col gap-4">
            {/* Controls Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg"
            >
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Controls</h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Camera Controls */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Camera</h3>
                  <p className="text-sm text-gray-500">Camera controls coming soon...</p>
                </div>

                {/* Animation Controls */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Animation</h3>
                  <p className="text-sm text-gray-500">Animation parameters coming soon...</p>
                </div>

                {/* Visual Parameters */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Visual Parameters</h3>
                  <p className="text-sm text-gray-500">Visual customization options coming soon...</p>
                </div>
              </div>
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg"
            >
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Info</h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Project Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">About This Project</h3>
                  <p className="text-sm text-gray-600">
                    A collection of interactive Three.js visualizations exploring various creative coding concepts.
                  </p>
                </div>

                {/* Technical Details */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Technical Details</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                    <li>Built with Three.js and React Three Fiber</li>
                    <li>Responsive design with TailwindCSS</li>
                    <li>Interactive controls and animations</li>
                  </ul>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">How to Use</h3>
                  <p className="text-sm text-gray-600">
                    Use your mouse to interact with the visualization. More detailed instructions coming soon...
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
