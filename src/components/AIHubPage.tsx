import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Search,
  Mic,
  MicOff,
  Square,
  Sparkles,
  Globe,
  Send,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { GeminiChatbot } from './GeminiChatbot';
import { SearchGroundingTool } from './SearchGroundingTool';
import { AudioTranscribeTool } from './AudioTranscribeTool';
import { LanguageCode } from '../types';
import { getStrings, getSpeechLocale } from '../utils/i18n';

interface AIHubPageProps {
  currentLanguage?: LanguageCode;
  onSendToSimulator?: (transcription: string) => void;
}

const SPEECH_LANGUAGES = [
  { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
  { code: 'en-IN', label: 'English / Hinglish (India)' },
  { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
  { code: 'mr-IN', label: 'मराठी (Marathi)' },
  { code: 'bn-IN', label: 'বাংলা (Bengali)' },
  { code: 'te-IN', label: 'తెలుగు (Telugu)' },
  { code: 'gu-IN', label: 'ગુજરાતી (Gujarati)' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'pa-IN', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'ml-IN', label: 'മലയാളം (Malayalam)' },
];

export const AIHubPage: React.FC<AIHubPageProps> = ({
  currentLanguage = 'hi',
  onSendToSimulator,
}) => {
  const s = getStrings(currentLanguage);
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'transcribe'>('chat');

  // Web Speech API Voice-to-Text Dictation state
  const [speechLang, setSpeechLang] = useState<string>(() => getSpeechLocale(currentLanguage));

  useEffect(() => {
    setSpeechLang(getSpeechLocale(currentLanguage));
  }, [currentLanguage]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [dictationSeconds, setDictationSeconds] = useState<number>(0);
  const [finalTranscript, setFinalTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);

  // Bridged state for child tools
  const [chatDictationPayload, setChatDictationPayload] = useState<string | undefined>(undefined);
  const [searchQueryPayload, setSearchQueryPayload] = useState<string | undefined>(undefined);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const isWebSpeechSupported =
    typeof window !== 'undefined' &&
    Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startVoiceDictation = () => {
    setSpeechError(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        'Web Speech API is not supported in this browser. Try Chrome/Edge or use one of the voice dictation presets below.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
        setDictationSeconds(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setDictationSeconds((prev) => prev + 1);
        }, 1000);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let newlyFinalized = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const segment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newlyFinalized += segment + ' ';
          } else {
            interim += segment;
          }
        }

        if (newlyFinalized) {
          setFinalTranscript((prev) => (prev ? `${prev.trim()} ${newlyFinalized.trim()}` : newlyFinalized.trim()));
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone access was denied. Please allow microphone permissions or use a sample voice dictation below.');
        } else if (event.error !== 'aborted') {
          setSpeechError(`Speech recognition notice: ${event.error}`);
        }
        stopVoiceDictation();
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setSpeechError(err?.message || 'Unable to start Web Speech API recorder.');
      setIsListening(false);
    }
  };

  const stopVoiceDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setInterimTranscript('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const combinedTranscript = `${finalTranscript}${interimTranscript ? (finalTranscript ? ' ' : '') + interimTranscript : ''}`.trim();

  const handleAskChatbot = () => {
    if (!combinedTranscript) return;
    if (isListening) stopVoiceDictation();
    setActiveTab('chat');
    // Append timestamp token avoidance by setting clean text
    setChatDictationPayload(combinedTranscript);
  };

  const handleVerifyWithSearch = () => {
    if (!combinedTranscript) return;
    if (isListening) stopVoiceDictation();
    setActiveTab('search');
    setSearchQueryPayload(combinedTranscript);
  };

  const handleSendToLens = () => {
    if (!combinedTranscript || !onSendToSimulator) return;
    if (isListening) stopVoiceDictation();
    onSendToSimulator(combinedTranscript);
  };

  const handleCopyDictation = async () => {
    if (!combinedTranscript) return;
    try {
      await navigator.clipboard.writeText(combinedTranscript);
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 2000);
    } catch {
      // ignore
    }
  };

  const sampleVoiceDictations = [
    {
      label: '🎙️ Hindi: Telegram VIP 300% Profit Trap',
      lang: 'hi-IN',
      text: 'मुझे व्हाट्सऐप पर एक मैसेज आया है कि टेलीग्राम वीआईपी ग्रुप जॉइन करने पर 5 दिन में 300% पक्का मुनाफा मिलेगा और वो 5000 रुपये रजिस्ट्रेशन फीस मांग रहे हैं। क्या यह असली है?',
    },
    {
      label: '🎙️ Hinglish: Fake NSDL Stamp Duty Call',
      lang: 'en-IN',
      text: 'Mere pita ji ko ek PDF aaya hai jisme likha hai NSDL bonus shares mile hain aur 12500 rupaye stamp duty UPI se abhi bhejni hogi warna demat account freeze ho jayega.',
    },
    {
      label: '🎙️ English: Digital Arrest & RBI Escrow Extortion',
      lang: 'en-IN',
      text: 'Someone claiming to be from Cyber Crime Police called on WhatsApp video saying my Aadhaar was used in money laundering and demanded I transfer my savings to a temporary RBI verification account.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080e14] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Gemini Intelligence Suite • Voice-First Bhasha Dictation</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl tracking-tight text-balance">
            {s.aiHubTitle}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {s.aiHubSub}
          </p>
        </div>

        {/* Web Speech API Voice-to-Text Scam Experience Recorder Card */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-emerald-500/35 bg-gradient-to-b from-[#0d1a27] to-[#0a131d] p-5 sm:p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isListening
                    ? 'bg-rose-500/20 text-rose-400 ring-2 ring-rose-500/50 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40'
                }`}
              >
                {isListening ? <Volume2 className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    Bolo NYAYA — Live Voice-to-Text Scam Dictation
                  </h2>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300">
                    Web Speech API
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Speak naturally about any suspicious call, message, or investment pitch instead of typing
                </p>
              </div>
            </div>

            {/* Language Selector & Record Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-[#070e15] px-3 py-1.5 text-xs text-slate-200">
                <Globe className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <select
                  value={speechLang}
                  onChange={(e) => {
                    setSpeechLang(e.target.value);
                    if (isListening) {
                      stopVoiceDictation();
                    }
                  }}
                  aria-label="Select Dictation Language"
                  className="bg-transparent text-xs font-medium text-white focus:outline-none"
                >
                  {SPEECH_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#0c1622] text-white">
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {!isListening ? (
                <button
                  type="button"
                  onClick={startVoiceDictation}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95"
                >
                  <Mic className="h-4 w-4" />
                  <span>Start Voice Dictation</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopVoiceDictation}
                  className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 animate-pulse hover:bg-rose-500 transition-all"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                  <span>Stop Recording ({dictationSeconds}s)</span>
                </button>
              )}
            </div>
          </div>

          {/* Live Dictation Textarea & Interim Preview */}
          <div className="mt-4">
            <div className="relative">
              <textarea
                rows={3}
                value={combinedTranscript}
                onChange={(e) => {
                  setFinalTranscript(e.target.value);
                  setInterimTranscript('');
                }}
                placeholder={
                  isListening
                    ? 'Listening to your voice... Speak now in your chosen language...'
                    : 'Tap "Start Voice Dictation" to speak your scam experience, or select a sample voice dictation below...'
                }
                className={`w-full rounded-xl border p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors leading-relaxed ${
                  isListening
                    ? 'border-rose-500/70 bg-rose-950/15 ring-1 ring-rose-500/30'
                    : 'border-slate-700/80 bg-[#070d14] focus:border-emerald-500'
                }`}
              />

              {isListening && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-rose-300">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
                  <span>Listening ({SPEECH_LANGUAGES.find((l) => l.code === speechLang)?.label.split(' ')[0]})</span>
                </div>
              )}
            </div>

            {/* Quick Voice Dictation Presets */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400 mr-1">Try sample voice dictation:</span>
              {sampleVoiceDictations.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSpeechLang(preset.lang);
                    setFinalTranscript(preset.text);
                    setInterimTranscript('');
                    setSpeechError(null);
                  }}
                  className="rounded-lg border border-slate-800 bg-[#080f18] px-2.5 py-1 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:text-white transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {speechError && (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-950/25 p-2.5 text-xs text-amber-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{speechError}</span>
              </div>
            )}

            {!isWebSpeechSupported && !speechError && (
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <MicOff className="h-3.5 w-3.5 text-slate-500" />
                <span>Browser native speech recognition unavailable — use the sample dictation buttons or the Gemini Audio File Transcriber tab.</span>
              </div>
            )}

            {/* Action Bar for Dictated Text */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={!combinedTranscript}
                  onClick={handleAskChatbot}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-40 transition-colors"
                >
                  <Bot className="h-3.5 w-3.5" />
                  <span>Ask NYAYA Sathi AI</span>
                </button>

                <button
                  type="button"
                  disabled={!combinedTranscript}
                  onClick={handleVerifyWithSearch}
                  className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/25 disabled:opacity-40 transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Verify via Google Search</span>
                </button>

                {onSendToSimulator && (
                  <button
                    type="button"
                    disabled={!combinedTranscript}
                    onClick={handleSendToLens}
                    className="flex items-center gap-1.5 rounded-xl border border-purple-500/40 bg-purple-500/15 px-3.5 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/25 disabled:opacity-40 transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Scan in WhatsApp Lens</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!combinedTranscript}
                  onClick={handleCopyDictation}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
                >
                  {copiedTranscript ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={!combinedTranscript}
                  onClick={() => {
                    setFinalTranscript('');
                    setInterimTranscript('');
                  }}
                  className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-400 hover:text-rose-400 disabled:opacity-40"
                  title="Clear dictated text"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap justify-center rounded-2xl bg-[#0c1622] p-1.5 border border-slate-700 shadow-xl gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>NYAYA Sathi AI Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Google Search Grounding</span>
            </button>

            <button
              onClick={() => setActiveTab('transcribe')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'transcribe'
                  ? 'bg-purple-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Mic className="h-4 w-4" />
              <span>Audio File Transcribe</span>
            </button>
          </div>
        </div>

        {/* Content based on Active Tab */}
        <div className="mt-8">
          {activeTab === 'chat' && <GeminiChatbot incomingDictation={chatDictationPayload} />}
          {activeTab === 'search' && <SearchGroundingTool incomingQuery={searchQueryPayload} />}
          {activeTab === 'transcribe' && (
            <AudioTranscribeTool onSendToSimulator={onSendToSimulator} />
          )}
        </div>
      </div>
    </div>
  );
};
