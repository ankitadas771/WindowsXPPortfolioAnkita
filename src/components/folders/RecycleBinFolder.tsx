import React, { useState } from 'react';
import { Trash2, Folder, File, AlertTriangle, RefreshCcw } from 'lucide-react';
import { playInterfaceClickSound, playErrorSound, playWindowCloseSound } from '../../utils/audio';

interface TrashItem {
  name: string;
  type: string;
  size: string;
  dateDeleted: string;
}

export default function RecycleBinFolder() {
  const [items, setItems] = useState<TrashItem[]>([
    { name: 'stale_cookies.txt', type: 'Text Document', size: '1 KB', dateDeleted: '2026-05-12' },
    { name: 'IE5_setup.exe', type: 'Application', size: '2.4 MB', dateDeleted: '2026-05-15' },
    { name: 'null_pointer_bug.log', type: 'Shortcut file', size: '4 KB', dateDeleted: '2026-05-20' },
    { name: 'old_resume_v1_draft.doc', type: 'WordPad Document', size: '45 KB', dateDeleted: '2026-05-24' }
  ]);

  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  const selectItem = (name: string) => {
    setSelectedItemName(name);
    playInterfaceClickSound();
  };

  const handleEmptyBin = () => {
    if (items.length === 0) {
      playErrorSound();
      alert("Recycle Bin is already empty!");
      return;
    }
    
    const confirmChoice = window.confirm("Are you sure you want to permanently delete these " + items.length + " items?");
    if (confirmChoice) {
      setItems([]);
      setSelectedItemName(null);
      playWindowCloseSound(); // represents deletion chime
    }
  };

  const handleRestoreItem = (name: string) => {
    setItems(prev => prev.filter(item => item.name !== name));
    setSelectedItemName(null);
    playInterfaceClickSound();
    alert(`"${name}" has been successfully restored to its original location!`);
  };

  return (
    <div className="bg-[#ece9d8] h-full flex flex-col font-sans select-none text-xs text-gray-800">
      
      {/* Folder Actions Sub-Bar */}
      <div className="bg-[#ece9d8] border-b border-[#dfd7c0] px-3 py-2 flex flex-wrap gap-2 items-center justify-between select-none">
        <div className="flex gap-2">
          <button 
            onClick={handleEmptyBin}
            className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-400 rounded cursor-pointer font-bold flex items-center gap-1 text-red-700 outline-none active:scale-95 transition-transform"
          >
            <Trash2 size={13} />
            <span>Empty Recycle Bin</span>
          </button>
          
          {selectedItemName && (
            <button 
              onClick={() => handleRestoreItem(selectedItemName)}
              className="px-3 py-1 bg-white hover:bg-gray-50 border border-gray-400 rounded cursor-pointer font-bold flex items-center gap-1 text-[#0a53de] outline-none active:scale-95 transition-transform"
            >
              <RefreshCcw size={13} />
              <span>Restore Item</span>
            </button>
          )}
        </div>
        
        <span className="text-gray-500 font-mono text-[10px] hidden sm:block">
          C:\RECYCLER\S-1-5-21-ANKITA
        </span>
      </div>

      <div className="flex-1 flex overflow-hidden bg-white">
        
        {/* Left Informative Panel */}
        <div className="w-44 bg-[#7aa1e6]/10 border-r border-gray-200 p-3 flex flex-col gap-3 select-none overflow-y-auto hidden md:block">
          <div className="bg-white border rounded">
            <div className="bg-[#5c85d6] text-white px-2 py-1 font-bold text-[10px] flex justify-between items-center">
              <span>Recycle Bin Tasks</span>
              <Trash2 size={10} />
            </div>
            <div className="p-2 flex flex-col gap-1.5 text-gray-700 leading-normal">
              <p>The Recycle Bin retains documents, code binaries, and shortcuts that were marked for removal.</p>
              <p className="text-[10px] text-gray-400 italic">Total Items: {items.length}</p>
            </div>
          </div>
        </div>

        {/* Right Files Container */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col">
          {items.length > 0 ? (
            <div className="border-2 border-dashed border-gray-200 rounded p-1 flex-1 bg-slate-50/50">
              {/* Table List Layout */}
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-gray-300 text-gray-500 font-mono text-[10px]">
                    <th className="p-2 font-bold">Name</th>
                    <th className="p-2 font-bold hidden sm:table-cell">Type</th>
                    <th className="p-2 font-bold">Size</th>
                    <th className="p-2 font-bold hidden md:table-cell">Date Deleted</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const isSelected = selectedItemName === item.name;
                    return (
                      <tr 
                        key={item.name}
                        onClick={() => selectItem(item.name)}
                        className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                          isSelected ? 'bg-blue-100 font-semibold' : ''
                        }`}
                      >
                        <td className="p-2 flex items-center gap-2">
                          <File size={13} className="text-slate-400" />
                          <span className={isSelected ? 'text-blue-800' : 'text-gray-800'}>{item.name}</span>
                        </td>
                        <td className="p-2 text-gray-500 hidden sm:table-cell">{item.type}</td>
                        <td className="p-2 text-gray-600 font-mono">{item.size}</td>
                        <td className="p-2 text-gray-400 font-mono hidden md:table-cell">{item.dateDeleted}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-slate-100/50 rounded border-2 border-dashed border-gray-200">
              <Trash2 size={42} className="text-gray-300 mb-2" />
              <p className="font-bold text-gray-400">Recycle Bin is empty.</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Feel free to delete any files to gather trash stats.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
