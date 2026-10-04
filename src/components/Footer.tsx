import React from 'react';
import { Shield, Github, Heart, PhoneCall, ExternalLink } from 'lucide-react';
import { LanguageCode } from '../types';
import { getStrings } from '../utils/i18n';

interface FooterProps {
  currentLanguage?: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage = 'hi' }) => {
  const s = getStrings(currentLanguage);
  return (
    <footer className="border-t border-slate-800/80 bg-[#060b10] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                <Shield className="h-4 w-4" />
              </span>
              <span className="text-lg font-black tracking-wider text-white font-display">NYAYA</span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              {s.footerQuote}
            </p>

            <div className="text-slate-400 text-[11px]">
              Built with conviction by engineers from <strong>IIT BHU</strong> for the <strong>SEBI x NSDL Track</strong>.
            </div>

            <div className="pt-2 text-emerald-400 font-medium">
              🙏 Jai Hind, Jai NYAYA
            </div>
          </div>

          {/* Emergency Escalation */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {s.emergencyHelplinesTitle}
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-[#091119] p-2.5">
                <div className="font-semibold text-white">SEBI Saathi Toll-Free</div>
                <div className="font-mono-numbers text-emerald-400 font-bold">1800 22 7575 / 1800 266 7575</div>
                <div className="text-[10px] text-slate-400">Available 9:00 AM to 6:00 PM (Mon-Fri) in 14 Indian languages</div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#091119] p-2.5">
                <div className="font-semibold text-white">National Cyber Crime Helpline</div>
                <div className="font-mono-numbers text-rose-400 font-bold">1930</div>
                <div className="text-[10px] text-slate-400">24x7 Citizen Financial Cyber Fraud Reporting System</div>
              </div>
            </div>
          </div>

          {/* Quick links & public-good statement */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {s.publicGoodTitle}
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>SEBI SCORES Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nsdl.co.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>NSDL Depository Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>CyberCrime.gov.in</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-500">
              {s.zeroBrokingPledge}
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-10 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2024–2026 NYAYA Project. Dedicated to the 41 Crore retail investors and families of Bharat.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy-By-Design</span>
            <span aria-hidden="true">·</span>
            <span>Hashed &amp; Auto-Purged</span>
            <span aria-hidden="true">·</span>
            <span>Sangyan Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
