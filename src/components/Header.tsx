import { useEffect, useRef, useState } from 'react';
import { ActiveTab } from '../types.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab, sectionId?: string) => void;
  onOpenContact: () => void;
}

export function Header({ activeTab, onNavigate, onOpenContact }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'stage' | 'digital' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

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
    };
  }, []);

  const handleSelectItem = (tab: ActiveTab, sectionId?: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(tab, sectionId);
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 w-full site-header ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Left: Monogram & Name */}
        <a
          href="#stage"
          onClick={(e) => {
            e.preventDefault();
            handleSelectItem('stage');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2.5 text-[16px] font-semibold text-[var(--ink)] whitespace-nowrap shrink-0 tracking-tight"
        >
          <span className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] text-[12px] font-semibold flex items-center justify-center">
            MM
          </span>
          <span>{PERSONAL_INFO.name}</span>
        </a>

        {/* Center: Navigation Links with Dropdowns (Desktop md+) */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
          
          {/* Profil & Stage Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'stage'}
              aria-controls="dropdown-stage"
              onClick={() => setOpenDropdown(openDropdown === 'stage' ? null : 'stage')}
              className={`relative py-2 inline-flex items-center gap-1.5 text-[15px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                activeTab === 'stage'
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <span>Profil &amp; Stage</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'stage' ? 'rotate-180' : ''
                }`}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                  activeTab === 'stage' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>

            {openDropdown === 'stage' && (
              <div
                id="dropdown-stage"
                className="dropdown-panel absolute left-0 top-full mt-2 w-64 p-2 z-50"
              >
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'a-propos')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Vue d'ensemble &amp; À propos</div>
                  <div className="text-[12px] text-[var(--muted)]">Objectif de stage à Brazzaville</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'parcours')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Parcours</div>
                  <div className="text-[12px] text-[var(--muted)]">ESGAE, ULC, Émeraude, Masterclass</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'competences')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Compétences</div>
                  <div className="text-[12px] text-[var(--muted)]">Commerce, Compta, Recouvrement</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('stage', 'exemples')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Exemples</div>
                  <div className="text-[12px] text-[var(--muted)]">Balance âgée, relance, trésorerie</div>
                </button>
              </div>
            )}
          </div>

          {/* Digital Web Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'digital'}
              aria-controls="dropdown-digital"
              onClick={() => setOpenDropdown(openDropdown === 'digital' ? null : 'digital')}
              className={`relative py-2 inline-flex items-center gap-1.5 text-[15px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                activeTab === 'digital'
                  ? 'text-[var(--ink)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              <span>Digital Web</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'digital' ? 'rotate-180' : ''
                }`}
              />
              <span
                className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                  activeTab === 'digital' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>

            {openDropdown === 'digital' && (
              <div
                id="dropdown-digital"
                className="dropdown-panel absolute left-0 top-full mt-2 w-64 p-2 z-50"
              >
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'projets')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Projets</div>
                  <div className="text-[12px] text-[var(--muted)]">Cas concrets : Facturation, Portails, Ads</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'services')}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-[var(--surface)] transition-colors cursor-pointer block"
                >
                  <div className="text-[14px] font-medium text-[var(--ink)]">Services</div>
                  <div className="text-[12px] text-[var(--muted)]">Sites, tableaux de bord, devis</div>
                </button>
              </div>
            )}
          </div>

          {/* Contact direct link */}
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onOpenContact();
            }}
            className="py-2 text-[15px] font-medium text-[var(--muted)] hover:text-[var(--ink)] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
          >
            Contact
          </button>

        </nav>

        {/* Right: Secondary "Mon CV" + Primary "Me contacter" (Desktop md+) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
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
            onClick={onOpenContact}
            className="btn-primary group"
          >
            <span>Me contacter</span>
            <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
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
                  Projets réalisés
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectItem('digital', 'services')}
                  className="w-full text-left py-2.5 text-[18px] font-medium text-[var(--ink)] cursor-pointer"
                >
                  Services &amp; Devis
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
