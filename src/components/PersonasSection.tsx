import React from 'react';
import { Quote, MapPin } from 'lucide-react';
import { PERSONAS } from '../data/mockData';
import { LanguageCode } from '../types';
import { getStrings } from '../utils/i18n';

interface PersonasSectionProps {
  currentLanguage?: LanguageCode;
}

export const PersonasSection: React.FC<PersonasSectionProps> = ({ currentLanguage = 'hi' }) => {
  const s = getStrings(currentLanguage);
  const personaImages: Record<string, string> = {
    persona_ramesh_teacher: '/src/assets/images/persona_ramesh_teacher_1790929316274.jpg',
    persona_priya_entrepreneur: '/src/assets/images/persona_priya_entrepreneur_1790929329007.jpg',
    persona_suresh_elder: '/src/assets/images/persona_suresh_elder_1790929342253.jpg',
  };

  return (
    <section className="border-t border-slate-800 bg-[#080e15] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            {s.personasKicker}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance">
            {s.personasTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
            {s.personasSub}
          </p>

          <div className="mx-auto mt-4 max-w-md rounded-xl border border-emerald-900/60 bg-emerald-950/20 px-4 py-2 text-xs font-medium text-emerald-300">
            {s.personasPrinciple}
          </div>
        </div>

        {/* 3 Personas Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PERSONAS.map((persona, index) => (
            <div
              key={index}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1520] transition-all hover:border-slate-700"
            >
              <div>
                {/* Persona Header Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <img
                    src={personaImages[persona.imageKey]}
                    alt={persona.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1520] via-[#0c1520]/30 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <div className="font-bold">{persona.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-300">
                      <MapPin className="h-3 w-3" />
                      <span>{persona.city}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs font-medium text-slate-400">
                    {persona.role}
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-200">{s.scamTrapLabel}</span>
                      <span className="text-slate-300">{persona.story}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-amber-300">{s.vulnerabilityLabel}</span>
                      <span className="text-slate-300">{persona.vulnerability}</span>
                    </div>

                    <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-2.5 text-emerald-300">
                      <span className="font-semibold text-emerald-200">{s.nyayaProtectionLabel}</span>
                      <span>{persona.nyayaIntervention}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="border-t border-slate-800/80 bg-[#080d14] p-4 text-xs italic text-slate-300">
                <div className="flex items-start gap-2">
                  <Quote className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{persona.quote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
