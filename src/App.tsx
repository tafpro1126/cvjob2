import { useState, useEffect, useTransition } from 'react';
import { ActiveTab } from './types.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProfileStageTab } from './components/ProfileStageTab.tsx';
import { DigitalWebTab } from './components/DigitalWebTab.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { GeminiChatModal } from './components/GeminiChatModal.tsx';
import { DocumentScannerModal } from './components/DocumentScannerModal.tsx';
import { QrShareModal } from './components/QrShareModal.tsx';
import { StandaloneExportModal } from './components/StandaloneExportModal.tsx';
import { PERSONAL_INFO } from './data/portfolioData.ts';
import { 
  MessageSquare, 
  Sparkles, 
  FileCode, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  Car, 
  ArrowUp,
  Download
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Modals state
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
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
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();

    if (hash === '#digital') {
      setActiveTab('digital');
    } else if (params.get('src') === 'cv' || hash === '#stage') {
      setActiveTab('stage');
    }
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

  const [isTabPending, startTabTransition] = useTransition();

  const handleSelectTab = (tab: ActiveTab) => {
    startTabTransition(() => {
      setActiveTab(tab);
      window.location.hash = tab === 'stage' ? 'stage' : 'digital';
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors duration-200">
      
      {/* Fixed Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onOpenContact={() => setIsContactOpen(true)}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenQr={() => setIsQrOpen(true)}
          onSelectTab={handleSelectTab}
        />

        {/* Tab 1: Profil & Stage Métier */}
        {activeTab === 'stage' && (
          <main id="stage" className="animate-in fade-in duration-300">
            <ProfileStageTab
              onOpenContact={() => setIsContactOpen(true)}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          </main>
        )}

        {/* Tab 2: Digital Web & Atouts */}
        {activeTab === 'digital' && (
          <main id="digital" className="animate-in fade-in duration-300">
            <DigitalWebTab
              onOpenContact={() => setIsContactOpen(true)}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          </main>
        )}

      </div>

      {/* Persistent Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        
        {/* Floating AI Assistant trigger */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-2 p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          title="Discuter avec l'assistant IA de Marion"
          aria-label="Assistant IA"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pr-1">
            Assistant IA de Marion
          </span>
        </button>

        {/* Floating WhatsApp / Contact trigger */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 ring-4 ring-emerald-500/20"
          aria-label="Me contacter"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Me contacter</span>
        </button>

      </div>

      {/* Professional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
                <span>{PERSONAL_INFO.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                  LPAE ESGAE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stage en Commerce, Comptabilité, Recouvrement & Management · Prestations Web
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{PERSONAL_INFO.address}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsExportOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                title="Télécharger index.html autonome"
              >
                <FileCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export fichier unique (GitHub / Netlify)</span>
              </button>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Haut de page"
                aria-label="Remonter en haut de page"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 {PERSONAL_INFO.name}. Conçu pour les recruteurs locaux & les décideurs d'entreprise.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsQrOpen(true)} className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                Code QR du CV
              </button>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                Coordonnées & WhatsApp
              </button>
              <button onClick={() => setIsChatOpen(true)} className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                Assistant Virtuel IA
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Global Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenContact={() => {
          setIsChatOpen(false);
          setIsContactOpen(true);
        }}
      />

      <DocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onOpenContact={() => {
          setIsScannerOpen(false);
          setIsContactOpen(true);
        }}
      />

      <QrShareModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
      />

      <StandaloneExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

    </div>
  );
}
