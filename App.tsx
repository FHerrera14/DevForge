
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ImageEnhancer from './components/ImageEnhancer';
import MapGenerator from './components/MapGenerator';
import TextureForge from './components/TextureForge';
import ModelOptimizer from './components/ModelOptimizer';
import AssetFinder from './components/AssetFinder';
import { ToolType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolType>(ToolType.ENHANCER);

  const renderContent = () => {
    switch (activeTab) {
      case ToolType.ENHANCER:
        return <ImageEnhancer />;
      case ToolType.BLUEPRINTS:
        return <MapGenerator />;
      case ToolType.TEXTURES:
        return <TextureForge />;
      case ToolType.OPTIMIZER:
        return <ModelOptimizer />;
      case ToolType.ASSETS:
        return <AssetFinder />;
      default:
        return <ImageEnhancer />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              {activeTab === ToolType.ENHANCER && 'Asset Forge'}
              {activeTab === ToolType.BLUEPRINTS && 'Architect Studio'}
              {activeTab === ToolType.TEXTURES && 'Material Lab'}
              {activeTab === ToolType.OPTIMIZER && 'Performance Center'}
              {activeTab === ToolType.ASSETS && 'Resource Hub'}
            </h1>
            <p className="text-slate-400">Enhancing your development workflow with Generative AI.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active Model</span>
              <span className="text-sm font-medium text-slate-300">Gemini 3 Pro + 2.5 Image</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <i className="fa-solid fa-user-astronaut"></i>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>

        <footer className="mt-12 py-6 border-t border-slate-900 text-center text-slate-500 text-xs">
          <p>© 2024 DevForge AI - Game Developer Productivity Suite. Built with Gemini API.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
