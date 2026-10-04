import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  Radio,
  MessageSquare,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Signal,
  Cpu,
  Trash2,
  RefreshCw,
  BellRing,
  Volume2,
  VolumeX,
  Send
} from 'lucide-react';
import { ConnectedShieldConfig, ShieldInterceptedEvent, LanguageCode } from '../types';
import { INITIAL_CONNECTED_SHIELD_CONFIG, INITIAL_INTERCEPTED_EVENTS } from '../data/mockData';

interface ConnectedShieldsPageProps {
  currentLanguage: LanguageCode;
  onNavigateToOmnichannel?: (channel?: string) => void;
  onDraftComplaint?: (scamDetails?: string) => void;
  onTriggerGlobalToast?: (title: string, message: string, severity?: 'high' | 'medium' | 'info') => void;
}

const STORAGE_SHIELD_KEY = 'nyaya_connected_shield_settings';
const STORAGE_LOGS_KEY = 'nyaya_shield_intercepted_logs';

export const ConnectedShieldsPage: React.FC<ConnectedShieldsPageProps> = ({
  currentLanguage,
  onNavigateToOmnichannel,
  onDraftComplaint,
  onTriggerGlobalToast,
}) => {
  // Load configuration from local storage
  const [config, setConfig] = useState<ConnectedShieldConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_SHIELD_KEY);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_CONNECTED_SHIELD_CONFIG;
  });

  const [logs, setLogs] = useState<ShieldInterceptedEvent[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_LOGS_KEY);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_INTERCEPTED_EVENTS;
  });

  // Edit / Input State
  const [editingNumber, setEditingNumber] = useState(config.whatsappNumber);
  const [editingSimProvider, setEditingSimProvider] = useState(config.simProvider);
  const [editingSimNumber, setEditingSimNumber] = useState(config.simNumber);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccessNotice, setVerifySuccessNotice] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ShieldInterceptedEvent | null>(null);

  // Simulation test state
  const [simTestType, setSimTestType] = useState<'sms' | 'whatsapp' | 'sim'>('sms');
  const [isSimulating, setIsSimulating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Save to local storage whenever config or logs change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_SHIELD_KEY, JSON.stringify(config));
      } catch {}
    }
  }, [config]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logs));
      } catch {}
    }
  }, [logs]);

  const handleSaveConnection = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setConfig((prev) => ({
        ...prev,
        whatsappNumber: editingNumber,
        simProvider: editingSimProvider,
        simNumber: editingSimNumber,
        whatsappConnected: true,
        simShieldActive: true,
        lastScannedTime: 'Just now',
      }));
      setVerifySuccessNotice(true);
      if (onTriggerGlobalToast) {
        onTriggerGlobalToast(
          '🛡️ Shield Network Connected',
          `WhatsApp (${editingNumber}) & ${editingSimProvider} SIM successfully linked to NYAYA Suraksha Net.`,
          'info'
        );
      }
      setTimeout(() => setVerifySuccessNotice(false), 4000);
    }, 1200);
  };

  const toggleToggle = (key: keyof ConnectedShieldConfig) => {
    setConfig((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      return updated;
    });
  };

  const handleSimulateIncomingThreat = (scenarioType: 'sms' | 'whatsapp' | 'sim') => {
    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
      let newEvent: ShieldInterceptedEvent;

      if (scenarioType === 'sms') {
        newEvent = {
          id: 'evt-' + Date.now(),
          timestamp: 'Just now',
          channel: 'sms',
          sender: 'AD-SB1N (Spoofed TRAI Header)',
          headerOrNumber: 'AD-SB1N',
          snippet: 'URGENT: Your SBI Bank Account has been deactivated due to non-updated Aadhaar KYC. Update within 30 mins at http://sbi-aadhaar-kyc.in/auth or ₹10,000 penalty.',
          threatLevel: 'CRITICAL',
          actionTaken: 'Blocked & Quarantined',
          traiHeaderStatus: 'Spoofed',
          riskScore: 99,
        };
      } else if (scenarioType === 'whatsapp') {
        newEvent = {
          id: 'evt-' + Date.now(),
          timestamp: 'Just now',
          channel: 'whatsapp',
          sender: '+91 97120 48291',
          headerOrNumber: '+91 97120 48291',
          snippet: 'Forwarded: "SEBI Registered Pre-IPO Quota: Guaranteed 300% return on Swiggy Pre-IPO allocation. Pay ₹20,000 token before 5 PM to secure slot."',
          threatLevel: 'HIGH',
          actionTaken: 'Blocked & Quarantined',
          traiHeaderStatus: 'Unregistered',
          riskScore: 95,
        };
      } else {
        newEvent = {
          id: 'evt-' + Date.now(),
          timestamp: 'Just now',
          channel: 'sim',
          sender: `${config.simProvider} Telecom Circle Guard`,
          headerOrNumber: 'Telecom Node 4G/5G',
          snippet: 'Unsolicited SIM Swap OTP handshake detected from suspicious remote cell tower. Carrier lock automatically executed to protect linked Demat & UPI accounts.',
          threatLevel: 'CRITICAL',
          actionTaken: 'Blocked & Quarantined',
          traiHeaderStatus: 'Suspicious Bulk',
          riskScore: 100,
        };
      }

      setLogs((prev) => [newEvent, ...prev]);
      setConfig((prev) => ({
        ...prev,
        blockedAttemptsCount: prev.blockedAttemptsCount + 1,
        lastScannedTime: 'Just now',
      }));

      // Audio notification if enabled
      if (soundEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const utter = new SpeechSynthesisUtterance('Warning! NYAYA Suraksha Kavach has intercepted and quarantined a scam attempt.');
          utter.rate = 1.0;
          window.speechSynthesis.speak(utter);
        } catch {}
      }

      if (onTriggerGlobalToast) {
        onTriggerGlobalToast(
          `🚨 ${newEvent.channel.toUpperCase()} Scam Intercepted!`,
          `${newEvent.sender}: ${newEvent.snippet.slice(0, 70)}... [Quarantined]`,
          'high'
        );
      }
    }, 1400);
  };

  const handleClearLogs = () => {
    setLogs([]);
    try {
      localStorage.removeItem(STORAGE_LOGS_KEY);
    } catch {}
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0c1a24] via-[#09131c] to-[#060c12] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span>Suraksha Kavach: Triple-Vector Defense</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connect WhatsApp Number, SIM & SMS Shield
            </h1>
            <p className="max-w-3xl text-sm text-slate-300 leading-relaxed">
              Equip your primary mobile connection with real-time cybersecurity defense. Link your WhatsApp number,
              telecom SIM carrier, and SMS inbox to auto-intercept smishing attacks, TRAI header spoofing, fake banking KYC threats,
              and unauthorized SIM swap hijacks.
            </p>
          </div>

          {/* Real-time Status Card */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-[#071018] p-4 text-center min-w-[200px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Shield Active
              </span>
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">
              {config.blockedAttemptsCount}
            </div>
            <div className="text-[11px] text-slate-400">
              Threats Intercepted & Quarantined
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-500">
              Last Sync: {config.lastScannedTime || 'Just now'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 3 Interactive Control Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. WhatsApp Number Shield */}
        <div className="rounded-2xl border border-emerald-500/30 bg-[#09141d] p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">WhatsApp Number</h3>
                  <p className="text-xs text-slate-400">End-to-End Chatbot Watchdog</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  config.whatsappConnected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {config.whatsappConnected ? 'Linked' : 'Not Linked'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Monitors suspicious group additions, incoming APK files, and forwarded investment tips. Automatic forward scanning protects elderly family members.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">WhatsApp Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={editingNumber}
                  onChange={(e) => setEditingNumber(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full rounded-xl border border-slate-700 bg-[#060c12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                🔒 Privacy Guarantee: NYAYA stores your number strictly inside client-side sandbox. Never shared with brokers.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Auto-Forward Quarantine</span>
              <button
                onClick={() => toggleToggle('whatsappConnected')}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  config.whatsappConnected ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    config.whatsappConnected ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 2. SIM Carrier & IMSI Protection */}
        <div className="rounded-2xl border border-cyan-500/30 bg-[#09141d] p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40">
                  <Signal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">SIM Carrier Shield</h3>
                  <p className="text-xs text-slate-400">Anti-SIM Swap & IMSI Guard</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  config.simShieldActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {config.simShieldActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Detects fraudulent eSIM upgrades and unauthorized telecom circle SIM re-issuance. Alerts you before scammers can hijack bank SMS OTPs.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Telecom Provider (Carrier)</label>
                <select
                  value={editingSimProvider}
                  onChange={(e) => setEditingSimProvider(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#060c12] px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Jio 5G">Reliance Jio 5G / 4G</option>
                  <option value="Airtel 5G">Bharti Airtel 5G Plus</option>
                  <option value="Vodafone Idea (Vi)">Vodafone Idea (Vi)</option>
                  <option value="BSNL 4G">BSNL Mobile</option>
                  <option value="MTNL">MTNL Dolphin</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">SIM Identifier (Last 8 Digits of ICCID)</label>
                <input
                  type="text"
                  value={editingSimNumber}
                  onChange={(e) => setEditingSimNumber(e.target.value)}
                  placeholder="8991 XXXX XXXX XXXX"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-[#060c12] px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>SIM-Swap Immediate Freeze</span>
              <button
                onClick={() => toggleToggle('simShieldActive')}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  config.simShieldActive ? 'bg-cyan-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    config.simShieldActive ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 3. SMS Smishing & TRAI Header Defense */}
        <div className="rounded-2xl border border-indigo-500/30 bg-[#09141d] p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/40">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">SMS Smishing Filter</h3>
                  <p className="text-xs text-slate-400">TRAI Header & OTP Guard</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  config.smsSmishingFilter
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {config.smsSmishingFilter ? 'Filtering' : 'Inactive'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Validates alphanumeric SMS sender headers (e.g., verifying whether <code>VM-SBIN</code> is genuine or a spoofed clone). Blocks fake electricity disconnection notices and malicious bit.ly links.
            </p>

            <div className="space-y-3 rounded-xl border border-slate-800 bg-[#060c12] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Sanchar Saathi (Chakshu) Sync</span>
                <button
                  onClick={() => toggleToggle('sancharSaathiLinked')}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                    config.sancharSaathiLinked ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                      config.sancharSaathiLinked ? 'translate-x-3.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">National Cyber Helpline 1930 Relay</span>
                <button
                  onClick={() => toggleToggle('cyber1930AutoAlert')}
                  className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${
                    config.cyber1930AutoAlert ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                      config.cyber1930AutoAlert ? 'translate-x-3.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Real-Time Smishing Quarantine</span>
              <button
                onClick={() => toggleToggle('smsSmishingFilter')}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  config.smsSmishingFilter ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    config.smsSmishingFilter ? 'translate-x-4' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar: Save & Handshake */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#09141d] p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveConnection}
            disabled={isVerifying}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-950 transition-all hover:bg-emerald-500 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Establishing Secure Handshake...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Save & Activate Triple Shield</span>
              </>
            )}
          </button>

          {verifySuccessNotice && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4" />
              <span>Connection Synced to Local Device Sandbox</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Alert Audio: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-500" />
                <span>Alert Audio: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* LIVE SIMULATOR: Test Inbound Scam Interception */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#12110c] to-[#090e14] p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/40">
              <Sparkles className="h-3 w-3" />
              <span>Real-Time Defense Testbed</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Simulate Incoming Threat to Connected Devices
            </h2>
            <p className="text-xs text-slate-300">
              Test how NYAYA automatically intercepts fraudulent SMS, spoofed WhatsApp forwards, and SIM-swap triggers in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSimulateIncomingThreat('sms')}
              disabled={isSimulating}
              className="flex items-center gap-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 disabled:opacity-50"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Simulate Fake Bank SMS</span>
            </button>

            <button
              onClick={() => handleSimulateIncomingThreat('whatsapp')}
              disabled={isSimulating}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Simulate WhatsApp Forward</span>
            </button>

            <button
              onClick={() => handleSimulateIncomingThreat('sim')}
              disabled={isSimulating}
              className="flex items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 disabled:opacity-50"
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Simulate SIM Swap Hijack</span>
            </button>
          </div>
        </div>

        {isSimulating && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200 animate-pulse">
            <Radio className="h-4 w-4 animate-spin text-amber-400" />
            <span>Transmitting simulated malicious packet through telecom network gateway...</span>
          </div>
        )}
      </div>

      {/* Intercepted Threats History & Quarantine Vault */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">
              Intercepted Threats Vault ({logs.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Vault</span>
              </button>
            )}
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 bg-[#09141d] p-8 text-center text-xs text-slate-400">
            No intercepted threats found. Your connection is running cleanly.
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((item) => {
              const isCrit = item.threatLevel === 'CRITICAL';
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 transition-all ${
                    isCrit
                      ? 'border-rose-500/40 bg-[#160d11]/80 hover:border-rose-500/60'
                      : 'border-slate-800 bg-[#09141d] hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          item.channel === 'sms'
                            ? 'bg-indigo-500/20 text-indigo-400'
                            : item.channel === 'whatsapp'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {item.channel === 'sms' ? (
                          <Mail className="h-4 w-4" />
                        ) : item.channel === 'whatsapp' ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          <Cpu className="h-4 w-4" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {item.sender}
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              isCrit
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {item.threatLevel} (Risk: {item.riskScore}%)
                          </span>
                          {item.traiHeaderStatus && (
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
                              TRAI: {item.traiHeaderStatus}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-500">
                            • {item.timestamp}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                      <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                        {item.actionTaken}
                      </span>

                      {onDraftComplaint && (
                        <button
                          onClick={() => onDraftComplaint(`Threat intercepted from ${item.sender}: ${item.snippet}`)}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-slate-700 hover:text-white"
                        >
                          Draft SCORES FIR
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
