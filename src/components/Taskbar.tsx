import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wifi, Minimize } from 'lucide-react';

interface WindowItem {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isActive: boolean;
}

interface TaskbarProps {
  windows: WindowItem[];
  onStartToggle: () => void;
  isStartOpen: boolean;
  onToggleWindow: (id: string) => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export default function Taskbar({ 
  windows, 
  onStartToggle, 
  isStartOpen, 
  onToggleWindow,
  soundEnabled,
  onSoundToggle
}: TaskbarProps) {
  const [time, setTime] = useState('');

  // Update Digital Clock Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // convert '0' to '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="taskbar"
      className="fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] border-t border-[#1a4bb3] flex justify-between items-center select-none z-40 font-sans"
    >
      
      {/* Start Button & Active Launchers */}
      <div className="flex items-center gap-1 flex-1 min-w-0 pr-2 pl-0.5">
        {/* Iconic Green Curved Start Button from Professional Polish */}
        <button
          onClick={onStartToggle}
          className={`h-9 px-4 bg-gradient-to-b from-[#388e3c] to-[#1b5e20] rounded-r-2xl border-r-2 border-green-800 shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-100 ${
            isStartOpen ? 'brightness-90' : ''
          }`}
          style={{
            boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.4)',
          }}
        >
          {/* Visual XP Flag Representation (Green, Red, Blue, Yellow dots grid) */}
          <div className="grid grid-cols-2 gap-[2.5px] rotate-6 scale-95 shrink-0">
            <div className="w-2.5 h-2.5 rounded-tl-[30%] bg-[#ef3b24] shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-tr-[30%] bg-[#4fae29] shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-bl-[30%] bg-[#00a1e1] shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-br-[30%] bg-[#f9bc06] shadow-sm"></div>
          </div>
          <span 
            className="text-white font-black italic tracking-tight font-sans text-xs md:text-sm drop-shadow"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            start
          </span>
        </button>

        {/* Running Windows Task Slots */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-0.5 ml-2">
          {windows.filter(w => w.isOpen).map((win) => (
            <button
              key={win.id}
              onClick={() => onToggleWindow(win.id)}
              className={`h-8 px-2 md:px-3 rounded-sm flex items-center gap-1.5 justify-start max-w-[130px] md:max-w-[150px] border select-none transition-all ${
                win.isActive
                  ? 'bg-[#1b4cb3] border-[#0a2e85] text-white font-semibold shadow-inner'
                  : 'bg-[#3c81f3] border-t border-[#6cb0f9] border-r border-[#1a4bb3] border-b border-[#1a4bb3] border-l border-[#6cb0f9] text-white/95 hover:bg-[#4d94f7]'
              }`}
            >
              <span className="text-[10px] md:text-xs text-white">📂</span>
              <span className="text-[10px] md:text-xs truncate text-[11px] font-sans md:font-semibold">
                {win.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Extreme Right System Tray (Clock box background and borders) */}
      <div 
        className="h-full bg-gradient-to-b from-[#0996f1] to-[#085dad] border-l-2 border-[#003da6] flex items-center justify-end gap-2.5 px-3 shrink-0"
      >
        <div className="flex gap-2 items-center text-sky-100 select-none">
          {/* Global Sound Control button configured beautifully */}
          <button 
            onClick={onSoundToggle}
            className={`p-1 rounded cursor-pointer transition-all flex items-center justify-center outline-none ${
              soundEnabled ? 'hover:text-white hover:bg-white/10 text-emerald-300' : 'text-red-400 hover:bg-white/10 hover:text-red-300'
            }`}
            title={soundEnabled ? "Mute Portfolio Sounds" : "Unmute Portfolio Sounds"}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>
          
          <Wifi size={13} className="hover:text-white cursor-pointer active:scale-90 hidden sm:block" title="Connected" />
        </div>
        
        <span className="text-gray-200 text-[10px] hidden md:block select-none opacity-50">|</span>

        {/* CLOCK TEXT - professional text styling */}
        <span 
          id="digital-clock"
          className="text-white text-xs font-semibold tabular-nums select-none tracking-wide text-center"
          style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}
        >
          {time || '17:47 PM'}
        </span>
      </div>

    </div>
  );
}
