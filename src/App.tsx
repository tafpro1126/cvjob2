import { useEffect, useState } from 'react';
import { ActiveTab } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProfileStageTab } from './components/ProfileStageTab.tsx';
import { DigitalWebTab } from './components/DigitalWebTab.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { StandaloneExportModal } from './components/StandaloneExportModal.tsx';
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
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Modals & Consent states
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
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

      const cleanHash = window.location.hash.replace('#', '');
      if (cleanHash && !legalDoc && cleanHash !== 'stage' && cleanHash !== 'digital') {
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

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      saveThemePreference(next ? 'dark' : 'light');
      return next;
    });
  };

  const handleNavigate = (tab: ActiveTab, sectionId?: string) => {
    setActiveTab(tab);
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
      window.history.replaceState(null, '', `#${activeTab}`);
    } catch {
      // Ignore history restriction
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col selection:bg-[var(--accent)] selection:text-white">
      
      {/* Single Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
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

      {/* Quiet Stripe-Inspired Footer */}
      <footer className="border-t border-[var(--hairline)] bg-[var(--surface)] py-14 text-[13px] text-[var(--muted)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--hairline)]">
            <div className="space-y-1">
              <div className="text-[15px] font-medium text-[var(--ink)]">
                {PERSONAL_INFO.name}
              </div>
              <div>
                Diplômé LPAE (ESGAE) · Mansimou, arr8 Madibou, Brazzaville, Congo
              </div>
              <div className="tnum text-[var(--subtle)]">
                {PERSONAL_INFO.phone1} · {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleDarkMode}
                aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
                className="btn-secondary !h-[38px] !px-3.5 !text-[13px]"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Thème clair' : 'Thème sombre'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="btn-secondary !h-[38px] !px-3.5 !text-[13px]"
              >
                Export HTML unique
              </button>

              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="btn-primary !h-[38px] !px-4 !text-[13px]"
              >
                Me contacter
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="text-[var(--subtle)]">
              © 2026 {PERSONAL_INFO.name}. Conçu pour aller à l'essentiel, sans artifice.
            </div>

            <nav aria-label="Liens légaux et confidentialité" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href="#mentions-legales"
                onClick={(e) => {
                  e.preventDefault();
                  openLegalDoc('mentions-legales');
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

      {/* Contact & Standalone Export Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <StandaloneExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

    </div>
  );
}
