import React from 'react';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  placeholder = 'Search...', 
  className, 
  ...props 
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className={clsx(
          'pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full',
          className
        )}
        {...props}
      />
    </div>
  );
} 