import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Star, Calendar, X } from 'lucide-react';
import { playInterfaceClickSound } from '../../utils/audio';

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  details: string;
  skillsAcquired: string[];
}

const SKILL_EXPLANATIONS: Record<string, string> = {
  'Advanced React.js': "Ankita mastered component-driven architectures, custom Hooks lifecycle, and state orchestration pipelines.",
  'System Architecture': "Familiar with coordinating absolute zIndex window frames, state persistence, and modular custom folder routers.",
  'Design Systems': "Experienced with planning cohesive Tailwind custom color schemes, typography tracking, and negative space rhythms.",
  'Project Coordination': "Acquainted with planning multi-stage development wizard steps, responsive grid alignments, and feature validation.",
  'Javascript Core': "Comprehensive mastery over asynchronous Promises, DOM manipulation APIs, event-loops, and functional arrays.",
  'HTML5 & CSS3': "Crafted pixel-perfect layout simulations utilizing standard flexbox rows, custom border bevels, and scale indicators.",
  'UI Design Basics': "Strong eye for high-contrast colors, touch targets, micro-animations, and typographic pairing guidelines.",
  'Structured SQL': "Experienced with relational DB tables, indexes, entity models, and schema normalization.",
  'Basic Algorithmic logic': "Adept at structured control flows, mathematical conversions, and optimized computational logic.",
  'HTML markup introduction': "Where it all started—learning static document tags, links, text formatting, and early site concepts."
};

export default function EducationFolder() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const educationTimeline: Education[] = [
    {
      id: 'edu_1',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Institute of Management Study, Kolkata',
      period: '2023 - 2027',
      score: 'Currently Pursuing',
      details: 'Comprehensive coursework centering on object-oriented programming, data structures & algorithms analysis, database normalization models, and modern full-stack web architectures.',
      skillsAcquired: ['Javascript Core', 'HTML5 & CSS3', 'UI Design Basics', 'Structured SQL']
    },
    {
      id: 'edu_2',
      degree: 'High School Examination',
      institution: 'State Board',
      period: 'Passing Year 2023',
      score: 'Percentage: 71%',
      details: 'Foundations of mathematical models, elementary logical reasoning, science disciplines, and introduction to computer concepts and markup tags.',
      skillsAcquired: ['Basic Algorithmic logic', 'HTML markup introduction']
    }
  ];

  const handleSkillClick = (skill: string) => {
    playInterfaceClickSound();
    setActiveSkill(skill);
  };

  return (
    <div className="bg-white h-full font-sans select-none overflow-y-auto p-4 flex flex-col gap-4 text-xs md:text-sm text-gray-800 relative">
      
      {/* Title block */}
      <div className="border-b pb-2 flex items-center justify-between">
        <h2 className="text-gray-900 font-extrabold text-base flex items-center gap-2">
          <GraduationCap className="text-[#0a53de]" />
          <span>My Education Timeline & Academic Logs</span>
        </h2>
        <span className="text-[10px] text-gray-400 font-mono">2 Logs Registered</span>
      </div>

      {/* Retro XP style Balloon Notification when clicking skills */}
      {activeSkill && (
        <div className="bg-[#ffffe1] border-2 border-[#000000] p-3 rounded-md shadow-md max-w-sm absolute right-4 top-14 z-50 animate-bounce text-xs text-gray-900 stroke-yellow-500">
          <div className="flex justify-between items-start font-bold text-[#0a53de] mb-1">
            <span className="flex items-center gap-1">
              💡 Skill Milestone: {activeSkill}
            </span>
            <button 
              onClick={() => setActiveSkill(null)}
              className="text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-gray-700 leading-normal text-[11px]">
            {SKILL_EXPLANATIONS[activeSkill] || "Experienced hands-on application and practical project implementations."}
          </p>
          <div className="absolute right-6 -top-3 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-black"></div>
          <div className="absolute right-[25px] -top-2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] border-b-[#ffffe1]"></div>
        </div>
      )}

      {/* Timeline nodes */}
      <div className="space-y-6 relative before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-[#7aa1e6] pb-4 z-10">
        {educationTimeline.map((item) => (
          <div key={item.id} className="relative pl-12 group font-sans">
            {/* Round node badge */}
            <div className="absolute left-3 top-1 bg-[#245dd7] text-white p-1 rounded-full border-2 border-white group-hover:scale-110 transition-transform duration-200 shadow shadow-[#245dd7]/50">
              <BookOpen size={14} />
            </div>

            {/* Log Card Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-xp-blue hover:bg-white transition-all shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h3 className="font-extrabold text-[#0a53de] text-sm sm:text-base">
                  {item.degree}
                </h3>
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1 shrink-0">
                  <Calendar size={12} />
                  <span>{item.period}</span>
                </span>
              </div>

              <div className="text-xs text-indigo-700 font-bold mt-1.5 flex items-center gap-1.5">
                <span>{item.institution}</span>
                {item.score && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">
                      {item.score}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed text-justify">
                {item.details}
              </p>

              {/* Acquired badges (interactive) */}
              <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                {item.skillsAcquired.map((skill) => {
                  const isCurrent = activeSkill === skill;
                  return (
                    <button 
                      key={skill} 
                      onClick={() => handleSkillClick(skill)}
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border transition-all cursor-pointer outline-none active:scale-95 ${
                        isCurrent 
                          ? 'text-white bg-blue-600 border-blue-600 shadow-sm'
                          : 'text-gray-600 bg-gray-100 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                      }`}
                    >
                      • {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer support text inside timeline */}
      <div className="mt-auto border-t pt-3 flex items-center gap-2 text-xs text-gray-500">
        <Award size={16} className="text-yellow-500 shrink-0" />
        <span>Continuous development logs updated. Verifiably accurate certifications. (Click skills for milestones)</span>
      </div>
    </div>
  );
}
