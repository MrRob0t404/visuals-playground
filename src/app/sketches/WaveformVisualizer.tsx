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
const DEFAULT_BACKGROUND_COLOR = 0x111111;

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
  const animationFrameRef = useRef<number>();

  const { analyser, dataArray, isListening, error, startListening, stopListening } = useAudioContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [waveformColor, setWaveformColor] = useState(DEFAULT_COLOR);
  const [sensitivity, setSensitivity] = useState(DEFAULT_SENSITIVITY);
  
  const setupScene = useCallback(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(DEFAULT_BACKGROUND_COLOR);
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
  }, [width, height, waveformColor]);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !geometryRef.current) return;

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
  }, [analyser, dataArray, sensitivity]);

  const handleResize = useCallback(() => {
    if (!isFullscreen || !rendererRef.current || !cameraRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    cameraRef.current.aspect = w / h;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(w, h);
  }, [isFullscreen]);

  useEffect(() => {
    setupScene();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [setupScene, animate, handleResize]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Waveform Color</label>
            <input
              type="color"
              value={waveformColor}
              onChange={(e) => setWaveformColor(e.target.value)}
              className="w-full h-8 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sensitivity: {sensitivity.toFixed(1)}x</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => isListening ? stopListening() : startListening()}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isListening ? 'Stop Audio' : 'Start Audio'}
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isFullscreen ? 'Exit' : 'Fullscreen'}
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="absolute top-4 right-4 z-10 bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
      <div 
        ref={containerRef} 
        className={`w-full h-full ${isFullscreen ? '' : 'rounded-lg overflow-hidden shadow-2xl'}`}
      />
    </div>
  );
} 