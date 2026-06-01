import React, { useState } from 'react';
import { ExternalLink, Github, FolderGit, Monitor, Heart } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'Front-end' | 'Mobile' | 'UI/UX Design';
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  stats: string;
}

interface ProjectsFolderProps {
  onLaunchProject?: (project: any) => void;
}

export default function ProjectsFolder({ onLaunchProject }: ProjectsFolderProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Front-end' | 'Mobile' | 'UI/UX Design'>('All');

  const projects: Project[] = [
    {
      id: 'weather-app',
      title: 'Dynamic Weather App',
      category: 'Front-end',
      description: 'A fully responsive search dashboard retrieving live meteorological insights, temperature stats, wind flow rates, and humidity factors for any city in real-time.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Weather API', 'Responsive Layout'],
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=400&q=80',
      demoUrl: 'https://ankitadas771.github.io/dynamic-weather-app/',
      githubUrl: 'https://github.com/ankitadas771/dynamic-weather-app',
      stats: 'Live'
    },
    {
      id: 'adhd-app',
      title: 'ADHD Productivity App',
      category: 'Mobile',
      description: 'A customized cognitive focusing system featuring interactive pomodoro audio cycles, gamified task rewards, visual drag-and-drop workflow matrices, and dynamic schedule alerts.',
      tags: ['React Native', 'Tailwind', 'Audio Engine', 'Local DB'],
      image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=400&q=80',
      demoUrl: '#',
      githubUrl: 'https://github.com/ankitadas771',
      stats: 'WIP'
    },
    {
      id: 'netflix-clone',
      title: 'Netflix Clone',
      category: 'Front-end',
      description: 'High-fidelity cinematic streaming experience featuring layout carousels, responsive video player controls, trailer overlays, and user profile account switching panels.',
      tags: ['React.js', 'Vite', 'Tailwind', 'Motion', 'API Integration'],
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?auto=format&fit=crop&w=400&q=80',
      demoUrl: '#',
      githubUrl: 'https://github.com/ankitadas771',
      stats: 'WIP'
    },
    {
      id: 'ecom-website',
      title: 'E-Commerce Website',
      category: 'UI/UX Design',
      description: 'Dynamic retail market engine with automated cart additions, flexible price sorting filters, client-side discount coupon simulation, and user-friendly visual catalogs.',
      tags: ['React.js', 'Tailwind', 'Context API', 'State Persistence'],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80',
      demoUrl: '#',
      githubUrl: 'https://github.com/ankitadas771',
      stats: 'WIP'
    }
  ];

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="bg-gray-100 h-full flex flex-col font-sans select-none overflow-hidden text-sm">
      {/* Category Folders Tabbing Area */}
      <div className="bg-[#ece9d8] border-b border-[#dfd7c0] px-3 py-2 flex flex-wrap gap-2 items-center select-none justify-between">
        <div className="flex gap-1.5">
          {(['All', 'Front-end', 'Mobile', 'UI/UX Design'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
                activeTab === tab 
                  ? 'bg-xp-blue text-white border-xp-blue-dark' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <span className="text-xs text-gray-500 font-mono hidden sm:block">
          Logged Directory: C:\Ankita\Projects
        </span>
      </div>

      {/* Main projects workspace */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden flex flex-col hover:border-xp-blue hover:shadow-lg transition-all duration-200"
            >
              {/* Image Banner Header */}
              <div 
                onClick={() => onLaunchProject?.(project)}
                className="relative h-40 bg-slate-900 overflow-hidden cursor-pointer group/banner"
                title="Click to launch in Internet Explorer emulated sandbox"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-85 group-hover/banner:opacity-100 group-hover/banner:scale-105 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Launch badge overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/banner:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <span className="bg-xp-blue text-white font-bold text-xs px-3 py-1.5 rounded-md shadow-md border border-xp-blue-dark flex items-center gap-1">
                    <Monitor size={12} />
                    <span>Launch Emulator</span>
                  </span>
                </div>

                {/* Floating badge */}
                <span className="absolute left-2 top-2 bg-xp-blue text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {project.category}
                </span>

                {project.stats === 'Live' ? (
                  <span className="absolute right-2 top-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded border border-emerald-600 shadow-md flex items-center gap-1">
                    🟢 LIVE ACTIVE
                  </span>
                ) : (
                  <span className="absolute right-2 top-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded border border-amber-600 shadow-md flex items-center gap-1">
                    ⚠️ UNDER CONSTRUCTION
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-snug flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className={`w-1.5 h-1.5 rounded-full animate-ping ${project.stats === 'Live' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-1.5 my-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-semibold font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom interactive action toolbar */}
                <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between items-center text-xs">
                  <div className="flex flex-wrap gap-x-3.5 gap-y-1.5">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-gray-600 hover:text-black hover:underline"
                    >
                      <Github size={13} />
                      <span>Code</span>
                    </a>

                    <button 
                      onClick={() => onLaunchProject?.(project)}
                      className="flex items-center gap-1 text-xp-blue hover:text-xp-blue-dark hover:underline cursor-pointer font-bold"
                    >
                      <Monitor size={13} />
                      <span>Simulate</span>
                    </button>
                    
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 hover:underline font-semibold"
                      >
                        <ExternalLink size={13} />
                        <span>Visit</span>
                      </a>
                    )}
                  </div>
                  
                  {project.stats === 'Live' ? (
                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-250 px-2 py-0.5 rounded text-[10px] font-bold select-none font-mono tracking-tight shadow-sm">
                      <span>Completed</span>
                      <span>✨</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded text-[10px] font-bold select-none font-mono tracking-tight shadow-sm">
                      <span>In-Progress</span>
                      <span className="animate-bounce">🚧</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects in this folder match your current selection category.
          </div>
        )}
      </div>
    </div>
  );
}
