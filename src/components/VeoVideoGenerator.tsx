import React, { useState, useEffect, useRef } from 'react';
import { Video, Sparkles, RefreshCw, Download, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export const VeoVideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'An Indian grandfather in a cozy living room looks at his smartphone with quiet relief as a protective shield appears on screen stopping an investment scam, soft warm lighting, cinematic 8k quality'
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [operationName, setOperationName] = useState<string | null>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pollIntervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setVideoBlobUrl(null);
    setStatusMessage('Initiating Veo 3 video generation with veo-3.1-fast-generate-preview...');

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to start video generation');
      }

      const { operationName: opName } = await response.json();
      setOperationName(opName);
      setStatusMessage('Video rendering in progress. This typically takes 1-2 minutes...');

      // Start polling
      pollIntervalRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch('/api/video-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName: opName }),
          });

          if (!statusRes.ok) return;

          const { done } = await statusRes.json();
          if (done) {
            clearInterval(pollIntervalRef.current);
            setStatusMessage('Video generated! Downloading video stream...');

            // Download video
            const dlRes = await fetch('/api/video-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ operationName: opName }),
            });

            if (!dlRes.ok) {
              throw new Error('Failed to retrieve video stream');
            }

            const blob = await dlRes.blob();
            const blobUrl = URL.createObjectURL(blob);
            setVideoBlobUrl(blobUrl);
            setIsGenerating(false);
            setStatusMessage('Video generation completed successfully!');
          }
        } catch (pollErr: any) {
          console.error('Polling error:', pollErr);
        }
      }, 7000);
    } catch (err: any) {
      setError(err?.message || 'Video generation failed');
      setIsGenerating(false);
      clearInterval(pollIntervalRef.current);
    }
  };

  const presets = [
    {
      title: 'Family Relief Alert (16:9)',
      ratio: '16:9' as const,
      text: 'An Indian grandfather and granddaughter in a warm living room in Tier 2 India, looking at a smartphone as a green verified shield appears, peaceful cinematic lighting',
    },
    {
      title: 'Reel Scam Warning (9:16)',
      ratio: '9:16' as const,
      text: 'A high-contrast vertical smartphone screen showing fake Telegram stock advice turning into a bold red warning shield, modern mobile aesthetic',
    },
    {
      title: 'Community Protection (16:9)',
      ratio: '16:9' as const,
      text: 'A bustling market in Lucknow where young and elder Indian shopkeepers share a safe digital investing moment on their phones, documentary style',
    },
  ];

  return (
    <section id="veo-video" className="border-t border-slate-800 bg-[#080e14] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Veo 3 AI Video Generation • veo-3.1-fast-generate-preview
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Generate Investor Awareness Videos &amp; Reels
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Create high-impact educational video content in landscape (16:9) or portrait (9:16) for WhatsApp status, Reels, and community workshops using Google&apos;s Veo 3 model.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-700/80 bg-[#0c1622] p-6 shadow-xl sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Input Controls */}
            <div className="space-y-4 lg:col-span-7">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Video Prompt Description
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the investor awareness scene you want to generate..."
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-[#070e15] p-3 text-xs sm:text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase">
                  Aspect Ratio Selection
                </label>
                <div className="mt-1.5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex-1 rounded-xl border p-3 text-left transition-all ${
                      aspectRatio === '16:9'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : 'border-slate-800 bg-[#070e15] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">16:9 Landscape</div>
                    <div className="text-[11px] text-slate-400">YouTube, TV, Presentations</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex-1 rounded-xl border p-3 text-left transition-all ${
                      aspectRatio === '9:16'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : 'border-slate-800 bg-[#070e15] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">9:16 Portrait</div>
                    <div className="text-[11px] text-slate-400">Reels, Shorts, WhatsApp Status</div>
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPrompt(p.text);
                        setAspectRatio(p.ratio);
                      }}
                      className="rounded-lg border border-slate-800 bg-[#080f17] px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-700 hover:text-white"
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Generating with Veo 3...</span>
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4" />
                      <span>Generate Video with Veo 3 ({aspectRatio})</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 text-xs text-rose-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Video Preview & Status Screen */}
            <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-[#070e15] p-4 lg:col-span-5 min-h-[300px]">
              {videoBlobUrl ? (
                <div className="space-y-3">
                  <video
                    src={videoBlobUrl}
                    controls
                    autoPlay
                    loop
                    className={`mx-auto rounded-xl shadow-2xl ${
                      aspectRatio === '9:16' ? 'max-h-[380px] w-auto' : 'w-full'
                    }`}
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Generated by Veo 3
                    </span>
                    <a
                      href={videoBlobUrl}
                      download={`nyaya-awareness-${aspectRatio}.mp4`}
                      className="flex items-center gap-1 text-slate-300 hover:text-white"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download MP4</span>
                    </a>
                  </div>
                </div>
              ) : isGenerating ? (
                <div className="py-8 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 animate-pulse">
                    <Video className="h-7 w-7" />
                  </div>
                  <div className="text-sm font-bold text-white">Veo 3 Video Synthesis Active</div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    {statusMessage}
                  </p>
                  <div className="flex justify-center gap-1.5 pt-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 space-y-2">
                  <Video className="mx-auto h-10 w-10 text-slate-600" />
                  <div className="text-xs font-semibold">Video preview will appear here</div>
                  <div className="text-[11px]">Select landscape (16:9) or portrait (9:16)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
