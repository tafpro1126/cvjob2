import { useState, useEffect } from 'react';
import { ActiveTab } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProfileStageTab } from './components/ProfileStageTab.tsx';
import { DigitalWebTab } from './components/DigitalWebTab.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { StandaloneExportModal } from './components/StandaloneExportModal.tsx';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import { 
  Briefcase, 
  Globe, 
  ArrowUp,
  FileCode,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Modals state
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Handle URL parameters (?src=cv) and hash (#stage, #digital)
  useEffect(() => {
    // Check dark mode preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // QR Code / URL routing logic
    const handleRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      if (hash === '#digital') {
        setActiveTab('digital');
      } else if (params.get('src') === 'cv' || hash === '#stage' || !hash) {
        setActiveTab('stage');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
    setTimeout(() => {
      const el = document.getElementById('tab-content-area');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black dark:bg-[#000000] dark:text-white flex flex-col antialiased selection:bg-[#0071E3] selection:text-white transition-colors duration-200">
      
      {/* Liquid Glass Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Large Title & Hero */}
        <Hero
          onOpenContact={() => setIsContactOpen(true)}
          onSelectTab={handleSelectTab}
        />

        {/* Anchor point & In-Page Segmented Tab Switcher */}
        <div id="tab-content-area" className="scroll-mt-18 max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-6">
          <div className="flex justify-center">
            <nav aria-label="Onglets de navigation" className="ios-segmented p-1">
              <button
                type="button"
                onClick={() => handleSelectTab('stage')}
                className={`ios-segmented-item flex items-center gap-2 cursor-pointer text-[14px] ${activeTab === 'stage' ? 'active' : ''}`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Profil & Stage Métier</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTab('digital')}
                className={`ios-segmented-item flex items-center gap-2 cursor-pointer text-[14px] ${activeTab === 'digital' ? 'active' : ''}`}
              >
                <Globe className="w-4 h-4" />
                <span>Digital Web</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab 1: Profil & Stage */}
        {activeTab === 'stage' && (
          <div id="stage" className="animate-in fade-in duration-200">
            <ProfileStageTab onOpenContact={() => setIsContactOpen(true)} />
          </div>
        )}

        {/* Tab 2: Digital Web */}
        {activeTab === 'digital' && (
          <div id="digital" className="animate-in fade-in duration-200">
            <DigitalWebTab onOpenContact={() => setIsContactOpen(true)} />
          </div>
        )}

      </main>

      {/* Mobile Floating iOS Tab Bar (Liquid Glass) */}
      <nav 
        aria-label="Barre d'onglets mobile"
        className="fixed bottom-5 left-4 right-4 z-40 md:hidden flex items-center justify-between p-1.5 rounded-full liquid-glass shadow-lg border border-black/10 dark:border-white/15 max-w-sm mx-auto"
      >
        <button
          type="button"
          onClick={() => handleSelectTab('stage')}
          className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 text-[13px] font-semibold transition-all cursor-pointer ${
            activeTab === 'stage'
              ? 'bg-white dark:bg-[#2C2C2E] text-black dark:text-white shadow-xs'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Profil</span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectTab('digital')}
          className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 text-[13px] font-semibold transition-all cursor-pointer ${
            activeTab === 'digital'
              ? 'bg-white dark:bg-[#2C2C2E] text-black dark:text-white shadow-xs'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Digital</span>
        </button>

        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="w-9 h-9 rounded-full bg-[#0071E3] dark:bg-[#0A84FF] text-white flex items-center justify-center shrink-0 ml-1 shadow-xs"
          aria-label="Contacter"
        >
          <Phone className="w-4 h-4" />
        </button>
      </nav>

      {/* Handcrafted Footer */}
      <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] py-12 pb-24 md:pb-12 text-[14px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="space-y-1">
              <div className="font-bold text-neutral-900 dark:text-neutral-100 text-[16px]">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[13px] text-neutral-500 dark:text-neutral-400">
                Diplômé LPAE · ESGAE Brazzaville
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-neutral-500 dark:text-neutral-400 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Mansimou, arr8 Madibou, Brazzaville, Congo</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[12px] font-medium transition-colors cursor-pointer"
                title="Exporter un fichier HTML autonome"
              >
                <FileCode className="w-3.5 h-3.5 text-neutral-500" />
                <span>Export HTML unique</span>
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
                title="Haut de page"
                aria-label="Remonter en haut de page"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Warm personal phrase in the footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-neutral-500 dark:text-neutral-400">
            <p className="italic">
              « Ce site a été conçu pour aller à l'essentiel : montrer à un recruteur des compétences concrètes et vérifiables, sans artifice. »
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Coordonnées
              </button>
              <span>·</span>
              <a
                href={`https://wa.me/${PERSONAL_INFO.phone1Raw}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="text-[12px] text-neutral-400 dark:text-neutral-500">
            © 2026 {PERSONAL_INFO.name}. Conçu selon les principes Human Interface d'Apple.
          </div>

        </div>
      </footer>

      {/* Global Modals */}
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
