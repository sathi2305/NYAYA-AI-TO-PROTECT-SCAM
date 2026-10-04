import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, Sparkles, AlertCircle, Trash2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatbotProps {
  incomingDictation?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ incomingDictation }) => {
  const [modelType, setModelType] = useState<'fast' | 'general' | 'complex'>('general');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'Namaste! I am NYAYA Sathi, your dedicated AI investor protection guardian. Ask me any question about dubious investment links, finfluencers, SEBI registration rules, or how to recover funds if someone targeted your family. I strictly adhere to Sangyan guardrails: zero stock tips, 100% investor protection.',
      timestamp: 'Just now',
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (incomingDictation && incomingDictation.trim()) {
      setInput(incomingDictation);
      handleSend(incomingDictation);
    }
  }, [incomingDictation]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          modelType,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to receive response from Gemini');
      }

      const data = await response.json();
      const modelMessage: ChatMessage = {
        id: 'model-' + Date.now(),
        role: 'model',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      setError(err?.message || 'Chat service encountered an issue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        content:
          'Conversation reset. How can I assist you with investor protection or checking an investment claim today?',
        timestamp: 'Just now',
        modelUsed: 'gemini-3.5-flash',
      },
    ]);
  };

  const suggestedPrompts = [
    'How do I check if my Telegram financial advisor is SEBI registered?',
    'My mother was sent a link demanding demat stamp duty. What should we do?',
    'Can an investment scheme promise 300% guaranteed returns legally in India?',
  ];

  return (
    <section id="ai-chat" className="border-t border-slate-800 bg-[#070d14] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Multi-Turn Gemini Assistant • Multi-Model
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            NYAYA Sathi AI: Multi-Turn Investor Guardian
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            Powered by Gemini with explicit roles under Sangyan guardrails. Select between high-speed checks, general investor guidance, and in-depth regulatory analysis.
          </p>
        </div>

        {/* Chat Container */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c1622] shadow-2xl flex flex-col h-[650px]">
          {/* Header Bar with Model Selector */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-700/80 bg-[#101b28] px-4 py-3 gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">NYAYA Sathi AI</div>
                <div className="text-[10px] text-slate-400">Sangyan Guardrail Compliant</div>
              </div>
            </div>

            {/* Model Selector segmented control */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-[#070e15] p-1 border border-slate-800 text-[11px]">
                <button
                  onClick={() => setModelType('fast')}
                  className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                    modelType === 'fast'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="gemini-3.1-flash-lite: Ultra-fast checks"
                >
                  Fast (3.1 Lite)
                </button>
                <button
                  onClick={() => setModelType('general')}
                  className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                    modelType === 'general'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="gemini-3.5-flash: Balanced general tasks"
                >
                  General (3.5 Flash)
                </button>
                <button
                  onClick={() => setModelType('complex')}
                  className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                    modelType === 'complex'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="gemini-3.1-pro-preview: Deep legal & regulatory analysis"
                >
                  Complex (3.1 Pro)
                </button>
              </div>

              <button
                onClick={handleClear}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-rose-400"
                title="Clear Chat History"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#080e15]/90">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-emerald-600 text-white'
                      : 'rounded-tl-sm border border-slate-700/80 bg-[#111e2c] text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div
                    className={`mt-1.5 flex items-center justify-end gap-2 text-[10px] ${
                      msg.role === 'user' ? 'text-emerald-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.modelUsed && <span className="font-mono">{msg.modelUsed}</span>}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 text-xs">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-700/80 bg-[#111e2c] p-3.5 text-xs text-slate-300 flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                  <span>NYAYA Sathi is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="border-t border-slate-800 bg-[#0a121b] px-4 py-2 flex flex-wrap gap-1.5 text-xs">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                disabled={isLoading}
                className="rounded-lg border border-slate-700/60 bg-[#060c13] px-2.5 py-1 text-[11px] text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-950/40 px-4 py-2 text-xs text-rose-300 border-t border-rose-900/50 flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-slate-700/80 bg-[#101b28] p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask NYAYA Sathi about dubious schemes, SEBI rules, or grievance steps..."
              className="flex-1 rounded-xl border border-slate-700 bg-[#070e15] px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors"
              title="Send Message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
