import React, { useState } from 'react';
import { ShieldAlert, Activity, Users, Radio, AlertOctagon, MapPin, Plus, CheckCircle2, X, Filter } from 'lucide-react';
import { THREAT_CITIES } from '../data/mockData';
import { ThreatCity } from '../types';
import { ShareThreatAlertButton } from './ShareThreatAlertButton';

export const BharatScamMap: React.FC = () => {
  const [cityList, setCityList] = useState<ThreatCity[]>(THREAT_CITIES);
  const [selectedCity, setSelectedCity] = useState<ThreatCity>(THREAT_CITIES[0]);
  const [filterTier, setFilterTier] = useState<'all' | 'Tier-2' | 'Tier-3' | 'Critical'>('all');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);
  
  const [newReport, setNewReport] = useState({
    city: 'Nashik',
    scamPattern: 'Telegram Pump & Dump VIP Channel',
    suspectContact: '',
  });

  const totalThreats = cityList.reduce((acc, c) => acc + c.activeScamsDetected, 0);

  const filteredCities = cityList.filter((city) => {
    if (filterTier === 'all') return true;
    if (filterTier === 'Critical') return city.riskStatus === 'Critical';
    return city.tier === filterTier;
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.suspectContact.trim()) return;

    setCityList((prev) =>
      prev.map((c) =>
        c.city.toLowerCase() === newReport.city.toLowerCase()
          ? { ...c, activeScamsDetected: c.activeScamsDetected + 1 }
          : c
      )
    );

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setNewReport({ city: 'Nashik', scamPattern: 'Telegram Pump & Dump VIP Channel', suspectContact: '' });
    }, 2000);
  };

  // Map coordinates (relative percentage on India SVG canvas)
  const cityCoordinates: Record<string, { x: number; y: number }> = {
    'Nashik': { x: 34, y: 55 },
    'Surat': { x: 28, y: 50 },
    'Indore': { x: 42, y: 46 },
    'Patna': { x: 70, y: 38 },
    'Coimbatore': { x: 45, y: 82 },
    'Varanasi': { x: 64, y: 40 },
    'Jaipur': { x: 36, y: 35 },
  };

  return (
    <section id="scam-map" className="border-t border-slate-800 bg-[#070d13] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Live Threat Watch • Slide 12
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Bharat Threat Radar &amp; Community Immune System
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            A live threat radar tracking emerging financial fraud patterns across Tier-2 and Tier-3 India. When 10 users report an offending number or typosquat URL, it is blocked across all 41Cr users.
          </p>
        </div>

        {/* Global Live Bar */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0c1622] px-5 py-3 text-xs text-slate-300 shadow-md">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="font-semibold text-white">Live Monitoring: {cityList.length} Tier-2 &amp; Tier-3 Hotspots</span>
          </div>

          <div className="flex items-center gap-4 font-mono-numbers">
            <div>
              <span className="text-slate-400">Total Flagged Today: </span>
              <span className="font-bold text-rose-400">{totalThreats} Scams</span>
            </div>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <div>
              <span className="text-slate-400">Community Blocklist: </span>
              <span className="font-bold text-emerald-400">14,892 Numbers</span>
            </div>
          </div>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-emerald-400" />
            <span>Report in My City</span>
          </button>
        </div>

        {/* Interactive India Threat Radar Canvas Visualizer */}
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-700/70 bg-[#081018] p-4 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="font-bold text-white uppercase tracking-wider">Bharat Geographic Threat Heatmap</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded-lg bg-[#0c1724] p-1 border border-slate-800 text-[11px]">
              {(['all', 'Tier-2', 'Tier-3', 'Critical'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setFilterTier(tier)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    filterTier === tier
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier === 'all' ? 'All Hubs' : tier}
                </button>
              ))}
            </div>
          </div>

          {/* Radar Graphical Display */}
          <div className="relative h-64 sm:h-72 w-full mt-4 flex items-center justify-center bg-radial from-slate-900/40 to-[#070e17] rounded-xl border border-slate-800/80 overflow-hidden">
            {/* Background Grid Lines & Concentric Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <div className="h-32 w-32 rounded-full border border-emerald-500/50" />
              <div className="absolute h-52 w-52 rounded-full border border-emerald-500/30" />
              <div className="absolute h-72 w-72 rounded-full border border-emerald-500/20" />
              <div className="absolute h-full w-[1px] bg-emerald-500/30" />
              <div className="absolute w-full h-[1px] bg-emerald-500/30" />
            </div>

            {/* Simulated Geographical Outline / Map Points */}
            <div className="absolute inset-0 p-4">
              {cityList.map((city) => {
                const coords = cityCoordinates[city.city] || { x: 50, y: 50 };
                const isSelected = selectedCity.city === city.city;
                const isCritical = city.riskStatus === 'Critical';

                return (
                  <div
                    key={city.city}
                    onClick={() => setSelectedCity(city)}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                        isCritical ? 'bg-rose-500' : 'bg-amber-400'
                      }`}
                    />
                    {/* Node Dot */}
                    <div
                      className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-125 ${
                        isSelected
                          ? 'border-white bg-emerald-500 text-slate-950 scale-125 shadow-lg shadow-emerald-500/50'
                          : isCritical
                          ? 'border-rose-300 bg-rose-600 text-white'
                          : 'border-amber-300 bg-amber-500 text-slate-950'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5 fill-current" />
                    </div>

                    {/* City Label Tag */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-bold font-mono transition-opacity ${
                        isSelected
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 opacity-100'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-700 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {city.city} ({city.activeScamsDetected})
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500">
              Interactive Radar Coordinates • Click any hotspot
            </div>
          </div>
        </div>

        {/* Cities Grid and Detail Card */}
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Cities List */}
          <div className="space-y-2 lg:col-span-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1 flex items-center justify-between">
              <span>Threat Hotspots ({filteredCities.length})</span>
              <span className="text-[10px] text-slate-500">Tier 2/3 Focus</span>
            </div>
            {filteredCities.map((city) => (
              <button
                key={city.city}
                onClick={() => setSelectedCity(city)}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                  selectedCity.city === city.city
                    ? 'border-emerald-500 bg-[#0f1e2c] text-white shadow-sm ring-1 ring-emerald-500/30'
                    : 'border-slate-800/80 bg-[#0a121b] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`h-4 w-4 shrink-0 ${selectedCity.city === city.city ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="text-sm font-bold text-white">{city.city}</div>
                    <div className="text-[11px] text-slate-400">{city.state} · {city.tier}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono-numbers text-xs font-bold text-rose-400">
                    {city.activeScamsDetected} flagged
                  </div>
                  <div className={`text-[10px] font-semibold ${city.riskStatus === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {city.riskStatus}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active City Threat Spotlight */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#0d1723] p-6 lg:col-span-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="h-5 w-5 text-rose-400" />
                  <h3 className="text-lg font-bold text-white">
                    {selectedCity.city} ({selectedCity.state}) Threat Profile
                  </h3>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                  selectedCity.riskStatus === 'Critical' 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}>
                  {selectedCity.riskStatus} Alert
                </span>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <div className="text-slate-400 uppercase font-semibold text-[11px]">
                    Most Prevalent Fraud Pattern Detected:
                  </div>
                  <div className="mt-1 text-sm font-semibold text-rose-300 leading-relaxed bg-[#111c2a] p-3 rounded-xl border border-rose-900/30">
                    &ldquo;{selectedCity.commonPattern}&rdquo;
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-800 bg-[#070e16] p-4 font-mono-numbers">
                  <div>
                    <div className="text-slate-400 text-[11px]">Active Incident Reports</div>
                    <div className="text-xl font-bold text-white">{selectedCity.activeScamsDetected} cases</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[11px]">Immune Block Triggered</div>
                    <div className="text-xl font-bold text-emerald-400">&gt; 10 reports threshold met</div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-slate-300">
                  <div className="font-semibold text-emerald-300 text-xs">
                    Local Language Nuance Protection:
                  </div>
                  <p className="mt-1 text-xs leading-relaxed">
                    Scammers in this region heavily utilize localized audio messages and Hindi/regional slang. NYAYA&apos;s Indic-BERT model flags regional colloquialisms like &apos;tijori&apos; and &apos;waris&apos; misappropriation to prevent impersonation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-700/60 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>Automatic data hashing • Auto-purged in 24 hours</span>
              <ShareThreatAlertButton
                buttonLabel={`Share ${selectedCity.city} Alert`}
                variant="secondary"
                payload={{
                  title: `${selectedCity.city} (${selectedCity.state}) Fraud Radar Warning`,
                  threatLevel: selectedCity.riskStatus,
                  summary: `Active Fraud Pattern: "${selectedCity.commonPattern}" — ${selectedCity.activeScamsDetected} cases flagged across ${selectedCity.tier} hub.`,
                  reasons: [
                    `Active Incident Reports: ${selectedCity.activeScamsDetected} verified reports in ${selectedCity.city}`,
                    `Primary Scam Vector: ${selectedCity.commonPattern}`,
                    'Community Immune Block threshold (>10 reports) triggered on NYAYA Radar',
                  ],
                  locationOrChannel: `${selectedCity.city}, ${selectedCity.state} (${selectedCity.tier})`,
                  regulatoryRef: 'SEBI & National Cyber Crime Reporting Portal (1930)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Community Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0e1724] p-6 shadow-2xl">
              <button
                onClick={() => setShowReportModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4" />
                <span>Community Fraud Radar Submission</span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-white">
                Report a Threat in Your City
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Help protect 41Cr Indian families. Once 10 verified reports are logged, our network issues an automatic warning.
              </p>

              {reportSuccess ? (
                <div className="mt-6 flex flex-col items-center justify-center p-6 text-center rounded-xl bg-emerald-950/40 border border-emerald-800">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-bounce" />
                  <div className="mt-2 text-sm font-bold text-white">Report Registered Successfully!</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Added to Bharat Threat Radar for {newReport.city}. Threat counter incremented.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="mt-5 space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Select City:</label>
                    <select
                      value={newReport.city}
                      onChange={(e) => setNewReport({ ...newReport, city: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-[#070e15] px-3.5 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {cityList.map((c) => (
                        <option key={c.city} value={c.city}>
                          {c.city} ({c.state} - {c.tier})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Scam Vector / Pattern:</label>
                    <select
                      value={newReport.scamPattern}
                      onChange={(e) => setNewReport({ ...newReport, scamPattern: e.target.value })}
                      className="w-full rounded-xl border border-slate-700 bg-[#070e15] px-3.5 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Telegram Pump & Dump VIP Channel">Telegram Pump &amp; Dump VIP Channel</option>
                      <option value="Fake Demat Stamp Duty Allotment">Fake Demat Stamp Duty Allotment</option>
                      <option value="Demat OTP Dividend Link Phishing">Demat OTP Dividend Link Phishing</option>
                      <option value="Counterfeit Broker Trading APK">Counterfeit Broker Trading APK</option>
                      <option value="AI Voice Clone Impersonating Relative">AI Voice Clone Impersonating Relative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Suspect Phone / Telegram / URL:</label>
                    <input
                      type="text"
                      required
                      value={newReport.suspectContact}
                      onChange={(e) => setNewReport({ ...newReport, suspectContact: e.target.value })}
                      placeholder="e.g. +91 9845X XXXXX or @ScamVIPChannel"
                      className="w-full rounded-xl border border-slate-700 bg-[#070e15] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                    >
                      Submit Threat Alert
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
