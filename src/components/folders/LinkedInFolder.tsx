import React from 'react';
import { Globe, UserPlus, Info, ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';
import { playInterfaceClickSound } from '../../utils/audio';

export default function LinkedInFolder() {
  const profileUrl = "https://www.linkedin.com/in/ankita-das-9635b1315?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const handleConnectClick = () => {
    playInterfaceClickSound();
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#ece9d8] h-full flex flex-col font-sans select-none text-xs text-gray-800">
      
      {/* Top Banner (Wizard header) */}
      <div className="bg-gradient-to-r from-[#004E85] via-[#0077B5] to-[#4AA7DE] p-4 text-white flex items-center justify-between border-b border-[#004e85]">
        <div>
          <h2 className="text-sm font-extrabold tracking-wide uppercase">LinkedIn Profile Connection Wizard</h2>
          <p className="text-[10px] text-sky-100 mt-0.5">Establishing secure handshake with Ankita Das's professional network...</p>
        </div>
        <div className="text-2xl font-black font-serif italic tracking-tighter opacity-80 px-2 select-none">
          in
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left task pane */}
        <div className="w-40 bg-[#7aa1e6]/10 border-r border-[#dfd7c0] p-3 flex flex-col gap-3 select-none overflow-y-auto hidden sm:block">
          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-[#5c85d6] text-white px-2 py-1 font-bold text-[10px] flex justify-between items-center">
              <span>Profile Status</span>
              <ShieldCheck size={10} />
            </div>
            <div className="p-2 space-y-1 text-[10px] text-gray-600 font-mono">
              <div>• Status: <span className="text-emerald-600 font-bold">ONLINE</span></div>
              <div>• Network: <span className="text-sky-700 font-bold">70+ contacts</span></div>
              <div>• Visibility: <span className="text-indigo-600 font-bold">Open Active</span></div>
              <div>• Encryption: <span className="text-yellow-600 font-bold">SSL High</span></div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded">
            <div className="bg-[#5c85d6] text-white px-2 py-1 font-bold text-[10px] flex justify-between items-center">
              <span>Quick Tips</span>
              <Info size={10} />
            </div>
            <p className="p-2 text-[10px] text-gray-500 leading-normal">
              Endorse Ankita's React and Tailwind modules to boost diagnostic confidence ratings!
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* User card header */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0077b5] flex items-center justify-center text-white font-extrabold text-xl shadow select-none">
                AD
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#0077b5] flex items-center gap-1.5">
                  Ankita Das
                  <span className="bg-amber-100 text-amber-800 text-[8px] px-1 py-0.5 rounded font-mono font-bold">1st Connection</span>
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold">Front-End Engineer & UI/UX</p>
                <p className="text-[10px] text-gray-400">• Metaverse</p>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="text-xs text-gray-700 leading-relaxed font-sans space-y-2">
              <p>
                Ankita Das's official LinkedIn repository is ready to receive network handshakes. Connecting reveals:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1 select-none text-[11px]">
                <li className="bg-sky-50 border border-sky-100 p-2 rounded flex items-start gap-1.5 text-sky-900">
                  <Award size={14} className="text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[10px] uppercase text-sky-800">Skill Endorsements</strong>
                    React workflows, Tailwind styling grids, User experience.
                  </div>
                </li>
                <li className="bg-emerald-50 border border-emerald-100 p-2 rounded flex items-start gap-1.5 text-emerald-900">
                  <Heart size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[10px] uppercase text-emerald-800">Recommendations</strong>
                    Testimonials from collaborating teams and developers.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Footer Call-To-Action */}
          <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
            <span className="text-[10px] text-gray-400 font-mono italic">
              Click wizard next button to load full web page:
            </span>

            <button
              onClick={handleConnectClick}
              className="px-5 py-2.5 bg-gradient-to-b from-emerald-400 to-emerald-600 border-2 border-emerald-700 hover:from-emerald-300 hover:to-emerald-500 text-white font-extrabold rounded cursor-pointer flex items-center gap-1.5 text-xs select-none shadow hover:shadow-md animate-pulse active:scale-95 transition-transform"
            >
              <UserPlus size={14} />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
