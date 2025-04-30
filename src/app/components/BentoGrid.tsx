'use client';

import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
  span?: string;
}

export function BentoGridItem({ children, className = '', span = '' }: BentoGridItemProps) {
  return (
    <div className={`relative group ${span} ${className} transform transition-all duration-500 hover:scale-[1.02]`}>
      <div className="absolute inset-0 bg-white rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="relative p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
} 