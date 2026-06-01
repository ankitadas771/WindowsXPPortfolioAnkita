import React, { useState } from 'react';
import { Laptop, Cpu, Award, Star, Info } from 'lucide-react';
import penpotIcon from '../../assets/images/penpot.png';
import claudeIcon from '../../assets/images/claude-color.png';
import cssIcon from '../../assets/images/css.png';
import htmlIcon from '../../assets/images/html.png';
import javascriptIcon from '../../assets/images/j.png';
import figmaIcon from '../../assets/images/Figma-Logo-PNG-Images.png';
import reactNativeIcon from '../../assets/images/react-native-1.svg';
import antigravityIcon from '../../assets/images/antigravity.jpg';

interface Skill {
  name: string;
  category: string;
  experience: string;
  icon: React.ReactNode;
  level: number; // 0-100
  color: string;
  description: string;
}

export default function SkillsFolder() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>({
    name: 'React.js',
    category: 'Application Library',
    experience: '1+ Years',
    level: 95,
    color: '#00D8FF',
    description: 'Component-driven frontend engineering, state managers (Redux, Context), custom hooks, React 18/19 architectures.',
    icon: (
      <svg className="w-12 h-12" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  });

  const skillsList: Skill[] = [
    {
      name: 'React.js',
      category: 'Frontend Library',
      experience: '1+ Years',
      level: 95,
      color: '#00D8FF',
      description: 'Expertise in building scalable Single-Page Applications, custom Hooks, dynamic state pipelines, and lazy assemblies.',
      icon: (
        <svg className="w-12 h-12 animate-spin-slow" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2" fill="#00D8FF"/>
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
{
  name: 'Penpot',
  category: 'Open Design Tool',
  experience: '1 Year',
  level: 75,
  color: '#00F5FF',
  description: 'Creating production layout paths, flex-layout based prototyping, UI guides, component libraries, and visual collaboration assets.',
  icon: (
    <img src={penpotIcon} alt="Penpot" className="w-12 h-12 object-contain" />
  )
},
    {
      name: 'Figma',
      category: 'UI/UX Prototyping',
      experience: '1 Year',
      level: 80,
      color: '#F24E1E',
      description: 'Comprehensive canvas setups, structural auto-layout grids, interactive components with nested variations, visual system builds.',
       icon: (
    <img src={figmaIcon} alt="Figma" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'React Native',
      category: 'Mobile Systems',
      experience: '1 Year',
      level: 75,
      color: '#58963E',
      description: 'Building cross-platform mobile systems, compiling native modules, offline database syncing, fluid animations on touch.',
       icon: (
    <img src={reactNativeIcon} alt="React Native" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'Javascript',
      category: 'Core Language',
      experience: '5 Years',
      level: 95,
      color: '#F0DB4F',
      description: 'Full integration with ES6+, standard arrays and async structures, Promises, asynchronous event-loops, dynamic API bindings.',
     icon: (
    <img src={javascriptIcon} alt="Javascript" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'HTML',
      category: 'Markup Language',
      experience: '5 Years',
      level: 98,
      color: '#E34F26',
      description: 'Document planning rules, fully accessible metadata structures, screen reader setups, custom native elements.',
      icon: (
    <img src={htmlIcon} alt="HTML" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'CSS',
      category: 'Layout & Engine',
      experience: '5 Years',
      level: 95,
      color: '#1572B6',
      description: 'Tailwind architectures, complex positioning grids, high performance render systems, active CSS variables context mapping.',
     icon: (
    <img src={cssIcon} alt="CSS" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'Antigravity',
      category: 'Agent Framework',
      experience: '1 Year',
      level: 96,
      color: '#9D4EDD',
      description: 'High-performance orchestration framework built for sandboxed command execution, background task processing, and automated reactive state machine mechanics in AI systems.',
       icon: (
    <img src={antigravityIcon } alt="Antigravity" className="w-12 h-12 object-contain" />
  )
    },
    {
      name: 'Claude Code ',
      category: 'AI Coding & CLI',
      experience: '1 Year',
      level: 94,
      color: '#CC5A37',
      description: 'Highly accomplished in CLI-driven agent interaction, terminal-first code editing workflows, token consumption orchestration, and structured prompt layering for rapid delivery.',
    icon: (
    <img src={claudeIcon } alt="Claude Code" className="w-12 h-12 object-contain" />
  )
    }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full font-sans select-none bg-white">
      {/* Left panel (Windows XP styled explorer helper taskbar) */}
      <div className="w-full md:w-56 bg-[#7aa1e6] p-3 text-white flex flex-col gap-3 select-none overflow-y-auto">
        
        {/* Section 1: System Tasks */}
        <div className="bg-white rounded-t-lg overflow-hidden border border-[#1b3d73] shadow-sm">
          <div className="bg-gradient-to-r from-[#0058e6] via-[#248ef3] to-[#0058e6] text-xs font-bold px-2 py-1.5 flex justify-between items-center text-white">
            <span>System Information</span>
            <Laptop size={12} />
          </div>
          <div className="p-2 text-[11px] text-[#1e325c] flex flex-col gap-1.5 font-sans">
            <div className="hover:underline cursor-pointer font-bold flex items-center gap-1">
              <span>✈ Ankita Das Lab v2010</span>
            </div>
            <div className="hover:underline cursor-pointer flex items-center gap-1 text-gray-700 font-medium">
              <span>⚡ Platform Status: STABLE</span>
            </div>
            <div className="hover:underline cursor-pointer flex items-center gap-1 text-gray-700 font-medium">
              <span>⚙ Dynamic CSS Loaded</span>
            </div>
          </div>
        </div>

        {/* Section 2: Selected Skill Explorer Details */}
        <div className="bg-white rounded-t-lg overflow-hidden border border-[#1b3d73] shadow-sm flex-1">
          <div className="bg-gradient-to-r from-[#0058e6] via-[#248ef3] to-[#0058e6] text-xs font-bold px-2 py-1.5 flex justify-between items-center text-white">
            <span>Item Details</span>
            <Info size={12} />
          </div>
          <div className="p-3 text-[#1e325c] flex flex-col items-center text-center h-full">
            {selectedSkill ? (
              <div className="flex flex-col items-center h-full">
                <div className="p-2 bg-slate-100 rounded-lg shadow-sm mb-2 border border-slate-200">
                  {selectedSkill.icon}
                </div>
                <h4 className="font-bold text-sm text-[#0a53de]">
                  {selectedSkill.name}
                </h4>
                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono mt-0.5">
                  {selectedSkill.category}
                </span>

                <div className="w-full mt-3 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                    style={{ width: `${selectedSkill.level}%` }}
                  ></div>
                </div>
                <div className="flex justify-between w-full text-[10px] text-gray-500 px-1 font-mono mt-0.5">
                  <span>Usage: {selectedSkill.experience}</span>
                  <span className="font-bold text-emerald-600 font-sans">{selectedSkill.level}%</span>
                </div>

                <p className="text-[11px] text-gray-600 leading-relaxed mt-3 border-t border-dashed border-gray-200 pt-2 text-justify">
                  {selectedSkill.description}
                </p>
              </div>
            ) : (
              <div className="text-[11px] pt-12 text-gray-500 h-full flex items-center justify-center">
                Click a skill folder in the main pane to view profile.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right panel (The Grid area) */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-1">
          <h2 className="text-gray-900 font-bold text-base flex items-center gap-2">
            <span>📂 tools_and_skills</span>
            <span className="text-xs text-gray-500 font-normal">({skillsList.length} Objects)</span>
          </h2>
          <div className="text-[10px] text-gray-400 font-mono">View: Large Icons</div>
        </div>

        {/* Skill Files Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skillsList.map((skill, index) => {
            const isCurrentlySelected = selectedSkill?.name === skill.name;
            return (
              <div
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className={`p-3 rounded border text-center cursor-pointer transition-all flex flex-col items-center gap-2 group ${
                  isCurrentlySelected
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200 shadow-sm'
                    : 'bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {/* Simulated floppy disk grid representation */}
                <div className="transition-transform group-hover:scale-105">
                  {skill.icon}
                </div>

                <div className="flex flex-col items-center">
                  <span className={`text-xs font-semibold leading-tight text-center ${
                    isCurrentlySelected ? 'text-blue-800' : 'text-gray-800'
                  }`}>
                    {skill.name}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono mt-0.5">
                    {skill.experience}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
