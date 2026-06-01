import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, RotateCw, Home, Search, Globe, ChevronRight, Play, Square, Plus, Minus } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  stats: string;
}

interface ExplorerProps {
  project: Project | null;
  onClose: () => void;
}

export default function InternetExplorerFolder({ project, onClose }: ExplorerProps) {
  const [addressBar, setAddressBar] = useState('http://www.ankitadas.dev/portfolio');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioOscillator, setAudioOscillator] = useState<any>(null);
  const [audioCtx, setAudioCtx] = useState<any>(null);

  // Sound generator parameters
  const [soundMode, setSoundMode] = useState<'calm' | 'forest' | 'bell'>('calm');

  // Fitness Buddy interactive params
  const [waterCups, setWaterCups] = useState(3);
  const [caloriesBurned, setCaloriesBurned] = useState(420);

  // Penpot Designer Component parameters
  const [primaryColor, setPrimaryColor] = useState('#0054e3');
  const [borderRadius, setBorderRadius] = useState(4);
  const [buttonLabel, setButtonLabel] = useState('Submit Draft');

  // Retro VM parameter
  const [diagnosticsLog, setDiagnosticsLog] = useState<string[]>([
    'SYSTEM ENGINE OK',
    'RAM BUFFER FLUSH COMPLETED',
    'LAUNCHING EMULATOR V1.3...'
  ]);

  // Weather simulation variables
  const [weatherInput, setWeatherInput] = useState('Kolkata');
  const [weatherCity, setWeatherCity] = useState('Kolkata');

  const weatherDb: Record<string, { temp: string; tempF: string; desc: string; hum: string; wind: string; extra: string; emoji: string }> = {
    kolkata: { temp: '32°C', tempF: '89.6°F', desc: 'Partly Cloudy & Warm', hum: '78%', wind: '12 km/h', extra: 'High humidity, evening showers likely.', emoji: '⛅' },
    london: { temp: '14°C', tempF: '57.2°F', desc: 'Light Drizzle', hum: '85%', wind: '22 km/h', extra: 'Classic overcast skies. Keep an umbrella handy.', emoji: '🌧️' },
    'new york': { temp: '21°C', tempF: '69.8°F', desc: 'Sunny & Beautiful', hum: '45%', wind: '15 km/h', extra: 'Clear views of the skyline in Manhattan.', emoji: '☀️' },
    tokyo: { temp: '19°C', tempF: '66.2°F', desc: 'Mild Overcast Breeze', hum: '60%', wind: '10 km/h', extra: 'Ideal spring weather with refreshing winds.', emoji: '🌸' },
    sydney: { temp: '18°C', tempF: '64.4°F', desc: 'Cool Ocean Wind', hum: '55%', wind: '25 km/h', extra: 'High surf alerts near Bondi beach.', emoji: '💨' },
    mumbai: { temp: '30°C', tempF: '86.0°F', desc: 'Moist & Rainy', hum: '82%', wind: '14 km/h', extra: 'Heavy monsoon cloud formations over Western Ghats.', emoji: '🌧️' },
    delhi: { temp: '38°C', tempF: '100.4°F', desc: 'Dry Heat Wave', hum: '22%', wind: '8 km/h', extra: 'Extreme temperature index. High UV caution.', emoji: '☀️' }
  };

  const getWeatherData = (city: string) => {
    const key = city.trim().toLowerCase();
    if (weatherDb[key]) return weatherDb[key];
    const len = key.length || 5;
    if (len % 3 === 0) {
      return {
        temp: `${20 + (len % 12)}°C`,
        tempF: `${Math.round((20 + (len % 12)) * 1.8 + 32)}°F`,
        desc: 'Scattered Cloud Formations',
        hum: `${55 + (len % 30)}%`,
        wind: `${10 + (len % 15)} km/h`,
        extra: 'Atmospheric density is stable. High pressure system.',
        emoji: '⛅'
      };
    } else if (len % 3 === 1) {
      return {
        temp: `${10 + (len % 8)}°C`,
        tempF: `${Math.round((10 + (len % 8)) * 1.8 + 32)}°F`,
        desc: 'Overcast & Low Visibility',
        hum: `${78 + (len % 15)}%`,
        wind: `${18 + (len % 10)} km/h`,
        extra: 'Condensation levels peak. Low pressure system moving east.',
        emoji: '☁️'
      };
    } else {
      return {
        temp: `${26 + (len % 9)}°C`,
        tempF: `${Math.round((26 + (len % 9)) * 1.8 + 32)}°F`,
        desc: 'Sunny & Delightful Skies',
        hum: `${35 + (len % 25)}%`,
        wind: `${5 + (len % 10)} km/h`,
        extra: 'Splendid visibility across all compass bearings.',
        emoji: '☀️'
      };
    }
  };

  useEffect(() => {
    if (project) {
      const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      setAddressBar(`http://www.ankitadas.dev/explorer/${slug}`);
    }
  }, [project]);

  // Handle synthesized sound generation for Zen Soundbox
  const playSoundNode = (freq: number, duration: number, type: 'sine' | 'triangle' | 'sine' = 'sine') => {
    try {
      const curCtx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioCtx) setAudioCtx(curCtx);

      const osc = curCtx.createOscillator();
      const gainNode = curCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, curCtx.currentTime);

      gainNode.gain.setValueAtTime(0.15, curCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, curCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(curCtx.destination);

      osc.start();
      osc.stop(curCtx.currentTime + duration);
    } catch (e) {
      console.warn("Web Audio API disabled or blocked by visitor interaction first", e);
    }
  };

  const toggleSoundscape = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playSoundNode(261.63, 1.5, 'sine'); // C4
      setTimeout(() => playSoundNode(329.63, 1.5, 'sine'), 400); // E4
      setTimeout(() => playSoundNode(392.00, 2.0, 'sine'), 800); // G4
    }
  };

  const simulateDiagnostics = () => {
    const freshLogs = [
      'ALLOCATING FRAME BUFFER VERTEX REGISTERS...',
      'TESTING PARITY SYNCHRONIZATION: OK',
      'COORDINATES OFFSET MIGRATED SUCCESSFULLY',
      `TIMESTAMP INDEX: ${new Date().toLocaleTimeString()}`
    ];
    setDiagnosticsLog(prev => [...prev, ...freshLogs].slice(-7));
    playSoundNode(600, 0.1, 'triangle');
  };

  // Safe fallback if project is missing
  const activeProj = project || {
    id: 'p1',
    title: 'Retro Windows Portfolio v1',
    category: 'Front-end',
    description: 'A nostalgic web-based OS simulation featuring draggable/resizable windows, active Start Menu programs, a live digital calendar, and file system exploration.',
    tags: ['React.js', 'Tailwind', 'Motion', 'JSX'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=400&q=80',
    stats: '600+ Stars'
  };

  return (
    <div className="bg-[#f1efe2] border border-[#7a7860] h-full flex flex-col font-sans select-none text-xs text-gray-800">
      
      {/* 1. Classic Internet Explorer Toolbar Core */}
      <div className="bg-[#ece9d8] border-b border-[#a0a0a0] px-2 py-1 select-none flex flex-col gap-1.5 shrink-0">
        
        {/* Menu indicators */}
        <div className="flex gap-2.5 text-black text-[11px] font-sans border-b border-[#dfd7c0] pb-0.5">
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">File</span>
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Edit</span>
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">View</span>
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Favorites</span>
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Tools</span>
          <span className="hover:bg-xp-blue hover:text-white px-1.5 py-0.5 rounded cursor-pointer">Help</span>
        </div>

        {/* Action icons bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <button className="xp-border-outset px-2 py-0.5 hover:bg-white active:bg-gray-100 flex items-center gap-1 text-gray-700 font-semibold text-[10px]" title="Back">
              <ArrowLeft size={13} className="text-[#3b82f6]" strokeWidth={3} />
              <span>Back</span>
            </button>
            <button className="xp-border-outset px-2 py-0.5 hover:bg-white active:bg-gray-100 flex items-center gap-1 text-gray-400 font-semibold text-[10px]" disabled>
              <ArrowRight size={13} strokeWidth={3} />
              <span>Forward</span>
            </button>
            <button className="xp-border-outset p-1 hover:bg-white active:bg-gray-100 text-[#e31212]" title="Stop">
              <X size={13} strokeWidth={3} />
            </button>
            <button className="xp-border-outset p-1 hover:bg-white active:bg-gray-100 text-emerald-600" title="Refresh">
              <RotateCw size={12} strokeWidth={3} />
            </button>
            <button className="xp-border-outset p-1 hover:bg-white active:bg-gray-100 text-[#ff9000]" title="Home">
              <Home size={13} />
            </button>
            
            <div className="h-4 border-r border-[#cfcab8] mx-1"></div>
            
            <button className="xp-border-outset px-2 py-0.5 hover:bg-white active:bg-gray-100 flex items-center gap-1 text-gray-700 text-[10px]">
              <Search size={12} className="text-[#0054e3]" />
              <span>Search</span>
            </button>
          </div>

          <div className="bg-[#4caf50] text-[#1b5e20] text-[9px] font-mono border border-[#1b5e20] font-extrabold px-1.5 py-0.5 rounded hidden sm:block">
            MSIE v6.0
          </div>
        </div>

        {/* Address Bar */}
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 font-semibold text-[11px] pr-1">Address</span>
          <div className="flex-1 bg-white border border-gray-400 rounded-sm px-2 py-1 text-slate-700 font-mono text-[10px] flex items-center gap-1.5 shadow-inner select-text">
            <Globe size={11} className="text-[#3a88db] shrink-0" />
            <span className="outline-none w-full bg-transparent p-0">{addressBar}</span>
          </div>
          <button className="xp-border-outset px-3 py-1 bg-white hover:bg-slate-100 text-[#002d96] font-bold text-[10px] active:scale-95 transition-transform" title="Go directly">
            Go
          </button>
        </div>
      </div>

      {/* 2. Simulated Web Content iframe container */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-6 flex flex-col items-center">
        
        {/* Actual Simulated Device viewport screen mockup */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden flex flex-col">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 text-white flex justify-between items-center border-b">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00d8ff] font-bold uppercase">{activeProj.category}</span>
              <h1 className="text-sm md:text-base font-extrabold">{activeProj.title}</h1>
            </div>
            <div className="text-right text-[10px] font-mono text-gray-400">
              Demo  v1.3
            </div>
          </div>

          <div className="p-4 md:p-5 flex flex-col gap-4 text-gray-700 font-sans text-xs select-text">
            
            {/* Demo description box */}
            <p className="text-xs text-gray-600 leading-relaxed border-b pb-3 border-dashed border-gray-200">
              {activeProj.description}
            </p>

            {/* Simulated Live Section inside HTML Explorer */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-4 rounded-lg shadow-inner">
              <h3 className="font-bold text-[#0a53de] text-xs flex items-center gap-1.5 mb-2.5">
                <span>⚡ Simulated Interactive Dashboard</span>
                <span className="text-[9px] bg-sky-100 text-sky-700 border border-sky-200 px-1 font-mono rounded font-normal">Active Simulation</span>
              </h3>

              {/* SPECIAL INTERACTIVE WEATHER SIMULATION */}
              {activeProj.id === 'weather-app' && (
                <div className="flex flex-col gap-3.5">
                  <p className="text-[11px] text-gray-500">
                    A beautiful retro search widget. Input your target city name below to fetch real-time atmospheric readings instantly.
                  </p>

                  <div className="bg-[#f0f4f8] p-3 rounded-lg border border-sky-200 shadow-xs flex flex-col sm:flex-row gap-2 items-center">
                    <div className="w-full sm:flex-1 relative">
                      <input 
                        type="text"
                        placeholder="Enter City Name (e.g. Kolkata, London, Tokyo)"
                        value={weatherInput}
                        onChange={(e) => setWeatherInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setWeatherCity(weatherInput);
                            playSoundNode(300, 0.1, 'sine');
                          }
                        }}
                        className="w-full text-xs px-3 py-2 border border-sky-300 rounded focus:border-xp-blue outline-none bg-white pr-8 text-sky-900 font-semibold"
                      />
                      <span className="absolute right-2.5 top-2.5 text-sky-400">🔍</span>
                    </div>
                    <button
                      onClick={() => {
                        setWeatherCity(weatherInput);
                        playSoundNode(350, 0.1, 'sine');
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-[#0054e3] hover:bg-blue-600 text-white font-bold text-xs rounded shadow-xs cursor-pointer active:scale-95 transition-all text-center"
                    >
                      Search
                    </button>
                  </div>

                  {/* Weather display widget board */}
                  {(() => {
                    const data = getWeatherData(weatherCity);
                    return (
                      <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg p-4 text-white shadow-md border border-sky-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-5xl filter drop-shadow select-none">{data.emoji}</span>
                          <div>
                            <h4 className="text-base font-extrabold flex items-center gap-1.5 uppercase font-mono tracking-tight text-sky-100">
                              <span>{weatherCity || 'Unknown Location'}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                            </h4>
                            <div className="text-2xl font-black">{data.temp} <span className="text-xs font-normal text-sky-200">/ {data.tempF}</span></div>
                            <div className="text-xs font-bold text-sky-100 mt-0.5">{data.desc}</div>
                          </div>
                        </div>

                        <div className="w-full sm:w-auto grid grid-cols-2 gap-3 bg-sky-700/40 p-2.5 rounded border border-white/10 text-xs font-mono">
                          <div>
                            <span className="text-sky-200 text-[9px] block font-bold uppercase">Humidity</span>
                            <span className="font-extrabold">{data.hum}</span>
                          </div>
                          <div>
                            <span className="text-sky-200 text-[9px] block font-bold uppercase">Wind Spd</span>
                            <span className="font-extrabold">{data.wind}</span>
                          </div>
                          <div className="col-span-2 border-t border-white/10 pt-1.5 mt-0.5 text-[9px] text-sky-100 font-semibold leading-normal font-sans">
                            <strong>Note:</strong> {data.extra}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Default suggestion pills */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">Lookups:</span>
                    {['Kolkata', 'London', 'New York', 'Tokyo'].map((suggestedCity) => (
                      <button
                        key={suggestedCity}
                        onClick={() => {
                          setWeatherInput(suggestedCity);
                          setWeatherCity(suggestedCity);
                          playSoundNode(400, 0.05, 'sine');
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 rounded text-[10px] transition-all font-semibold active:scale-95 cursor-pointer shadow-xs"
                      >
                        {suggestedCity}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PROJECT BRANCH 1: SOUNDBOX MEDITATION */}
              {activeProj.id === 'p4' && (
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] text-gray-500">Play custom synthesized sound palettes to test deep mental resonance.</p>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    <button 
                      onClick={() => { setSoundMode('calm'); playSoundNode(261.63, 1.5, 'sine'); }}
                      className={`px-3 py-1.5 rounded font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                        soundMode === 'calm' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'
                      }`}
                    >
                      <Play size={10} />
                      <span>Calm Zen Chime (261Hz)</span>
                    </button>
                    <button 
                      onClick={() => { setSoundMode('forest'); playSoundNode(329.63, 1.5, 'triangle'); }}
                      className={`px-3 py-1.5 rounded font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                        soundMode === 'forest' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'
                      }`}
                    >
                      <Play size={10} />
                      <span>Deep Wave (329Hz)</span>
                    </button>
                    <button 
                      onClick={() => { setSoundMode('bell'); playSoundNode(440.00, 2.0, 'sine'); }}
                      className={`px-3 py-1.5 rounded font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all ${
                        soundMode === 'bell' ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-700 border hover:bg-gray-50'
                      }`}
                    >
                      <Play size={10} />
                      <span>Saraswati Bell (440Hz)</span>
                    </button>
                  </div>

                  <div className="mt-3 p-3 bg-white rounded border border-gray-200 flex justify-between items-center shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isPlayingAudio ? 'bg-green-500 animate-ping' : 'bg-gray-400'}`}></div>
                      <span className="font-semibold text-[11px]">
                        Status: {isPlayingAudio ? 'Soundscape Loop Active' : 'Sound Ambient Paused'}
                      </span>
                    </div>

                    <button 
                      onClick={toggleSoundscape}
                      className="px-4 py-1 bg-[#10b981] hover:bg-[#079163] text-white font-bold rounded text-[10px] cursor-pointer"
                    >
                      {isPlayingAudio ? 'Stop Soundscape' : 'Stagger Synth Chime'}
                    </button>
                  </div>
                </div>
              )}

              {/* PROJECT BRANCH 2: FITNESS TRACKER */}
              {activeProj.id === 'p3' && (
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] text-gray-500">Hydration target tracking engine. Register daily targets in real-time.</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border border-gray-200 text-center shadow-xs">
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Water Intake</span>
                      <span className="text-xl font-black text-sky-600">{waterCups} / 8 Cups</span>
                      
                      <div className="flex justify-center gap-1.5 mt-2">
                        <button 
                          onClick={() => { setWaterCups(prev => Math.max(0, prev - 1)); playSoundNode(180, 0.1, 'triangle'); }}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-xs"
                        >
                          <Minus size={10} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => { setWaterCups(prev => Math.min(15, prev + 1)); playSoundNode(392, 0.15, 'sine'); }}
                          className="w-6 h-6 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-full flex items-center justify-center font-bold text-xs"
                        >
                          <Plus size={10} strokeWidth={3} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded border border-gray-200 text-center shadow-xs">
                      <span className="text-[10px] text-gray-400 uppercase font-mono block">Active Energy</span>
                      <span className="text-xl font-black text-rose-600">{caloriesBurned} KCal</span>
                      
                      <div className="flex justify-center gap-1.5 mt-2">
                        <button 
                          onClick={() => { setCaloriesBurned(prev => Math.max(100, prev - 30)); playSoundNode(180, 0.1, 'triangle'); }}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-xs"
                        >
                          <Minus size={10} strokeWidth={3} />
                        </button>
                        <button 
                          onClick={() => { setCaloriesBurned(prev => prev + 50); playSoundNode(440, 0.1, 'sine'); }}
                          className="w-6 h-6 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-full flex items-center justify-center font-bold text-xs"
                        >
                          <Plus size={10} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-sky-50 text-sky-800 text-[10px] leading-relaxed rounded border border-sky-100 flex items-center justify-between">
                    <div>
                      <strong>Target Status:</strong> {waterCups >= 8 ? '🎖 Target Accomplished!' : 'Stay hydrated! Need more water.'}
                    </div>
                    <span className="font-mono text-gray-500">Buffer state synced!</span>
                  </div>
                </div>
              )}

              {/* PROJECT BRANCH 3: DESIGN SYSTEM TOOLKIT */}
              {activeProj.id === 'p2' && (
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] text-gray-500">Live Custom UI Prototype Canvas. Customize the component state dynamically.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded border border-gray-100 shadow-xs">
                    
                    {/* Controls */}
                    <div className="space-y-2 text-[11px]">
                      <div>
                        <label className="block text-gray-500 font-semibold mb-1">Color Palette</label>
                        <div className="flex gap-2.5">
                          {['#0054e3', '#388e3c', '#e31212', '#7c3aed'].map((col) => (
                            <button
                              key={col}
                              onClick={() => { setPrimaryColor(col); playSoundNode(350, 0.05, 'sine'); }}
                              className="w-5 h-5 rounded-full border border-gray-300 relative"
                              style={{ backgroundColor: col }}
                            >
                              {primaryColor === col && <div className="absolute inset-1 border border-white rounded-full"></div>}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-500 font-semibold mb-1">Corner Radius ({borderRadius}px)</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setBorderRadius(0)} className="bg-gray-100 px-1.5 py-0.5 border text-[9px] rounded">Square</button>
                          <button onClick={() => setBorderRadius(4)} className="bg-gray-100 px-1.5 py-0.5 border text-[9px] rounded">Slight</button>
                          <button onClick={() => setBorderRadius(16)} className="bg-gray-100 px-1.5 py-0.5 border text-[9px] rounded">Pill</button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-500 font-semibold mb-1">Label text</label>
                        <input 
                          type="text" 
                          value={buttonLabel} 
                          onChange={(e) => setButtonLabel(e.target.value)}
                          className="text-xs px-2 py-1 border rounded w-full border-gray-300 max-w-[150px] bg-slate-50 outline-none" 
                        />
                      </div>
                    </div>

                    {/* Preview window */}
                    <div className="bg-slate-50 rounded border border-dashed flex flex-col justify-center items-center min-h-[110px] shadow-sm p-3">
                      <span className="text-[9px] text-gray-400 font-mono mb-2 uppercase block">Live Penpot Canvas</span>
                      <button 
                        onClick={() => { playSoundNode(500, 0.2, 'sine'); alert(`Invoking Action: "${buttonLabel}"`); }}
                        className="font-bold text-white px-5 py-2 cursor-pointer shadow hover:brightness-115 active:scale-95 transition-all text-sm font-sans"
                        style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius}px` }}
                      >
                        {buttonLabel}
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* PROJECT BRANCH 4: RETRO PORTFOLIO VM */}
              {activeProj.id === 'p1' && (
                <div className="flex flex-col gap-2">
                  <p className="text-[11px] text-gray-500">Simulate recursion diagnostic checks of the emulator frame.</p>
                  
                  <div className="bg-slate-950 text-emerald-400 p-3 rounded font-mono text-[9px] leading-relaxed shadow-sm flex flex-col gap-1 min-h-[110px]">
                    <div className="text-gray-400 font-bold mb-1">// SYSTEM DIAGNOSTICS LOG STACK</div>
                    {diagnosticsLog.map((log, index) => (
                      <div key={index} className="flex gap-1">
                        <span className="text-gray-600 block shrink-0">{`>`}</span>
                        <span className="truncate">{log}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-[10px] text-gray-400 font-mono">Dynamic registers monitored</span>
                    <button 
                      onClick={simulateDiagnostics}
                      className="px-4 py-1.5 bg-[#0054e3] hover:bg-blue-600 font-bold font-semibold text-[10px] text-white rounded cursor-pointer active:scale-95"
                    >
                      Trigger Log Buffer Injection
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Simulated Live links */}
            <div className="flex flex-wrap gap-2 text-xs pt-1">
              <span className="text-gray-400 font-mono text-[10px] capitalize">Configured tags:</span>
              {activeProj.tags.map((tg) => (
                <span key={tg} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono leading-none border border-slate-200 font-semibold">{tg}</span>
              ))}
            </div>

          </div>
          
          {/* Footer warning */}
          <div className="bg-gray-100 border-t p-3 text-center text-[10px] text-gray-500 font-mono select-none">
            Offline Sandbox Emulated Engine © Ankita Das Portfolio 2026. All operations verified active.
          </div>

        </div>

      </div>

      {/* 3. Connection and Zone details status bar */}
      <div className="bg-[#ece9d8] border-t border-[#a0a0a0] px-3 py-1 flex justify-between items-center text-[10px] select-none text-slate-600">
        <div className="flex gap-2 items-center">
          <Globe size={11} className="text-sky-600" />
          <span>Local Localhost Zone | Emulated</span>
        </div>
        
        <div className="flex gap-2 items-center divide-x divide-gray-400">
          <span className="px-1">{activeProj.stats}</span>
          <span className="pl-2 pr-1 font-mono">100% Buffered</span>
        </div>
      </div>

    </div>
  );
}
