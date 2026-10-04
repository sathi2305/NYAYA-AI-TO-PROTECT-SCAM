import React, { useEffect, useState } from 'react';
import {
  WifiOff,
  Wifi,
  ShieldAlert,
  Database,
  ChevronUp,
  ChevronDown,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import { SCAM_SAMPLES, THREAT_CITIES } from '../data/mockData';
import { InAppNotification, LanguageCode, PageId, ScamSample, ThreatCity } from '../types';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { ShareThreatAlertButton } from './ShareThreatAlertButton';

const CACHE_STORAGE_KEY = 'nyaya_offline_threat_cache_v1';

interface CachedThreatBundle {
  lastSynced: string;
  samples: ScamSample[];
  cities: ThreatCity[];
  recentAlerts: InAppNotification[];
  staticAdvisories: Array<{
    id: string;
    title: string;
    severity: string;
    riskScore: number;
    city: string;
    summary: string;
    sebiRef: string;
  }>;
}

interface OfflineThreatCacheBannerProps {
  currentLanguage: LanguageCode;
  notifications: InAppNotification[];
  onNavigate: (page: PageId, sampleId?: string) => void;
}

export const OfflineThreatCacheBanner: React.FC<OfflineThreatCacheBannerProps> = ({
  currentLanguage,
  notifications,
  onNavigate,
}) => {
  const { isOnline, simulatedOffline, setSimulatedOffline } = useOnlineStatus();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [swReady, setSwReady] = useState(false);
  const [cachedBundle, setCachedBundle] = useState<CachedThreatBundle>(() => {
    try {
      const saved = localStorage.getItem(CACHE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage read error
    }
    return {
      lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      samples: SCAM_SAMPLES,
      cities: THREAT_CITIES,
      recentAlerts: notifications,
      staticAdvisories: [],
    };
  });

  // Sync threat warnings to localStorage and Service Worker cache when online
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setSwReady(true);
      }).catch(() => {});
    }

    const syncCache = async () => {
      let staticAdvisories = cachedBundle.staticAdvisories;
      try {
        const res = await fetch('/threat-warnings-cache.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.criticalWarnings)) {
            staticAdvisories = data.criticalWarnings;
          }
        }
      } catch {
        // Offline or unreachable — retain existing cached warnings
      }

      const updated: CachedThreatBundle = {
        lastSynced: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        samples: SCAM_SAMPLES,
        cities: THREAT_CITIES,
        recentAlerts: notifications.slice(0, 8),
        staticAdvisories,
      };

      setCachedBundle(updated);
      try {
        localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore quota errors
      }
    };

    syncCache();
  }, [notifications]);

  // Automatically expand warning bar hint when connection drops
  useEffect(() => {
    if (!isOnline) {
      setDrawerOpen(true);
    }
  }, [isOnline]);

  return (
    <>
      {/* Floating Offline / Threat Cache Control Pill */}
      <div className="no-print fixed bottom-4 left-4 z-40 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-xl backdrop-blur-md transition-all ${
            !isOnline
              ? 'border-amber-500/60 bg-amber-950/95 text-amber-200 ring-2 ring-amber-500/30'
              : 'border-slate-700/80 bg-[#0c1622]/95 text-slate-200 hover:border-emerald-500/50 hover:text-white'
          }`}
          title="View Offline Cached Threat Warnings"
        >
          {!isOnline ? (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <WifiOff className="h-3.5 w-3.5 text-amber-400" />
              <span>Offline Mode — Cached Threat Warnings Active</span>
            </>
          ) : (
            <>
              <Database className="h-3.5 w-3.5 text-emerald-400" />
              <span>Offline Threat Vault ({cachedBundle.samples.length + cachedBundle.cities.length} Cached)</span>
              {swReady && (
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-mono text-emerald-300">
                  SW Ready
                </span>
              )}
            </>
          )}
          {drawerOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>

        {/* Toggle to test unstable connection / offline mode directly */}
        <button
          onClick={() => setSimulatedOffline(!simulatedOffline)}
          className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[11px] font-medium shadow-lg backdrop-blur-md transition-colors ${
            simulatedOffline
              ? 'border-amber-500/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
              : 'border-slate-800 bg-[#080e14]/90 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
          title="Simulate unstable network to test offline cached threat warnings"
        >
          {simulatedOffline ? (
            <>
              <Wifi className="h-3 w-3 text-amber-300" />
              <span>Restore Online</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 text-slate-400" />
              <span>Test Offline</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Cached Threat Warnings Drawer */}
      {drawerOpen && (
        <div className="no-print fixed inset-x-0 bottom-16 z-40 mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-slate-700/90 bg-[#0b141f]/98 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#101c2b] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    !isOnline
                      ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                  }`}
                >
                  {!isOnline ? <WifiOff className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      NYAYA Offline Suraksha Cache — Verified Threat Warnings
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        !isOnline
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {!isOnline ? 'Unstable / Offline Connection' : 'Cached & Synced'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Last synced at {cachedBundle.lastSynced} • Accessible with zero internet in Tier-2/3 low-signal zones
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 px-2.5 py-1 text-xs font-semibold text-rose-300">
                  <PhoneCall className="h-3.5 w-3.5 text-rose-400" />
                  <span>Golden Hour Helpline: 1930</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Minimize
                </button>
              </div>
            </div>

            {/* Body: Cached Scam Signatures & Regional Threat Radar */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* Section 1: Cached Critical Scam Signatures with Dadi Advice */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Cached High-Risk Scam Signatures ({cachedBundle.samples.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Click any warning to inspect in WhatsApp Suraksha Lens
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {cachedBundle.samples.map((sample) => {
                    const isRed = sample.riskLevel === 'RED';
                    const adviceText =
                      sample.dadiAdvice[currentLanguage] ||
                      sample.dadiAdvice.hi ||
                      sample.dadiAdvice.en;

                    return (
                      <div
                        key={sample.id}
                        className={`rounded-xl border p-3.5 transition-all ${
                          isRed
                            ? 'border-rose-900/60 bg-rose-950/15 hover:border-rose-500/50'
                            : 'border-emerald-900/60 bg-emerald-950/15 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-xs font-bold text-white leading-snug">
                            {sample.title}
                          </div>
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                              isRed
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {sample.riskLevel} • {sample.riskScore}/100
                          </span>
                        </div>

                        <p className="mt-1.5 text-[11px] text-slate-300 line-clamp-2">
                          {sample.reasons[0]}
                        </p>

                        <div className="mt-2 rounded-lg bg-[#070d14]/90 p-2 text-[11px] text-amber-200/90 border border-slate-800/80 flex items-start gap-1.5">
                          <Volume2 className="h-3.5 w-3.5 shrink-0 text-amber-400 mt-0.5" />
                          <span>{adviceText}</span>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                          <span className="truncate max-w-[45%] font-mono">{sample.sebiReference}</span>
                          <div className="flex items-center gap-2">
                            <ShareThreatAlertButton
                              buttonLabel="Share"
                              variant="compact"
                              payload={{
                                title: sample.title,
                                threatLevel: sample.riskLevel,
                                riskScore: sample.riskScore,
                                summary: sample.content,
                                reasons: sample.reasons,
                                dadiAdvice: adviceText,
                                regulatoryRef: sample.sebiReference,
                                locationOrChannel: sample.sender,
                              }}
                            />
                            <button
                              onClick={() => {
                                onNavigate('simulator', sample.id);
                                setDrawerOpen(false);
                              }}
                              className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                            >
                              <span>Open in Lens</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Cached Bharat Regional Threat Radar Advisories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Cached Bharat Regional Threat Hotspots ({cachedBundle.cities.length} Cities)</span>
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {cachedBundle.cities.map((city) => (
                    <div
                      key={city.city}
                      className="flex items-start justify-between gap-2 rounded-xl border border-slate-800 bg-[#080f18] p-2.5"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{city.city}</span>
                          <span className="text-[10px] text-slate-400">({city.state})</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-300 leading-snug">
                          {city.commonPattern}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          city.riskStatus === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {city.riskStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Offline Golden Hour Emergency Protocol */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div className="text-xs text-slate-200">
                    <strong>Offline Protection Guarantee:</strong> Even without mobile data, never share OTPs, never pay advance &ldquo;stamp duty&rdquo; fees, and call <strong>1930</strong> immediately via standard voice network if funds were transferred.
                  </div>
                </div>
                <button
                  onClick={() => {
                    onNavigate('scores');
                    setDrawerOpen(false);
                  }}
                  className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  Draft SCORES Complaint Offline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
