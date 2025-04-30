'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface SketchViewerProps {
  width?: number;
  height?: number;
  title?: string;
}

const DEFAULT_SPEED = 0.01;
const DEFAULT_BACKGROUND_COLOR = 0x111111;

export default function SketchViewer({ 
  width = 800, 
  height = 600, 
  title = 'Three.js Sketch' 
}: SketchViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const geometryRef = useRef<THREE.BoxGeometry | null>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

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

    // Create cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff88,
      shininess: 60,
      specular: 0x004488
    });
    geometryRef.current = geometry;
    materialRef.current = material;

    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;
  }, [width, height]);

  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !cubeRef.current) return;

    animationFrameRef.current = requestAnimationFrame(animate);
    
    cubeRef.current.rotation.x += speed;
    cubeRef.current.rotation.y += speed;
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, [speed]);

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
            <label className="block text-sm font-medium mb-1">Rotation Speed</label>
            <input
              type="range"
              min="0"
              max="0.05"
              step="0.001"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <button
            onClick={toggleFullscreen}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button>
        </div>
      </div>
      <div 
        ref={containerRef} 
        className={`w-full h-full ${isFullscreen ? '' : 'rounded-lg overflow-hidden shadow-2xl'}`} 
      />
    </div>
  );
} 