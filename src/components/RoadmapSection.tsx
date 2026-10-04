import React from 'react';
import { Check, X, ShieldAlert, HeartHandshake, CheckCircle } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="border-t border-slate-800 bg-[#09111a] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Comparison Section (Slide 13) */}
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            The Emotional Moat • Slide 13
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            They Build Tools for Traders. We Built a Family Member.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Judges won&apos;t remember another dashboard. They&apos;ll remember the WhatsApp Dadi-voice that saved Ramesh Uncle in Nashik.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Column 1: Existing Tools */}
          <div className="rounded-2xl border border-rose-900/40 bg-[#120f13] p-6">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wide">
              Existing — Urban-First, English-First
            </div>
            <ul className="mt-4 space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>ScamAdviser:</strong> English only, web-only form, zero Indian languages, zero voice support.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>SEBI SCORES:</strong> Complex 10-page legal terminology, intimidating to elderly first-time investors, zero family alert.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Fintech Apps:</strong> Trading-focused, requires high-spec smartphones and heavy downloads (&gt;80MB), no JioPhone support.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: NYAYA 10x Bharat-First Difference */}
          <div className="rounded-2xl border border-emerald-800/60 bg-[#0d1c18] p-6">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              NYAYA — 10X Bharat-First Difference
            </div>
            <ul className="mt-4 space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>All 5 tracks in ONE contact:</strong> Fraud + Literacy + Rights + Habit + Misinformation directly on WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Voice-native in 8 Bhasha:</strong> Opus 20kb audio, &lt;2.8s on 2G, zero app installation needed.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Family Shield + 24h Cool-off:</strong> Behavioural science that cools down greed and protects parents before transfers happen.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Legally Valid SCORES Auto-Draft:</strong> Turns 3 conversational answers into an official SEBI complaint.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Roadmap (Slide 14) */}
        <div className="mt-20">
          <div className="text-center">
            <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Execution Plan • Slide 14
            </div>
            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl text-balance">
              From 4-Day Hackathon to SEBI&apos;s Official Saathi
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-slate-400">
              Public-good, grant-funded, non-commercial, and 100% committed to protecting Bharat investors.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phase 1 */}
            <div className="rounded-2xl border border-emerald-500/40 bg-[#0d1924] p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400">Phase 1 • Oct 7</span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  DONE ✓
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">MVP: WhatsApp Bot + Fraud Lens</h4>
              <p className="mt-2 text-xs text-slate-300">
                Core flow live. Link scanner, screenshot OCR, typosquatting detector, SEBI blacklist matching with 94% accuracy on 500+ real samples.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Phase 2 • Nov</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  Pilot
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">500 Users in Tier-2 Hubs</h4>
              <p className="mt-2 text-xs text-slate-300">
                Ground research in Nashik, Indore, and Coimbatore via local NGOs. Fine-tuning voice UX and quantifying fraud averted.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Phase 3 • Dec-Jan</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  Scale
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">SEBI SCORES API + NSDL</h4>
              <p className="mt-2 text-xs text-slate-300">
                Direct API integration with SEBI SCORES portal, NSDL awareness integration, JioPhone offline model, and 22 scheduled official bhashas.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Phase 4 • 2027</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  Public Good
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">Open Fraud Graph for SEBI</h4>
              <p className="mt-2 text-xs text-slate-300">
                Public national scam heatmap dashboard for SEBI and enforcement agencies, protecting 41Cr Indians with continuous collective immunity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
