
import React, { useState } from 'react';
import { editImage } from '../geminiService';

const ImageEnhancer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Enhance this game asset, add micro-details, improve lighting and sharpen textures for a 4K PBR workflow.');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const enhanced = await editImage(image, prompt);
      setResult(enhanced);
    } catch (err) {
      alert("Error enhancing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-2xl font-bold mb-2">Asset Quality Enhancer</h2>
        <p className="text-slate-400 mb-6">Upload a low-quality asset or concept art and let AI upsample and detail it for your game.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div 
              className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center h-80 transition-colors ${
                image ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
              }`}
            >
              {image ? (
                <img src={image} alt="Source" className="max-h-full max-w-full object-contain p-2 rounded-lg" />
              ) : (
                <div className="text-center p-6">
                  <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-600 mb-4"></i>
                  <p className="text-slate-400 mb-2">Drag and drop or click to upload</p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Enhancement Style</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24"
              />
            </div>
            
            <button
              onClick={handleEnhance}
              disabled={!image || loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-900/20 transition-all ${
                !image || loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-notch animate-spin"></i> Processing...
                </span>
              ) : 'Enhance Quality'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[400px] overflow-hidden">
            {result ? (
              <div className="relative group w-full h-full flex items-center justify-center p-4">
                <img src={result} alt="Enhanced" className="max-h-full max-w-full object-contain rounded-lg" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <a 
                    href={result} 
                    download="enhanced-asset.png"
                    className="p-3 bg-slate-900/80 hover:bg-slate-900 rounded-full backdrop-blur-sm border border-slate-700 transition-all"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-10">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                  <i className="fa-solid fa-sparkles text-slate-700 text-2xl"></i>
                </div>
                <p className="text-slate-500">Enhanced result will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancer;
