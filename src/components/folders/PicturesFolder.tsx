import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  RotateCw, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Printer, 
  Heart, 
  Download, 
  Maximize2, 
  ChevronRight, 
  Info,
  Calendar,
  FileImage,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { playInterfaceClickSound } from '../../utils/audio';
// @ts-ignore
import ankitaPhoto from '../../assets/images/ankitadas.jpeg';

export default function PicturesFolder() {
  const [selectedImage, setSelectedImage] = useState<string>('ankita_photo');
  const [rotation, setRotation] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  const images = [
    {
      id: 'ankita_photo',
      title: 'Ankita_Das_Portrait.jpg',
      src: ankitaPhoto,
      date: 'May 30, 2026',
      size: '1.4 MB',
      dimensions: '1024 x 1024 px',
      type: 'JPEG Image',
      description: 'Official developer profile and graphic interaction portrait.'
    }
  ];

  const handleRotate = (dir: 'cw' | 'ccw') => {
    playInterfaceClickSound();
    setRotation(prev => prev + (dir === 'cw' ? 90 : -90));
  };

  const handleZoom = (dir: 'in' | 'out') => {
    playInterfaceClickSound();
    setZoom(prev => {
      if (dir === 'in') return Math.min(prev + 0.25, 2.5);
      return Math.max(prev - 0.25, 0.5);
    });
  };

  const handlePrint = () => {
    playInterfaceClickSound();
    window.print();
  };

  return (
    <div className="bg-[#ece9d8] h-full flex flex-col font-sans select-none text-xs text-gray-800">
      
      {/* File Explorer Path Bar */}
      <div className="bg-[#f0f0e8] border-b border-[#dfd7c0] px-3 py-1.5 flex items-center gap-1 text-[11px] text-gray-600">
        <span className="opacity-75">Address:</span>
        <div className="bg-white border border-[#9b947c] px-2 py-0.5 rounded flex-1 flex items-center justify-between shadow-inner">
          <span className="font-mono text-[10px] text-gray-800">C:\Documents and Settings\Ankita Das\My Documents\My Pictures</span>
          <ChevronRight size={12} className="text-[#3f8cf3]" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Windows XP Style Action Sidebar */}
        <div className="w-52 bg-[#7aa1e6]/10 border-r border-[#dfd7c0] p-3 flex flex-col gap-3 select-none overflow-y-auto hidden sm:block">
          
          {/* Picture Tasks section */}
          <div className="bg-[#fcfcfa] border border-[#a6bcdf] rounded-md overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#245edb] to-[#3f8cf3] text-white px-2.5 py-1 font-bold text-[11px] flex justify-between items-center bg-[#5c85d6] border-b border-[#245edb]">
              <span>Picture Tasks</span>
              <ImageIcon size={11} className="text-sky-100" />
            </div>
            <div className="p-2 space-y-2 text-[10px] text-[#0a53de]">
              <button 
                onClick={() => setIsViewerOpen(true)}
                className="w-full text-left flex items-center gap-1.5 hover:underline decoration-blue-600 font-semibold"
              >
                <Maximize2 size={12} className="text-[#245edb]" />
                <span>View as slide show</span>
              </button>
              <button 
                onClick={handlePrint}
                className="w-full text-left flex items-center gap-1.5 hover:underline decoration-blue-600 font-semibold text-gray-700"
              >
                <Printer size={12} className="text-[#245edb]" />
                <span>Print this picture</span>
              </button>
              <a 
                href={ankitaPhoto} 
                download="Ankita_Das_Portrait.png"
                className="w-full text-left flex items-center gap-1.5 hover:underline decoration-blue-600 font-semibold flex"
              >
                <Download size={12} className="text-[#245edb]" />
                <span>Download to Local Disk</span>
              </a>
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-[#fcfcfa] border border-[#a6bcdf] rounded-md overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#245edb] to-[#3f8cf3] text-white px-2.5 py-1 font-bold text-[11px] flex justify-between items-center bg-[#5c85d6] border-b border-[#245edb]">
              <span>Details</span>
              <Info size={11} className="text-sky-100" />
            </div>
            {images.map(img => {
              if (img.id !== selectedImage) return null;
              return (
                <div key={img.id} className="p-2.5 space-y-1.5 text-[10px] text-gray-600 font-mono">
                  <div className="font-bold text-gray-800 break-words mb-1 text-[11px] font-sans pb-1 border-b border-gray-150">{img.title}</div>
                  <div className="flex items-center gap-1"><Calendar size={11} className="text-gray-400 shrink-0" /> Date: {img.date}</div>
                  <div className="flex items-center gap-1"><FileImage size={11} className="text-gray-400 shrink-0" /> Dimensions: {img.dimensions}</div>
                  <div className="flex items-center gap-1"><Sparkles size={11} className="text-gray-400 shrink-0" /> File Size: {img.size}</div>
                  <div className="text-[9px] text-gray-500 font-sans italic pt-1 leading-normal">{img.description}</div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Active Grid Area */}
        <div className="flex-1 p-4 bg-white flex flex-col overflow-y-auto justify-between">
          
          {/* Main content view */}
          <div className="space-y-4">
            
            {/* Folder Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <ImageIcon size={20} className="text-emerald-600" />
                <h3 className="font-bold text-sm text-gray-900 font-sans">Stored Profile Images (1 Objects)</h3>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">1.4 MB total storage size</span>
            </div>

            {/* Thumbnail Display Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map(img => {
                const isSelected = selectedImage === img.id;
                return (
                  <div 
                    key={img.id}
                    onClick={() => {
                      playInterfaceClickSound();
                      setSelectedImage(img.id);
                    }}
                    onDoubleClick={() => setIsViewerOpen(true)}
                    className={`border rounded p-2 text-center cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#3f8cf3]/15 border-[#3f8cf3] ring-1 ring-[#3f8cf3]/30 shadow-md' 
                        : 'bg-slate-50 border-gray-200 hover:bg-slate-100 hover:border-gray-300'
                    }`}
                  >
                    {/* Shadowed polaroid-like thumbnail container */}
                    <div className="aspect-square bg-black flex items-center justify-center overflow-hidden rounded shadow-inner border border-gray-150 relative group">
                      <img 
                        src={img.src} 
                        alt={img.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white bg-slate-900/80 border border-slate-700 font-bold px-2 py-1 rounded text-[10px] flex items-center gap-1 font-mono tracking-wider">
                          OPEN VIEWER 🔍
                        </span>
                      </div>
                    </div>
                    
                    <p className="font-semibold text-[11px] mt-2 text-gray-800 truncate font-mono">{img.title}</p>
                    <p className="text-[9px] text-gray-400 font-mono font-medium">{img.dimensions} • {img.size}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50 rounded border border-amber-200/80 p-3 text-amber-800 text-[11px] leading-relaxed select-none">
              <strong className="block mb-0.5 text-amber-900">💻 Technical Note:</strong>
              This picture is synchronized dynamically with the Cloud container asset directories. Double-click the picture or click <strong>View as slide show</strong> on the sidebar to launch the interactive Windows Picture and Fax Viewer.
            </div>

          </div>

          {/* Windows Picture and Fax Viewer modal simulation */}
          {isViewerOpen && (
            <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
              <div 
                className="bg-[#ece9d8] w-full max-w-2xl border-4 border-[#0a53de] rounded-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Viewer Title Bar */}
                <div className="bg-gradient-to-r from-[#0058e6] via-[#248ef3] to-[#0058e6] text-white px-3 py-1.5 font-bold text-xs flex justify-between items-center text-[11px] shadow-inner select-none">
                  <div className="flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-sky-200 animate-pulse" />
                    <span>Windows Picture and Fax Viewer - [Ankita_Das_Portrait.jpg]</span>
                  </div>
                  <button 
                    onClick={() => {
                      playInterfaceClickSound();
                      setIsViewerOpen(false);
                      setRotation(0);
                      setZoom(1);
                    }}
                    className="w-5 h-5 rounded bg-rose-500 hover:bg-rose-400 active:scale-90 border border-rose-700 flex items-center justify-center text-white font-extrabold cursor-pointer leading-none text-[11px] shadow"
                  >
                    ×
                  </button>
                </div>

                {/* Main viewport frame */}
                <div className="bg-[#4a4a44] p-6 h-[400px] flex items-center justify-center border-b border-[#a8a18a] overflow-hidden relative">
                  
                  {/* Active photo box and manipulation layout properties */}
                  <div 
                    className="transition-all duration-300 ease-out shadow-2xl relative"
                    style={{
                      transform: `rotate(${rotation}deg) scale(${zoom})`,
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  >
                    <img 
                      src={ankitaPhoto} 
                      alt="Ankita Das Portrait" 
                      className="max-h-[320px] max-w-full rounded object-contain border-2 border-white pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Absolute positioning dimensions details banner */}
                  <span className="absolute bottom-2 right-3 font-mono text-[9px] text-gray-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs select-none">
                    Resolution: 1024 x 1024 px • Zoom: {Math.round(zoom * 100)}%
                  </span>

                </div>

                {/* Visual adjustment command list controls bar */}
                <div className="bg-[#f0f0e8] p-3 flex justify-center items-center gap-4 select-none">
                  
                  <button 
                    onClick={() => handleZoom('in')}
                    className="p-1 px-2.5 bg-gradient-to-b from-white to-slate-205 border border-gray-400 hover:border-gray-500 rounded active:scale-95 shadow-sm text-gray-700 hover:text-black flex items-center gap-1"
                    title="Zoom In"
                  >
                    <ZoomIn size={14} />
                    <span className="text-[10px] font-bold">Zoom In</span>
                  </button>
                  
                  <button 
                    onClick={() => handleZoom('out')}
                    className="p-1 px-2.5 bg-gradient-to-b from-white to-slate-205 border border-gray-400 hover:border-gray-500 rounded active:scale-95 shadow-sm text-gray-700 hover:text-black flex items-center gap-1"
                    title="Zoom Out"
                  >
                    <ZoomOut size={14} />
                    <span className="text-[10px] font-bold">Zoom Out</span>
                  </button>

                  <div className="w-px bg-gray-300 h-6"></div>

                  <button 
                    onClick={() => handleRotate('ccw')}
                    className="p-1 bg-gradient-to-b from-white to-slate-205 border border-gray-400 hover:border-gray-500 rounded active:scale-90 shadow-sm text-gray-700 hover:text-black"
                    title="Rotate Counter-Clockwise"
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button 
                    onClick={() => handleRotate('cw')}
                    className="p-1 bg-gradient-to-b from-white to-slate-205 border border-gray-400 hover:border-gray-500 rounded active:scale-90 shadow-sm text-gray-700 hover:text-black"
                    title="Rotate Clockwise"
                  >
                    <RotateCw size={14} />
                  </button>

                  <div className="w-px bg-gray-300 h-6"></div>

                  <button 
                    onClick={() => {
                      playInterfaceClickSound();
                      setIsViewerOpen(false);
                      setRotation(0);
                      setZoom(1);
                    }}
                    className="p-1 px-4 bg-gradient-to-b from-slate-200 to-slate-300 border-2 border-slate-400 hover:border-slate-500 rounded-md font-bold text-[10px] active:scale-95 shadow cursor-pointer text-gray-800"
                  >
                    Close Viewer
                  </button>

                </div>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
