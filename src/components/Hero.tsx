import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronRight, MapPin } from 'lucide-react';
import { AnimatedCounter, Reveal } from './MotionPrimitives.tsx';
import { StripeGradientCanvas } from './StripeGradientCanvas.tsx';
import { ActiveTab } from '../types.ts';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (tab: ActiveTab, sectionId?: string) => void;
}

const CREDENTIAL_CAROUSEL = [
  'Participation aux DAS 1 & 2 (cabinet comptable)',
  'Masterclass Recouvrement · 4 h (Mai 2026)',
  'Permis B (en cours) [À CONFIRMER]',
  'Titulaire LPAE · ESGAE Brazzaville',
];

const TOOLS_MARQUEE = [
  'Excel',
  'Word',
  'PowerPoint',
  'Canva',
  'n8n',
  'Zapier',
  'Facebook Ads',
  'TikTok Ads',
];

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-7 pb-16 sm:pt-10 sm:pb-24">
      
      {/* Stripe-style flowing liquid gradient backdrop (bright pastel hues, never dark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div className="absolute inset-0">
          <StripeGradientCanvas />
        </div>
        {/* Contrast scrim ensuring WCAG AA readability for left-column hero typography */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/72 via-42% to-transparent"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg)] to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered status line matching Capture 1 */}
        <div className="mb-7 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] leading-snug">
            <span className="font-medium text-[#0071E3] dark:text-[#3B82F6]">
              Stage recherché · 3 à 6 mois
            </span>
            <span aria-hidden="true" className="text-[var(--subtle)]">·</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[var(--subtle)]" aria-hidden="true" />
              <span>{PERSONAL_INFO.location}</span>
            </span>
            <span aria-hidden="true" className="text-[var(--subtle)]">·</span>
            <span className="text-[var(--muted)]">
              {PERSONAL_INFO.driverLicense}
            </span>
          </div>
        </div>

        {/* Hero Split (Structure identique à Capture 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="lg:min-h-[143px] lg:flex lg:items-center">
              <h1 className="text-[clamp(19px,5.2vw,38px)] lg:text-[40px] xl:text-[48px] font-bold italic text-[var(--ink)] tracking-[-0.02em] leading-[1.08] whitespace-nowrap">
                Gérer, relancer, digitaliser
              </h1>
            </div>

            <p className="text-[18px] sm:text-[20px] font-normal text-[var(--muted)] leading-[1.55] max-w-2xl">
              Je m’appelle Marion Moun. Titulaire d’une Licence Professionnelle en Administration des Entreprises (LPAE) à l’ESGAE à Brazzaville après deux ans en gestion à l’Université Libre du Congo, je cherche un stage de 3 à 6 mois pour apprendre sur le terrain et me rendre utile rapidement.
            </p>

            {/* Centered horizontal credential carousel */}
            <div className="w-full max-w-2xl mx-auto pt-1">
              <div
                aria-label="Repères de parcours"
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

            {/* Primary & Explorer Actions (Structure Capture 1) */}
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

          {/* Right: Compact Portrait Frame (photo1 placeholder, zero explanatory clutter) + Handwritten Signature */}
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
                <div className="text-[13px] font-medium text-[var(--ink)]">photo1</div>
                <div className="text-[11px] text-[var(--muted)] mt-0.5">[PHOTO]</div>
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
                <span className="text-[11px] text-[var(--subtle)]">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Key Metrics Row (4 honest items requested) */}
        <div className="mt-16 pt-10 border-t border-[var(--hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <Reveal delayMs={0}>
            <div className="space-y-1.5">
              <div className="text-[34px] sm:text-[40px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={3} durationMs={1100} suffix=" ans" />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Formation en gestion
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                ULC (2 ans) + ESGAE (LPAE)
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={60}>
            <div className="space-y-1.5">
              <div className="text-[34px] sm:text-[40px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                <AnimatedCounter target={2} durationMs={1100} suffix=" DAS" />
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Participation (DAS 1 &amp; 2)
              </div>
              <div className="text-[13px] text-[var(--muted)] leading-relaxed">
                Avec l’aide d’un expert-comptable
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="space-y-1.5">
              <div className="text-[34px] sm:text-[40px] font-light text-[var(--ink)] tracking-tight leading-none tnum">
                Mai 2026
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Masterclass Recouvrement · 4 h
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                Cas pratiques à l’ESGAE (sans certificat)
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="space-y-1.5">
              <div className="text-[34px] sm:text-[40px] font-light text-[var(--ink)] tracking-tight leading-none">
                Anglais
              </div>
              <div className="text-[14px] font-medium text-[var(--ink)]">
                Niveau intermédiaire
              </div>
              <div className="text-[13px] text-[var(--muted)]">
                Formation BYU-Pathway · Français
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* Container-Bounded Marquee Strip with strictly real tools used */}
      <div className="mt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          aria-label="Outils utilisés"
          className="border-y border-[var(--hairline)] bg-[var(--surface)]/75 py-3.5 marquee-wrapper overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <div className="marquee-track flex items-center">
            {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[13px] font-medium text-[var(--muted)] whitespace-nowrap px-5"
              >
                <span>{item}</span>
                <span aria-hidden="true" className="ml-10 text-[var(--subtle)]/50">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
