import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../types';
import { getStrings } from '../utils/i18n';

interface ImpactCalculatorProps {
  currentLanguage?: LanguageCode;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ currentLanguage = 'hi' }) => {
  const [activeUsersMillions, setActiveUsersMillions] = useState<number>(20);
  const s = getStrings(currentLanguage);

  // Slide 12 metrics: 1 scam blocked per 1000 users = ₹82Cr saved / month at 41Cr users.
  // 1M users ~ (1M/41M) * 82 = ~2 Cr / month saved
  const monthlySavingsCrores = Math.round((activeUsersMillions / 410) * 820 * 10) / 10;
  const scansHandledMillions = Math.round(activeUsersMillions * 2.5 * 10) / 10;
  const costPerScan = 0.18; // INR

  return (
    <section className="border-t border-slate-800 bg-[#070d14] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            {s.impactKicker}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.impactTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.impactSub}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-slate-700/80 bg-[#0c1622] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Slider */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  {s.coverageLabel}
                </span>
                <span className="font-mono-numbers text-base font-bold text-emerald-400">
                  {activeUsersMillions} Million Citizens ({Math.round((activeUsersMillions / 410) * 100)}% of Bharat TAM)
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="410"
                step="5"
                value={activeUsersMillions}
                onChange={(e) => setActiveUsersMillions(Number(e.target.value))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-emerald-500"
              />

              <div className="mt-2 flex justify-between text-[11px] font-mono-numbers text-slate-500">
                <span>5M (Tier-2 Launch)</span>
                <span>100M (National Scale)</span>
                <span>410M (Full Bharat TAM)</span>
              </div>
            </div>
          </div>

          {/* Results grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-[#070e16] p-4 text-center">
              <div className="text-xs text-slate-400">{s.monthlyWealthLabel}</div>
              <div className="mt-1 font-mono-numbers text-2xl font-black text-emerald-400">
                ₹{monthlySavingsCrores} Cr
              </div>
              <div className="text-[11px] text-slate-500">saved / month from scams</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#070e16] p-4 text-center">
              <div className="text-xs text-slate-400">{s.monthlyScansLabel}</div>
              <div className="mt-1 font-mono-numbers text-2xl font-black text-cyan-400">
                {scansHandledMillions}M
              </div>
              <div className="text-[11px] text-slate-500">instant fraud queries</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#070e16] p-4 text-center">
              <div className="text-xs text-slate-400">{s.unitCostLabel}</div>
              <div className="mt-1 font-mono-numbers text-2xl font-black text-amber-400">
                ₹{costPerScan}
              </div>
              <div className="text-[11px] text-slate-500">per scan (WhatsApp + 3MB model)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
