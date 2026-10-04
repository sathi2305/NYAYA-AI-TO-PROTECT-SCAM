import React, { useState } from 'react';
import {
  Eye,
  Mic,
  Shield,
  Clock,
  Smartphone,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
  Volume2
} from 'lucide-react';
import { LanguageCode } from '../types';
import { getStrings } from '../utils/i18n';

interface ThreeInOneKavachProps {
  currentLanguage: LanguageCode;
}

export const ThreeInOneKavach: React.FC<ThreeInOneKavachProps> = ({ currentLanguage }) => {
  const [activeTab, setActiveTab] = useState<'lens' | 'sathi' | 'dost'>('lens');
  const s = getStrings(currentLanguage);

  return (
    <section id="kavach" className="border-t border-slate-800 bg-[#070d14] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            {s.kavachKicker}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.kavachTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.kavachSub}
          </p>
        </div>

        {/* Feature Pills / Tabs */}
        <div className="mx-auto mt-10 flex max-w-md items-center justify-center rounded-xl bg-slate-900/90 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('lens')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'lens'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {s.tabLens}
          </button>
          <button
            onClick={() => setActiveTab('sathi')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'sathi'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {s.tabSathi}
          </button>
          <button
            onClick={() => setActiveTab('dost')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'dost'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {s.tabDost}
          </button>
        </div>

        {/* Tab 1: Suraksha Lens */}
        {activeTab === 'lens' && (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-[#0b141e] p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                  <Eye className="h-4 w-4" />
                  <span>Instant Multi-Modal Fraud Scan</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl text-balance">
                  4-Layer Fraud Shield That Thinks Like a Scammer
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Accepts screenshots, links, voice notes, and video forwards. Detects subtle typosquatting (like <code className="rounded bg-rose-950 px-1 text-rose-300 font-mono">nsdI</code> vs <code className="rounded bg-emerald-950 px-1 text-emerald-300 font-mono">NSDL</code>), cross-checks SEBI circular blacklists, and computes AI voice-clone probabilities.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-[#060b10] p-3 text-center">
                    <div className="font-mono-numbers text-xl font-bold text-emerald-400">94%</div>
                    <div className="text-[11px] text-slate-400">Real Scam Accuracy</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-[#060b10] p-3 text-center">
                    <div className="font-mono-numbers text-xl font-bold text-cyan-400">300ms</div>
                    <div className="text-[11px] text-slate-400">Link Scanner Latency</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-[#060b10] p-3 text-center">
                    <div className="font-mono-numbers text-xl font-bold text-amber-400">&lt;50kb</div>
                    <div className="text-[11px] text-slate-400">Bandwidth per Scan</div>
                  </div>
                </div>
              </div>

              {/* 4 Layers breakdown */}
              <div className="space-y-3 lg:col-span-6">
                <div className="rounded-xl border border-slate-800/80 bg-[#0e1925] p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">
                        1
                      </span>
                      <span>Link & Typosquat Scanner</span>
                    </span>
                    <span className="font-mono-numbers text-[11px] text-emerald-400">&lt;300ms</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Detects character substitutions (nsdI vs NSDL), domain age &lt;14 days, and SEBI/NSDL blacklist matching.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0e1925] p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">
                        2
                      </span>
                      <span>Screenshot OCR + Indic-BERT NLP</span>
                    </span>
                    <span className="font-mono-numbers text-[11px] text-cyan-400">LLaVA + BERT</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Reads &ldquo;Guaranteed 300%&rdquo; promises and counterfeit SEBI logos, even from low-resolution WhatsApp screenshot crops.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0e1925] p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">
                        3
                      </span>
                      <span>Deepfake Finfluencer Check</span>
                    </span>
                    <span className="font-mono-numbers text-[11px] text-rose-400">Audio Spectrogram</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Analyzes audio spectrograms and synthetic cadence on Instagram Reels and YouTube Shorts to flag AI-cloned voices.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-[#0e1925] p-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">
                        4
                      </span>
                      <span>Community Immune System</span>
                    </span>
                    <span className="font-mono-numbers text-[11px] text-amber-400">3MB TFLite</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    If 10 users report the same malicious number or link, it automatically enters the global blocklist protecting all 41Cr users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Samjhao Sathi */}
        {activeTab === 'sathi' && (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-[#0b141e] p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase">
                  <Mic className="h-4 w-4" />
                  <span>Voice-First in 8 Bhasha</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl text-balance">
                  Dadi Story Mode, Not 40-Page PDF Lectures
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  If literacy feels like a lecture, Bharat won’t listen. If it feels like a conversation with an elder, Bharat remembers. Complex financial jargon is translated into vivid mother tongue metaphors.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-xl border border-slate-800 bg-[#070e16] p-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">
                      Financial Colloquialism: Demat Account
                    </div>
                    <div className="mt-1 text-sm font-medium text-emerald-300">
                      &ldquo;डीमैट मतलब आपके शेयर रखने की डिजिटल तिजोरी&rdquo;
                    </div>
                    <div className="text-xs text-slate-400">Not confusing legal terms.</div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#070e16] p-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase">
                      Financial Colloquialism: Nominee
                    </div>
                    <div className="mt-1 text-sm font-medium text-cyan-300">
                      &ldquo;नॉमिनी मतलब आपके जाने के बाद आपके पैसे का असली वारिस&rdquo;
                    </div>
                    <div className="text-xs text-slate-400">
                      Guided audio flow for elderly investors in Tamil, Hindi, and Marathi.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-[#0e1925] p-5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    8 Bhasha Voice Coverage (Sarvam AI + Whisper)
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { lang: 'हिन्दी', desc: 'Hindi & Hinglish' },
                      { lang: 'தமிழ்', desc: 'Tamil & Tanglish' },
                      { lang: 'मराठी', desc: 'Marathi' },
                      { lang: 'বাংলা', desc: 'Bengali' },
                      { lang: 'తెలుగు', desc: 'Telugu' },
                      { lang: 'ગુજરાતી', desc: 'Gujarati' },
                      { lang: 'ಕನ್ನಡ', desc: 'Kannada' },
                      { lang: 'English', desc: 'Indian English' },
                    ].map((bhasha, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-700/60 bg-[#09111b] p-3 text-center"
                      >
                        <div className="text-base font-bold text-white">{bhasha.lang}</div>
                        <div className="text-[10px] text-slate-400">{bhasha.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-3.5 text-xs text-emerald-300">
                    <div className="font-semibold">Ultra Low-Bandwidth Delivery:</div>
                    <div className="mt-0.5 text-slate-300">
                      Voice notes compressed under 20kb using Opus codec. Plays reliably in under 2 seconds on 2G connections across rural and Tier-3 India.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Nyaya Dost */}
        {activeTab === 'dost' && (
          <div className="mt-10 rounded-2xl border border-slate-800 bg-[#0b141e] p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <Shield className="h-4 w-4" />
                  <span>Auto Grievance & Habit Guard</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl text-balance">
                  Designed as Behaviour, Not Finance
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  We don’t just detect fraud — we file the complaint and protect the family from the next one. Built to slow impulsive decisions rather than accelerate speculation.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#080f17] p-3.5">
                    <Clock className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">24-Hour Cool-Off Nudge</div>
                      <div className="mt-0.5 text-xs text-slate-300">
                        &ldquo;300% return? Chalo kal subah dekhte hain.&rdquo; Slows down speculative adrenaline and breaks scammer urgency timers.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#080f17] p-3.5">
                    <Smartphone className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">Family Shield Alert</div>
                      <div className="mt-0.5 text-xs text-slate-300">
                        With explicit consent, if an elderly parent clicks a high-risk link, a gentle alert is sent to their son or daughter: &ldquo;Papa ne risky link khola.&rdquo;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-800 bg-[#0e1925] p-5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Safety Score: Scams Avoided, Not Trading Returns
                  </div>
                  <p className="mt-2 text-xs text-slate-300">
                    Traditional apps celebrate risky trades. NYAYA gamifies protection:
                  </p>

                  <div className="mt-4 rounded-xl border border-slate-700/60 bg-[#070d14] p-4 text-center">
                    <div className="text-xs font-semibold text-slate-400">Daily Safety Milestone</div>
                    <div className="mt-1 text-lg font-bold text-emerald-300">
                      &ldquo;Aaj 2 scam roke, 3 doston ko bachaya!&rdquo;
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                      <span className="font-mono-numbers text-emerald-400 font-bold">Level 4</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified Bharat Protector</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
