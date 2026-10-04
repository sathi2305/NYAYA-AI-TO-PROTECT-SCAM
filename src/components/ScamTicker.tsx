import React, { useState, useEffect } from 'react';
import { ShieldAlert, ChevronLeft, ChevronRight, Pause, Play, AlertCircle, ArrowUpRight } from 'lucide-react';

export interface ReportedScamItem {
  id: string;
  state: string;
  city: string;
  scamType: string;
  actionTaken: string;
  amountSaved: string;
  timeAgo: string;
  targetSampleId?: string;
}

export const RECENT_SCAMS: ReportedScamItem[] = [
  {
    id: 'scam-1',
    state: 'Maharashtra',
    city: 'Nashik',
    scamType: 'Fake NSDL stamp duty letter demanding ₹12,500 advance fee',
    actionTaken: 'Typosquat nsdI detected · Blocked in 2.8s',
    amountSaved: '₹12,500 protected',
    timeAgo: 'Just now',
    targetSampleId: 'sample-nsdl-pdf',
  },
  {
    id: 'scam-2',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    scamType: 'Instagram Reel deepfake finfluencer claiming "SEBI approved 5-day double"',
    actionTaken: '87% AI voice-clone flagged · Family Shield alert sent',
    amountSaved: '₹25,000 protected',
    timeAgo: '2m ago',
    targetSampleId: 'sample-reel-deepfake',
  },
  {
    id: 'scam-3',
    state: 'Gujarat',
    city: 'Rajkot',
    scamType: 'Demat OTP harvesting link masquerading as "Special Diwali Dividend"',
    actionTaken: 'Credential theft halted · Domain added to 41Cr Blocklist',
    amountSaved: '₹84,000 protected',
    timeAgo: '4m ago',
    targetSampleId: 'sample-typosquat-link',
  },
  {
    id: 'scam-4',
    state: 'Tamil Nadu',
    city: 'Coimbatore',
    scamType: 'WhatsApp voice note in Tamil offering fake unlisted Pre-IPO shares',
    actionTaken: 'Samjhao Sathi warning played · Escalate to 1930 CyberCrime',
    amountSaved: '₹50,000 protected',
    timeAgo: '6m ago',
  },
  {
    id: 'scam-5',
    state: 'Madhya Pradesh',
    city: 'Indore',
    scamType: 'VIP Telegram group pumping illiquid micro-cap stock with fake screenshots',
    actionTaken: 'SEBI circular violation flagged · SCORES draft generated',
    amountSaved: '₹1.15 Lakh protected',
    timeAgo: '8m ago',
  },
  {
    id: 'scam-6',
    state: 'West Bengal',
    city: 'Siliguri',
    scamType: 'Counterfeit broker trading APK sent via WhatsApp APK direct file',
    actionTaken: 'Malware hash identified · Auto-deleted via on-device TFLite',
    amountSaved: '₹35,000 protected',
    timeAgo: '11m ago',
  },
  {
    id: 'scam-7',
    state: 'Karnataka',
    city: 'Hubballi',
    scamType: 'Fake IPO allocation SMS with unauthorized payment gateway link',
    actionTaken: 'Blacklist match verified · Son notified via WhatsApp alert',
    amountSaved: '₹48,000 protected',
    timeAgo: '14m ago',
  },
];

interface ScamTickerProps {
  onSelectScam?: (sampleId?: string) => void;
}

export const ScamTicker: React.FC<ScamTickerProps> = ({ onSelectScam }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_SCAMS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = RECENT_SCAMS[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + RECENT_SCAMS.length) % RECENT_SCAMS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % RECENT_SCAMS.length);
  };

  const handleClickTicker = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSelectScam && current.targetSampleId) {
      onSelectScam(current.targetSampleId);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-50 w-full border-b border-rose-950/70 bg-[#0d070b] px-3 py-1.5 text-xs transition-colors hover:bg-[#120a10]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:px-4">
        {/* Left: Live status label with pulsing dot */}
        <div className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-wider text-rose-400 uppercase">
            Live Scam Radar
          </span>
          <span className="hidden font-mono-numbers text-[10px] text-slate-500 md:inline">
            [{currentIndex + 1}/{RECENT_SCAMS.length}]
          </span>
        </div>

        {/* Center: The animated active scam item */}
        <button
          onClick={handleClickTicker}
          className="group flex flex-1 items-center justify-center gap-2 overflow-hidden text-left focus:outline-none transition-opacity hover:opacity-95"
          title="Click to inspect this report in the Live Simulator"
        >
          <div className="flex items-center gap-2 truncate">
            {/* Location tag */}
            <span className="shrink-0 font-medium text-amber-300/95 font-sans">
              {current.city}, {current.state}:
            </span>

            {/* Description */}
            <span className="truncate text-slate-200">
              {current.scamType}
            </span>

            {/* Action pill / outcome */}
            <span className="hidden shrink-0 items-center gap-1 rounded bg-rose-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-rose-300 border border-rose-800/40 lg:inline-flex">
              <ShieldAlert className="h-3 w-3 text-rose-400" />
              <span>{current.actionTaken}</span>
            </span>

            {/* Amount saved */}
            <span className="hidden shrink-0 font-mono-numbers text-[11px] font-bold text-emerald-400 sm:inline">
              ✓ {current.amountSaved}
            </span>

            {/* Time ago */}
            <span className="shrink-0 font-mono-numbers text-[10px] text-slate-500">
              · {current.timeAgo}
            </span>
          </div>

          <ArrowUpRight className="hidden h-3 w-3 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400 md:block" />
        </button>

        {/* Right: Controls (Previous, Next, Pause/Play) */}
        <div className="flex shrink-0 items-center gap-1 text-slate-400">
          <button
            onClick={handlePrev}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-slate-800 hover:text-white"
            title="Previous alert"
            aria-label="Previous alert"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-slate-800 hover:text-white"
            title={isPaused ? 'Resume live ticker' : 'Pause ticker'}
            aria-label={isPaused ? 'Resume live ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="h-2.5 w-2.5" /> : <Pause className="h-2.5 w-2.5" />}
          </button>

          <button
            onClick={handleNext}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-slate-800 hover:text-white"
            title="Next alert"
            aria-label="Next alert"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
