import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ 
  src, 
  alt, 
  fallback, 
  size = 'md', 
  className 
}: AvatarProps) {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || fallback}
        className={clsx(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
      />
    );
  }
  
  return (
    <div
      className={clsx(
        'bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-700',
        sizes[size],
        className
      )}
    >
      {fallback}
    </div>
  );
} 