import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, PhoneCall, HelpCircle, XCircle } from 'lucide-react';

export const SangyanGuardrails: React.FC = () => {
  return (
    <section id="guardrails" className="border-t border-slate-800 bg-[#080f17] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Regulatory Compliance • Slide 10
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            100% Compliant with Sangyan Guardrails
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Built for SEBI, not against it. We slow down impulsive decisions rather than accelerate speculative trading.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Strictly No Trading Advice */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">Strictly No Trading Advice</h3>
            <p className="mt-1 text-xs text-slate-400">Zero tips, zero speculation.</p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>No stock tips, target prices, or buy/sell/hold calls</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>No broker upselling or affiliate broking commissions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Anti-speculation by design: slows decisions down</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Explainability & Uncertainty */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">Explainability & Uncertainty</h3>
            <p className="mt-1 text-xs text-slate-400">Every flag has 3 reasons + official citations.</p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Calibrated confidence: &ldquo;Mujhe 70% lagta hai ye risky hai...&rdquo;</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Every flag links directly to a SEBI circular or NSDL advisory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Zero black-box decisions; plain mother-tongue explanations</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Privacy by Design & Escalation */}
          <div className="rounded-2xl border border-slate-800 bg-[#0c1520] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lock className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">Privacy-by-Design</h3>
            <p className="mt-1 text-xs text-slate-400">Zero PAN/Aadhaar/OTP storage.</p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>No SMS reading, no credentials harvested, hashed data</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Auto-deleted after 24 hours from server memory</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Human-in-the-loop: direct escalation to SEBI Saathi & 1930</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Escalation Strip */}
        <div className="mt-10 rounded-2xl border border-emerald-900/60 bg-emerald-950/20 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PhoneCall className="h-5 w-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">
                Government Helplines Ready For Immediate Human Escalation:
              </div>
              <div className="text-xs text-slate-300">
                SEBI Saathi Toll-Free: <span className="font-mono-numbers font-semibold text-emerald-300">1800 22 7575</span> · National Cyber Crime Portal: <span className="font-mono-numbers font-semibold text-emerald-300">1930</span>
              </div>
            </div>
          </div>

          <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
            Open-Source Public Good
          </span>
        </div>
      </div>
    </section>
  );
};
