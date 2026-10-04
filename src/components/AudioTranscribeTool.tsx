import React, { useState, useRef } from 'react';
import { Mic, Square, Upload, RefreshCw, Volume2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface AudioTranscribeToolProps {
  onSendToSimulator?: (transcription: string) => void;
}

export const AudioTranscribeTool: React.FC<AudioTranscribeToolProps> = ({ onSendToSimulator }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  const startRecording = async () => {
    setError(null);
    setTranscript(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        clearInterval(timerRef.current);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // stop tracks
        stream.getTracks().forEach((track) => track.stop());
        await processAndTranscribe(audioBlob, 'audio/webm');
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Microphone access denied. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setTranscript(null);
    await processAndTranscribe(file, file.type || 'audio/webm');
  };

  const processAndTranscribe = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];

        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioBase64: base64Data, mimeType }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'Transcription failed');
        }

        const data = await response.json();
        setTranscript(data.text);
      };
      reader.readAsDataURL(blob);
    } catch (err: any) {
      setError(err?.message || 'Error processing audio');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSendToLens = () => {
    if (!transcript) return;
    if (onSendToSimulator) {
      onSendToSimulator(transcript);
    }
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="transcribe-tool" className="border-t border-slate-800 bg-[#080f17] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Speech-To-Text • gemini-3.5-transcribe
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Transcribe Voice Notes &amp; Audio Forwards
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Many scams in Tier-2/3 India arrive as vernacular voice notes on WhatsApp. Record your microphone or upload an audio file to transcribe it with <strong>gemini-3.5-transcribe</strong> and evaluate it in the Suraksha Lens.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-700/80 bg-[#0c1622] p-6 shadow-xl sm:p-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Mic Record Button */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={isTranscribing}
                className="group flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 disabled:opacity-50"
                title="Click to Record Microphone"
              >
                <Mic className="h-9 w-9" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse hover:bg-rose-500"
                title="Stop Recording"
              >
                <Square className="h-8 w-8 fill-current" />
              </button>
            )}

            <div className="mt-4 text-sm font-semibold text-white">
              {isRecording ? (
                <span className="text-rose-400">Recording live audio... ({recordingSeconds}s)</span>
              ) : isTranscribing ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Transcribing with gemini-3.5-transcribe...
                </span>
              ) : (
                <span>Tap microphone to record WhatsApp voice note</span>
              )}
            </div>

            {/* Audio File Upload Alternative */}
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span>or</span>
              <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700">
                <Upload className="h-3.5 w-3.5 text-emerald-400" />
                <span>Upload Audio File</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Transcribed Output */}
          {transcript && (
            <div className="mt-6 rounded-xl border border-slate-700 bg-[#070e15] p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Transcription Complete</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">gemini-3.5-transcribe</span>
              </div>

              <div className="mt-3 text-xs leading-relaxed text-slate-200 sm:text-sm whitespace-pre-wrap">
                &ldquo;{transcript}&rdquo;
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSendToLens}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <span>Test this Text in WhatsApp Suraksha Lens</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
