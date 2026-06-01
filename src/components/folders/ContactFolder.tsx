import React from 'react';
import { Mail, Phone, Shield, ArrowUpRight, Info, Copy, Check } from 'lucide-react';
import { playInterfaceClickSound } from '../../utils/audio';

export default function ContactFolder() {
  const [copiedType, setCopiedType] = React.useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    playInterfaceClickSound();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div className="bg-xp-bg h-full p-3 font-sans flex flex-col justify-between overflow-hidden text-sm select-none" id="contact-folder-container">
      {/* Outer Connection card frame */}
      <div className="flex-1 bg-white border border-gray-400 rounded-lg flex flex-col md:flex-row overflow-hidden shadow-inner">
        
        {/* Left Visual Brand sidebar */}
        <div className="w-full md:w-44 bg-gradient-to-b from-[#0054e3] via-[#245edb] to-[#1a4bb3] p-4 text-white flex flex-col justify-between relative" id="contact-sidebar">
          <div>
            <div className="flex gap-1 items-center mb-4">
              <span className="text-xl">⚡</span>
              <h3 className="font-bold text-xs uppercase tracking-widest text-[#94c1f9]">XP CONTACTS</h3>
            </div>
            <h1 className="text-sm md:text-base font-bold leading-snug">
              Ankita Das<br />
              Direct Directory
            </h1>
            <p className="text-[10px] text-[#9fcbff] mt-2 leading-relaxed">
              Verified communication details for reaching out directly via telephone or email network.
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-2 text-[10px] text-sky-200 mt-6 pt-3 border-t border-sky-800">
            <div className="flex items-center gap-1.5 py-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
              <span className="text-white font-bold">Inbox Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-200/80">
              <Shield size={11} className="text-sky-300" />
              <span>Direct Link Verified</span>
            </div>
          </div>
        </div>

        {/* Contact Active Area */}
        <div className="flex-1 p-5 md:p-6 flex flex-col gap-5 overflow-y-auto" id="contact-active-area">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#0a53de]">
              Contact Details
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              If you have any questions, projects, or inquiries, feel free to reach out. Ankita Das is available directly through the following channels:
            </p>
          </div>

          {/* Cards Displaying email and phone */}
          <div className="grid grid-cols-1 gap-3.5 mt-1" id="contact-channels-grid">
            
            {/* Email Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gradient-to-r from-sky-50/50 to-white hover:from-sky-50 border border-gray-250 hover:border-sky-300 rounded-lg transition-all shadow-sm group">
              <a 
                href="mailto:ankitadasofficial771@gmail.com" 
                onClick={playInterfaceClickSound}
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <span className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center shrink-0 text-lg shadow-sm">
                  ✉️
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] text-[#245edb] font-bold font-mono uppercase tracking-wider">EMAIL ADDRESS</div>
                  <div className="font-bold text-gray-900 group-hover:text-blue-805 truncate text-sm font-mono mt-0.5">
                    ankitadasofficial771@gmail.com
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                    <span>Click to open native mail tool</span>
                    <ArrowUpRight size={10} />
                  </div>
                </div>
              </a>
              
              <button 
                onClick={() => handleCopy('ankitadasofficial771@gmail.com', 'email')}
                className="mt-3 sm:mt-0 px-2.5 py-1 text-[11px] bg-white hover:bg-gray-100 border border-gray-320 rounded shadow-xs focus:outline-none flex items-center gap-1.5 font-semibold text-gray-700 active:scale-95 transition-all self-start sm:self-center cursor-pointer"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check size={12} className="text-green-600" />
                    <span className="text-green-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} className="text-gray-500" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50/50 to-white hover:from-emerald-50 border border-gray-250 hover:border-emerald-300 rounded-lg transition-all shadow-sm group">
              <a 
                href="tel:+916295603867" 
                onClick={playInterfaceClickSound}
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <span className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-lg shadow-sm">
                  📞
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] text-emerald-700 font-bold font-mono uppercase tracking-wider">PHONE NUMBER</div>
                  <div className="font-bold text-gray-900 group-hover:text-emerald-805 truncate text-sm font-mono mt-0.5">
                    +91 6295603867
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                    <span>Click to launch dialer</span>
                    <ArrowUpRight size={10} />
                  </div>
                </div>
              </a>

              <button 
                onClick={() => handleCopy('+916295603867', 'phone')}
                className="mt-3 sm:mt-0 px-2.5 py-1 text-[11px] bg-white hover:bg-gray-100 border border-gray-320 rounded shadow-xs focus:outline-none flex items-center gap-1.5 font-semibold text-gray-700 active:scale-95 transition-all self-start sm:self-center cursor-pointer"
              >
                {copiedType === 'phone' ? (
                  <>
                    <Check size={12} className="text-green-600" />
                    <span className="text-green-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} className="text-gray-500" />
                    <span>Copy Number</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Quick Informational Notice Footer on safety */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-start gap-2.5 mt-2">
            <Info className="text-amber-600 shrink-0 mt-0.5" size={15} />
            <div className="text-[11px] text-amber-800 leading-normal">
              <strong>Network Security Protocol:</strong> Direct communication details are fully encrypted end-to-end. Your interactions are safe and go directly to Ankita Das for review. Keep this contact channel open for career outreach, software contracts, or general design reviews.
            </div>
          </div>
        </div>

      </div>

      {/* Simplified Status Footer */}
      <div className="border-t border-gray-300 pt-3 flex justify-between items-center bg-xp-bg select-none mt-3" id="contact-footer">
        <span className="text-[10px] text-gray-500 font-mono">Directory Service v2.20</span>
        <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 bg-slate-200 rounded border border-slate-300 flex items-center gap-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Online Desk</span>
        </span>
      </div>
    </div>
  );
}
