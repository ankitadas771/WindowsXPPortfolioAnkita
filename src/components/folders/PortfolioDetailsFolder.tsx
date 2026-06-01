import React, { useState } from 'react';
import { Settings, Shield, RefreshCw, Layers, Monitor, HelpCircle, Volume2, VolumeX, Play, Trash2, CheckCircle } from 'lucide-react';
import { 
  playStartupSound, 
  playWindowOpenSound, 
  playWindowCloseSound, 
  playWindowMinimizeSound, 
  playWindowMaximizeSound, 
  playErrorSound, 
  playInterfaceClickSound,
  isSoundEnabled,
  setSoundEnabled
} from '../../utils/audio';

export default function PortfolioDetailsFolder() {
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleSoundState = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setSoundEnabled(nextState);
    
    if (nextState) {
      playInterfaceClickSound();
    }
  };

  const testSound = (soundType: string, selectFunc: () => void) => {
    selectFunc();
  };

  const handleResetLayout = () => {
    playInterfaceClickSound();
    const confirmed = window.confirm("Are you sure you want to restore default positions? All windows will reset to their starting coordinates and the page will reload.");
    if (confirmed) {
      localStorage.removeItem('ankita_portfolio_windows_layout_v2');
      window.location.reload();
    }
  };

  const showFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  };

  return (
    <div className="bg-[#ece9d8] h-full p-4 font-sans select-none overflow-y-auto text-xs md:text-sm text-gray-800">
      
      {/* Page header (Classic Control Panel Header) */}
      <div className="border-b-2 border-[#002d96] pb-2 mb-4">
        <h1 className="text-xl font-extrabold text-[#002d96] flex items-center gap-2">
          <Settings className="text-[#0a53de]" />
          <span>Control Panel - Portfolio System Properties</span>
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Review system configuration variables, preview nostalgic sound effects, or reset window coordinate coordinates.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-2.5 rounded-md mb-4 flex items-center gap-2 font-bold animate-pulse">
          <CheckCircle size={14} className="text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main grids panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Panel 1: Stack Specs */}
        <div className="bg-white rounded border border-[#a0a0a0] p-4 flex flex-col gap-2 shadow-sm">
          <h2 className="text-[#0a53de] font-bold text-xs uppercase tracking-wider border-b pb-1.5 mb-1.5 flex items-center gap-1.5">
            <Layers size={14} className="text-[#0a53de]" />
            <span>Architecture & Stack</span>
          </h2>
          <div className="text-xs space-y-2 text-gray-700">
            <p>
              This entire web system resides inside a decoupled reactive container client, compiled dynamically utilizing Vite and loaded on standard modern browsers.
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-slate-50 p-2.5 rounded border">
              <div>⚙ IDE Core: React v19</div>
              <div>⚡ Engine: Vite v6</div>
              <div>🎨 CSS Specs: Tailwind v4</div>
              <div>⏳ Motion: Motus @ 12.0</div>
            </div>
          </div>
        </div>

        {/* Panel 2: Sound Scheme Tester */}
        <div className="bg-white rounded border border-[#a0a0a0] p-4 flex flex-col gap-2 shadow-sm">
          <h2 className="text-[#0a53de] font-bold text-xs uppercase tracking-wider border-b pb-1.5 mb-1.5 flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Volume2 size={14} className="text-sky-600" />
              <span>Nostalgic Sound Scheme</span>
            </span>
            <button 
              onClick={toggleSoundState}
              className={`flex items-center gap-1 px-1.5 py-0.5 border text-[10px] rounded cursor-pointer font-bold select-none transition-colors ${
                soundActive 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
              }`}
            >
              {soundActive ? <Volume2 size={11} /> : <VolumeX size={11} />}
              <span>{soundActive ? "Mute All" : "Unmute"}</span>
            </button>
          </h2>
          <div className="text-xs space-y-2 text-gray-700">
            <p className="text-[10px] text-gray-500">Click preview arrow button of any event sound to test audio feedback:</p>
            <div className="grid grid-cols-2 gap-1 px-1">
              {[
                { name: "XP Boot Chime", action: playStartupSound },
                { name: "Folder Select", action: playInterfaceClickSound },
                { name: "Minimize Frame", action: playWindowMinimizeSound },
                { name: "Maximize Frame", action: playWindowMaximizeSound },
                { name: "Open File/Folder", action: playWindowOpenSound },
                { name: "Error Alert Tone", action: playErrorSound },
              ].map((sound) => (
                <button
                  key={sound.name}
                  onClick={() => testSound(sound.name, sound.action)}
                  className="flex items-center justify-between text-left px-2 py-1 hover:bg-slate-50 border border-slate-100 hover:border-slate-300 rounded font-bold text-[10px] text-sky-800 shrink-0 select-none active:scale-95 transition-transform"
                >
                  <span>{sound.name}</span>
                  <Play size={10} className="text-sky-600 fill-sky-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3: Diagnostics & Position Reset */}
        <div className="bg-white rounded border border-[#a0a0a0] p-4 flex flex-col justify-between gap-2 shadow-sm">
          <div>
            <h2 className="text-[#0a53de] font-bold text-xs uppercase tracking-wider border-b pb-1.5 mb-1.5 flex items-center gap-1.5">
              <Shield size={14} className="text-[#0a53de]" />
              <span>Layout Management</span>
            </h2>
            <div className="text-[11px] text-gray-600 leading-normal space-y-2">
              <p>
                Windows coordinate positions, resizing patterns, and minimized tasks are stored securely inside LocalStorage to maintain layout setups after tab reloads.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleResetLayout}
            className="w-full mt-2 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 rounded cursor-pointer font-bold flex items-center justify-center gap-1.5 hover:shadow-sm active:scale-95 transition-transform"
          >
            <Trash2 size={13} className="text-sky-700" />
            <span>Reset Saved Window Layouts</span>
          </button>
        </div>

        {/* Panel 4: Help Support */}
        <div className="bg-white rounded border border-[#a0a0a0] p-4 flex flex-col gap-2 shadow-sm justify-between">
          <div>
            <h2 className="text-[#0a53de] font-bold text-xs uppercase tracking-wider border-b pb-1.5 mb-1.5 flex items-center gap-1.5">
              <HelpCircle size={14} className="text-amber-500" />
              <span>Diagnostic Support</span>
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              If any window seems dragged off-screen, or is unreachable, use the reset options on the left to perfectly restore all windows to safe defaults cleanly.
            </p>
          </div>
          <div className="text-[10px] font-mono text-gray-400 text-right mt-2">
            Build Hash: 2a255bd8-2789 (STABLE)
          </div>
        </div>

      </div>

      <div className="mt-4 bg-sky-50 border border-sky-200 p-3 rounded text-sky-800 flex gap-2 items-center text-xs">
        <RefreshCw size={16} className="text-sky-600 animate-spin-slow shrink-0" />
        <p>
          <strong>HINT:</strong> Hover or drag windows by clicking and holding their blue header title bars! Double click the title-bar of any window to maximize it!
        </p>
      </div>
    </div>
  );
}
