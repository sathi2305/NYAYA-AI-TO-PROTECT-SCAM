import React, { useState, useEffect } from 'react';
import { Search, Globe, ExternalLink, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface SearchGroundingToolProps {
  incomingQuery?: string;
}

export const SearchGroundingTool: React.FC<SearchGroundingToolProps> = ({ incomingQuery }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    'Is SEBI registration number INA000000000 genuine?',
    'Has SEBI issued warning on Telegram VIP stock tip groups?',
    'Is there any official NSDL bonus share allotment fee?',
    'Latest SEBI circular on unregistered finfluencers 2024',
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    setResultText(null);
    setGroundingSources([]);

    try {
      const response = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Search verification failed');
      }

      const data = await response.json();
      setResultText(data.text);
      setGroundingSources(data.groundingChunks || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to connect to Google Search grounding');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  useEffect(() => {
    if (incomingQuery && incomingQuery.trim()) {
      setQuery(incomingQuery);
      handleSearch(incomingQuery);
    }
  }, [incomingQuery]);

  return (
    <section id="search-grounding" className="border-t border-slate-800 bg-[#070d14] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Live Google Search Grounding • gemini-3.5-flash
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Real-Time Regulatory & Entity Search
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Verify any advisor registration, Telegram handle, scheme claim, or recent regulatory action using real-time Google Search data grounded via Gemini.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-700/80 bg-[#0c1622] p-6 shadow-xl sm:p-8">
          {/* Search Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search advisor name, SEBI registration number, or scheme claim..."
                className="w-full rounded-xl border border-slate-700 bg-[#070e15] py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Searching Web...</span>
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" />
                  <span>Verify with Search</span>
                </>
              )}
            </button>
          </form>

          {/* Quick presets */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Quick queries:</span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(preset);
                  handleSearch(preset);
                }}
                className="rounded-lg border border-slate-800 bg-[#080f17] px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-700 hover:text-white"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Search Result */}
          {resultText && (
            <div className="mt-6 rounded-xl border border-slate-700 bg-[#080f17] p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Google Search Grounded Intelligence</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">gemini-3.5-flash</span>
              </div>

              <div className="mt-3 text-xs leading-relaxed text-slate-200 whitespace-pre-wrap sm:text-sm">
                {resultText}
              </div>

              {/* Grounding Web Sources */}
              {groundingSources.length > 0 && (
                <div className="mt-4 border-t border-slate-800 pt-3">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Live Web Citations:
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {groundingSources.map((chunk: any, i: number) => {
                      const web = chunk.web;
                      if (!web?.uri) return null;
                      return (
                        <a
                          key={i}
                          href={web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-[#0e1925] px-2.5 py-1 text-[11px] text-cyan-300 hover:bg-[#132232] hover:text-cyan-200 transition-colors"
                        >
                          <span className="max-w-[200px] truncate">{web.title || web.uri}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
