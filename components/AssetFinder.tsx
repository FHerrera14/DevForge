
import React, { useState } from 'react';
import { findFreeAssets } from '../geminiService';

const AssetFinder: React.FC = () => {
  const [query, setQuery] = useState('Fantasy environment assets');
  const [results, setResults] = useState<{ text: string; sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await findFreeAssets(query);
      setResults(data);
    } catch (err) {
      alert("Error finding assets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-2xl font-bold mb-2">Free Asset Discovery</h2>
      <p className="text-slate-400 mb-8">Find high-quality, free-to-use assets from stores and community hubs.</p>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="relative group">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for free assets (e.g., low poly nature, sci-fi sounds, skybox pack)..."
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-5 px-6 pr-16 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-xl"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white hover:bg-emerald-500 transition-all disabled:bg-slate-700"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-magnifying-glass"></i>}
          </button>
        </div>

        {results && (
          <div className="space-y-6">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold">
                <i className="fa-solid fa-box-open"></i>
                <h3>Curated Recommendations</h3>
              </div>
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {results.text}
              </div>
            </div>

            {results.sources.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Grounding Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.sources.map((source: any, idx: number) => (
                    source.web && (
                      <a 
                        key={idx} 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex items-center gap-3 transition-all group"
                      >
                        <i className="fa-solid fa-link text-slate-500 group-hover:text-emerald-400"></i>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium text-slate-200 truncate">{source.web.title}</p>
                          <p className="text-xs text-slate-500 truncate">{source.web.uri}</p>
                        </div>
                      </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!results && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Unity Asset Store', 'Epic Marketplace', 'itch.io Bundles'].map(hub => (
              <div key={hub} className="p-4 rounded-xl bg-slate-800/30 border border-slate-800 text-center text-slate-500 text-sm">
                Searching across {hub}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetFinder;
