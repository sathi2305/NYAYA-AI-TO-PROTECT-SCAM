import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Award, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/mockData';

export const ScamPehchanoQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOption(optId);
    setIsAnswered(true);

    const chosen = currentQ.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 25);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="border-t border-slate-800 bg-[#091119] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Feature 4 • Slide 7
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Scam Pehchano: 2-Minute Daily Safety Quiz
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">
            Education as conversation. Spot real-world Indian investor scam scenarios, earn your Safety Score, and learn elder wisdom.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c1622] p-6 shadow-xl sm:p-8">
          {!quizFinished ? (
            <div>
              {/* Quiz progress and score */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
                <span className="font-semibold text-slate-400">
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex items-center gap-1.5 font-mono-numbers text-emerald-400 font-bold">
                  <Trophy className="h-4 w-4" />
                  <span>Safety Score: {score} pts</span>
                </div>
              </div>

              {/* Context Tag */}
              <div className="mt-4 text-xs font-medium text-slate-400 italic">
                Context: {currentQ.senderContext}
              </div>

              {/* Scenario */}
              <h3 className="mt-2 text-base font-semibold leading-relaxed text-white sm:text-lg">
                &ldquo;{currentQ.scenario}&rdquo;
              </h3>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {currentQ.options.map((option) => {
                  let optStyle =
                    'border-slate-800 bg-[#070e15] text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                  if (isAnswered) {
                    if (option.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                    } else if (selectedOption === option.id && !option.isCorrect) {
                      optStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    } else {
                      optStyle = 'opacity-40 border-slate-800 bg-[#070e15] text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={isAnswered}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-xs sm:text-sm font-medium transition-all ${optStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs uppercase font-mono font-bold">
                        {option.id}
                      </span>
                      <span className="flex-1 leading-snug">{option.text}</span>
                      {isAnswered && option.isCorrect && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                      )}
                      {isAnswered && selectedOption === option.id && !option.isCorrect && (
                        <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Dadi Proverb */}
              {isAnswered && (
                <div className="mt-6 rounded-xl border border-slate-700 bg-[#111e2d] p-4 text-xs">
                  <div className="font-bold text-white">Why this matters:</div>
                  <div className="mt-1 text-slate-300 leading-relaxed">{currentQ.explanation}</div>
                  <div className="mt-3 border-t border-slate-700/60 pt-2 text-emerald-300 font-semibold italic">
                    👵 Dadi&apos;s Golden Rule: &ldquo;{currentQ.dadiProverb}&rdquo;
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                    >
                      {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question →' : 'See Results'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/40">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">Quiz Completed!</h3>
              <div className="mt-2 font-mono-numbers text-3xl font-extrabold text-emerald-400">
                {score} / 100 Points
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {score >= 75
                  ? '🌟 Shabaash! You have sharp scam detection instincts. Your family is safer with you around.'
                  : '⚠️ You learned critical scam triggers today. Remember: SEBI never guarantees returns or collects money on WhatsApp.'}
              </p>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
