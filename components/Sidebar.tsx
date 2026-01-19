
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTab: ToolType;
  setActiveTab: (tab: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: ToolType.ENHANCER, icon: 'fa-wand-magic-sparkles', label: 'Image Enhancer' },
    { id: ToolType.BLUEPRINTS, icon: 'fa-map-location-dot', label: 'Blueprints' },
    { id: ToolType.TEXTURES, icon: 'fa-cube', label: 'Texture Forge' },
    { id: ToolType.OPTIMIZER, icon: 'fa-microchip', label: '3D Optimizer' },
    { id: ToolType.ASSETS, icon: 'fa-gift', label: 'Free Assets' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-full flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-gamepad text-xl"></i>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          DevForge AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Pro Developer Tip</p>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "Always bake your lighting before shipping to mobile."
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
