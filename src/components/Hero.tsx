import { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronRight } from 'lucide-react';
import { AnimatedCounter, Reveal } from './MotionPrimitives.tsx';
import { ActiveTab } from '../types.ts';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate: (tab: ActiveTab, sectionId?: string) => void;
}

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
  'Permis B · Brazzaville',
];

export function Hero({ onOpenContact, onNavigate }: HeroProps) {
  // Subtle living counter inspired by Stripe's live GDP ticker (with explicit [À COMPLÉTER] honesty)
  const [liveCounter, setLiveCounter] = useState<number>(1840.0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setLiveCounter((prev) => Number((prev + 0.01).toFixed(2)));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const formattedLiveCounter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(liveCounter);

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      
      {/* Animated diagonal gradient ribbon ONLY on the right side behind hero content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <div
          className="hero-ribbon absolute -top-24 -right-24 w-[540px] h-[540px] sm:w-[760px] sm:h-[680px] rounded-[40%]"
        />
        {/* Contrast scrim ensuring WCAG AA readability for all hero typography */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/85 to-transparent"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Living counter ticker line (Stripe style) */}
        <div className="mb-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1 text-[13px] text-[var(--muted)]">
          <span className="font-medium text-[var(--ink)]">
            Stage recherché à Brazzaville · Commerce, Comptabilité, Recouvrement &amp; Management
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-[var(--subtle)]">/</span>
          <span className="tnum font-normal text-[var(--muted)]">
            Heures de gestion &amp; pratique ([À COMPLÉTER]) :{' '}
            <strong className="font-medium text-[var(--ink)] tnum whitespace-nowrap">{formattedLiveCounter} h</strong>
          </span>
        </div>

        {/* Hero Split: Lightweight Giant Headline on Left, Clean Human Portrait on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-[40px] sm:text-[56px] lg:text-[68px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.05] [text-wrap:balance]">
              Gestion d'entreprise, recouvrement et rigueur numérique.
            </h1>

            <p className="text-[18px] sm:text-[20px] font-normal text-[var(--muted)] leading-[1.55] max-w-2xl">
              Je suis Marion Moun, diplômé LPAE de l'ESGAE à Brazzaville. Je recherche un stage opérationnel en commerce, comptabilité, recouvrement ou management — et j'apporte aussi la maîtrise d'outils web pour automatiser le quotidien.
            </p>

            {/* Concrete factual anchor line (no pills) */}
            <p className="text-[14px] text-[var(--subtle)] leading-relaxed">
              Projet DAS 1 &amp; 2 chez Émeraude avec M. Yves Miatoko · Masterclass Recouvrement (Mai 2026) · Permis B opérationnel.
            </p>

            {/* Primary & Secondary Actions (6px radius, 44px height) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="btn-primary group"
              >
                <span>Me contacter</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>

              <a
                href={PERSONAL_INFO.cvDownloadUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Mon CV
              </a>

              <button
                type="button"
                onClick={() => onNavigate('digital', 'projets')}
                className="inline-flex items-center gap-1.5 h-[44px] px-3 text-[15px] font-medium text-[var(--accent)] hover:underline cursor-pointer group"
              >
                <span>Explorer Digital Web</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Human Portrait Slot + Handwritten SVG Signature */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-[280px] space-y-4">
              <div className="aspect-[4/5] w-full rounded-[8px] bg-[var(--surface)] flex flex-col items-center justify-center text-center p-6 shadow-[var(--card-shadow)]">
                <svg
                  className="w-14 h-14 text-[var(--subtle)] mb-3"
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
                <div className="text-[14px] font-medium text-[var(--ink)]">[PHOTO]</div>
                <p className="text-[12px] text-[var(--muted)] mt-1 leading-normal">
                  Remplacer par mon portrait recadré simplement
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <svg
                  className="w-28 h-8 text-[var(--ink)]"
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
                <span className="text-[12px] text-[var(--subtle)]">Mansimou, Brazzaville</span>
              </div>
            </div>
          </div>

        </div>

        {/* Animated Key Metrics Row (Tabular numerals, light weight, IntersectionObserver count-up) */}
        <div className="mt-20 pt-12 border-t border-[var(--hairline)] grid grid-cols-2 lg:grid-cols-4 gap-8">
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
      <div className="mt-16 border-y border-[var(--hairline)] bg-[var(--surface)] py-4 marquee-wrapper overflow-hidden relative z-10">
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
