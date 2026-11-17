import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronRight, MapPin } from 'lucide-react';
import { AnimatedCounter, Reveal } from './MotionPrimitives.tsx';
import { ActiveTab } from '../types.ts';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (tab: ActiveTab, sectionId?: string) => void;
}

const CREDENTIAL_CAROUSEL = [
  'Projet DAS 1 & 2 chez Émeraude',
  'Masterclass Recouvrement (Mai 2026)',
  'Permis B (en cours d’obtention)',
  'Diplômé LPAE · ESGAE Brazzaville',
];

const TOOLS_MARQUEE = [
  'Comptabilité OHADA révisée',
  'Déclarations DAS 1 & 2',
  'Balance âgée & Recouvrement',
  'Plan de relance J+3 à J+35',
  'Google Sheets & Apps Script',
  'Google Forms & Drive',
  'Prospection B2B locale',
  'Facebook Ads & Meta Pixel',
  'WordPress & WooCommerce',
  'Permis B (en cours d’obtention) · Brazzaville',
];

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-7 pb-16 sm:pt-10 sm:pb-24">
      
      {/* Living multi-layer animated gradient mesh behind hero content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div
          className="hero-mesh-1 absolute -top-28 -right-24 w-[460px] h-[460px] sm:w-[680px] sm:h-[600px] rounded-full"
        />
        <div
          className="hero-mesh-2 absolute top-10 right-[8%] w-[380px] h-[380px] sm:w-[540px] sm:h-[500px] rounded-full"
        />
        <div
          className="hero-mesh-3 absolute -top-12 right-[24%] w-[340px] h-[340px] sm:w-[480px] sm:h-[440px] rounded-full"
        />
        {/* Contrast scrim ensuring WCAG AA readability for left-column hero typography */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/72 via-42% to-transparent"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg)] to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered status line matching capture-3 style & colors */}
        <div className="mb-7 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] leading-snug">
            <span className="font-medium text-[#0071E3] dark:text-[#3B82F6]">
              Stage recherché · 3 à 6 mois
            </span>
            <span aria-hidden="true" className="text-[var(--subtle)]">·</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--subtle)]" aria-hidden="true" />
              <span>Brazzaville, Congo</span>
            </span>
            <span aria-hidden="true" className="text-[var(--subtle)]">·</span>
            <span className="text-[var(--muted)]">
              Permis B (en cours d&apos;obtention)
            </span>
          </div>
        </div>

        {/* Hero Split: Lightweight Giant Headline on Left, Centered Compact ID Portrait on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.05] [text-wrap:balance]">
              Gérer, relancer, digitaliser
            </h1>

            <p className="text-[18px] sm:text-[20px] font-normal text-[var(--muted)] leading-[1.55] max-w-2xl">
              Je m’appelle Marion Moun. Titulaire d’une Licence Professionnelle en Administration des Entreprises (LPAE) à l’ESGAE Brazzaville après deux années de gestion à l’Université Libre du Congo, je recherche une opportunité pour mettre ma rigueur au service d’une équipe locale.
            </p>

            {/* Centered horizontal credential carousel */}
            <div className="w-full max-w-2xl mx-auto pt-1">
              <div
                aria-label="Références et repères clés"
                className="marquee-wrapper overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
              >
                <div className="marquee-track-credential flex items-center">
                  {[...CREDENTIAL_CAROUSEL, ...CREDENTIAL_CAROUSEL].map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-[13.5px] font-normal text-[var(--subtle)] whitespace-nowrap px-4"
                    >
                      <span>{item}</span>
                      <span aria-hidden="true" className="ml-8 text-[var(--subtle)]/60">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary & Explorer Actions (Mon CV removed from Hero; Explorer Digital Web black at rest) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary group"
              >
                <span>Me contacter</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('stage')}
                className="inline-flex items-center gap-1.5 h-[44px] px-3 text-[15px] font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:underline cursor-pointer transition-colors duration-150 group"
              >
                <span>Explorer Profil &amp; Stage</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('digital', 'projets')}
                className="inline-flex items-center gap-1.5 h-[44px] px-3 text-[15px] font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:underline cursor-pointer transition-colors duration-150 group"
              >
                <span>Explorer Digital Web</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Centered Compact ID Portrait Slot + Handwritten SVG Signature */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-[176px] mx-auto space-y-3">
              <div className="aspect-[4/5] w-full rounded-[8px] bg-[var(--surface)] flex flex-col items-center justify-center text-center p-4 shadow-[var(--card-shadow)]">
                <svg
                  className="w-10 h-10 text-[var(--subtle)] mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <div className="text-[13px] font-medium text-[var(--ink)]">[PHOTO]</div>
                <p className="text-[11px] text-[var(--muted)] mt-1 leading-snug">
                  Photo d&apos;identité
                </p>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <svg
                  className="w-20 h-6 text-[var(--ink)]"
                  viewBox="0 0 160 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Signature manuscrite de Marion Moun"
                >
                  <path d="M 12 36 C 18 16, 26 12, 30 32 C 34 14, 42 16, 46 34 C 54 22, 60 26, 68 32 C 78 12, 84 38, 92 28 C 102 18, 110 32, 118 24 C 126 16, 134 32, 148 20" />
                  <path d="M 28 38 C 50 42, 95 40, 144 32" strokeWidth="1.1" opacity="0.5" />
                </svg>
                <span className="text-[11px] text-[var(--subtle)]">Brazzaville</span>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Key Metrics Row (Tabular numerals, light weight, IntersectionObserver count-up) */}
        <div className="mt-16 pt-10 border-t border-[var(--hairline)] grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Reveal delayMs={0}>
            <div className="space-y-1.5">
              <div className="text-[36px] sm:text-[42px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={3} durationMs={1200} />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Années de formation en gestion
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                ULC Tronc Commun + LPAE ESGAE
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={60}>
            <div className="space-y-1.5">
              <div className="text-[36px] sm:text-[42px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={10} durationMs={1200} />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Étapes académiques &amp; terrain
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                Du Bac D aux travaux DAS 1 &amp; 2
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="space-y-1.5">
              <div className="text-[36px] sm:text-[42px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={4} durationMs={1200} />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Domaines d'immersion ciblés
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                Commerce, Compta, Recouvrement, Management
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="space-y-1.5">
              <div className="text-[36px] sm:text-[42px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={1} durationMs={1200} />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Masterclass Recouvrement
              </div>
              <div className="text-[13px] text-[var(--muted)] tnum">
                Certifiée en Mai 2026
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* Infinite Marquee Strip of Verified Tools & Competencies (Pauses on Hover) */}
      <div className="mt-14 border-y border-[var(--hairline)] bg-[var(--surface)] py-4 marquee-wrapper overflow-hidden relative z-10">
        <div className="marquee-track flex items-center">
          {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[13px] font-medium text-[var(--muted)] whitespace-nowrap px-6"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="ml-12 text-[var(--hairline)]">·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
