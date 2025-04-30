'use client';

import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
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
  highlight?: boolean;
}

export function BentoGridItem({ 
  children, 
  className = '', 
  span = '',
  highlight = false 
}: BentoGridItemProps) {
  return (
    <div 
      className={`
        relative group ${span} ${className}
        transform transition-all duration-500 hover:scale-[1.02]
        ${highlight ? 'z-10' : 'z-0'}
      `}
    >
      <div 
        className={`
          absolute inset-0 rounded-2xl transition-all duration-300
          border border-white/[0.08] hover:border-white/[0.15]
          ${highlight 
            ? 'bg-black shadow-xl' 
            : 'bg-white/[0.02] hover:bg-white/[0.04]'
          }
        `} 
      />
      <div className="relative p-4 md:p-6 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
} 