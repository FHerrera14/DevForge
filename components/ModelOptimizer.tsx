
import React, { useState } from 'react';
import { analyzeModel } from '../geminiService';

const ModelOptimizer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [context, setContext] = useState('Mobile RPG environment asset');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const result = await analyzeModel(image, context);
      setAnalysis(result || "No analysis provided.");
    } catch (err) {
      alert("Error analyzing model.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-2">3D Model Optimization Audit</h2>
      <p className="text-slate-400 mb-8">Upload a screenshot of your mesh (wireframe or textured) for performance feedback.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Platform / Use Case</label>
            <input 
              type="text" 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., Hero character for high-end PC"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center transition-all ${image ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-700 bg-slate-800/50'}`}
          >
            {image ? (
              <img src={image} alt="Mesh view" className="max-h-full object-contain p-2" />
            ) : (
              <div className="text-center">
                <i className="fa-solid fa-cube text-3xl text-slate-600 mb-2"></i>
                <p className="text-sm text-slate-400">Upload mesh screenshot</p>
                <p className="text-xs text-slate-500">Wireframe view is highly recommended</p>
              </div>
            )}
            <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className={`w-full py-4 rounded-xl font-bold transition-all text-white shadow-lg ${!image || loading ? 'bg-slate-700' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20'}`}
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin mr-2"></i> : <i className="fa-solid fa-magnifying-glass-chart mr-2"></i>}
            Analyze for Optimization
          </button>
        </div>

        <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 h-full min-h-[400px]">
          {analysis ? (
            <div className="prose prose-invert max-w-none overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-700">
              <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-list-check"></i> Analysis Report
              </h3>
              <div className="text-slate-300 whitespace-pre-wrap leading-relaxed text-sm">
                {analysis}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center">
              <i className="fa-solid fa-clipboard-question text-5xl mb-4 opacity-20"></i>
              <p>Audit results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelOptimizer;
