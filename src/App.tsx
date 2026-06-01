import React, { useState, useEffect } from 'react';
import TerminalLoader from './components/TerminalLoader';
import DesktopIcon from './components/DesktopIcon';
import WindowFrame from './components/WindowFrame';
import StartMenu from './components/StartMenu';
import Taskbar from './components/Taskbar';

import ResumeFolder from './components/folders/ResumeFolder';
import SkillsFolder from './components/folders/SkillsFolder';
import ProjectsFolder from './components/folders/ProjectsFolder';
import ContactFolder from './components/folders/ContactFolder';
import PortfolioDetailsFolder from './components/folders/PortfolioDetailsFolder';
import EducationFolder from './components/folders/EducationFolder';
import InternetExplorerFolder from './components/folders/InternetExplorerFolder';
import RecycleBinFolder from './components/folders/RecycleBinFolder';
import LinkedInFolder from './components/folders/LinkedInFolder';
import GitHubFolder from './components/folders/GitHubFolder';
import PicturesFolder from './components/folders/PicturesFolder';

import { WindowState } from './types';
import { 
  playStartupSound, 
  playWindowOpenSound, 
  playWindowCloseSound, 
  playWindowMinimizeSound, 
  playWindowMaximizeSound, 
  playStartMenuSound, 
  playInterfaceClickSound,
  isSoundEnabled, 
  setSoundEnabled 
} from './utils/audio';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  
  // Power states: 'on' | 'turn-off-screen' | 'grayscale-prompt'
  const [powerState, setPowerState] = useState<'on' | 'grayscale-prompt' | 'turned-off'>('on');

  // Currently selected project for simulated internet explorer
  const [selectedDemoProject, setSelectedDemoProject] = useState<any>(null);

  // Multi Window Management States
  const defaultWindows: WindowState[] = [
    {
      id: 'resume',
      title: 'resume.doc - WordPad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 40,
      y: 40,
      width: 600,
      height: 480
    },
    {
      id: 'skills',
      title: 'Tools & Skills Explorer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 80,
      y: 60,
      width: 720,
      height: 460
    },
    {
      id: 'projects',
      title: 'My Projects Gallery',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 120,
      y: 80,
      width: 680,
      height: 480
    },
    {
      id: 'contact',
      title: 'Contact Ankita - Send Message Wizard',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 160,
      y: 100,
      width: 650,
      height: 470
    },
    {
      id: 'portfolio',
      title: 'Control Panel - Portfolio Diagnostics',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 200,
      y: 120,
      width: 620,
      height: 460
    },
    {
      id: 'education',
      title: 'My Academic Milestones',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 240,
      y: 140,
      width: 600,
      height: 450
    },
    {
      id: 'internet_explorer',
      title: 'Internet Explorer - Retro Web Browser',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 100,
      y: 90,
      width: 720,
      height: 520
    },
    {
      id: 'recycle_bin',
      title: 'Recycle Bin',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 150,
      y: 110,
      width: 580,
      height: 420
    },
    {
      id: 'linkedin',
      title: 'LinkedIn - Connect Wizard',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 170,
      y: 130,
      width: 600,
      height: 400
    },
    {
      id: 'github',
      title: 'GitHub - Repository Explorer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 190,
      y: 150,
      width: 600,
      height: 430
    },
    {
      id: 'pictures',
      title: 'My Pictures',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 210,
      y: 170,
      width: 680,
      height: 490
    }
  ];

  const [windows, setWindows] = useState<WindowState[]>(() => {
    try {
      const saved = localStorage.getItem('ankita_portfolio_windows_layout_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return defaultWindows.map(def => {
            const match = parsed.find((w: any) => w && w.id === def.id);
            if (match) {
              return {
                ...def,
                isOpen: typeof match.isOpen === 'boolean' ? match.isOpen : def.isOpen,
                isMinimized: typeof match.isMinimized === 'boolean' ? match.isMinimized : def.isMinimized,
                isMaximized: typeof match.isMaximized === 'boolean' ? match.isMaximized : def.isMaximized,
                zIndex: typeof match.zIndex === 'number' ? match.zIndex : def.zIndex,
                x: typeof match.x === 'number' ? match.x : def.x,
                y: typeof match.y === 'number' ? match.y : def.y,
                width: typeof match.width === 'number' ? match.width : def.width,
                height: typeof match.height === 'number' ? match.height : def.height,
              };
            }
            return def;
          });
        }
      }
    } catch (e) {
      console.warn("Could not load windows layout from localStorage", e);
    }
    return defaultWindows;
  });

  // Max zIndex tracker to always bring window to top
  const [topZIndex, setTopZIndex] = useState(() => {
    try {
      const maxZ = Math.max(...windows.map(w => w.zIndex), 10);
      return maxZ;
    } catch (e) {
      return 10;
    }
  });

  const getWindow = (id: string): WindowState => {
    return windows.find(w => w.id === id) || defaultWindows.find(w => w.id === id) || {
      id,
      title: 'Window',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 100,
      y: 100,
      width: 600,
      height: 400
    };
  };

  // Persist windows updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ankita_portfolio_windows_layout_v2', JSON.stringify(windows));
    } catch (e) {
      console.warn("Could not save windows layout to localStorage", e);
    }
  }, [windows]);

  // Close Start Menu on clicking background
  const handleDesktopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't close if clicking start button or menu itself
    if (!target.closest('#start-menu') && !target.closest('#taskbar') && isStartOpen) {
      setIsStartOpen(false);
    }
  };

  // Open windows on click
  const openWindow = (id: string) => {
    const isMobile = window.innerWidth < 768;
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    playWindowOpenSound();

    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return {
          ...win,
          isOpen: true,
          isMinimized: false,
          // Auto-maximize on small viewports for responsive compliance
          isMaximized: isMobile ? true : win.isMaximized,
          zIndex: nextZ
        };
      }
      return win;
    }));
  };

  // Close windows
  const closeWindow = (id: string) => {
    playWindowCloseSound();
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isOpen: false };
      }
      return win;
    }));
  };

  // Minimize window
  const minimizeWindow = (id: string) => {
    playWindowMinimizeSound();
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isMinimized: true };
      }
      return win;
    }));
  };

  // Maximize toggle
  const toggleMaximizeWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win) {
      if (win.isMaximized) {
        playWindowMinimizeSound(); // sliding back to normal
      } else {
        playWindowMaximizeSound(); // sizing up
      }
    }
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, isMaximized: !win.isMaximized };
      }
      return win;
    }));
  };

  // Set top focus
  const focusWindow = (id: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, zIndex: nextZ, isMinimized: false };
      }
      return win;
    }));
  };

  // Handle position changes during drag
  const handlePositionChange = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, x, y };
      }
      return win;
    }));
  };

  // Bottom taskbar window state clicking options
  const handleTaskbarToggle = (id: string) => {
    const targetWin = windows.find(w => w.id === id);
    if (!targetWin) return;

    if (targetWin.isMinimized || targetWin.zIndex < topZIndex) {
      // Restore or Focus
      focusWindow(id);
    } else {
      // Minimize if already on top
      minimizeWindow(id);
    }
  };

  // Reset positions if windows load abnormally
  const handleResize = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setWindows(prev => prev.map(win => ({
        ...win,
        isMaximized: win.isOpen ? true : win.isMaximized
      })));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine active window status
  const getActiveState = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win || !win.isOpen || win.isMinimized) return false;
    // Active if matches highest z-index among open windows
    const openWins = windows.filter(w => w.isOpen && !w.isMinimized);
    const maxZ = Math.max(...openWins.map(w => w.zIndex), 0);
    return win.zIndex === maxZ;
  };

  const handleBootComplete = () => {
    setBooting(false);
    playStartupSound();
  };

  const handleSoundToggle = () => {
    const nextSoundOn = !soundOn;
    setSoundOn(nextSoundOn);
    setSoundEnabled(nextSoundOn);
    if (nextSoundOn) {
      setTimeout(() => playWindowOpenSound(), 50);
    }
  };

  if (booting) {
    return <TerminalLoader onComplete={handleBootComplete} />;
  }

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden select-none select-none transition-filter duration-[1000ms] ${
        powerState === 'grayscale-prompt' ? 'grayscale brightness-50 duration-500' : ''
      }`}
      onClick={handleDesktopClick}
      style={{
        // High quality Unsplash wallpaper simulating rolling landscape bliss
        backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1920')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      {/* Visual background sky and hills gradient layer overlay for flawless responsive scale fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#25a6f2]/10 via-transparent to-[#24a148]/20 pointer-events-none"></div>

      {/* Desktop Folder Shortcuts Grid (Adapt layout on high resolutions and mobile screens) */}
      <div 
        id="desktop-shortcuts"
        className="absolute top-4 left-4 flex flex-col flex-wrap content-start items-center gap-x-1 sm:gap-x-2 gap-y-2 sm:gap-y-4 max-h-[calc(100vh-85px)] select-none z-10"
      >
        <DesktopIcon 
          id="skills" 
          title="Tools" 
          iconType="skills" 
          onClick={() => openWindow('skills')} 
        />
        <DesktopIcon 
          id="resume" 
          title="Resume" 
          iconType="resume" 
          onClick={() => openWindow('resume')} 
        />
        <DesktopIcon 
          id="projects" 
          title="Projects" 
          iconType="projects" 
          onClick={() => openWindow('projects')} 
        />
        <DesktopIcon 
          id="contact" 
          title="Contacts" 
          iconType="contact" 
          onClick={() => openWindow('contact')} 
        />
        <DesktopIcon 
          id="portfolio" 
          title="Portfolio" 
          iconType="portfolio" 
          onClick={() => openWindow('portfolio')} 
        />
        <DesktopIcon 
          id="education" 
          title="My Education" 
          iconType="education" 
          onClick={() => openWindow('education')} 
        />
        <DesktopIcon 
          id="internet_explorer" 
          title="Internet" 
          iconType="internet_explorer" 
          onClick={() => openWindow('internet_explorer')} 
        />
        <DesktopIcon 
          id="recycle_bin" 
          title="Recycle Bin" 
          iconType="recycle_bin" 
          onClick={() => openWindow('recycle_bin')} 
        />
        <DesktopIcon 
          id="linkedin" 
          title="LinkedIn" 
          iconType="linkedin" 
          onClick={() => openWindow('linkedin')} 
        />
        <DesktopIcon 
          id="github" 
          title="GitHub" 
          iconType="github" 
          onClick={() => openWindow('github')} 
        />
        <DesktopIcon 
          id="pictures" 
          title="My Pictures" 
          iconType="pictures" 
          onClick={() => openWindow('pictures')} 
        />
      </div>

      {/* Interactive Window Layer Container */}
      <div id="desktop-window-workspace" className="absolute top-0 left-0 right-0 bottom-11 p-2 md:p-4 select-none pointer-events-none z-20">
        <div className="relative w-full h-full pointer-events-none">
          
          {/* 1. Resume Tool Frame */}
          <WindowFrame
            id="resume"
            title="resume.doc - WordPad"
            isOpen={getWindow('resume').isOpen}
            isMinimized={getWindow('resume').isMinimized}
            isMaximized={getWindow('resume').isMaximized}
            zIndex={getWindow('resume').zIndex}
            x={getWindow('resume').x}
            y={getWindow('resume').y}
            width={getWindow('resume').width}
            height={getWindow('resume').height}
            onClose={() => closeWindow('resume')}
            onMinimize={() => minimizeWindow('resume')}
            onMaximize={() => toggleMaximizeWindow('resume')}
            onFocus={() => focusWindow('resume')}
            onPositionChange={(x, y) => handlePositionChange('resume', x, y)}
          >
            <ResumeFolder onClose={() => closeWindow('resume')} />
          </WindowFrame>

          {/* 2. Skills Folder Frame */}
          <WindowFrame
            id="skills"
            title="Tools & Skills Explorer"
            isOpen={getWindow('skills').isOpen}
            isMinimized={getWindow('skills').isMinimized}
            isMaximized={getWindow('skills').isMaximized}
            zIndex={getWindow('skills').zIndex}
            x={getWindow('skills').x}
            y={getWindow('skills').y}
            width={getWindow('skills').width}
            height={getWindow('skills').height}
            onClose={() => closeWindow('skills')}
            onMinimize={() => minimizeWindow('skills')}
            onMaximize={() => toggleMaximizeWindow('skills')}
            onFocus={() => focusWindow('skills')}
            onPositionChange={(x, y) => handlePositionChange('skills', x, y)}
          >
            <SkillsFolder />
          </WindowFrame>

          {/* 3. Projects Folder Frame */}
          <WindowFrame
            id="projects"
            title="My Projects Gallery"
            isOpen={getWindow('projects').isOpen}
            isMinimized={getWindow('projects').isMinimized}
            isMaximized={getWindow('projects').isMaximized}
            zIndex={getWindow('projects').zIndex}
            x={getWindow('projects').x}
            y={getWindow('projects').y}
            width={getWindow('projects').width}
            height={getWindow('projects').height}
            onClose={() => closeWindow('projects')}
            onMinimize={() => minimizeWindow('projects')}
            onMaximize={() => toggleMaximizeWindow('projects')}
            onFocus={() => focusWindow('projects')}
            onPositionChange={(x, y) => handlePositionChange('projects', x, y)}
          >
            <ProjectsFolder 
              onLaunchProject={(proj) => {
                setSelectedDemoProject(proj);
                openWindow('internet_explorer');
                focusWindow('internet_explorer');
              }} 
            />
          </WindowFrame>

          {/* 4. Contact Wizard Frame */}
          <WindowFrame
            id="contact"
            title="Contact Ankita - Send Message Wizard"
            isOpen={getWindow('contact').isOpen}
            isMinimized={getWindow('contact').isMinimized}
            isMaximized={getWindow('contact').isMaximized}
            zIndex={getWindow('contact').zIndex}
            x={getWindow('contact').x}
            y={getWindow('contact').y}
            width={getWindow('contact').width}
            height={getWindow('contact').height}
            onClose={() => closeWindow('contact')}
            onMinimize={() => minimizeWindow('contact')}
            onMaximize={() => toggleMaximizeWindow('contact')}
            onFocus={() => focusWindow('contact')}
            onPositionChange={(x, y) => handlePositionChange('contact', x, y)}
          >
            <ContactFolder />
          </WindowFrame>

          {/* 5. Portfolio Panel Specs Frame */}
          <WindowFrame
            id="portfolio"
            title="Control Panel - Portfolio Diagnostics"
            isOpen={getWindow('portfolio').isOpen}
            isMinimized={getWindow('portfolio').isMinimized}
            isMaximized={getWindow('portfolio').isMaximized}
            zIndex={getWindow('portfolio').zIndex}
            x={getWindow('portfolio').x}
            y={getWindow('portfolio').y}
            width={getWindow('portfolio').width}
            height={getWindow('portfolio').height}
            onClose={() => closeWindow('portfolio')}
            onMinimize={() => minimizeWindow('portfolio')}
            onMaximize={() => toggleMaximizeWindow('portfolio')}
            onFocus={() => focusWindow('portfolio')}
            onPositionChange={(x, y) => handlePositionChange('portfolio', x, y)}
          >
            <PortfolioDetailsFolder />
          </WindowFrame>

          {/* 6. Education Checklist Frame */}
          <WindowFrame
            id="education"
            title="My Academic Milestones"
            isOpen={getWindow('education').isOpen}
            isMinimized={getWindow('education').isMinimized}
            isMaximized={getWindow('education').isMaximized}
            zIndex={getWindow('education').zIndex}
            x={getWindow('education').x}
            y={getWindow('education').y}
            width={getWindow('education').width}
            height={getWindow('education').height}
            onClose={() => closeWindow('education')}
            onMinimize={() => minimizeWindow('education')}
            onMaximize={() => toggleMaximizeWindow('education')}
            onFocus={() => focusWindow('education')}
            onPositionChange={(x, y) => handlePositionChange('education', x, y)}
          >
            <EducationFolder />
          </WindowFrame>

          {/* 7. Internet Explorer Browser Frame */}
          <WindowFrame
            id="internet_explorer"
            title="Internet Explorer - Retro Web Browser"
            isOpen={getWindow('internet_explorer').isOpen}
            isMinimized={getWindow('internet_explorer').isMinimized}
            isMaximized={getWindow('internet_explorer').isMaximized}
            zIndex={getWindow('internet_explorer').zIndex}
            x={getWindow('internet_explorer').x}
            y={getWindow('internet_explorer').y}
            width={getWindow('internet_explorer').width}
            height={getWindow('internet_explorer').height}
            onClose={() => closeWindow('internet_explorer')}
            onMinimize={() => minimizeWindow('internet_explorer')}
            onMaximize={() => toggleMaximizeWindow('internet_explorer')}
            onFocus={() => focusWindow('internet_explorer')}
            onPositionChange={(x, y) => handlePositionChange('internet_explorer', x, y)}
          >
            <InternetExplorerFolder 
              project={selectedDemoProject} 
              onClose={() => closeWindow('internet_explorer')} 
            />
          </WindowFrame>

          {/* 8. Recycle Bin Frame */}
          <WindowFrame
            id="recycle_bin"
            title="Recycle Bin"
            isOpen={getWindow('recycle_bin').isOpen}
            isMinimized={getWindow('recycle_bin').isMinimized}
            isMaximized={getWindow('recycle_bin').isMaximized}
            zIndex={getWindow('recycle_bin').zIndex}
            x={getWindow('recycle_bin').x}
            y={getWindow('recycle_bin').y}
            width={getWindow('recycle_bin').width}
            height={getWindow('recycle_bin').height}
            onClose={() => closeWindow('recycle_bin')}
            onMinimize={() => minimizeWindow('recycle_bin')}
            onMaximize={() => toggleMaximizeWindow('recycle_bin')}
            onFocus={() => focusWindow('recycle_bin')}
            onPositionChange={(x, y) => handlePositionChange('recycle_bin', x, y)}
          >
            <RecycleBinFolder />
          </WindowFrame>

          {/* 9. LinkedIn Connect Frame */}
          <WindowFrame
            id="linkedin"
            title="LinkedIn - Connect Wizard"
            isOpen={getWindow('linkedin').isOpen}
            isMinimized={getWindow('linkedin').isMinimized}
            isMaximized={getWindow('linkedin').isMaximized}
            zIndex={getWindow('linkedin').zIndex}
            x={getWindow('linkedin').x}
            y={getWindow('linkedin').y}
            width={getWindow('linkedin').width}
            height={getWindow('linkedin').height}
            onClose={() => closeWindow('linkedin')}
            onMinimize={() => minimizeWindow('linkedin')}
            onMaximize={() => toggleMaximizeWindow('linkedin')}
            onFocus={() => focusWindow('linkedin')}
            onPositionChange={(x, y) => handlePositionChange('linkedin', x, y)}
          >
            <LinkedInFolder />
          </WindowFrame>

          {/* 10. GitHub Frame */}
          <WindowFrame
            id="github"
            title="GitHub - Repository Explorer"
            isOpen={getWindow('github').isOpen}
            isMinimized={getWindow('github').isMinimized}
            isMaximized={getWindow('github').isMaximized}
            zIndex={getWindow('github').zIndex}
            x={getWindow('github').x}
            y={getWindow('github').y}
            width={getWindow('github').width}
            height={getWindow('github').height}
            onClose={() => closeWindow('github')}
            onMinimize={() => minimizeWindow('github')}
            onMaximize={() => toggleMaximizeWindow('github')}
            onFocus={() => focusWindow('github')}
            onPositionChange={(x, y) => handlePositionChange('github', x, y)}
          >
            <GitHubFolder />
          </WindowFrame>

          {/* 11. My Pictures Frame */}
          <WindowFrame
            id="pictures"
            title="My Pictures"
            isOpen={getWindow('pictures').isOpen}
            isMinimized={getWindow('pictures').isMinimized}
            isMaximized={getWindow('pictures').isMaximized}
            zIndex={getWindow('pictures').zIndex}
            x={getWindow('pictures').x}
            y={getWindow('pictures').y}
            width={getWindow('pictures').width}
            height={getWindow('pictures').height}
            onClose={() => closeWindow('pictures')}
            onMinimize={() => minimizeWindow('pictures')}
            onMaximize={() => toggleMaximizeWindow('pictures')}
            onFocus={() => focusWindow('pictures')}
            onPositionChange={(x, y) => handlePositionChange('pictures', x, y)}
          >
            <PicturesFolder />
          </WindowFrame>

        </div>
      </div>

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenWindow={openWindow}
        onTurnOff={() => setPowerState('grayscale-prompt')}
      />

      {/* Taskbar bottom anchors */}
      <Taskbar
        windows={windows.map(w => ({
          id: w.id,
          title: w.title,
          isOpen: w.isOpen,
          isMinimized: w.isMinimized,
          isActive: getActiveState(w.id)
        }))}
        isStartOpen={isStartOpen}
        onStartToggle={() => {
          setIsStartOpen(prev => !prev);
          playStartMenuSound();
        }}
        onToggleWindow={handleTaskbarToggle}
        soundEnabled={soundOn}
        onSoundToggle={handleSoundToggle}
      />

      {/* Retro Shutdown Confirmation Modal (Classic Grayscale Screen Dialog) */}
      {powerState === 'grayscale-prompt' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-xs select-none">
          <div className="w-[300px] md:w-[360px] bg-xp-silver border-t-2 border-x-2 border-b-4 border-xp-blue-dark rounded-lg flex flex-col overflow-hidden shadow-2xl">
            {/* Header Dialog */}
            <div className="bg-gradient-to-r from-xp-blue-light to-xp-blue px-3 py-1 text-white text-xs font-bold font-semibold select-none">
              Shut Down Computer
            </div>
            {/* Body actions */}
            <div className="p-4 flex flex-col items-center text-center gap-4 bg-[#ece9d8]">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-extrabold text-white">
                  ⏻
                </div>
                <h2 className="text-sm font-bold text-gray-800 self-center">Are you sure you want to turn off the portfolio?</h2>
              </div>
              <p className="text-[11px] text-gray-500">Turning off the computer resets connection diagnostics buffers and local RAM indexes.</p>
              
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setPowerState('turned-off')}
                  className="px-4 py-1.5 text-xs font-semibold xp-border-outset bg-white hover:bg-slate-50 text-red-700 active:bg-gray-200 cursor-pointer"
                >
                  Turn Off
                </button>
                <button
                  onClick={() => {
                    setBooting(true);
                    setPowerState('on');
                  }}
                  className="px-4 py-1.5 text-xs font-semibold xp-border-outset bg-white hover:bg-slate-50 text-sky-700 active:bg-gray-200 cursor-pointer"
                >
                  Restart
                </button>
                <button
                  onClick={() => setPowerState('on')}
                  className="px-4 py-1.5 text-xs font-semibold xp-border-outset bg-white hover:bg-slate-50 text-gray-700 active:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shutdown Safe Screen Overlay */}
      {powerState === 'turned-off' && (
        <div 
          onClick={() => {
            setPowerState('on');
            setBooting(true);
          }}
          className="fixed inset-0 bg-black text-center flex flex-col justify-center items-center font-serif text-[#ffbf01] select-none z-50 p-6 cursor-pointer"
        >
          <div className="flex flex-col gap-3 max-w-lg">
            <h1 className="text-2xl md:text-3xl italic tracking-wider font-semibold">It is now safe to turn off your computer.</h1>
            <p className="text-sm text-gray-500 font-sans tracking-wide mt-2">
              If you want to reboot and search again, click anywhere on the screen...
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
