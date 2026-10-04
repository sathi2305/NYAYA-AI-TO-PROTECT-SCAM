import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="hidden md:flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/25 hover:text-white"
        title="Install NYAYA AI for Offline Protection"
      >
        <Download className="h-3.5 w-3.5 text-emerald-400" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/25 hover:text-white"
          title="Install NYAYA AI on iOS"
        >
          <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-[#0c1622] p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Install NYAYA on iPhone / iPad</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Install NYAYA AI on your home screen for instant offline access to cached threat warnings and SEBI advisories:
              </p>
              <ol className="mt-3 space-y-2 text-xs text-slate-200 list-decimal list-inside">
                <li>
                  Tap the <strong>Share</strong> button in your Safari toolbar.
                </li>
                <li>
                  Scroll down and tap <strong>Add to Home Screen</strong>.
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-emerald-500 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
