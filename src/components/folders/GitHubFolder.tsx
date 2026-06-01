import React from 'react';
import { Terminal, GitPullRequest, Code2, AlertCircle, RefreshCw, Star, Info, ArrowUpRight } from 'lucide-react';
import { playInterfaceClickSound } from '../../utils/audio';

export default function GitHubFolder() {
  const githubUrl = "https://github.com/ankitadas771";

  const handleLaunchClick = () => {
    playInterfaceClickSound();
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#ece9d8] h-full flex flex-col font-sans select-none text-xs text-gray-800">
      
      {/* Dynamic Header */}
      <div className="bg-[#24292F] p-4 text-white flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-[#39D353]" />
          <div>
            <h2 className="text-xs font-bold font-mono text-[#39D353]">C:\SYSTEM32\GITHUB_EXPLORER.EXE</h2>
            <p className="text-[9px] text-gray-400 font-mono">Syncing active code repositories with 'ankitadas771'...</p>
          </div>
        </div>
        <div className="bg-[#161B22] border border-gray-700 px-2.5 py-1 rounded text-[10px] text-gray-300 font-mono hidden sm:block animate-pulse">
          Branch: main
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Information Pane */}
        <div className="w-44 bg-[#0d1117] p-3 text-gray-300 border-r border-black flex flex-col gap-3 select-none overflow-y-auto font-mono text-[10px] hidden md:block">
          <div className="bg-[#161B22] border border-gray-800 p-2 rounded">
            <div className="text-[#39D353] font-bold mb-1.5 flex items-center gap-1">
              <span>[REPOS SPEC]</span>
            </div>
            <ul className="space-y-1 text-gray-400">
              <li>- Owner: @ankitadas771</li>
              <li>- Protocol: HTTPS</li>
              <li>- State: STABLE</li>
              <li>- Engine: GITHUB_API</li>
            </ul>
          </div>
          
          <div className="bg-[#161B22] border border-gray-800 p-2 rounded text-gray-400 space-y-1">
            <span className="text-[#39D353] font-bold block mb-1">[HINT]</span>
            <p className="leading-tight">Run source checks or explore web commits directly via the online portal.</p>
          </div>
        </div>

        {/* Right Active Terminal Console Area */}
        <div className="flex-1 p-4 bg-[#0d1117] text-[#39D353] font-mono overflow-y-auto flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="border border-green-800/60 bg-[#161b22]/50 p-2.5 rounded-md text-gray-300 leading-normal text-[11px]">
              <span className="text-green-400 font-bold">$ cat profile_info.md</span>
              <p className="text-gray-300 mt-1.5 leading-relaxed font-sans">
                Welcome to Ankita Das's open source code library. This is where her customized HTML5 canvas routines, react state trees, and UI/UX template portfolios are verifiably stored.
              </p>
            </div>

            {/* Commits logs mockup */}
            <div className="space-y-1 select-none">
              <span className="text-green-400 font-bold text-[10px]">$ git log --oneline -n 3</span>
              <div className="text-[10px] text-gray-400 space-y-1">
                <div className="flex gap-2">
                  <span className="text-yellow-600">f49b10c</span>
                  <span>feat: Implement retro Windows XP emulator shell system</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-yellow-600">3a01ff2</span>
                  <span>refactor: Optimize layout flow, negative padding tracking</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-yellow-600">8bc50e1</span>
                  <span>docs: Update resume.rtf and skills categories logs</span>
                </div>
              </div>
            </div>

            {/* Language distribution indicators */}
            <div className="space-y-1 pt-1">
              <span className="text-gray-400 text-[9px] uppercase tracking-wider block font-bold">Workspace Language Statistics:</span>
              <div className="w-full bg-[#161b22] h-2 rounded overflow-hidden flex border border-gray-800">
                <div className="bg-sky-500 w-1/2 h-full" title="React / TypeScript"></div>
                <div className="bg-yellow-400 w-1/3 h-full" title="JavaScript"></div>
                <div className="bg-purple-600 w-1/6 h-full" title="CSS / HTML"></div>
              </div>
              <div className="flex gap-3 text-[9px] text-gray-400 font-mono mt-1">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>TypeScript (50%)</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>JavaScript (33%)</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>Styling (17%)</span>
              </div>
            </div>
          </div>

          {/* Sync action terminal line redirect */}
          <div className="border-t border-green-900/50 pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-gray-500 font-mono italic text-[9px]">
              Ready to execute redirection sequence...
            </span>

            <button
              onClick={handleLaunchClick}
              className="px-5 py-2.5 bg-[#24292F] hover:bg-[#2c323a] text-white border-2 border-slate-700 rounded-md cursor-pointer flex items-center gap-1.5 font-bold font-mono text-xs select-none shadow active:scale-95 transition-transform"
            >
              <GitPullRequest size={13} className="text-[#39D353]" />
              <span>Explore github.com/ankitadas771</span>
              <ArrowUpRight size={13} className="text-[#39D353]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
