import { Link, Trash2 } from 'lucide-react';

interface FloatingMenuProps {
  isVisible: boolean;
  onLink: () => void;
  onRemove: () => void;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function FloatingMenu({ isVisible, onLink, onRemove, position, onMouseEnter, onMouseLeave }: FloatingMenuProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-[9999] bg-white rounded-md shadow-[0px_1px_2px_0px_rgba(63,71,79,0.15)] border border-[#e1e6ea]"
      style={{
        left: position.x,
        top: position.y - 32, // Position 4px above the highlight (24px height + 4px gap)
        transform: 'none' // No centering, align to left beginning
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-row items-center gap-0.5 p-[2px]">
        {/* Link button */}
        <button 
          className="flex flex-row gap-1 items-center justify-center px-1.5 py-0.5 rounded hover:bg-gray-50 transition-colors"
          onClick={onLink}
        >
          <div className="flex items-start justify-start py-1">
            <div className="relative w-3 h-3">
              <Link size={12} className="text-[#68707b]" />
            </div>
          </div>
          <div className="flex items-center justify-center px-1 py-0.5">
            <span className="font-semibold text-[12px] text-[#68707b] leading-[16px] whitespace-nowrap">
              Link to
            </span>
          </div>
        </button>
        
        {/* Remove button */}
        <button 
          className="flex flex-row gap-1 items-center justify-center px-1.5 py-0.5 rounded hover:bg-gray-50 transition-colors"
          onClick={onRemove}
        >
          <div className="flex items-start justify-start py-1">
            <div className="relative w-3 h-3">
              <Trash2 size={12} className="text-[#68707b]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
} 