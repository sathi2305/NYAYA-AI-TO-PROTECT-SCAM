/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeHub } from './components/HomeHub';
import { ThreeInOneKavach } from './components/ThreeInOneKavach';
import { PersonasSection } from './components/PersonasSection';
import { ImpactCalculator } from './components/ImpactCalculator';
import { NotificationToast } from './components/NotificationCenter';
import { OfflineThreatCacheBanner } from './components/OfflineThreatCacheBanner';
import { Footer } from './components/Footer';
import { INITIAL_NOTIFICATIONS } from './data/mockData';
import { InAppNotification, LanguageCode, PageId, ScamSample, ScoresComplaintForm } from './types';
import { getStrings, LANGUAGE_STORAGE_KEY } from './utils/i18n';

// Lazy-loaded heavy feature components
const WhatsAppSimulator = lazy(() =>
  import('./components/WhatsAppSimulator').then((m) => ({ default: m.WhatsAppSimulator }))
);
const ScoresComplaintDrafter = lazy(() =>
  import('./components/ScoresComplaintDrafter').then((m) => ({ default: m.ScoresComplaintDrafter }))
);
const ScamPehchanoQuiz = lazy(() =>
  import('./components/ScamPehchanoQuiz').then((m) => ({ default: m.ScamPehchanoQuiz }))
);
const BharatScamMap = lazy(() =>
  import('./components/BharatScamMap').then((m) => ({ default: m.BharatScamMap }))
);
const SangyanGuardrails = lazy(() =>
  import('./components/SangyanGuardrails').then((m) => ({ default: m.SangyanGuardrails }))
);
const RoadmapSection = lazy(() =>
  import('./components/RoadmapSection').then((m) => ({ default: m.RoadmapSection }))
);
const AIHubPage = lazy(() =>
  import('./components/AIHubPage').then((m) => ({ default: m.AIHubPage }))
);
const VeoVideoGenerator = lazy(() =>
  import('./components/VeoVideoGenerator').then((m) => ({ default: m.VeoVideoGenerator }))
);
const ConnectedShieldsPage = lazy(() =>
  import('./components/ConnectedShieldsPage').then((m) => ({ default: m.ConnectedShieldsPage }))
);
const OmnichannelScamChecker = lazy(() =>
  import('./components/OmnichannelScamChecker').then((m) => ({ default: m.OmnichannelScamChecker }))
);

function FeatureLoadingFallback({ lang }: { lang: LanguageCode }) {
  const s = getStrings(lang);
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading NYAYA Suraksha Module"
      aria-description="Please wait while the neural fraud protection and regulatory shield module is initialized."
      className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div className="relative flex h-14 w-14 items-center justify-center" aria-hidden="true">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400" />
      </div>
      <p className="mt-4 text-sm font-semibold tracking-wide text-emerald-400 uppercase">
        {s.loadingModuleTitle}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {s.loadingModuleSub}
      </p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
      if (saved) return saved;
    }
    return 'hi';
  });
  const [selectedTickerSampleId, setSelectedTickerSampleId] = useState<string | undefined>(undefined);
  const [transcribedTextForSimulator, setTranscribedTextForSimulator] = useState<string | undefined>(undefined);
  const [notifications, setNotifications] = useState<InAppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeToast, setActiveToast] = useState<InAppNotification | null>(null);

  const s = getStrings(currentLanguage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
      } catch {
        // ignore storage errors
      }
      document.documentElement.lang = currentLanguage === 'hinglish' ? 'en-IN' : currentLanguage;
    }
  }, [currentLanguage]);

  const [prefilledGrievance, setPrefilledGrievance] = useState<Partial<ScoresComplaintForm>>({
    whatHappened:
      'Received an urgent forward claiming guaranteed 300% profit bonus share allotment requiring advance stamp duty fee of ₹12,500.',
    category: 'Fake NSDL / Depository Allotment Letterhead',
    scammerNameOrNumber: 'https://nsdI-portal.org.in (Telegram Channel @NSDL_Bonus_VIP)',
    platform: 'Telegram / WhatsApp',
    amountLost: '12500',
  });

  const navigateTo = (page: PageId, sampleId?: string) => {
    setActivePage(page);
    if (sampleId) {
      setSelectedTickerSampleId(sampleId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Simulate new high-risk scam added to Bharat Threat Radar
  const handleSimulateNewRadarAlert = () => {
    const cities = [
      { city: 'Rajkot', state: 'Gujarat', scam: 'Demat OTP harvesting link masquerading as "Special Diwali Dividend"' },
      { city: 'Indore', state: 'Madhya Pradesh', scam: 'VIP Telegram pump group operating with illiquid penny stocks' },
      { city: 'Siliguri', state: 'West Bengal', scam: 'Counterfeit broker trading APK sent via direct WhatsApp file' },
      { city: 'Hubballi', state: 'Karnataka', scam: 'Fake Pre-IPO allotment letter requiring ₹48,000 upfront fee' },
    ];
    const picked = cities[Math.floor(Math.random() * cities.length)];

    const newNotification: InAppNotification = {
      id: 'radar-' + Date.now(),
      type: 'radar_scam',
      title: `🚨 High-Risk Scam Intercepted: ${picked.city}`,
      message: `${picked.scam} flagged and broadcast across Bharat Threat Radar.`,
      timestamp: 'Just now',
      read: false,
      severity: 'high',
      targetPage: 'radar',
      metadata: {
        city: picked.city,
        state: picked.state,
      },
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setActiveToast(newNotification);

    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotification.id ? null : current));
    }, 6000);
  };

  // Simulate complaint status change
  const handleSimulateComplaintUpdate = () => {
    const statuses = [
      { id: '2024-8849', status: 'Enforcement Action Ordered by SEBI' },
      { id: '2024-7120', status: 'Restitution Freeze Verified by CyberCrime 1930' },
      { id: '2024-9341', status: 'Depository Penalty Issued to Rogue Broker' },
      { id: '2024-6402', status: 'Notice of Hearing Issued to Unregistered Advisor' },
    ];
    const picked = statuses[Math.floor(Math.random() * statuses.length)];

    const newNotification: InAppNotification = {
      id: 'complaint-' + Date.now(),
      type: 'complaint_status',
      title: `⚖️ SCORES #${picked.id} Status Updated`,
      message: `Official grievance status advanced: "${picked.status}". Evidence files verified.`,
      timestamp: 'Just now',
      read: false,
      severity: 'info',
      targetPage: 'scores',
      metadata: {
        complaintId: `SCORES-${picked.id}`,
        newStatus: picked.status,
      },
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setActiveToast(newNotification);

    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotification.id ? null : current));
    }, 6000);
  };

  const handleOpenSimulator = () => {
    navigateTo('simulator');
  };

  const handleSelectScamFromTicker = (sampleId?: string) => {
    if (sampleId) {
      setSelectedTickerSampleId(sampleId);
    }
    navigateTo('simulator');
  };

  const handleOpenScores = () => {
    navigateTo('scores');
  };

  const handleSendTranscriptionToSimulator = (transcription: string) => {
    setTranscribedTextForSimulator(transcription);
    navigateTo('simulator');
  };

  const handleDraftScoresFromSimulator = (sampleData?: Partial<ScamSample>) => {
    if (sampleData) {
      setPrefilledGrievance({
        whatHappened: `Reported scam: "${sampleData.content || ''}" — Flagged with risk level ${sampleData.riskLevel} (${sampleData.riskScore}/100). Violates: ${sampleData.sebiReference || ''}`,
        category: sampleData.reasons?.[0] || 'Unregistered Finfluencer & Phishing Fraud',
        platform: sampleData.type === 'reel' ? 'Instagram Reel / Telegram' : 'WhatsApp Forward',
        amountLost: sampleData.type === 'pdf' ? '12500' : '5000',
      });
    }
    navigateTo('scores');
  };

  const handleDraftComplaintFromOmni = (complaintData: {
    whatHappened: string;
    category: string;
    platform: string;
    amountLost?: string;
    scammerNameOrNumber?: string;
  }) => {
    setPrefilledGrievance({
      whatHappened: complaintData.whatHappened,
      category: complaintData.category,
      platform: complaintData.platform,
      amountLost: complaintData.amountLost || '0',
      scammerNameOrNumber: complaintData.scammerNameOrNumber || 'Unknown Entity',
    });
    navigateTo('scores');
  };

  const handleGlobalToast = (title: string, message: string, severity: 'high' | 'medium' | 'info' = 'info') => {
    const newNotification: InAppNotification = {
      id: 'toast-' + Date.now(),
      type: 'radar_scam',
      title,
      message,
      timestamp: 'Just now',
      read: false,
      severity,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setActiveToast(newNotification);
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotification.id ? null : current));
    }, 6000);
  };

  const handleBroadcastToRadar = (title: string, city: string = 'National') => {
    const newNotification: InAppNotification = {
      id: 'radar-' + Date.now(),
      type: 'radar_scam',
      title: `🚨 Threat Radar Update: ${city}`,
      message: `${title} intercepted and broadcast to nationwide protection network.`,
      timestamp: 'Just now',
      read: false,
      severity: 'high',
      targetPage: 'radar',
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setActiveToast(newNotification);
    setTimeout(() => {
      setActiveToast((current) => (current?.id === newNotification.id ? null : current));
    }, 6000);
  };

  return (
    <div
      className="min-h-screen bg-[#080e14] text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300"
      aria-label="NYAYA Investor Fraud Protection Application"
      aria-description="Bharat-first investor protection engine providing scam detection, voice-native advisories, and SEBI SCORES grievance drafting."
    >
      {/* Skip to Main Content Link for Screen Reader & Keyboard Accessibility */}
      <a
        href="#main-content"
        aria-label="Skip to main application content"
        aria-description="Bypasses the top navigation bar and jumps directly to the active investor protection module."
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-slate-950 focus:shadow-xl"
      >
        {s.skipToMain}
      </a>

      {/* 3-Zone Top Bar with Distinct Page Tabs & Real-time Scam Ticker */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activePage={activePage}
        onNavigate={navigateTo}
        onSelectScam={handleSelectScamFromTicker}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onSimulateNewRadarAlert={handleSimulateNewRadarAlert}
        onSimulateComplaintUpdate={handleSimulateComplaintUpdate}
      />

      {/* Screen-Reader & Quick-Access Investor Suraksha Action Bar */}
      <nav
        aria-label="Quick Investor Protection Actions"
        aria-description="Direct shortcut buttons to scan suspicious messages, inspect omnichannel threats, consult the voice AI guardian, or draft a SEBI SCORES complaint."
        className="border-b border-slate-800/70 bg-[#0a121b]/90 px-4 py-2"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {s.quickShortcutsLabel}
            </span>
            <button
              type="button"
              onClick={handleOpenSimulator}
              aria-current={activePage === 'simulator' ? 'page' : undefined}
              aria-label="Open WhatsApp Suraksha Lens Scam Scanner"
              aria-description="Analyze suspicious WhatsApp forwards, PDFs, or finfluencer reels with neural risk scoring and Dadi voice guidance."
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activePage === 'simulator'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {s.quickScanWhatsapp}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('omnichannel')}
              aria-current={activePage === 'omnichannel' ? 'page' : undefined}
              aria-label="Open Sarvavyapi Omnichannel Scam Checker"
              aria-description="Inspect suspicious SMS headers, emails, Google search ads, speed post notices, and digital arrest calls."
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activePage === 'omnichannel'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {s.quickOmnichannel}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('ai-hub')}
              aria-current={activePage === 'ai-hub' ? 'page' : undefined}
              aria-label="Open NYAYA AI Intelligence Hub and Voice Dictation"
              aria-description="Dictate your scam experience using voice-to-text, chat with NYAYA Sathi AI, or verify advisor registration via Google Search."
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activePage === 'ai-hub'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {s.quickVoiceAi}
            </button>
            <button
              type="button"
              onClick={handleOpenScores}
              aria-current={activePage === 'scores' ? 'page' : undefined}
              aria-label="Open SEBI SCORES 2.0 Grievance Drafter"
              aria-description="Generate a structured regulatory complaint and evidence dossier for SEBI SCORES 2.0 and CyberCrime 1930."
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activePage === 'scores'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {s.quickDraftScores}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('radar')}
              aria-current={activePage === 'radar' ? 'page' : undefined}
              aria-label="Open Bharat Threat Radar and Scam Pehchano Quiz"
              aria-description="View live city-wise financial scam hotspots across Tier-2 and Tier-3 India and practice spotting fraud."
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                activePage === 'radar'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {s.quickThreatRadar}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateNewRadarAlert}
              aria-label="Simulate Live Bharat Threat Radar Alert"
              aria-description="Triggers a sample real-time high-risk regional scam alert notification for testing."
              className="rounded-lg border border-slate-700/80 bg-[#0e1824] px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-emerald-500/50 hover:text-white transition-colors"
            >
              {s.testRadarAlert}
            </button>
            <button
              type="button"
              onClick={handleSimulateComplaintUpdate}
              aria-label="Simulate SEBI SCORES Status Update"
              aria-description="Triggers a sample grievance status update notification from SEBI SCORES and CyberCrime 1930."
              className="rounded-lg border border-slate-700/80 bg-[#0e1824] px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-emerald-500/50 hover:text-white transition-colors"
            >
              {s.testScoresUpdate}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content: Render Dedicated Page Content */}
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="NYAYA Main Workspace"
        aria-description="Displays the currently selected investor fraud protection tool or educational module."
        className="flex-1 focus:outline-none"
      >
        <Suspense fallback={<FeatureLoadingFallback lang={currentLanguage} />}>
          {/* PAGE 1: HOME & OVERVIEW */}
          {activePage === 'home' && (
            <div
              role="region"
              aria-label="Home and Overview Section"
              aria-description="Overview of NYAYA Suraksha Kavach, interactive tool launcher, 3-in-1 protection pillars, investor personas, and impact calculator."
              className="animate-fadeIn"
            >
              <Hero
                currentLanguage={currentLanguage}
                onOpenSimulator={handleOpenSimulator}
                onOpenScores={handleOpenScores}
              />
              {/* Interactive Dedicated Tools Launcher */}
              <HomeHub currentLanguage={currentLanguage} onNavigate={navigateTo} />
              <ThreeInOneKavach currentLanguage={currentLanguage} />
              <PersonasSection currentLanguage={currentLanguage} />
              <ImpactCalculator currentLanguage={currentLanguage} />
            </div>
          )}

          {/* PAGE: CONNECT WHATSAPP NUMBER, SIM & SMS SHIELD */}
          {activePage === 'connect-shields' && (
            <div
              role="region"
              aria-label="Connected Telecom, SIM, and WhatsApp Shields"
              aria-description="Configure real-time SIM swap alerts, TRAI SMS header verification, and WhatsApp forward protection."
              className="animate-fadeIn py-6"
            >
              <ConnectedShieldsPage
                currentLanguage={currentLanguage}
                onNavigateToOmnichannel={() => navigateTo('omnichannel')}
                onDraftComplaint={(scamDetails) => {
                  if (scamDetails) {
                    setPrefilledGrievance({
                      whatHappened: scamDetails,
                      category: 'Mobile / SMS Smishing & SIM-Swap Attempt',
                      platform: 'SMS / Carrier Telecom Circle',
                      amountLost: '0',
                    });
                  }
                  navigateTo('scores');
                }}
                onTriggerGlobalToast={handleGlobalToast}
              />
            </div>
          )}

          {/* PAGE: SARVAVYAPI SCAM PARIKSHAK (OMNICHANNEL CHECKER: Google, Mail, Post, Reels, SMS, etc.) */}
          {activePage === 'omnichannel' && (
            <div
              role="region"
              aria-label="Sarvavyapi Omnichannel Scam Checker"
              aria-description="Multi-vector fraud analyzer inspecting Google Ads, Email, Speed Post letters, Instagram Reels, SMS, and Digital Arrest calls."
              className="animate-fadeIn py-6"
            >
              <OmnichannelScamChecker
                currentLanguage={currentLanguage}
                onDraftComplaint={handleDraftComplaintFromOmni}
                onBroadcastToRadar={handleBroadcastToRadar}
                onTriggerGlobalToast={handleGlobalToast}
              />
            </div>
          )}

          {/* PAGE 2: WHATSAPP SURAKSHA LENS & D3 NEURAL SCAN */}
          {activePage === 'simulator' && (
            <div
              role="region"
              aria-label="WhatsApp Suraksha Lens and Neural Scam Simulator"
              aria-description="Interactive simulator to inspect suspicious WhatsApp forwards, view D3 risk score gauges, listen to Dadi audio warnings, and share findings."
              className="animate-fadeIn py-6"
            >
              <WhatsAppSimulator
                currentLanguage={currentLanguage}
                onDraftScores={handleDraftScoresFromSimulator}
                externalSelectedSampleId={selectedTickerSampleId}
                incomingCustomText={transcribedTextForSimulator}
              />
            </div>
          )}

          {/* PAGE 3: AI INTELLIGENCE HUB (Chatbot, Google Search Grounding, Speech Transcription) */}
          {activePage === 'ai-hub' && (
            <div
              role="region"
              aria-label="NYAYA AI Intelligence Hub"
              aria-description="Voice-to-text scam dictation recorder, multi-turn NYAYA Sathi AI chatbot, Google Search grounding, and audio transcription."
              className="animate-fadeIn"
            >
              <AIHubPage
                currentLanguage={currentLanguage}
                onSendToSimulator={handleSendTranscriptionToSimulator}
              />
            </div>
          )}

          {/* PAGE 4: SEBI SCORES GRIEVANCE DRAFTER */}
          {activePage === 'scores' && (
            <div
              role="region"
              aria-label="SEBI SCORES Grievance Drafter"
              aria-description="Step-by-step legal complaint drafter for filing investor fraud grievances with SEBI SCORES 2.0 and National Cyber Crime Helpline 1930."
              className="animate-fadeIn py-6"
            >
              <ScoresComplaintDrafter
                currentLanguage={currentLanguage}
                initialData={prefilledGrievance}
              />
            </div>
          )}

          {/* PAGE 5: VEO 3 VIDEO GENERATOR STUDIO */}
          {activePage === 'veo' && (
            <div
              role="region"
              aria-label="Veo 3 Investor Awareness Video Generator"
              aria-description="Generate educational investor fraud awareness videos in 16:9 landscape or 9:16 portrait formats."
              className="animate-fadeIn py-6"
            >
              <VeoVideoGenerator />
            </div>
          )}

          {/* PAGE 6: BHARAT THREAT RADAR & SCAM PEHCHANO QUIZ */}
          {activePage === 'radar' && (
            <div
              role="region"
              aria-label="Bharat Threat Radar and Scam Pehchano Quiz"
              aria-description="Geographic heatmap of active financial scams in Tier-2 and Tier-3 Indian cities and an interactive investor awareness quiz."
              className="animate-fadeIn py-6 space-y-12"
            >
              <BharatScamMap />
              <ScamPehchanoQuiz />
            </div>
          )}

          {/* PAGE 7: SANGYAN GUARDRAILS & ROADMAP */}
          {activePage === 'guardrails' && (
            <div
              role="region"
              aria-label="Sangyan AI Guardrails and National Rollout Roadmap"
              aria-description="Ethical AI safety boundaries ensuring zero stock tips and 100% regulatory compliance, alongside NYAYA's deployment roadmap."
              className="animate-fadeIn py-6 space-y-12"
            >
              <SangyanGuardrails />
              <RoadmapSection />
            </div>
          )}
        </Suspense>
      </main>

      {/* Floating In-App Toast Banner */}
      <NotificationToast
        notification={activeToast}
        onClose={() => setActiveToast(null)}
        onClick={() => {
          if (activeToast?.targetPage) {
            navigateTo(activeToast.targetPage, activeToast.metadata?.scamSampleId);
          }
          setActiveToast(null);
        }}
      />

      {/* Offline Connectivity & Cached Threat Warnings Vault */}
      <OfflineThreatCacheBanner
        currentLanguage={currentLanguage}
        notifications={notifications}
        onNavigate={navigateTo}
      />

      {/* Global Footer */}
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}
