import React from 'react';

interface DesktopIconProps {
  id: string;
  title: string;
  onClick: () => void;
  iconType?: 'folder' | 'resume' | 'skills' | 'projects' | 'contact' | 'portfolio' | 'education' | 'internet_explorer' | 'recycle_bin' | 'linkedin' | 'github' | 'pictures';
}

export default function DesktopIcon({ id, title, onClick, iconType = 'folder' }: DesktopIconProps) {
  
  // Custom styled SVG for diverse classic icon styles
  const getIcon = () => {
    switch(iconType) {
      case 'pictures':
        return (
          <div className="relative">
            {/* Classic XP Pictures folder shape (yellow folder with stack of cards coming out of it) */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C4 10.8954 4.89543 10 6 10H18L24 16H42C43.1046 16 44 16.8954 44 18V42C44 43.1046 43.1046 44 42 44H6C4.89543 44 4 43.1046 4 42V12Z" fill="#FFE082" stroke="#FFB300" strokeWidth="2"/>
              {/* White photo backing with rotation slant */}
              <rect x="12" y="18" width="24" height="18" rx="1" fill="#FFFFFF" stroke="#007ACC" strokeWidth="1.5" transform="rotate(-6 24 27)" />
              <rect x="14" y="20" width="20" height="14" fill="#60A5FA" transform="rotate(-6 24 27)" />
              {/* Folder foreground flap outline */}
              <path d="M4 22H44V42C44 43.1046 43.1046 44 42 44H6C4.89543 44 4 43.1046 4 42V22Z" fill="#FFCA28" stroke="#FFA000" strokeWidth="1.5" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-sky-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow">
              🖼
            </div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="relative">
            {/* Retro blue glass style block */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="36" height="36" rx="6" fill="#0077B5" stroke="#005A9C" strokeWidth="2" />
              {/* Retro inner gradient illusion */}
              <rect x="8" y="8" width="32" height="15" fill="#50AEE4" opacity="0.4" />
              {/* White "in" text styled vintage */}
              <text x="13" y="32" fill="white" fontSize="24" fontFamily="Impact, Arial Black, sans-serif" fontWeight="bold">in</text>
            </svg>
            {/* Retro shortcut arrow overlay! */}
            <div className="absolute top-0 right-0 bg-blue-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow select-none leading-none w-4 h-4 flex items-center justify-center">
              ↗
            </div>
          </div>
        );
      case 'github':
        return (
          <div className="relative">
            {/* Retro computer terminal style with Octocat silhouette */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="36" height="36" rx="4" fill="#24292F" stroke="#161B22" strokeWidth="2" />
              {/* Outer computer monitor / floppy disk theme */}
              <rect x="8" y="8" width="32" height="32" fill="#0D1117" rx="2" />
              {/* Retro Green outline Octocat body concept or cool custom Octocat paths */}
              <path d="M24 10C16.3 10 10 16.3 10 24C10 30.2 14 35.4 19.5 37.2C20.2 37.3 20.5 36.9 20.5 36.5C20.5 36.2 20.5 35.2 20.5 34.1C16.6 34.9 15.8 32.2 15.8 32.2C15.2 30.6 14.3 30.1 14.3 30.1C13 29.2 14.4 29.2 14.4 29.2C15.8 29.3 16.6 30.7 16.6 30.7C17.9 32.9 19.9 32.3 20.7 32C20.8 31 21.2 30.3 21.7 29.9C18.6 29.5 15.3 28.3 15.3 23C15.3 21.5 15.8 20.3 16.7 19.3C16.6 19 16.1 17.6 16.8 15.7C16.8 15.7 17.9 15.3 20.5 17.1C21.6 16.8 22.8 16.6 24 16.6C25.2 16.6 26.4 16.8 27.5 17.1C30.1 15.3 31.2 15.7 31.2 15.7C31.9 17.6 31.4 19 31.3 19.3C32.2 20.3 32.7 21.5 32.7 23C32.7 28.3 29.4 29.5 26.3 29.9C26.8 30.3 27.2 31.1 27.2 32.3C27.2 34 27.2 35.4 27.2 35.8C27.2 36.2 27.5 36.6 28.2 36.5C33.7 35.2 38 30.1 38 24C38 16.3 31.7 10 24 10Z" fill="#39D353" />
            </svg>
            {/* Retro shortcut arrow overlay! */}
            <div className="absolute top-0 right-0 bg-emerald-500 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow select-none leading-none w-4 h-4 flex items-center justify-center">
              ↗
            </div>
          </div>
        );
      case 'internet_explorer':
        return (
          <div className="relative">
            {/* Classic Internet Explorer Blue "e" with Golden Orbit Ring */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Golden/Yellow Orbit Ring */}
              <ellipse cx="23" cy="25" rx="20" ry="6" stroke="#DFAC00" strokeWidth="3" transform="rotate(-30 23 25)" fill="none" />
              {/* Bold Blue "e" body */}
              <path d="M34 22C34 14.5 28 11 22 11C15 11 10 16.5 10 24C10 31.5 16 37 23 37C29 37 34.5 33 35.5 27H21V22H34Z" fill="#007ACC" stroke="#005AA0" strokeWidth="1.5" />
              {/* "e" inner curve overlay for depth */}
              <path d="M12.5 21C13.8 17 17.5 14 21.5 14C26.5 14 29.5 17 29.8 21H12.5Z" fill="#A0E0FF" />
              {/* Front side of the Golden Orbit Ring for proper layering/overlap feel */}
              <path d="M5 33C14 41 29 36 38 31" stroke="#FFD800" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            </svg>
            <div className="absolute -bottom-1 -right-0.5 bg-sky-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow animate-pulse">
              e
            </div>
          </div>
        );
      case 'recycle_bin':
        return (
          <div className="relative">
            {/* Retro classic silver/grey recycling bin with green arrows */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Bin container body */}
              <path d="M12 12H36V38C36 40.2 34.2 42 32 42H16C13.8 42 12 40.2 12 38V12Z" fill="#CCD1D9" stroke="#656D78" strokeWidth="2" />
              {/* Bin top collar */}
              <rect x="10" y="8" width="28" height="4" rx="1" fill="#AAB2BD" stroke="#434A54" strokeWidth="2" />
              {/* Bin grid pattern slats */}
              <line x1="18" y1="16" x2="18" y2="36" stroke="#656D78" strokeWidth="2" strokeLinecap="round" />
              {/* Recycle Green Badge arrow symbol */}
              <line x1="24" y1="16" x2="24" y2="36" stroke="#656D78" strokeWidth="2" strokeLinecap="round" />
              <line x1="30" y1="16" x2="30" y2="36" stroke="#656D78" strokeWidth="2" strokeLinecap="round" />
              {/* Green recycle symbol overlay */}
              <circle cx="24" cy="26" r="6" fill="#8CC152" stroke="#4A89DC" strokeWidth="1" />
              <path d="M22 26H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="absolute -bottom-1 -right-0.5 bg-emerald-500 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow">
              ♻
            </div>
          </div>
        );
      case 'resume':
        return (
          <div className="relative">
            {/* Blue WordPad paper sheet icon */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6C10 4.89543 10.8954 4 12 4H30L38 12V42C38 43.1046 37.1046 44 36 44H12C10.8954 44 10 43.1046 10 42V6Z" fill="#F1F5F9" stroke="#1E40AF" strokeWidth="2"/>
              <path d="M30 4V12H38" fill="none" stroke="#1E40AF" strokeWidth="2"/>
              <line x1="16" y1="20" x2="32" y2="20" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="26" x2="32" y2="26" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
              <line x1="16" y1="32" x2="26" y2="32" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold select-none">
              w
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="relative">
            {/* Floppy disc or tools icon */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="36" height="36" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
              <rect x="14" y="6" width="20" height="12" fill="#F1F5F9" stroke="#1D4ED8" strokeWidth="2"/>
              <rect x="24" y="8" width="6" height="8" fill="#1D4ED8"/>
              <rect x="12" y="24" width="24" height="18" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2"/>
              <line x1="16" y1="28" x2="32" y2="28" stroke="#93C5FD" strokeWidth="2"/>
              <line x1="16" y1="34" x2="32" y2="34" stroke="#93C5FD" strokeWidth="2"/>
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow">
              ⚙
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="relative">
            {/* Pictures / Media icon */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="8" width="36" height="32" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2" />
              <circle cx="16" cy="18" r="4" fill="#FEE2E2" />
              <path d="M10 38L22 24L30 32L38 22L42 27V38H10Z" fill="#D1FAE5" stroke="#047857" strokeWidth="1.5" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow animate-pulse">
              ▶
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="relative">
            {/* Connection / Outlook Setup icon */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="36" height="28" rx="2" fill="#F3F4F6" stroke="#DC2626" strokeWidth="2"/>
              <path d="M6 12L24 26L42 12" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="36" cy="32" r="6" fill="#10B981" />
              <path d="M33 32L35 34L39 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'portfolio':
        return (
          <div className="relative">
            {/* Network / Internet Explorer style */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="16" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2"/>
              <ellipse cx="24" cy="24" rx="16" ry="6" stroke="#1E40AF" strokeWidth="1.5" fill="none"/>
              <ellipse cx="24" cy="24" rx="6" ry="16" stroke="#1E40AF" strokeWidth="1.5" fill="none"/>
              <line x1="8" y1="24" x2="40" y2="24" stroke="#1E40AF" strokeWidth="1.5"/>
              <line x1="24" y1="8" x2="24" y2="40" stroke="#1E40AF" strokeWidth="1.5"/>
            </svg>
            <div className="absolute -bottom-1 -right-0.5 bg-blue-700 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow">
              i
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="relative">
            {/* Academic scroll / degree icon */}
            <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 8L6 17L24 26L42 17L24 8Z" fill="#F8FAFC" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 21V31C12 34 17 37 24 37C31 37 36 34 36 31V21" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M38 19V33" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="38" cy="34" r="2" fill="#DC2626" />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-violet-600 rounded-full p-0.5 text-[8px] text-white border border-white font-extrabold shadow">
              ★
            </div>
          </div>
        );
      case 'folder':
      default:
        return (
          <svg className="w-12 h-12 filter drop-shadow" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10C4 8.89543 4.89543 8 6 8H18L24 14H42C43.1046 14 44 14.8954 44 16V40C44 41.1046 43.1046 42 42 42H6C4.89543 42 4 41.1046 4 40V10Z" fill="#FFE082" stroke="#FFB300" strokeWidth="2"/>
            <path d="M4 16H44" stroke="#FFB300" strokeWidth="2"/>
            <path d="M12 22H36" stroke="#FFE082" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  return (
    <div
      id={`shortcut-${id}`}
      onClick={onClick}
      className="w-20 md:w-24 p-2 rounded-lg flex flex-col items-center gap-1.5 cursor-pointer hover:bg-white/20 hover:backdrop-blur-sm group select-none transition-all duration-150 active:scale-95 text-center"
    >
      {/* Icon Frame */}
      <div className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110">
        {getIcon()}
      </div>

      {/* Title label */}
      <span 
        className="text-[11px] md:text-xs text-white text-medium font-semibold select-none leading-snug px-1 rounded bg-black/30 font-sans tracking-wide truncate max-w-full drop-shadow-md border border-transparent group-hover:bg-blue-800/80 group-hover:border-blue-600"
        style={{
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.95)'
        }}
      >
        {title}
      </span>
    </div>
  );
}
