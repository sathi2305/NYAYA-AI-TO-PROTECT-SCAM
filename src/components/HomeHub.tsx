import React from 'react';
import {
  MessageSquare,
  Bot,
  FileText,
  Video,
  MapPin,
  ShieldCheck,
  Search,
  Mic,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Users,
  Smartphone,
  Globe
} from 'lucide-react';
import { LanguageCode, PageId } from '../types';
import { getStrings } from '../utils/i18n';

interface HomeHubProps {
  currentLanguage?: LanguageCode;
  onNavigate: (page: PageId) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ currentLanguage = 'hi', onNavigate }) => {
  const s = getStrings(currentLanguage);
  const tools = [
    {
      id: 'connect-shields' as PageId,
      title: s.navConnectShields,
      subtitle: 'Telecom Carrier Watchdog & Smishing Defense',
      description:
        'Link your WhatsApp mobile number (+91), SIM carrier (Jio, Airtel, Vi, BSNL), and SMS feed. Real-time protection against unauthorized SIM swap, TRAI header spoofing, and malicious banking APKs.',
      badge: 'Telecom Kavach',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: <Smartphone className="h-6 w-6 text-cyan-400" />,
      actionText: s.hubActionConnect,
      gradient: 'from-cyan-950/40 to-slate-900/40',
    },
    {
      id: 'omnichannel' as PageId,
      title: s.navOmnichannel,
      subtitle: 'Google Ads • Mail • Post • Reels • SMS • Calls',
      description:
        'Inspect scams across all 8 vectors: Google Search ad poisoning, Income Tax email phishing, physical Speed Post court notices, Instagram deepfake videos, electricity SMS cutoffs, and digital arrest calls.',
      badge: '8-Vector Engine',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      icon: <Search className="h-6 w-6 text-indigo-400" />,
      actionText: s.hubActionOmni,
      gradient: 'from-indigo-950/40 to-slate-900/40',
    },
    {
      id: 'simulator' as PageId,
      title: s.simulatorTitle,
      subtitle: 'Neural Scan v3.2 & D3 Risk Gauge',
      description:
        'Interactive real-time fraud analyzer for WhatsApp forwards, counterfeit depository letters, and deepfake reels. Features Dadi audio advice in 11 languages and instant Family Shield dispatch.',
      badge: 'Core Shield',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: <MessageSquare className="h-6 w-6 text-emerald-400" />,
      actionText: s.hubActionSimulator,
      gradient: 'from-emerald-950/40 to-slate-900/40',
    },
    {
      id: 'ai-hub' as PageId,
      title: s.aiHubTitle,
      subtitle: 'Multi-Turn Gemini + Live Google Search + Speech-To-Text',
      description:
        'Consult NYAYA Sathi AI with selectable models (gemini-3.1-pro-preview for complex law, 3.5-flash, 3.1-flash-lite). Verify SEBI registration with live Google Search data, and transcribe vernacular voice notes.',
      badge: 'Multi-Model Suite',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: <Bot className="h-6 w-6 text-cyan-400" />,
      actionText: s.hubActionAi,
      gradient: 'from-cyan-950/40 to-slate-900/40',
    },
    {
      id: 'scores' as PageId,
      title: s.scoresTitle,
      subtitle: '3-Question Legal Generator + PDF Print Report',
      description:
        'Converts victim testimonies into legally structured complaints in English and Hindi. One-click copy, PDF-ready print report, direct filing on scores.sebi.gov.in, and instant WhatsApp/X awareness broadcasting.',
      badge: 'Legal Redressal',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      icon: <FileText className="h-6 w-6 text-indigo-400" />,
      actionText: s.hubActionScores,
      gradient: 'from-indigo-950/40 to-slate-900/40',
    },
    {
      id: 'veo' as PageId,
      title: s.navVeo,
      subtitle: 'AI Video Synthesis (16:9 & 9:16)',
      description:
        'Produce cinematic investor education videos and viral vertical Reels with Google Veo 3 for WhatsApp Status, YouTube, and community workshops.',
      badge: 'Veo 3 Engine',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: <Video className="h-6 w-6 text-purple-400" />,
      actionText: s.hubActionVeo,
      gradient: 'from-purple-950/40 to-slate-900/40',
    },
    {
      id: 'radar' as PageId,
      title: s.navRadar,
      subtitle: 'Tier-2/3 Threat Radar + Elder Wisdom',
      description:
        'Track localized scam trends across Nashik, Indore, Coimbatore, Lucknow, and Rajkot with community blocklist sync. Test your intuition with the 2-minute Scam Pehchano challenge.',
      badge: 'Community Defense',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: <MapPin className="h-6 w-6 text-amber-400" />,
      actionText: s.hubActionRadar,
      gradient: 'from-amber-950/40 to-slate-900/40',
    },
    {
      id: 'guardrails' as PageId,
      title: s.navGuardrails,
      subtitle: 'Zero Stock Tips • 4-Phase Scale Plan',
      description:
        'Inspect NYAYA’s privacy-by-design architecture (no OTP/PAN retention, 24h auto-purge, anti-speculation filters) and the rollout roadmap from hackathon to official SEBI Saathi app.',
      badge: 'Zero-Compromise',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: <ShieldAlert className="h-6 w-6 text-rose-400" />,
      actionText: s.hubActionGuardrails,
      gradient: 'from-rose-950/40 to-slate-900/40',
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-[#080e14] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{s.hubBadge}</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.hubTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.hubSubtitle}
          </p>
        </div>

        {/* 6-Card Dedicated Tool Hub */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`group flex flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-b ${tool.gradient} p-6 shadow-xl transition-all hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 ring-1 ring-slate-700 shadow-inner">
                    {tool.icon}
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tool.badgeColor}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {tool.title}
                </h3>
                <div className="text-[11px] font-mono text-emerald-400/90 font-medium">
                  {tool.subtitle}
                </div>

                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onNavigate(tool.id)}
                  className="flex w-full items-center justify-between rounded-xl bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-white transition-all group-hover:bg-emerald-500 group-hover:text-slate-950"
                >
                  <span>{tool.actionText}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
