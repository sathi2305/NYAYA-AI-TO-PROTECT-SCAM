import React, { useState } from 'react';
import {
  Shield,
  Globe,
  ChevronDown,
  MessageSquare,
  Home,
  Bot,
  FileText,
  Video,
  MapPin,
  ShieldAlert,
  Menu,
  X,
  Smartphone,
  Search
} from 'lucide-react';
import { LANGUAGES } from '../data/mockData';
import { InAppNotification, LanguageCode, PageId } from '../types';
import { getStrings } from '../utils/i18n';
import { ScamTicker } from './ScamTicker';
import { NotificationCenter } from './NotificationCenter';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activePage: PageId;
  onNavigate: (page: PageId, sampleId?: string) => void;
  onSelectScam?: (sampleId?: string) => void;
  notifications: InAppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSimulateNewRadarAlert: () => void;
  onSimulateComplaintUpdate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activePage,
  onNavigate,
  onSelectScam,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onSimulateNewRadarAlert,
  onSimulateComplaintUpdate,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];
  const s = getStrings(currentLanguage);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: s.navHome, icon: <Home className="h-3.5 w-3.5" /> },
    { id: 'connect-shields', label: s.navConnectShields, icon: <Smartphone className="h-3.5 w-3.5 text-cyan-400" /> },
    { id: 'omnichannel', label: s.navOmnichannel, icon: <Search className="h-3.5 w-3.5 text-indigo-400" /> },
    { id: 'simulator', label: s.navSimulator, icon: <MessageSquare className="h-3.5 w-3.5" /> },
    { id: 'ai-hub', label: s.navAiHub, icon: <Bot className="h-3.5 w-3.5" /> },
    { id: 'scores', label: s.navScores, icon: <FileText className="h-3.5 w-3.5" /> },
    { id: 'veo', label: s.navVeo, icon: <Video className="h-3.5 w-3.5" /> },
    { id: 'radar', label: s.navRadar, icon: <MapPin className="h-3.5 w-3.5" /> },
    { id: 'guardrails', label: s.navGuardrails, icon: <ShieldAlert className="h-3.5 w-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080e14]/95 backdrop-blur-md">
      {/* Real-time State-wise Scam Ticker Bar */}
      <ScamTicker onSelectScam={onSelectScam} />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90 text-left"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
            <Shield className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="font-display tracking-wider text-base sm:text-lg leading-none">NYAYA</span>
            <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase leading-none mt-0.5">
              {s.brandSubtitle}
            </span>
          </div>
        </button>

        {/* Zone 2: Distinct Page Navigation Tabs */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50 shadow-sm shadow-emerald-950'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Bhasha Selector & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label={`Select App Language (${selectedLang.label})`}
              aria-expanded={langMenuOpen}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
              title="Select Mother Tongue / Bhasha"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              <span className="whitespace-nowrap">{selectedLang.native}</span>
              <span className="hidden sm:inline rounded bg-emerald-500/20 px-1 py-0.2 text-[9px] font-mono font-bold uppercase text-emerald-300">
                {selectedLang.code}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 max-h-80 overflow-y-auto rounded-xl border border-slate-800 bg-[#0e1722] p-1.5 shadow-2xl z-50">
                <div className="px-2 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  {s.selectBhasha}
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-emerald-500/20 font-semibold text-emerald-300'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-[10px] text-slate-500">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* In-App PWA Install Prompt */}
          <PWAInstallButton />

          {/* In-App Notification Center */}
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={onMarkAsRead}
            onMarkAllAsRead={onMarkAllAsRead}
            onClearAll={onClearAll}
            onNavigate={onNavigate}
            onSimulateNewRadarAlert={onSimulateNewRadarAlert}
            onSimulateComplaintUpdate={onSimulateComplaintUpdate}
          />

          {/* Quick CTA to Simulator */}
          <button
            onClick={() => onNavigate('simulator')}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activePage === 'simulator'
                ? 'bg-emerald-400 text-slate-950 font-bold'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{s.launchScan}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white xl:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0c1622] p-3 xl:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-xs font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'border border-slate-800 bg-[#070e16] text-slate-300 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
