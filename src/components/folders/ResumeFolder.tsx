import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Printer, FileDown, Info, Copy, LogOut } from 'lucide-react';
import { playInterfaceClickSound, playWindowCloseSound } from '../../utils/audio';

interface ResumeFolderProps {
  onClose?: () => void;
}

export default function ResumeFolder({ onClose }: ResumeFolderProps) {
  const [activeDropdown, setActiveDropdown] = useState<'file' | 'edit' | 'help' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    setActiveDropdown(null);
    playInterfaceClickSound();
    window.print();
  };

 const handleSave = () => {
  setActiveDropdown(null);
  playInterfaceClickSound();
  window.open('https://docs.google.com/document/d/1TrL11HKSzsONPMba8Sc1ckIMGBqwuG9n-n_oAoRUrTo/edit?usp=sharing', '_blank');
};

  const handleCopyEmail = () => {
    setActiveDropdown(null);
    playInterfaceClickSound();
    navigator.clipboard.writeText("ankitadasofficial771@gmail.com");
    alert("Copied email address (ankitadasofficial771@gmail.com) directly to your clipboard!");
  };

  const handleAbout = () => {
    setActiveDropdown(null);
    playInterfaceClickSound();
    alert(
      "WordPad Retro Document Reader\n" +
      "-----------------------------------\n" +
      "Part of Ankita Das XP Shell Portfolio\n" +
      "Version 5.1 (Build 2600.xpsp_3)\n" +
      "Author: Ankita Das\n\n" +
      "This file is fully editable and prints perfectly on all modern setups!"
    );
  };

  const handleExit = () => {
    setActiveDropdown(null);
    playWindowCloseSound();
    if (onClose) {
      onClose();
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans h-full flex flex-col overflow-hidden text-sm select-text relative">
      
      {/* WordPad Menu Bar */}
      <div 
        ref={dropdownRef}
        className="bg-xp-bg border-b-2 border-[#b0aca3] px-2 py-1 text-xs select-none flex items-center justify-between relative z-50"
      >
        <div className="flex gap-1 text-black relative">
          
          {/* File Menu */}
          <div className="relative">
            <span 
              onClick={() => {
                playInterfaceClickSound();
                setActiveDropdown(activeDropdown === 'file' ? null : 'file');
              }}
              className={`hover:bg-xp-blue hover:text-white px-2 py-0.5 rounded cursor-pointer ${
                activeDropdown === 'file' ? 'bg-[#0a53de] text-white' : ''
              }`}
            >
              File
            </span>
            {activeDropdown === 'file' && (
              <div className="absolute left-0 mt-1.5 w-40 bg-white border-2 border-gray-400 shadow-lg py-1 text-black flex flex-col z-50 rounded select-none">
                <button 
                  onClick={handleSave}
                  className="px-3 py-1 text-left hover:bg-xp-blue hover:text-white flex items-center gap-2 text-xs w-full"
                >
                  <FileDown size={12} className="text-[#0a53de] group-hover:text-white" />
                  <span>Save RTF</span>
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-3 py-1 text-left hover:bg-xp-blue hover:text-white flex items-center gap-2 text-xs w-full"
                >
                  <Printer size={12} className="text-emerald-600" />
                  <span>Print Page</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button 
                  onClick={handleExit}
                  className="px-3 py-1 text-left hover:bg-xp-blue hover:text-white flex items-center gap-2 text-xs text-red-600 w-full"
                >
                  <LogOut size={12} />
                  <span>Exit WordPad</span>
                </button>
              </div>
            )}
          </div>

          {/* Edit Menu */}
          <div className="relative">
            <span 
              onClick={() => {
                playInterfaceClickSound();
                setActiveDropdown(activeDropdown === 'edit' ? null : 'edit');
              }}
              className={`hover:bg-xp-blue hover:text-white px-2 py-0.5 rounded cursor-pointer ${
                activeDropdown === 'edit' ? 'bg-[#0a53de] text-white' : ''
              }`}
            >
              Edit
            </span>
            {activeDropdown === 'edit' && (
              <div className="absolute left-0 mt-1.5 w-44 bg-white border-2 border-gray-400 shadow-lg py-1 text-black flex flex-col z-50 rounded select-none">
                <button 
                  onClick={handleCopyEmail}
                  className="px-3 py-1 text-left hover:bg-xp-blue hover:text-white flex items-center gap-2 text-xs w-full"
                >
                  <Copy size={12} className="text-[#0a53de]" />
                  <span>Copy Email Details</span>
                </button>
              </div>
            )}
          </div>

          <span className="text-gray-400 px-2 py-0.5 cursor-not-allowed">View</span>
          <span className="text-gray-400 px-2 py-0.5 cursor-not-allowed">Insert</span>
          <span className="text-gray-400 px-2 py-0.5 cursor-not-allowed">Format</span>

          {/* Help Menu */}
          <div className="relative">
            <span 
              onClick={() => {
                playInterfaceClickSound();
                setActiveDropdown(activeDropdown === 'help' ? null : 'help');
              }}
              className={`hover:bg-xp-blue hover:text-white px-2 py-0.5 rounded cursor-pointer ${
                activeDropdown === 'help' ? 'bg-[#0a53de] text-white' : ''
              }`}
            >
              Help
            </span>
            {activeDropdown === 'help' && (
              <div className="absolute left-0 mt-1.5 w-40 bg-white border-2 border-gray-400 shadow-lg py-1 text-black flex flex-col z-50 rounded select-none">
                <button 
                  onClick={handleAbout}
                  className="px-3 py-1 text-left hover:bg-xp-blue hover:text-white flex items-center gap-2 text-xs w-full"
                >
                  <Info size={12} className="text-indigo-600" />
                  <span>About WordPad</span>
                </button>
              </div>
            )}
          </div>

        </div>
        <span className="text-gray-500 font-mono text-[10px]">ankita_resume.rtf</span>
      </div>

      {/* WordPad Action Bar */}
      <div className="bg-xp-bg border-b border-[#dfd7c0] p-1.5 select-none flex items-center gap-1 z-30">
        <button 
          onClick={handlePrint}
          className="xp-border-outset hover:bg-white active:bg-gray-100 flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-gray-700 outline-none"
        >
          <Printer size={14} className="text-emerald-600" />
          <span>Print Doc</span>
        </button>
        <button 
          onClick={handleSave}
          className="xp-border-outset hover:bg-white active:bg-gray-100 flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-gray-700 outline-none"
        >
          <FileDown size={14} className="text-[#0a53de]" />
          <span>Save RTF</span>
        </button>
        <div className="h-4 border-r border-[#dfd7c0] mx-1"></div>
        <div className="text-[10px] text-gray-500 italic px-2 font-mono">
          Page 1 of 1
        </div>
      </div>

      {/* Document Body (Slightly gray borders like standard pages) */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto flex justify-center z-10">
        <div className="bg-white w-full max-w-3xl min-h-[950px] shadow-md border-2 border-gray-300 p-6 md:p-8 flex flex-col gap-6 relative">
          
          {/* Decorative Classic Header Card Accent */}
          <div className="absolute right-6 top-6 xp-border-inset bg-sky-50 px-3 py-1 text-center select-none hidden sm:block">
            <span className="text-xs font-mono font-medium text-sky-800">RTF DOC v2.1</span>
          </div>

          {/* Resume Header */}
          <div className="border-b-2 border-dashed border-[#0a53de] pb-4">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0a53de]">
              ANKITA DAS
            </h1>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest mt-1">
              Front-End Developer | UI/UX Designer
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 font-mono mt-3">
              <span>📍 Jalpaiguri, West Bengal</span>
              <span>•</span>
              <a href="mailto:ankitadasofficial771@gmail.com" className="hover:text-xp-blue underline font-bold">
                ankitadasofficial771@gmail.com
              </a>
              <span>•</span>
              <a href="tel:6295603867" className="hover:text-xp-blue underline font-bold">
                6295603867
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/ankita-das-9635b1315?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-xp-blue underline font-bold">
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://github.com/ankitadas771" target="_blank" rel="noopener noreferrer" className="hover:text-xp-blue underline font-bold">
                GitHub
              </a>
            </div>
          </div>

          {/* Technical and Soft Skills */}
          <div>
            <h2 className="text-base font-bold text-[#0a53de] border-b border-gray-200 pb-1 mb-2">
              🛠 Technical & Soft Skills
            </h2>
            <div className="text-xs md:text-sm text-gray-700 space-y-2">
              <p>
                <strong>Technical Skills:</strong> HTML/CSS, React.js, React Native, JavaScript, Generative AI, Adobe InDesign, Figma, Adobe XD.
              </p>
              <p>
                <strong>Soft Skills:</strong> Communication, Critical thinking, Leadership, Teamwork, Adaptability, Active Listening, Influence and Persuasion.
              </p>
            </div>
          </div>

          {/* Problem Solving & DSA */}
          <div>
            <h2 className="text-base font-bold text-[#0a53de] border-b border-gray-200 pb-1 mb-2">
              🧠 Problem Solving & Data Structures
            </h2>
            <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
              Developing a solid foundation in Data Structures and Algorithms through academic coursework, focusing on Arrays, Linked Lists, Stacks, and Queues. Applying logical problem-solving skills to software development projects, aiming to enhance algorithmic efficiency and complexity analysis.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-base font-bold text-[#0a53de] border-b border-gray-200 pb-1 mb-2">
              🎓 Education
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-gray-800 text-xs md:text-sm">
                  <h3>Bachelor of Computer Applications (BCA)</h3>
                  <span className="text-xs text-[#0a53de] font-bold font-mono">2023 - 2027</span>
                </div>
                <p className="text-xs text-gray-600">
                  Institute of Management Study, Kolkata (Currently Pursuing)
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-gray-800 text-xs md:text-sm">
                  <h3>High School Education</h3>
                  <span className="text-xs text-[#0a53de] font-bold font-mono">Passing Year 2023</span>
                </div>
                <p className="text-xs text-gray-600">
                  State Board (Grade: 71%)
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-base font-bold text-[#0a53de] border-b border-gray-200 pb-1 mb-2">
              📜 Certifications
            </h2>
            <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5 font-mono">
              <li>
                <span className="font-bold font-sans text-gray-800">AI Literacy by IBM</span> <span className="text-gray-400">(Aug'25 - Aug'25)</span>
              </li>
              <li>
                <span className="font-bold font-sans text-gray-800">AI tools workshop by Be 10x</span> <span className="text-gray-400">(Jan'26 - Jan'26)</span>
              </li>
              <li>
                <span className="font-bold font-sans text-gray-800">Graphic design essentials by Canva</span> <span className="text-gray-400">(Apr'26 - Apr'26)</span>
              </li>
              <li>
                <span className="font-bold font-sans text-gray-800">Hackathon2k25 IMS</span> <span className="text-gray-400">(Sep'25 - Sep'25)</span>
              </li>
            </ul>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-base font-bold text-[#0a53de] border-b border-gray-200 pb-1 mb-2">
              🏆 Achievements
            </h2>
            <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1.5 leading-relaxed">
              <li>
                Awarded Certificate of Recognition for dedicated contributions to community outreach and ethical initiatives.
              </li>
              <li>
                Received recognition for exemplary leadership in organizing and executing a successful campus-wide event.
              </li>
            </ul>
          </div>

          {/* Signature/Footer */}
          <div className="border-t border-gray-200 pt-3 mt-auto text-center">
            <p className="text-xs text-gray-400 font-semibold">Windows XP Desktop System Portfolio • Ankita Das • 2026</p>
          </div>

        </div>
      </div>
    </div>
  );
}
