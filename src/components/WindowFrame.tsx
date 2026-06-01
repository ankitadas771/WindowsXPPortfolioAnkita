import React, { useRef, useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface WindowFrameProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (x: number, y: number) => void;
  children: React.ReactNode;
}

export default function WindowFrame({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  x,
  y,
  width,
  height,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  children
}: WindowFrameProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isMaximized) return; // Cannot drag maximized window
    onFocus();

    // Check if clicking close/min/max buttons to prevent drag triggers
    const target = e.target as HTMLElement;
    if (target.closest('.window-control-btn')) return;

    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    dragStart.current = { x: clientX, y: clientY };
    initialPos.current = { x, y };

    // Prevent default selections
    if (!('touches' in e)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStart.current.x;
      const deltaY = clientY - dragStart.current.y;

      // Bound within reasonable limits
      let newX = initialPos.current.x + deltaX;
      let newY = initialPos.current.y + deltaY;

      // Prevent dragging completely off-screen
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (newX < -150) newX = -150;
      if (newX > viewportWidth - 100) newX = viewportWidth - 100;
      if (newY < 0) newY = 0;
      if (newY > viewportHeight - 80) newY = viewportHeight - 80;

      onPositionChange(newX, newY);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove, { passive: true });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, x, y, isMaximized, onPositionChange]);

  if (!isOpen || isMinimized) return null;

  // Window styling presets (maximized or floating draggable layout)
  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: 'absolute',
        top: '4px',
        left: '4px',
        right: '4px',
        bottom: '48px', // Keep taskbar height visible!
        zIndex: zIndex,
      }
    : {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onClick={onFocus}
      className="flex flex-col bg-[#ece9d8] border-4 border-[#0054e3] rounded-t-lg overflow-hidden shadow-2xl select-none pointer-events-auto"
    >
      {/* Title bar (Drag Trigger) with Professional Polish gradients */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onDoubleClick={onMaximize}
        className="h-8 bg-gradient-to-r from-[#0058e6] via-[#248ef3] to-[#0058e6] flex items-center justify-between px-2 text-white font-bold text-sm cursor-move select-none"
      >
        {/* Title text & Small Folder Stamp */}
        <div className="flex items-center gap-2 text-white font-sans text-xs font-bold tracking-wide truncate pr-4">
          <span className="text-sm">📂</span>
          <span className="truncate">{title}</span>
        </div>

        {/* Action button controls from Professional Polish layout */}
        <div className="flex items-center gap-1 shrink-0 select-none">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="window-control-btn w-5 h-5 bg-[#0058e6] border border-white flex items-center justify-center text-xs text-white hover:brightness-110 rounded-sm font-bold active:scale-95 transition-all"
            title="Minimize"
          >
            <Minus size={10} strokeWidth={4} />
          </button>

          {/* Maximize / Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="window-control-btn w-5 h-5 bg-[#0058e6] border border-white flex items-center justify-center text-xs text-white hover:brightness-110 rounded-sm font-bold active:scale-95 transition-all"
            title={isMaximized ? 'Restore Down' : 'Maximize'}
          >
            <Square size={8} strokeWidth={4} />
          </button>

          {/* Classic Red Close Button from Theme */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="window-control-btn w-5 h-5 bg-[#e31212] border border-white flex items-center justify-center text-xs text-white hover:brightness-110 rounded-sm font-bold active:scale-95 transition-all"
            title="Close"
          >
            <X size={11} strokeWidth={4} />
          </button>
        </div>
      </div>

      {/* Primary Inset Body */}
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col border-[2px] border-inset border-[#d3d3d3]">
        {children}
      </div>
    </div>
  );
}
