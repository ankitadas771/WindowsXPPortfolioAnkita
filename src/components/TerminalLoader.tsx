import React, { useState, useEffect } from 'react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

export default function TerminalLoader({ onComplete }: TerminalLoaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [step, setStep] = useState<number>(0); // 0: Bios Text, 1: Win XP Boot Screen, 2: Finished
  const [loadingProgress, setLoadingProgress] = useState(0);

  const biosText = [
    "ANKITA_DAS_BIOS v2.010, An Energy Star Ally",
    "Copyright (C) 2010, Ankita Das Techcorp, Inc.",
    " ",
    "CPU: Intel Core i7-2600K @ 3.40GHz",
    "RAM: 8MB OK",
    " ",
    "Detecting Hard Disks ...",
    "Primary Master: ANKITA_DAS_SSD_256GB (LBA, DMA 5)",
    "Primary Slave: None",
    "Secondary Master: Fig-Pen-React-Native-JS (LBA, DMA 5)",
    " ",
    "STATUS: SYSTEM STABLE. SECURE BOOT ACTIVE.",
    "INITIALIZING CONTACT RECORDERS ... FOUND",
    "LOADING PORTFOLIO MODULES ................... 100%",
    " ",
    "DEVELOPER DETAILS DETECTED:",
    "==================================================",
    "  NAME         : ANKITA DAS",
    "  ROLE         : FRONT-END DEVELOPER | UI/UX DESIGNER",
    "  LOCATION     : METAVERSE / INTERNET",
    "==================================================",
    " ",
    "BOOTING WINDOWS XP (2010 EDITION)...",
  ];

  // Typing effect for BIOS lines
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < biosText.length) {
        const lineToPrint = biosText[currentLine];
        setLines((prev) => [...prev, lineToPrint]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Transition to Windows XP loading screen after bios print
        setTimeout(() => {
          setStep(1);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Windows XP loader progress
  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 800);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div id="terminal-loader" className="fixed inset-0 bg-black text-white font-mono z-50 overflow-hidden select-none scanlines">
      {step === 0 && (
        <div className="p-6 md:p-12 text-sm md:text-base leading-relaxed max-w-4xl mx-auto h-full flex flex-col justify-between">
          <div className="overflow-y-auto max-h-[85vh]">
            {lines.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line && (line.includes("NAME") || line.includes("ROLE"))
                    ? "text-yellow-400 font-bold" 
                    : line && line.includes("SYSTEM STABLE") 
                    ? "text-emerald-400 font-bold" 
                    : "text-gray-300"
                }
              >
                {line}
              </div>
            ))}
            <span className="text-gray-300 cursor-blink font-bold">_</span>
          </div>

          <div className="text-gray-500 text-xs md:text-sm flex justify-between border-t border-gray-800 pt-4">
            <span>Press <span className="text-white hover:underline cursor-pointer" onClick={onComplete}>[ESC]</span> to skip boot screen</span>
            <span>2026-05-28</span>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="h-full flex flex-col justify-between items-center bg-black py-16">
          <div className="flex-1 flex flex-col justify-center items-center">
            {/* Windows XP Logo Look-alike */}
            <div className="flex flex-col items-center select-none scale-90 md:scale-100">
              <div className="flex gap-1.5 mb-4 animate-bounce">
                <div className="grid grid-cols-2 gap-1.5 rotate-12">
                  <div className="w-8 h-8 rounded-tl-[40%] bg-[#f24726] shadow-md shadow-[#f24726]/40"></div>
                  <div className="w-8 h-8 rounded-tr-[40%] bg-[#5bb318] shadow-md shadow-[#5bb318]/40"></div>
                  <div className="w-8 h-8 rounded-bl-[40%] bg-[#00a1e4] shadow-md shadow-[#00a1e4]/40"></div>
                  <div className="w-8 h-8 rounded-br-[40%] bg-[#ffb900] shadow-md shadow-[#ffb900]/40"></div>
                </div>
              </div>
              <h2 className="text-4xl font-sans tracking-wide font-extrabold text-white flex items-center italic">
                Microsoft<span className="text-[#0a53de] text-xl align-top font-sans font-normal ml-1">®</span>
              </h2>
              <h1 className="text-5xl md:text-6xl font-sans font-bold italic tracking-tighter text-white mt-1 relative">
                Windows<span className="text-orange-500 font-black not-italic text-4xl align-top select-none absolute -right-10 top-0">xp</span>
              </h1>
              <div className="text-[#0a53de] text-sm md:text-base border-t border-gray-800 w-32 text-center mt-3 pt-1 uppercase font-semibold tracking-widest">
                Edition 2010
              </div>
            </div>

            {/* Scrolling XP Blue Loading Bar */}
            <div className="mt-16 w-60 h-4 bg-black border-2 border-slate-600 rounded p-0.5 overflow-hidden flex items-center relative gap-1">
              {/* Three little squares moving across (classic blue index loading indicator) */}
              <div 
                className="absolute flex h-2.5 items-stretch gap-1 pr-1"
                style={{
                  width: '40px',
                  animation: 'scroll-loader 1.5s infinite linear',
                }}
              >
                <div className="w-3 rounded bg-blue-500 shadow-sm shadow-blue-400"></div>
                <div className="w-3 rounded bg-blue-500 shadow-sm shadow-blue-400"></div>
                <div className="w-3 rounded bg-blue-500 shadow-sm shadow-blue-400"></div>
              </div>
            </div>
          </div>

          <div className="text-gray-600 text-[10px] md:text-xs text-center font-sans tracking-wide">
            Copyright © Microsoft Corporation<br />
            Ankita Das Creative Space System Build
          </div>
        </div>
      )}

      {/* Embedded loader animation style */}
      <style>{`
        @keyframes scroll-loader {
          0% { left: -40px; }
          100% { left: 240px; }
        }
      `}</style>
    </div>
  );
}
