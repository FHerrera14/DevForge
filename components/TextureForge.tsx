
import React, { useState } from 'react';
import { generateImage, editImage } from '../geminiService';

const TextureForge: React.FC = () => {
  const [textureType, setTextureType] = useState('Cracked Dry Earth');
  const [mode, setMode] = useState<'create' | 'normal'>('create');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const groundTypes = [
    'Cracked Dry Earth', 'Medieval Cobblestone', 'Rusty Metal Grate', 
    'Lush Stylized Grass', 'Snowy Rocky Terrain', 'Sci-fi Circuit Floor'
  ];

  const handleGenerateTexture = async () => {
    setLoading(true);
    const prompt = `Seamless tiled game texture of ${textureType}. High quality PBR material, professional game asset, 4k detail, flat lighting, neutral colors.`;
    try {
      const imageUrl = await generateImage(prompt, "1:1");
      setResult(imageUrl);
    } catch (err) {
      alert("Error generating texture.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNormal = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    const prompt = `Convert this image into a standard blue/purple PBR Normal Map texture. Use the standard normal map color palette (magenta-cyan-blue). It should represent the depth and surface bumps of the original image accurately for a game engine.`;
    try {
      const imageUrl = await editImage(uploadedImage, prompt);
      setResult(imageUrl);
    } catch (err) {
      alert("Error generating normal map.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Texture Forge</h2>
          <p className="text-slate-400">Create ground textures or derive normal maps.</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => { setMode('create'); setResult(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'create' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Create New
          </button>
          <button 
            onClick={() => { setMode('normal'); setResult(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Normal Map From Image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {mode === 'create' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-400">Ground Material Type</label>
              <div className="grid grid-cols-2 gap-2">
                {groundTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setTextureType(t)}
                    className={`p-3 rounded-lg text-xs text-left transition-all ${textureType === t ? 'bg-indigo-600/20 border-indigo-600 text-indigo-400 border' : 'bg-slate-800 border border-slate-700 text-slate-400'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerateTexture}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all"
              >
                {loading ? <i className="fa-solid fa-sync animate-spin"></i> : 'Generate Tileable Texture'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div 
                className={`relative border-2 border-dashed rounded-xl h-60 flex flex-col items-center justify-center transition-all ${uploadedImage ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-700 bg-slate-800/50'}`}
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Source" className="max-h-full p-2 object-contain" />
                ) : (
                  <div className="text-center">
                    <i className="fa-solid fa-image text-3xl text-slate-600 mb-2"></i>
                    <p className="text-sm text-slate-400">Upload diffuse/base color</p>
                  </div>
                )}
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              </div>
              <button
                onClick={handleGenerateNormal}
                disabled={!uploadedImage || loading}
                className={`w-full py-4 rounded-xl font-bold transition-all ${!uploadedImage || loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
              >
                {loading ? <i className="fa-solid fa-sync animate-spin"></i> : 'Generate Normal Map'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 aspect-square flex items-center justify-center overflow-hidden">
          {result ? (
            <img src={result} alt="Texture Result" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-slate-700 p-8">
              <i className="fa-solid fa-chess-board text-5xl mb-4 opacity-10"></i>
              <p>Texture output will be 1024x1024</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextureForge;
