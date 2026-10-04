import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Play,
  Square,
  Volume2,
  Share2,
  FileText,
  Send,
  Sparkles,
  CheckCheck,
  UserCheck,
  RefreshCw,
  Mic,
  Paperclip,
  Image as ImageIcon,
  Copy,
  Check
} from 'lucide-react';
import { SCAM_SAMPLES } from '../data/mockData';
import { LanguageCode, ScamSample } from '../types';
import { getStrings, getSpeechLocale } from '../utils/i18n';
import { RiskScoreGauge } from './RiskScoreGauge';
import { ShareThreatAlertButton } from './ShareThreatAlertButton';

interface WhatsAppSimulatorProps {
  currentLanguage: LanguageCode;
  onDraftScores: (sampleData?: Partial<ScamSample>) => void;
  externalSelectedSampleId?: string;
  incomingCustomText?: string;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  currentLanguage,
  onDraftScores,
  externalSelectedSampleId,
  incomingCustomText,
}) => {
  const [selectedSample, setSelectedSample] = useState<ScamSample>(SCAM_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeAnalysis, setActiveAnalysis] = useState<ScamSample>(SCAM_SAMPLES[0]);
  const [familyAlertSent, setFamilyAlertSent] = useState<boolean>(false);
  const [isRecordingMic, setIsRecordingMic] = useState<boolean>(false);
  const [copiedTrustCard, setCopiedTrustCard] = useState<boolean>(false);
  const speechRecognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync with incoming custom text (e.g. from Audio Transcribe Tool)
  useEffect(() => {
    if (incomingCustomText) {
      setCustomInput(incomingCustomText);
      triggerCustomScan(incomingCustomText);
    }
  }, [incomingCustomText]);

  // Sync with external selection (e.g. from Header Scam Ticker)
  useEffect(() => {
    if (externalSelectedSampleId) {
      const target = SCAM_SAMPLES.find((s) => s.id === externalSelectedSampleId);
      if (target) {
        handleSelectSample(target);
      }
    }
  }, [externalSelectedSampleId]);

  // Stop audio and speech recognition on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  const handleToggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback: scroll to Audio Transcribe Tool
      const el = document.getElementById('transcribe-tool');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (isRecordingMic) {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
      setIsRecordingMic(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getSpeechLocale(currentLanguage);

      recognition.onstart = () => {
        setIsRecordingMic(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setCustomInput(transcript);
      };

      recognition.onerror = () => {
        setIsRecordingMic(false);
      };

      recognition.onend = () => {
        setIsRecordingMic(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecordingMic(false);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fakeOcrText = `[OCR Scanned Document: ${file.name}]\n"OFFICIAL DIVIDEND ALLOTMENT NOTIFICATION: Your Demat Account has been credited with 200 special bonus shares. Send security verification fee of ₹7,500 to clearing UPI link to unfreeze trading."`;
    setCustomInput(fakeOcrText);
    triggerCustomScan(fakeOcrText);
  };

  const handleSelectSample = (sample: ScamSample) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setFamilyAlertSent(false);
    setSelectedSample(sample);
    setIsScanning(true);

    setTimeout(() => {
      setActiveAnalysis(sample);
      setIsScanning(false);
    }, 1200);
  };

  const triggerCustomScan = async (rawText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setFamilyAlertSent(false);
    setIsScanning(true);

    try {
      const res = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: rawText, language: currentLanguage }),
      });

      if (res.ok) {
        const data = await res.json();
        const liveAnalysis: ScamSample = {
          id: 'custom-' + Date.now(),
          title: 'Live Neural Scam Scan',
          sender: 'Your Forward',
          senderRole: 'Investor Query',
          forwardTag: 'Forwarded message',
          type: 'message',
          content: rawText,
          riskLevel: data.riskLevel || (data.riskScore >= 70 ? 'RED' : data.riskScore >= 30 ? 'YELLOW' : 'GREEN'),
          riskScore: typeof data.riskScore === 'number' ? data.riskScore : 88,
          deepfakeScore: data.deepfakeScore || undefined,
          reasons: Array.isArray(data.reasons) && data.reasons.length > 0
            ? data.reasons
            : ['Pattern matches high-risk unsolicited investment funnel.', 'Guaranteed return violation under SEBI guidelines.'],
          sebiReference: data.sebiReference || 'SEBI (Prohibition of Fraudulent and Unfair Trade Practices) Regulations, 2003',
          dadiAdvice: {
            [currentLanguage]: data.dadiAdvice || 'ये बहुत जोखिम भरा लग रहा है बेटा! बिना जांचे पैसे मत भेजो।'
          }
        };

        setActiveAnalysis(liveAnalysis);
        setIsScanning(false);
        return;
      }
    } catch (err) {
      console.warn('Live API scan fallback to heuristics:', err);
    }

    // Heuristic Fallback
    const inputLower = rawText.toLowerCase();
    const isHighRisk =
      inputLower.includes('guarantee') ||
      inputLower.includes('double') ||
      inputLower.includes('300%') ||
      inputLower.includes('nsdi') ||
      inputLower.includes('bonus') ||
      inputLower.includes('otp') ||
      inputLower.includes('telegram') ||
      inputLower.includes('vip') ||
      inputLower.includes('profit') ||
      inputLower.includes('free');

    const generatedAnalysis: ScamSample = {
      id: 'custom-' + Date.now(),
      title: 'Custom Scanned Submission',
      sender: 'Your Forward',
      senderRole: 'Investor Query',
      forwardTag: 'Forwarded message',
      type: 'message',
      content: rawText,
      riskLevel: isHighRisk ? 'RED' : 'YELLOW',
      riskScore: isHighRisk ? 91 : 45,
      deepfakeScore: inputLower.includes('reel') || inputLower.includes('video') ? 82 : undefined,
      reasons: isHighRisk
        ? [
            'Prohibited Return Promise: Claims of guaranteed profit or quick doubling violate SEBI Prohibition of Fraudulent and Unfair Trade Practices Regulations.',
            'Unverified Payment Funnel: Direct requests for funds via unofficial channels without SEBI Registration Number.',
            'Urgency Heuristic: Artificial scarcity designed to bypass rational financial due diligence.'
          ]
        : [
            'Advisory Caution: Sender is not on the SEBI RIA (Registered Investment Adviser) public registry.',
            'Unsolicited Stock Promotion: Verify with official exchange filings on NSE/BSE before placing trades.'
          ],
      sebiReference: 'SEBI (Prohibition of Fraudulent and Unfair Trade Practices) Regulations, 2003',
      dadiAdvice: {
        hi: isHighRisk
          ? 'ये बहुत जोखिम भरा लग रहा है बेटा! किसी भी अनजान व्यक्ति के कहने पर अपने पैसे मत लगाओ। सेबी के नियम कहते हैं कि मुनाफे की कोई गारंटी नहीं होती।'
          : 'बेटा, इस सलाह को ध्यान से जांच लो। बिना सेबी रजिस्ट्रेशन वाले किसी भी सलाहकार पर भरोसा मत करो।'
      }
    };

    setTimeout(() => {
      setActiveAnalysis(generatedAnalysis);
      setIsScanning(false);
    }, 1200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    triggerCustomScan(customInput);
  };

  const playDadiAudio = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    const adviceText =
      activeAnalysis.dadiAdvice[currentLanguage] ||
      activeAnalysis.dadiAdvice.hi ||
      activeAnalysis.dadiAdvice.en ||
      'Ye sandesh sandigdh hai, ispar vishwas mat kijiye.';

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(adviceText);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      // Try finding an Indic voice
      const voices = window.speechSynthesis.getVoices();
      const indicVoice = voices.find(
        (v) =>
          v.lang.startsWith(currentLanguage) ||
          v.lang.includes('hi') ||
          v.name.includes('India')
      );
      if (indicVoice) {
        utterance.voice = indicVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    } else {
      // Fallback state simulation
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  const handleSendFamilyAlert = () => {
    setFamilyAlertSent(true);
  };

  const adviceSnippet =
    activeAnalysis.dadiAdvice[currentLanguage] ||
    activeAnalysis.dadiAdvice.hi ||
    activeAnalysis.dadiAdvice.en ||
    '';

  const s = getStrings(currentLanguage);

  return (
    <section id="simulator" className="border-t border-slate-800 bg-[#09111a] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Interactive Product Demo • Slide 5 & 11
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.simulatorTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.simulatorSub}
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {SCAM_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                selectedSample.id === sample.id
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-sm'
                  : 'border-slate-800 bg-[#0c1622] text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {sample.riskLevel === 'RED' ? (
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                )}
                {sample.title}
              </span>
            </button>
          ))}
        </div>

        {/* The WhatsApp Phone Interface Mockup */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0b141f] shadow-2xl">
            {/* WhatsApp App Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-700/80 bg-[#121f2d] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                    N
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#121f2d] bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">NYAYA Suraksha Bot</span>
                    <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-800/40">
                      Verified Saathi
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Neural Scan v3.2</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">Response &lt;2.8s</span>
                    <span aria-hidden="true">·</span>
                    <span>No OTP Stored</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono-numbers">WhatsApp Cloud API</span>
              </div>
            </div>

            {/* Chat Body Canvas */}
            <div className="space-y-4 p-4 sm:p-6 bg-[#070d13]/70 min-h-[460px]">
              {/* User Forwarded Message */}
              <div className="flex justify-end">
                <div className="max-w-xl rounded-2xl rounded-tr-sm bg-[#1b3a2b] p-4 text-slate-100 shadow-md">
                  <div className="flex items-center justify-between gap-4 border-b border-emerald-700/40 pb-1.5 text-[11px] text-emerald-300">
                    <span className="italic flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      {activeAnalysis.forwardTag}
                    </span>
                    <span className="font-mono-numbers">22:14</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {activeAnalysis.content}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-300/80">
                    <span>22:14</span>
                    <CheckCheck className="h-3.5 w-3.5 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Bot Response or Scanning Skeleton */}
              {isScanning ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-[#121e2c] p-4 text-slate-300 shadow">
                    <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                    <div className="text-xs">
                      <span className="font-semibold text-white">Neural Scan v3.2 active...</span>
                      <span className="ml-2 text-slate-400">
                        Checking typosquatting, SEBI circular blacklist & voice spectrogram
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-slate-700/70 bg-[#101b27] p-4 sm:p-5 text-slate-100 shadow-xl">
                    {/* Bot Header & Risk Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <div className="flex items-center gap-2">
                        {activeAnalysis.riskLevel === 'RED' ? (
                          <div className="flex items-center gap-1.5 rounded-md bg-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-400 border border-rose-500/40">
                            <ShieldAlert className="h-4 w-4" />
                            <span>RED // HIGH RISK DETECTED</span>
                          </div>
                        ) : activeAnalysis.riskLevel === 'YELLOW' ? (
                          <div className="flex items-center gap-1.5 rounded-md bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-400 border border-amber-500/40">
                            <AlertTriangle className="h-4 w-4" />
                            <span>YELLOW // SUSPICIOUS REVIEW REQUIRED</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/40">
                            <ShieldCheck className="h-4 w-4" />
                            <span>GREEN // VERIFIED OFFICIAL SOURCE</span>
                          </div>
                        )}
                        <span className="font-mono-numbers text-xs text-slate-400">
                          Threat Score: {activeAnalysis.riskScore}/100
                        </span>
                      </div>

                      {activeAnalysis.deepfakeScore && (
                        <div className="text-xs font-semibold text-rose-300">
                          AI Deepfake Audio: {activeAnalysis.deepfakeScore}%
                        </div>
                      )}
                    </div>

                    {/* D3 Gauge Risk Score Visualization */}
                    <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-700/70 bg-[#0c1622] p-3.5">
                      <div className="shrink-0">
                        <RiskScoreGauge
                          score={activeAnalysis.riskScore}
                          riskLevel={activeAnalysis.riskLevel}
                          size={150}
                        />
                      </div>
                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <div className="text-xs font-bold text-white uppercase tracking-wide">
                          Neural Scan Risk Assessment
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {activeAnalysis.riskScore >= 70
                            ? 'High-confidence fraud heuristics detected. Pattern matches known financial scam templates with aggressive urgency.'
                            : activeAnalysis.riskScore >= 30
                            ? 'Unverified advisory source with elevated scrutiny. Requires cross-referencing with SEBI registered advisors.'
                            : 'Authentic regulatory communication. Zero solicitation of credentials, funds, or OTPs.'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>0-30 Safe</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                            <span>30-70 Suspicious</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            <span>70-100 High Risk</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dadi Voice Note Audio Player */}
                    <div className="mt-3 rounded-xl border border-slate-700 bg-[#162332] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={playDadiAudio}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 ${
                              isPlayingAudio
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                            }`}
                            title="Play Dadi Voice"
                          >
                            {isPlayingAudio ? (
                              <Square className="h-4 w-4 fill-current" />
                            ) : (
                              <Play className="h-4 w-4 fill-current ml-0.5" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-white">
                              <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                              <span>{isPlayingAudio ? s.dadiVoiceStop : s.dadiVoicePlay} (20kb Opus)</span>
                              {isPlayingAudio && (
                                <span className="animate-pulse text-[11px] text-amber-400">
                                  ● Speaking...
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-300 italic">
                              &ldquo;{adviceSnippet}&rdquo;
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 Explicit Reasons (Explainability requirement) */}
                    <div className="mt-4">
                      <div className="text-xs font-bold tracking-wide text-slate-300 uppercase">
                        Why this was flagged (3 Plain Reasons):
                      </div>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                        {activeAnalysis.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono text-emerald-400 font-bold shrink-0">
                              0{idx + 1}.
                            </span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* SEBI Circular Source Link */}
                    <div className="mt-3 rounded-lg bg-[#0e1722] p-2.5 text-[11px] text-slate-400 border border-slate-800">
                      <span className="font-semibold text-slate-300">Regulatory Source: </span>
                      <span>{activeAnalysis.sebiReference}</span>
                    </div>

                    {/* Action buttons matching Slide 5 & 8 */}
                    <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-700/60">
                      <button
                        onClick={handleSendFamilyAlert}
                        disabled={familyAlertSent}
                        className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                          familyAlertSent
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : 'bg-rose-600/90 text-white hover:bg-rose-500'
                        }`}
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                        <span>
                          {familyAlertSent
                            ? '✓ Family Alert Dispatched to Son/Daughter'
                            : s.alertFamily}
                        </span>
                      </button>

                      <button
                        onClick={() => onDraftScores(activeAnalysis)}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{s.fileGrievance}</span>
                      </button>

                      <ShareThreatAlertButton
                        buttonLabel="Share Scam Finding"
                        variant="secondary"
                        payload={{
                          title: activeAnalysis.title,
                          threatLevel: activeAnalysis.riskLevel,
                          riskScore: activeAnalysis.riskScore,
                          summary: activeAnalysis.content,
                          reasons: activeAnalysis.reasons,
                          dadiAdvice:
                            activeAnalysis.dadiAdvice[currentLanguage] ||
                            activeAnalysis.dadiAdvice.hi ||
                            activeAnalysis.dadiAdvice.en,
                          regulatoryRef: activeAnalysis.sebiReference,
                          locationOrChannel: activeAnalysis.sender,
                        }}
                      />

                      <button
                        onClick={() => {
                          const trustCardText = `🛡️ [NYAYA SURAKSHA TRUST CARD]\nThreat Level: ${activeAnalysis.riskLevel} (${activeAnalysis.riskScore}/100)\nContent: "${activeAnalysis.content}"\nReasons: ${activeAnalysis.reasons.join(' | ')}\nSEBI Reference: ${activeAnalysis.sebiReference}\nDadi Advice: ${activeAnalysis.dadiAdvice[currentLanguage] || activeAnalysis.dadiAdvice.hi}\nVerified on: NYAYA Bharat Engine`;
                          navigator.clipboard.writeText(trustCardText);
                          setCopiedTrustCard(true);
                          setTimeout(() => setCopiedTrustCard(false), 2000);
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        title="Copy Trust Card text"
                      >
                        {copiedTrustCard ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Card Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-slate-400" />
                            <span>Copy Trust Card</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Family Alert Simulation Note */}
                    {familyAlertSent && (
                      <div className="mt-2.5 rounded-md bg-emerald-950/60 p-2 text-[11px] text-emerald-300 border border-emerald-800/40">
                        📱 WhatsApp message sent to Son (Aakash): &quot;Papa ne ek suspicious investment link forward kiya hai. Transaction alert triggered. Verified on SEBI database.&quot;
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Input Bar */}
            <form
              onSubmit={handleCustomSubmit}
              className="border-t border-slate-700/80 bg-[#101b27] p-3 flex items-center gap-2"
            >
              {/* Hidden file input for screenshot / PDF upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleScreenshotUpload}
                accept="image/*,.pdf"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                title="Attach Screenshot / PDF Letterhead for Neural OCR Scan"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={isRecordingMic ? "Listening to your voice..." : "Paste any link, WhatsApp forward text, or finfluencer claim to scan..."}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  isRecordingMic
                    ? 'border-rose-500 bg-rose-950/30'
                    : 'border-slate-700 bg-[#080e14] focus:border-emerald-500'
                }`}
              />

              <button
                type="button"
                onClick={handleToggleMic}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                  isRecordingMic
                    ? 'border-rose-500 bg-rose-600 text-white animate-pulse'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
                }`}
                title={isRecordingMic ? "Stop Recording" : "Speak Voice Note to Scan (Hindi/English/Vernacular)"}
              >
                <Mic className="h-4 w-4" />
              </button>

              <button
                type="submit"
                disabled={isScanning || !customInput.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
                title="Send to Neural Scan"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
