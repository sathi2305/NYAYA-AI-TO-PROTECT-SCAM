import React, { useState } from 'react';
import {
  Share2,
  Check,
  Copy,
  MessageCircle,
  Send,
  Mail,
  Smartphone,
  X,
  ShieldAlert,
} from 'lucide-react';

export interface ThreatSharePayload {
  title: string;
  threatLevel: 'RED' | 'YELLOW' | 'GREEN' | 'Critical' | 'Elevated' | 'Monitoring';
  riskScore?: number;
  summary: string;
  reasons?: string[];
  dadiAdvice?: string;
  regulatoryRef?: string;
  locationOrChannel?: string;
  url?: string;
}

interface ShareThreatAlertButtonProps {
  payload: ThreatSharePayload;
  buttonLabel?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

export const ShareThreatAlertButton: React.FC<ShareThreatAlertButtonProps> = ({
  payload,
  buttonLabel = 'Share Threat Alert',
  variant = 'primary',
  className = '',
}) => {
  const [sharedSuccess, setSharedSuccess] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    payload.url || (typeof window !== 'undefined' ? window.location.origin : 'https://nyaya.ai');

  const formatShareText = () => {
    const badge =
      payload.threatLevel === 'RED' || payload.threatLevel === 'Critical'
        ? '🚨 HIGH-RISK SCAM ALERT'
        : payload.threatLevel === 'YELLOW' || payload.threatLevel === 'Elevated'
        ? '⚠️ SUSPICIOUS FINANCIAL ALERT'
        : '✅ VERIFIED SAFE NOTICE';

    const scorePart =
      typeof payload.riskScore === 'number' ? ` (Risk Score: ${payload.riskScore}/100)` : '';
    const locPart = payload.locationOrChannel ? `\n📍 Source/Region: ${payload.locationOrChannel}` : '';
    const reasonsPart =
      payload.reasons && payload.reasons.length > 0
        ? `\n\n🔍 Key Red Flags:\n${payload.reasons.slice(0, 3).map((r, i) => `${i + 1}. ${r}`).join('\n')}`
        : '';
    const dadiPart = payload.dadiAdvice ? `\n\n👵 Dadi Caution: "${payload.dadiAdvice}"` : '';
    const regPart = payload.regulatoryRef ? `\n⚖️ Reference: ${payload.regulatoryRef}` : '';

    return `${badge}${scorePart}\n${payload.title}${locPart}\n\n"${payload.summary}"${reasonsPart}${dadiPart}${regPart}\n\n📞 Cyber Helpline: 1930 | Verified by NYAYA Suraksha Kavach`;
  };

  const formattedMessage = formatShareText();

  const handleWebShare = async () => {
    const shareData: ShareData = {
      title: `NYAYA Alert: ${payload.title}`,
      text: formattedMessage,
      url: shareUrl,
    };

    // Use Web Share API if supported by the browser
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        const canShareData =
          typeof navigator.canShare === 'function' ? navigator.canShare(shareData) : true;
        if (canShareData) {
          await navigator.share(shareData);
          setSharedSuccess(true);
          setTimeout(() => setSharedSuccess(false), 2500);
          return;
        }
      } catch (err: any) {
        // User cancelled share sheet — do not open fallback modal
        if (err?.name === 'AbortError') {
          return;
        }
        // If blocked by iframe permissions or desktop browser limitation, open direct messaging menu
      }
    }

    setShowShareMenu(true);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(`${formattedMessage}\n${shareUrl}`);
      setCopied(true);
      setSharedSuccess(true);
      setTimeout(() => {
        setCopied(false);
        setSharedSuccess(false);
      }, 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  const encodedFullText = encodeURIComponent(`${formattedMessage}\n\n${shareUrl}`);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTextOnly = encodeURIComponent(formattedMessage);
  const encodedSubject = encodeURIComponent(`🚨 NYAYA Scam Alert: ${payload.title}`);

  const baseStyles =
    variant === 'compact'
      ? 'flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/25 hover:text-white transition-colors'
      : variant === 'secondary'
      ? 'flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-colors'
      : 'flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm shadow-emerald-950';

  return (
    <>
      <div className={`inline-flex items-center gap-1 ${className}`}>
        <button
          type="button"
          onClick={handleWebShare}
          className={baseStyles}
          title="Share threat alert via Web Share API or messaging apps"
        >
          {sharedSuccess ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Shared!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>{buttonLabel}</span>
            </>
          )}
        </button>

        {variant !== 'compact' && (
          <button
            type="button"
            onClick={() => setShowShareMenu(true)}
            className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/90 px-2 py-2 text-xs text-slate-300 hover:border-emerald-500/50 hover:text-white transition-colors"
            title="Choose messaging platform (WhatsApp, Telegram, SMS, Email)"
            aria-label="Open messaging platform options"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
          </button>
        )}
      </div>

      {/* Direct Messaging Platforms Modal / Fallback Sheet */}
      {showShareMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0c1622] p-5 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Share Threat Alert to Messaging Apps
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Protect family &amp; community groups with verified SEBI findings
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowShareMenu(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Preview of formatted alert */}
            <div className="mt-3.5 rounded-xl border border-slate-800 bg-[#070d14] p-3 text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed">
              {formattedMessage}
            </div>

            {/* Direct Platform Deep Links */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodedFullText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareMenu(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-2.5 text-xs font-bold text-emerald-300 hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTextOnly}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareMenu(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-500/20 border border-sky-500/40 px-3 py-2.5 text-xs font-bold text-sky-300 hover:bg-sky-500/30 transition-colors"
              >
                <Send className="h-4 w-4 text-sky-400" />
                <span>Telegram</span>
              </a>

              <a
                href={`sms:?body=${encodedFullText}`}
                onClick={() => setShowShareMenu(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/30 px-3 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/25 transition-colors"
              >
                <Smartphone className="h-4 w-4 text-amber-400" />
                <span>SMS Text</span>
              </a>

              <a
                href={`mailto:?subject=${encodedSubject}&body=${encodedFullText}`}
                onClick={() => setShowShareMenu(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 px-3 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/25 transition-colors"
              >
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>Email Alert</span>
              </a>
            </div>

            {/* Bottom Actions: Native Share & Copy */}
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyText}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Alert Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy Alert Text</span>
                  </>
                )}
              </button>

              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: `NYAYA Alert: ${payload.title}`,
                        text: formattedMessage,
                        url: shareUrl,
                      });
                      setShowShareMenu(false);
                    } catch {
                      // ignore
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>OS Share</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
