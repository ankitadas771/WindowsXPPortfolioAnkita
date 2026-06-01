import React from 'react';
import { FileText, Cpu, Image, Mail, Settings, GraduationCap, LogOut, Power, Terminal, Globe, Trash2 } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  onTurnOff: () => void;
}

export default function StartMenu({ isOpen, onClose, onOpenWindow, onTurnOff }: StartMenuProps) {
  if (!isOpen) return null;

  const handleProgramClick = (id: string) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <div 
      id="start-menu"
      className="absolute bottom-10 left-1 w-80 md:w-96 bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] rounded-t-lg shadow-2xl border border-[#1a4bb3] overflow-hidden select-none z-40 flex flex-col font-sans"
    >
      {/* Start Menu Header Banner with Professional Polish matching aesthetics */}
      <div className="bg-gradient-to-r from-[#0058e6] via-[#248ef3] to-[#0058e6] p-3 text-white flex items-center gap-3 border-b-2 border-[#ff9000] shadow-md">
        {/* User avatar/orbit circle */}
        <div className="w-10 h-10 rounded-full border-2 border-white/60 bg-sky-300 overflow-hidden flex items-center justify-center font-extrabold text-blue-900 text-lg shadow">
          AD
        </div>
        <div>
          <h2 className="font-bold text-xs md:text-sm tracking-wide">Ankita Das</h2>
          <p className="text-[10px] text-sky-200 uppercase font-mono tracking-widest font-bold">Front-end Developer | UI/UX</p>
        </div>
      </div>

      {/* Start Menu Body (Two column classic XP workspace layout) */}
      <div className="flex bg-white text-xs text-gray-800">
        
        {/* Left Column (Pinned Apps / Program Lists in white) */}
        <div className="flex-1 p-2 flex flex-col gap-1.5 justify-start bg-slate-50 border-r border-slate-200">
          <div className="text-[10px] text-gray-400 font-bold uppercase px-2 mb-1 tracking-wider">Fast Access Core</div>
          
          {/* Programs lists */}
          <button 
            onClick={() => handleProgramClick('resume')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-blue-100 group-hover:bg-blue-600 rounded">
              <FileText size={16} className="text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Ankita_Resume.rtf</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">WordPad RTF Profile</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('skills')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-yellow-105 bg-amber-50 group-hover:bg-amber-600 rounded">
              <Cpu size={16} className="text-amber-600 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Tools & Skills</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Core Developer Stack</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('projects')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-emerald-50 group-hover:bg-emerald-600 rounded">
              <Image size={16} className="text-emerald-600 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">My Projects</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Design & Code Showcase</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('education')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-purple-55 bg-indigo-50 group-hover:bg-indigo-600 rounded">
              <GraduationCap size={16} className="text-indigo-600 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Education Details</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Academic Landmarks</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('contact')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-red-50 group-hover:bg-red-600 rounded">
              <Mail size={16} className="text-red-500 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Configure SMTP Link</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Contact Connection Wizard</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('internet_explorer')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-sky-50 group-hover:bg-blue-600 rounded animate-pulse">
              <Globe size={16} className="text-[#0a53de] group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Internet Explorer</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Retro Web Browser</div>
            </div>
          </button>

          <button 
            onClick={() => handleProgramClick('recycle_bin')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-emerald-50 group-hover:bg-emerald-600 rounded">
              <Trash2 size={16} className="text-emerald-600 group-hover:text-white" />
            </div>
            <div>
              <div className="font-bold">Recycle Bin</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Clear discarded trash data</div>
            </div>
          </button>

          {/* Divider line */}
          <div className="border-t border-dashed border-gray-200 my-1"></div>

          {/* Simulated classic MS-DOS CLI shell program shortcut */}
          <button 
            onClick={() => handleProgramClick('portfolio')}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-xp-blue hover:text-white rounded text-left group transition-all"
          >
            <div className="p-1 bg-slate-900 rounded">
              <Terminal size={14} className="text-green-500" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold">Diagnostics Console</div>
              <div className="text-[9px] text-gray-400 group-hover:text-sky-200">Runtime environment parameters</div>
            </div>
          </button>
        </div>

        {/* Right Column (Standard user areas, colored light blue palette, classic XP look) */}
        <div className="w-36 bg-[#cfdfe6]/90 p-2 flex flex-col gap-2 pb-6 border-l border-white/60">
          <div className="text-[10px] text-slate-500 font-bold uppercase px-1 mb-1 tracking-wider">My Computer</div>
          
          <button 
            onClick={() => handleProgramClick('resume')} 
            className="w-full text-left font-semibold text-sky-900 hover:text-sky-700 hover:underline px-1 py-0.5"
          >
            My Documents
          </button>
          
          <button 
            onClick={() => handleProgramClick('pictures')} 
            className="w-full text-left font-semibold text-sky-900 hover:text-sky-700 hover:underline px-1 py-0.5"
          >
            My Pictures
          </button>
          
          <button 
            onClick={() => handleProgramClick('skills')} 
            className="w-full text-left font-semibold text-sky-900 hover:text-sky-700 hover:underline px-1 py-0.5"
          >
            My Computer
          </button>

          <div className="border-t border-[#b4cfdc] my-1"></div>

          <button 
            onClick={() => handleProgramClick('portfolio')} 
            className="w-full text-left flex items-center gap-1.5 font-semibold text-sky-900 hover:text-sky-700 hover:underline px-1 py-0.5"
          >
            <Settings size={12} className="text-sky-700" />
            <span>Control Panel</span>
          </button>

          <button 
            onClick={() => alert("Windows XP Help Services are online! To reset any elements, click the respective folder icons on the screen.")} 
            className="w-full text-left flex items-center gap-1.5 font-semibold text-sky-900 hover:text-sky-700 hover:underline px-1"
          >
            <span className="text-yellow-600 font-bold">?</span>
            <span>Help & Support</span>
          </button>
        </div>
      </div>

      {/* Start Menu Footer (Classic dark blue XP bar holding session modifiers) */}
      <div className="bg-[#0038a8] px-3 py-2.5 flex justify-between items-center text-white border-t border-white/20">
        <span className="text-[10px] font-mono opacity-60">System ID: 2a255bd8</span>
        <div className="flex gap-4">
          {/* Simulated Log Off button */}
          <button 
            onClick={() => {
              onClose();
              alert("Logging Off current administrator session... Thank you for visiting Ankita Das portfolio!");
            }}
            className="flex items-center gap-1 hover:text-amber-300 font-semibold cursor-pointer active:scale-95 text-[11px]"
          >
            <LogOut size={14} className="text-amber-400" />
            <span>Log Off</span>
          </button>

          {/* Simulated Turn Off Computer button */}
          <button 
            onClick={() => {
              onClose();
              onTurnOff();
            }}
            className="flex items-center gap-1 hover:text-rose-300 font-semibold cursor-pointer active:scale-95 text-[11px]"
          >
            <Power size={14} className="text-rose-500" />
            <span>Turn Off Computer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
