import React from 'react';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  count?: string;
  isActive?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export default function NavigationItem({
  icon,
  label,
  count,
  isActive = false,
  badge,
  onClick
}: NavigationItemProps) {
  return (
    <div 
      className={`px-2 h-8 flex items-center gap-2 rounded cursor-pointer ${
        isActive 
          ? 'bg-[#e2effd] border border-[#94c7fa]' 
          : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="w-4 h-4 flex items-center justify-center relative">
        {icon}
        {badge}
      </div>
      <span className={`text-[14px] flex-1 ${
        isActive 
          ? 'text-[#2693ff] font-semibold' 
          : 'text-[#30363c]'
      }`}>
        {label}
      </span>
      {count && (
        <span className={`text-[12px] font-semibold ${
          isActive 
            ? 'text-[#2693ff]' 
            : 'text-[#68707b]'
        }`}>
          {count}
        </span>
      )}
    </div>
  );
} 