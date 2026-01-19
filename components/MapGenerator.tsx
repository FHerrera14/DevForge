
import React, { useState } from 'react';
import { generateImage } from '../geminiService';

const MapGenerator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState('Fantasy / Medieval RPG');
  const [customStyle, setCustomStyle] = useState('');
  const [type, setType] = useState('Top-down Blueprint');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = [
    'Fantasy / Medieval RPG',
    'Sci-Fi / Space Station',
    'Cyberpunk / Future City',
    'Post-Apocalyptic / Wasteland',
    'Horror / Haunted Mansion',
    'Wild West / Frontier Town',
    'Noir / 1940s Detective',
    'Steampunk / Victorian Engine',
    'Modern Urban / City Block',
    'Military / Tactical Base',
    'Stylized / Cartoon World',
    'Retro Pixel Art Style',
    'Lovecraftian / Eldritch Space',
    'Ancient Egypt / Desert Tomb',
    'Underwater / Rapture Style',
    'Industrial / Factory Zone',
    'Platformer / Neon Level',
    'Custom Style...'
  ];

  const types = ['Top-down Blueprint', 'Level Layout Sketch', 'Orthographic Reference', 'Isometric Map'];

  const handleGenerate = async () => {
    setLoading(true);
    const finalStyle = selectedStyle === 'Custom Style...' ? customStyle : selectedStyle;
    const prompt = `Highly detailed ${type} of a ${finalStyle} game level. Professional architectural drawing style, technical annotations, grid lines, clear corridors and rooms, level design documentation style.`;
    
    try {
      const imageUrl = await generateImage(prompt, "16:9");
      setResult(imageUrl);
    } catch (err) {
      alert("Error generating blueprint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-2">Level Blueprint Architect</h2>
      <p className="text-slate-400 mb-8">Generate floor plans and layout references for any video game genre or custom scenario.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Theme / Genre Style</label>
              <select 
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {selectedStyle === 'Custom Style...' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-slate-400 mb-2">Define Custom Theme</label>
                <input
                  type="text"
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="e.g. Floating sky islands with crystal tech"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-200"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Asset Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || (selectedStyle === 'Custom Style...' && !customStyle.trim())}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
              loading || (selectedStyle === 'Custom Style...' && !customStyle.trim())
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/20'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner animate-spin"></i> Mapping Level...
              </span>
            ) : 'Generate Blueprint'}
          </button>
        </div>

        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center min-h-[400px]">
          {result ? (
            <div className="w-full h-full p-4 relative">
              <img src={result} alt="Generated Blueprint" className="w-full h-full object-contain rounded-lg shadow-2xl" />
              <div className="absolute bottom-6 right-6 flex gap-2">
                <a 
                  href={result} 
                  download="blueprint.png"
                  className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 text-sm font-bold flex items-center gap-2"
                >
                  <i className="fa-solid fa-download"></i> Save PNG
                </a>
                <button 
                  onClick={() => setResult(null)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-700 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-slate-800 flex items-center justify-center mb-6 opacity-40">
                <i className="fa-solid fa-compass-drafting text-4xl"></i>
              </div>
              <p className="max-w-xs text-slate-500">Select a game genre or define your own to generate unique architectural references.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapGenerator;
