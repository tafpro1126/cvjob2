import { useEffect, useRef, useState } from 'react';
import { ActiveTab } from '../types.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronDown, ChevronRight, Home, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeNav: 'home' | 'stage' | 'digital';
  onNavigate: (tab: ActiveTab, sectionId?: string, scrollToTop?: boolean) => void;
  onOpenContact: () => void;
}

export function Header({ activeNav, onNavigate, onOpenContact }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'stage' | 'digital' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const hoverOpenTimerRef = useRef<number | null>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverOpenTimerRef.current) window.clearTimeout(hoverOpenTimerRef.current);
      if (hoverCloseTimerRef.current) window.clearTimeout(hoverCloseTimerRef.current);
    };
  }, []);

  const clearHoverTimers = () => {
    if (hoverOpenTimerRef.current) {
      window.clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (hoverCloseTimerRef.current) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  };

  const handleMouseEnterNav = (menu: 'stage' | 'digital') => {
    clearHoverTimers();
    hoverOpenTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(menu);
    }, 150);
  };

  const handleMouseLeaveNav = () => {
    clearHoverTimers();
    hoverCloseTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const handleSelectItem = (tab: ActiveTab, sectionId?: string, scrollToTop?: boolean) => {
    clearHoverTimers();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(tab, sectionId, scrollToTop);
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 w-full site-header ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 lg:gap-6">
        
        {/* Left: Monogram & Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelectItem('stage', undefined, true);
          }}
          className="inline-flex items-center gap-2 lg:gap-2.5 text-[14px] lg:text-[16px] font-semibold text-[var(--ink)] whitespace-nowrap shrink-0 tracking-tight"
        >
          <span className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] text-[12px] font-semibold flex items-center justify-center">
            MM
          </span>
          <span>{PERSONAL_INFO.name}</span>
        </a>

        {/* Center: Home + Direct Tab Links + Chevron/Hover Intent Dropdowns (Desktop md+) */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-3 lg:gap-7">

          {/* Home link with its own violet active underline */}
          <div className="relative py-2 flex items-center">
            <div className="relative inline-flex items-center pb-1.5">
              <button
                type="button"
                onClick={() => handleSelectItem('stage', undefined, true)}
                className={`inline-flex items-center gap-1.5 text-[13.5px] lg:text-[15px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                  activeNav === 'home'
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                <Home className="w-3.5 h-3.5 lg:w-4 lg:h-4" aria-hidden="true" />
                <span>Home</span>
              </button>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                  activeNav === 'home' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>
          </div>

          {/* Profil & Stage (Text clicks directly to tab; Hover delay or Chevron click opens dropdown) */}
          <div
            className="relative py-2 flex items-center"
            onMouseEnter={() => handleMouseEnterNav('stage')}
            onMouseLeave={handleMouseLeaveNav}
          >
            <div className="relative inline-flex items-center gap-0.5 lg:gap-1 pb-1.5">
              <button
                type="button"
                onClick={() => handleSelectItem('stage')}
                className={`text-[13.5px] lg:text-[15px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                  activeNav === 'stage'
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Profil &amp; Stage
              </button>
              <button
                type="button"
                aria-expanded={openDropdown === 'stage'}
                aria-controls="dropdown-stage"
                aria-label="Afficher le sous-menu Profil & Stage"
                onClick={() => {
                  clearHoverTimers();
                  setOpenDropdown(openDropdown === 'stage' ? null : 'stage');
                }}
                className={`p-1 rounded-[4px] cursor-pointer transition-colors duration-150 ${
                  activeNav === 'stage'
                    ? 'text-[var(--ink)] hover:bg-[var(--surface)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    openDropdown === 'stage' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                  activeNav === 'stage' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>

            {openDropdown === 'stage' && (
              <div
                id="dropdown-stage"
                className="dropdown-panel absolute left-0 top-full mt-1 w-64 p-2 z-50"
              >
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'a-propos')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Profil &amp; Objectif</div>
                  <div className="text-[12px] text-[var(--muted)]">Stage de 3 à 6 mois à Brazzaville</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'competences')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Mes bases &amp; compétences</div>
                  <div className="text-[12px] text-[var(--muted)]">Notions, bases et outils bureautiques</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'exemples')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Exemples fictifs</div>
                  <div className="text-[12px] text-[var(--muted)]">Balance âgée, relance, trésorerie</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'parcours')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Parcours</div>
                  <div className="text-[12px] text-[var(--muted)]">ESGAE, ULC, DAS 1 &amp; 2, Masterclass 4 h</div>
                </button>
              </div>
            )}
          </div>

          {/* Digital Web (Text clicks directly to tab; Hover delay or Chevron click opens dropdown) */}
          <div
            className="relative py-2 flex items-center"
            onMouseEnter={() => handleMouseEnterNav('digital')}
            onMouseLeave={handleMouseLeaveNav}
          >
            <div className="relative inline-flex items-center gap-0.5 lg:gap-1 pb-1.5">
              <button
                type="button"
                onClick={() => handleSelectItem('digital')}
                className={`text-[13.5px] lg:text-[15px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                  activeNav === 'digital'
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                Digital Web
              </button>
              <button
                type="button"
                aria-expanded={openDropdown === 'digital'}
                aria-controls="dropdown-digital"
                aria-label="Afficher le sous-menu Digital Web"
                onClick={() => {
                  clearHoverTimers();
                  setOpenDropdown(openDropdown === 'digital' ? null : 'digital');
                }}
                className={`p-1 rounded-[4px] cursor-pointer transition-colors duration-150 ${
                  activeNav === 'digital'
                    ? 'text-[var(--ink)] hover:bg-[var(--surface)]'
                    : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
                }`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    openDropdown === 'digital' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                  activeNav === 'digital' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>

            {openDropdown === 'digital' && (
              <div
                id="dropdown-digital"
                className="dropdown-panel absolute left-0 top-full mt-1 w-64 p-2 z-50"
              >
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'projets')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Mes projets numériques</div>
                  <div className="text-[12px] text-[var(--muted)]">n8n, Zapier, Facebook Ads, web + IA</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'devis')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Un petit besoin ?</div>
                  <div className="text-[12px] text-[var(--muted)]">Formulaire simple WhatsApp &amp; e-mail</div>
                </button>
              </div>
            )}
          </div>

          {/* Contact direct link */}
          <div className="relative py-2 flex items-center">
            <button
              type="button"
              onClick={() => {
                clearHoverTimers();
                setOpenDropdown(null);
                onOpenContact();
              }}
              className="pb-1.5 text-[13.5px] lg:text-[15px] font-medium text-[var(--muted)] hover:text-[var(--ink)] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
            >
              Contact
            </button>
          </div>

        </nav>

        {/* Right: Secondary "Mon CV" + Primary "Me contacter" (Desktop md+) */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-3 shrink-0">
          <a
            href={PERSONAL_INFO.cvDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary !h-[38px] lg:!h-[44px] !px-2.5 lg:!px-[18px] !text-[13px] lg:!text-[15px]"
          >
            Mon CV
          </a>
          <button
            type="button"
            onClick={onOpenContact}
            className="btn-primary !h-[38px] lg:!h-[44px] !px-3 lg:!px-[20px] !text-[13px] lg:!text-[15px] group"
          >
            <span>Me contacter</span>
            <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 chevron-slide" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Menu Trigger (< 768px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-fullscreen-menu"
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="md:hidden w-11 h-11 rounded-[6px] flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Fullscreen Mobile Navigation Panel (< 768px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-fullscreen-menu"
          className="md:hidden fixed inset-0 top-18 z-50 bg-[var(--bg)] flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="space-y-8">
            <div className="pb-4 border-b border-[var(--hairline)]">
              <button
                type="button"
                onClick={() => handleSelectItem('stage', undefined, true)}
                className="inline-flex items-center gap-2.5 w-full text-left py-2 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                <span>Home</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                Profil &amp; Stage
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'a-propos')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  À propos &amp; Objectif
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'parcours')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Parcours
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'competences')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Compétences
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'exemples')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Exemples métiers
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--hairline)] space-y-3">
              <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                Digital Web
              </div>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'projets')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Mes projets numériques
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'devis')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Un petit besoin ?
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--hairline)]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-8 border-t border-[var(--hairline)] grid grid-cols-2 gap-3">
            <a
              href={PERSONAL_INFO.cvDownloadUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full"
            >
              Mon CV
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="btn-primary w-full group"
            >
              <span>Me contacter</span>
              <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
