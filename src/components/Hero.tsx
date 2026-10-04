import React from 'react';
import { ArrowRight, FileText, PhoneCall } from 'lucide-react';
import { LanguageCode } from '../types';
import { getStrings } from '../utils/i18n';

interface HeroProps {
  currentLanguage: LanguageCode;
  onOpenSimulator: () => void;
  onOpenScores: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  onOpenSimulator,
  onOpenScores,
}) => {
  const s = getStrings(currentLanguage);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 -z-10 h-[400px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition & Hook */}
          <div className="lg:col-span-7">
            {/* Clean unboxed editorial kicker */}
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              <span>{s.heroKicker}</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              {s.heroTitle}
            </h1>

            <p className="mt-5 text-xl font-medium text-emerald-300/95 sm:text-2xl text-balance">
              {s.heroLead}
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate-300 text-pretty">
              {s.heroSubtagline}
            </p>

            <div className="mt-4 border-l-2 border-emerald-500/60 pl-3.5 text-xs italic text-slate-400">
              {s.heroQuote}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenSimulator}
                className="group flex items-center gap-2.5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-95 whitespace-nowrap"
              >
                <span>{s.heroCtaSimulator}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenScores}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white whitespace-nowrap"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                <span>{s.heroCtaScores}</span>
              </button>
            </div>

            {/* Regulatory Helpline banner */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>{s.heroEscalationLabel}</span>
              </div>
              <span className="font-mono-numbers">SEBI Saathi: 1800 22 7575</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-numbers">CyberCrime: 1930</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{s.heroFreeOpenSource}</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset & Neural Scan Preview */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1620] p-3 shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="/src/assets/images/hero_bharat_family_protection_1790929296839.jpg"
                  alt="Three generations of an Indian family looking safely at a smartphone protected by NYAYA"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080e14] via-[#080e14]/40 to-transparent" />

                {/* Overlaid Trust Status */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-slate-700/60 bg-[#0b131b]/90 p-2.5 backdrop-blur-md">
                  <div>
                    <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                      Neural Scan Engine
                    </div>
                    <div className="text-xs font-bold text-white">
                      Works on ₹7000 JioPhone • 2G Optimized
                    </div>
                  </div>
                  <div className="text-right font-mono-numbers text-xs">
                    <span className="font-semibold text-emerald-400">2.8s</span>
                    <span className="text-[11px] text-slate-400"> avg / &lt;50kb</span>
                  </div>
                </div>
              </div>

              {/* Anti-speculation pledge badge */}
              <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-slate-400">
                <span>Anti-Speculation • No Broking</span>
                <span className="text-emerald-400">Sangyan Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Impact Metrics Strip (Adjacent proof) */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800/90 bg-[#0d1722]/80 p-6 md:grid-cols-4 md:gap-6">
          <div>
            <div className="font-mono-numbers text-2xl font-extrabold text-white sm:text-3xl">
              11 Cr+
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {s.stat1}
            </div>
          </div>

          <div>
            <div className="font-mono-numbers text-2xl font-extrabold text-rose-400 sm:text-3xl">
              ₹11,000 Cr+
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {s.stat2}
            </div>
          </div>

          <div>
            <div className="font-mono-numbers text-2xl font-extrabold text-amber-400 sm:text-3xl">
              500 Million
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {s.stat3}
            </div>
          </div>

          <div>
            <div className="font-mono-numbers text-2xl font-extrabold text-emerald-400 sm:text-3xl">
              41 Crore
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {s.stat4}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
