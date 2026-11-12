import { useEffect, useState } from 'react';
import { ActiveTab } from '../types.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  Sun, 
  Moon, 
  ArrowUpRight,
  Briefcase, 
  Globe
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
  onOpenContact: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  isDark,
  toggleDarkMode,
  onOpenContact
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Once scrolled past 120px, show compact title in nav bar (iOS style)
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
    const el = document.getElementById('tab-content-area');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass border-b transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Left: Compact title appearing on scroll */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left cursor-pointer group focus:outline-none flex items-center gap-2.5"
            aria-label="Haut de page"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold text-xs flex items-center justify-center shrink-0 border border-neutral-300/60 dark:border-neutral-700">
              MM
            </div>

            <div className={`transition-all duration-200 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 sm:opacity-100 sm:translate-y-0'}`}>
              <div className="text-[14px] sm:text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal leading-none hidden sm:block">
                LPAE · ESGAE Brazzaville
              </div>
            </div>
          </button>
        </div>

        {/* Center: Apple Segmented Control (Desktop) */}
        <div className="hidden md:flex items-center">
          <nav aria-label="Contrôle segmenté des onglets" className="ios-segmented">
            <button
              type="button"
              onClick={() => handleTabChange('stage')}
              aria-pressed={activeTab === 'stage'}
              className={`ios-segmented-item flex items-center gap-1.5 cursor-pointer ${activeTab === 'stage' ? 'active' : ''}`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Profil & Stage</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('digital')}
              aria-pressed={activeTab === 'digital'}
              className={`ios-segmented-item flex items-center gap-1.5 cursor-pointer ${activeTab === 'digital' ? 'active' : ''}`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Digital Web</span>
            </button>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title={isDark ? 'Mode clair' : 'Mode sombre'}
            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button (Me contacter) */}
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF] text-white text-[13px] sm:text-[14px] font-semibold transition-all shadow-xs cursor-pointer"
          >
            <span>Me contacter</span>
          </button>

        </div>

      </div>
    </header>
  );
}
