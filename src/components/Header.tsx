import { useState, useTransition } from 'react';
import { ActiveTab } from '../types.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  Sun, 
  Moon, 
  PhoneCall, 
  QrCode, 
  Sparkles, 
  Briefcase, 
  Code2, 
  CheckCircle2, 
  Menu, 
  X 
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  onOpenContact: () => void;
  onOpenQr: () => void;
  onOpenChat: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  isDark,
  toggleDarkMode,
  onOpenContact,
  onOpenQr,
  onOpenChat
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.history.replaceState(null, '', `#${tab}`);
    // Smoothly scroll to the tab content area so the user immediately sees the active tab content
    const el = document.getElementById('tab-content-area');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => handleTabChange('stage')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            aria-label="Accueil Marion Moun"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-teal-500 text-white font-bold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform text-lg">
              MM
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-tight">
                {PERSONAL_INFO.name}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" /> LPAE
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                ESGAE · Brazzaville
              </div>
            </div>
          </button>
        </div>

        {/* Central Segmented Tabs (Desktop) */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700">
          <button
            type="button"
            onClick={() => handleTabChange('stage')}
            aria-pressed={activeTab === 'stage'}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'stage'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Profil & Stage Métier</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold">
              Prioritaire
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('digital')}
            aria-pressed={activeTab === 'digital'}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'digital'
                ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Digital Web & Atouts</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
              Valeur +
            </span>
          </button>
        </nav>

        {/* Action icons & buttons */}
        <div className="flex items-center gap-2">
          {/* AI Assistant button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200/70 dark:border-indigo-800 transition-colors"
            title="Assistant IA de Marion"
            aria-label="Ouvrir l'assistant virtuel"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="hidden lg:inline">Assistant IA</span>
          </button>

          {/* QR Code preview */}
          <button
            onClick={onOpenQr}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="Afficher le QR Code du CV"
            aria-label="Afficher le QR Code du CV"
          >
            <QrCode className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
            aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Direct Contact Button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-102"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Me contacter</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            type="button"
            onClick={() => handleTabChange('stage')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'stage'
                ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <div>
                <div>Profil & Stage Métier</div>
                <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  Commerce, Comptabilité, Recouvrement
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
              Cible RH
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('digital')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'digital'
                ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <div>Digital Web & Atouts</div>
                <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  Automatisation, Projets & Prestations
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
              Cas réels
            </span>
          </button>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-2.5 px-3 rounded-lg bg-sky-600 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contacter Marion</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="py-2.5 px-3 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assistant IA</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
