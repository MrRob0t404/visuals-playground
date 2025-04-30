'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useAudioContext } from '../hooks/useAudioContext';

interface WaveformVisualizerProps {
  width?: number;
  height?: number;
  title?: string;
}

const DEFAULT_COLOR = '#00ff88';
const DEFAULT_SENSITIVITY = 2;
const DEFAULT_BACKGROUND_COLOR = 0x000000;

export default function WaveformVisualizer({ 
  width = 800, 
  height = 600,
  title = 'Audio Waveform'
}: WaveformVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const isInitializedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  const { analyser, dataArray, isListening, error, startListening, stopListening } = useAudioContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [waveformColor, setWaveformColor] = useState(DEFAULT_COLOR);
  const [sensitivity, setSensitivity] = useState(DEFAULT_SENSITIVITY);
  
  // Initialize component on mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    if (geometryRef.current) {
      geometryRef.current.dispose();
      geometryRef.current = null;
    }

    if (materialRef.current) {
      materialRef.current.dispose();
      materialRef.current = null;
    }

    if (containerRef.current && containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    sceneRef.current = null;
    cameraRef.current = null;
    isInitializedRef.current = false;
  }, []);

  const setupScene = useCallback(() => {
    if (!containerRef.current || isInitializedRef.current || !isMounted) return;

    cleanup(); // Clean up any existing scene

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true, // Enable transparency
      preserveDrawingBuffer: true
    });
    
    renderer.setClearColor(DEFAULT_BACKGROUND_COLOR, 0); // Set transparent background
    renderer.setSize(width, height);
    
    // Store refs for cleanup
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    
    // Add to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Create waveform geometry
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ 
      color: new THREE.Color(waveformColor),
      linewidth: 2
    });
    geometryRef.current = geometry;
    materialRef.current = material;

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Position camera
    camera.position.z = 5;

    isInitializedRef.current = true;
  }, [width, height, waveformColor, cleanup, isMounted]);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !geometryRef.current || !isMounted) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    if (analyser && dataArray) {
      analyser.getByteTimeDomainData(dataArray);
      
      // Update line geometry with sensitivity
      const vertices = new Float32Array(dataArray.length * 3);
      for (let i = 0; i < dataArray.length; i++) {
        const x = (i / dataArray.length) * 10 - 5;
        const y = ((dataArray[i] / 128.0) * 2 - 1) * sensitivity;
        vertices[i * 3] = x;
        vertices[i * 3 + 1] = y;
        vertices[i * 3 + 2] = 0;
      }
      
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geometryRef.current.attributes.position.needsUpdate = true;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [analyser, dataArray, sensitivity, isMounted]);

  const handleResize = useCallback(() => {
    if (!isFullscreen || !rendererRef.current || !cameraRef.current || !isMounted) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    cameraRef.current.aspect = w / h;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(w, h);
  }, [isFullscreen, isMounted]);

  // Update material color when waveformColor changes
  useEffect(() => {
    if (materialRef.current && isMounted) {
      materialRef.current.color.set(waveformColor);
    }
  }, [waveformColor, isMounted]);

  // Setup and cleanup
  useEffect(() => {
    if (!isMounted) return;

    setupScene();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, [setupScene, animate, handleResize, cleanup, isMounted]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Don't render anything until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Waveform Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={waveformColor}
                onChange={(e) => setWaveformColor(e.target.value)}
                className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-2 border-white/20 hover:border-white/40 transition-colors"
              />
              <div className="flex-1">
                <div className="h-2 rounded-full" style={{ backgroundColor: waveformColor }} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-300">Sensitivity</label>
              <span className="text-sm font-mono text-gray-400">{sensitivity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:hover:bg-gray-200 [&::-webkit-slider-thumb]:transition-colors"
            />
          </div>

          <button
            onClick={() => isListening ? stopListening() : startListening()}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isListening 
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
            }`}
          >
            {isListening ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Stop Audio
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                Start Audio
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="absolute top-4 right-4 z-10 bg-red-500/20 backdrop-blur-md text-red-400 px-6 py-3 rounded-xl border border-red-500/20 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div 
        ref={containerRef} 
        className={`w-full h-full ${isFullscreen ? '' : 'rounded-xl overflow-hidden'} bg-black`}
      />
    </div>
  );
} 