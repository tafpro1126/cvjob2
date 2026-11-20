import { useEffect, useState } from 'react';
import { ActiveTab } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProfileStageTab } from './components/ProfileStageTab.tsx';
import { DigitalWebTab } from './components/DigitalWebTab.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { CookieBanner, CookiePreferencesModal } from './components/CookieConsent.tsx';
import { LegalModal } from './components/LegalModals.tsx';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import {
  CookiePreferences,
  LegalDocType,
  readCookiePreferences,
  readSavedTheme,
  resolveInitialTab,
  resolveLegalHash,
  saveCookiePreferences,
  saveThemePreference,
} from './utils/storage.ts';
import { ChevronRight } from 'lucide-react';

export type NavSection = 'home' | 'stage' | 'digital';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage');
  const [activeNav, setActiveNav] = useState<NavSection>('home');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Modals & Consent states
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState<boolean>(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

  useEffect(() => {
    // 1. Theme initialization (saved preference or automatic OS prefers-color-scheme)
    const savedTheme = readSavedTheme();
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);

    // 2. Cookie consent initialization
    const storedConsent = readCookiePreferences();
    setCookiePrefs(storedConsent);
    setShowCookieBanner(!storedConsent);

    // 3. Initial route & hash handler (?src=cv, #stage, #digital, #confidentialite, #cgu, #cookies, #mentions-legales)
    const syncRoute = () => {
      const legalDoc = resolveLegalHash(window.location.hash);
      if (legalDoc) {
        setActiveLegalDoc(legalDoc);
      }

      const resolvedTab = resolveInitialTab(window.location.search, window.location.hash);
      setActiveTab(resolvedTab);

      const cleanHash = window.location.hash.replace('#', '').toLowerCase();
      if (resolvedTab === 'digital') {
        setActiveNav('digital');
      } else if (cleanHash && !legalDoc && cleanHash !== 'home' && cleanHash !== 'stage') {
        setActiveNav('stage');
      } else if (cleanHash === 'stage') {
        setActiveNav('stage');
      } else {
        setActiveNav('home');
      }

      if (cleanHash && !legalDoc && cleanHash !== 'home' && cleanHash !== 'stage' && cleanHash !== 'digital') {
        window.setTimeout(() => {
          const el = document.getElementById(cleanHash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  // Automatically sync Home vs Profil & Stage underline as user scrolls between Hero and #tab-content-area
  const [navScrollLockUntil, setNavScrollLockUntil] = useState<number>(0);

  useEffect(() => {
    if (activeTab !== 'stage') return;
    const onScroll = () => {
      if (Date.now() < navScrollLockUntil) return;
      const contentEl = document.getElementById('tab-content-area');
      if (!contentEl) return;
      const rect = contentEl.getBoundingClientRect();
      // When tab content reaches upper viewport, highlight Profil & Stage; above it, highlight Home
      if (rect.top <= 180) {
        setActiveNav((prev) => (prev === 'stage' ? prev : 'stage'));
      } else {
        setActiveNav((prev) => (prev === 'home' ? prev : 'home'));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeTab, navScrollLockUntil]);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      saveThemePreference(next ? 'dark' : 'light');
      return next;
    });
  };

  const handleNavigate = (tab: ActiveTab, sectionId?: string, scrollToTop?: boolean) => {
    setNavScrollLockUntil(Date.now() + 700);
    setActiveTab(tab);

    if (scrollToTop) {
      setActiveNav('home');
      try {
        window.history.replaceState(null, '', '#home');
      } catch {
        window.location.hash = '#home';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveNav(tab);
    const targetHash = sectionId ? `#${sectionId}` : `#${tab}`;
    try {
      window.history.replaceState(null, '', targetHash);
    } catch {
      window.location.hash = targetHash;
    }

    window.setTimeout(() => {
      const targetId = sectionId || 'tab-content-area';
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleAcceptAllCookies = () => {
    const saved = saveCookiePreferences(true);
    setCookiePrefs(saved);
    setShowCookieBanner(false);
    setIsCookieModalOpen(false);
  };

  const handleRejectAllCookies = () => {
    const saved = saveCookiePreferences(false);
    setCookiePrefs(saved);
    setShowCookieBanner(false);
    setIsCookieModalOpen(false);
  };

  const handleSaveCustomCookies = (analyticsEnabled: boolean) => {
    const saved = saveCookiePreferences(analyticsEnabled);
    setCookiePrefs(saved);
    setShowCookieBanner(false);
    setIsCookieModalOpen(false);
  };

  const openLegalDoc = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    try {
      window.history.replaceState(null, '', `#${doc}`);
    } catch {
      // Ignore history restriction
    }
  };

  const closeLegalDoc = () => {
    setActiveLegalDoc(null);
    try {
      window.history.replaceState(null, '', `#${activeNav === 'home' ? 'home' : activeTab}`);
    } catch {
      // Ignore history restriction
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col selection:bg-[var(--accent)] selection:text-white">
      
      {/* Single Sticky Navigation Header */}
      <Header
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleDarkMode}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onOpenContact={() => setIsContactOpen(true)}
          onNavigate={handleNavigate}
        />

        <div id="tab-content-area" className="scroll-mt-20 border-t border-[var(--hairline)]">
          {activeTab === 'stage' ? (
            <div id="stage">
              <ProfileStageTab onOpenContact={() => setIsContactOpen(true)} />
            </div>
          ) : (
            <div id="digital">
              <DigitalWebTab onOpenContact={() => setIsContactOpen(true)} />
            </div>
          )}
        </div>
      </main>

      {/* Structured Stripe-Inspired Footer */}
      <footer className="border-t border-[var(--hairline)] bg-[var(--surface)] pt-14 pb-12 text-[13px] text-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[var(--hairline)]">
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-[var(--ink)] tracking-tight">
                <span className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] text-[12px] font-semibold flex items-center justify-center">
                  MM
                </span>
                <span>{PERSONAL_INFO.name}</span>
              </div>
              <p className="text-[14px] text-[var(--muted)] leading-relaxed max-w-sm">
                Titulaire LPAE (ESGAE) · {PERSONAL_INFO.location} · Permis B (en cours). Disponible pour un stage de 3 à 6 mois en gestion, comptabilité, commerce ou recouvrement.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="btn-primary !h-[40px] !px-4 !text-[13px] group"
                >
                  <span>Me contacter</span>
                  <ChevronRight className="w-3.5 h-3.5 chevron-slide" aria-hidden="true" />
                </button>
                <a
                  href={PERSONAL_INFO.cvDownloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary !h-[40px] !px-4 !text-[13px]"
                >
                  Mon CV
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ink)]">
                Navigation
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('stage', undefined, true)}
                    className="hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    Accueil
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('stage', 'a-propos')}
                    className="hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    Profil &amp; Objectif
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('stage', 'parcours')}
                    className="hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    Parcours
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('digital', 'projets')}
                    className="hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    Digital Web
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ink)]">
                Coordonnées directes
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li className="tnum">
                  <a
                    href={`https://wa.me/${PERSONAL_INFO.phone1Raw}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--ink)] font-medium hover:text-[var(--accent)] transition-colors"
                  >
                    {PERSONAL_INFO.phone1}
                  </a>
                  <span className="text-[var(--subtle)]"> · WhatsApp / Tél</span>
                </li>
                <li className="tnum text-[var(--muted)]">
                  {PERSONAL_INFO.phone2} <span className="text-[var(--subtle)]">· Secondaire</span>
                </li>
                <li>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hover:text-[var(--ink)] transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </li>
                <li className="text-[var(--subtle)]">
                  {PERSONAL_INFO.location}, République du Congo
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="text-[var(--subtle)]">
              © 2026 {PERSONAL_INFO.name} · Édition : {PERSONAL_INFO.legalEditorName} · Hébergeur : Cloudflare, Inc.
            </div>

            <nav aria-label="Liens légaux et confidentialité" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="#mentions-legales"
                onClick={(e) => {
                  e.preventDefault();
                  openLegalDoc('mentions');
                }}
                className="hover:text-[var(--ink)] transition-colors"
              >
                Mentions légales
              </a>
              <a
                href="#confidentialite"
                onClick={(e) => {
                  e.preventDefault();
                  openLegalDoc('confidentialite');
                }}
                className="hover:text-[var(--ink)] transition-colors"
              >
                Politique de confidentialité
              </a>
              <a
                href="#cgu"
                onClick={(e) => {
                  e.preventDefault();
                  openLegalDoc('cgu');
                }}
                className="hover:text-[var(--ink)] transition-colors"
              >
                CGU
              </a>
              <a
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  openLegalDoc('cookies');
                }}
                className="hover:text-[var(--ink)] transition-colors"
              >
                Politique cookies
              </a>
              <button
                type="button"
                onClick={() => setIsCookieModalOpen(true)}
                className="hover:text-[var(--ink)] transition-colors cursor-pointer font-medium text-[var(--ink)]"
              >
                Gérer mes cookies
              </button>
            </nav>
          </div>

        </div>
      </footer>

      {/* Cookie Banner & Customization Modal */}
      <CookieBanner
        visible={showCookieBanner}
        onAcceptAll={handleAcceptAllCookies}
        onRejectAll={handleRejectAllCookies}
        onOpenCustomize={() => setIsCookieModalOpen(true)}
      />

      <CookiePreferencesModal
        isOpen={isCookieModalOpen}
        currentPrefs={cookiePrefs}
        onClose={() => setIsCookieModalOpen(false)}
        onSave={handleSaveCustomCookies}
      />

      {/* Legal Modals (#confidentialite, #cgu, #cookies, #mentions-legales) */}
      <LegalModal
        activeDoc={activeLegalDoc}
        onClose={closeLegalDoc}
        onOpenCookiePrefs={() => setIsCookieModalOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
