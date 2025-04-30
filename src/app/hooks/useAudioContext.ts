'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface AudioContextState {
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  dataArray: Uint8Array | null;
  isListening: boolean;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => void;
}

interface AudioOptions {
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
}

const DEFAULT_FFT_SIZE = 256;
const DEFAULT_AUDIO_OPTIONS: AudioOptions = {
  echoCancellation: false,
  noiseSuppression: false,
  autoGainControl: false,
};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export function useAudioContext(): AudioContextState {
  const [state, setState] = useState<AudioContextState>({
    audioContext: null,
    analyser: null,
    dataArray: null,
    isListening: false,
    error: null,
    startListening: async () => {},
    stopListening: () => {},
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopListening = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      analyserRef.current = null;
      dataArrayRef.current = null;
      
      setState(prev => ({
        ...prev,
        audioContext: null,
        analyser: null,
        dataArray: null,
        isListening: false,
        error: null,
      }));
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      stopListening(); // Clean up any existing audio context
      setState(prev => ({ ...prev, error: null }));

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = DEFAULT_FFT_SIZE;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: DEFAULT_AUDIO_OPTIONS 
      });

      streamRef.current = stream;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      setState(prev => ({
        ...prev,
        audioContext,
        analyser,
        dataArray,
        isListening: true,
        error: null,
      }));
    } catch (error) {
      console.error('Error accessing audio:', error);
      let errorMessage = 'Failed to access audio input';
      
      if (error instanceof Error) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage = 'Please allow microphone access to use this feature';
            break;
          case 'NotFoundError':
            errorMessage = 'No microphone found. Please connect a microphone and try again';
            break;
          case 'NotReadableError':
            errorMessage = 'Could not access your microphone. Please check your device settings';
            break;
          default:
            errorMessage = `Audio error: ${error.message}`;
        }
      }
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isListening: false,
      }));
    }
  }, [stopListening]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      startListening,
      stopListening,
    }));

    return () => {
      stopListening();
    };
  }, [startListening, stopListening]);

  return state;
} 