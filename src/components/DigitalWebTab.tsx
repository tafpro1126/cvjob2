import { useEffect, useRef, useState } from 'react';
import { ProjectCase } from '../types.ts';
import {
  DIGITAL_PROJECTS_DATA,
  SERVICES_DATA,
  PERSONAL_INFO,
} from '../data/portfolioData.ts';
import { Check, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Reveal } from './MotionPrimitives.tsx';

type ProjectFilter = 'all' | 'automation' | 'ads' | 'web';

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  options: CustomSelectOption[];
  onChange: (val: string) => void;
}

function CustomSelect({ id, label, value, options, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const currentLabel = options.find((o) => o.value === value)?.label || value;

  return (
    <div ref={containerRef} className="relative">
      <label id={`${id}-label`} htmlFor={id} className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}`}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] flex items-center justify-between gap-2 text-left cursor-pointer hover:border-[var(--muted)] transition-colors"
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 text-[var(--subtle)] shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="dropdown-panel absolute left-0 right-0 top-full mt-1.5 z-30 py-1 max-h-60 overflow-y-auto"
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 text-left text-[14px] flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                    selected
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)] font-medium'
                      : 'text-[var(--ink)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selected && <Check className="w-4 h-4 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface DigitalWebTabProps {
  onOpenContact: () => void;
}

export function DigitalWebTab({ onOpenContact }: DigitalWebTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  const [quoteName, setQuoteName] = useState<string>('');
  const [quoteContact, setQuoteContact] = useState<string>('');
  const [quoteService, setQuoteService] = useState<string>(SERVICES_DATA[0].title);
  const [quoteDelay, setQuoteDelay] = useState<string>('Flexible (selon disponibilité)');
  const [quoteDetails, setQuoteDetails] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = DIGITAL_PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  useEffect(() => {
    if (!selectedProject) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = modalRef.current;
    if (container) {
      const closeBtn = container.querySelector<HTMLElement>('button');
      closeBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedProject(null);
        return;
      }
      if (e.key === 'Tab' && container) {
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus();
    };
  }, [selectedProject]);

  // Custom selectors strictly without "Stage en entreprise"
  const serviceOptions: CustomSelectOption[] = SERVICES_DATA.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  const delayOptions: CustomSelectOption[] = [
    { value: 'Cette semaine', label: 'Cette semaine' },
    { value: 'Sous 2 semaines', label: 'Sous 2 semaines' },
    { value: 'Flexible (selon disponibilité)', label: 'Flexible (selon disponibilité)' },
  ];

  const quoteMessageText = `Bonjour Marion,\n\nNom : ${quoteName.trim()}\nContact : ${quoteContact.trim()}\nBesoin : ${quoteService}\nDélai : ${quoteDelay}\nPrécisions : ${quoteDetails.trim() || 'À préciser ensemble'}`;
  const quoteWhatsappUrl = `https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${encodeURIComponent(quoteMessageText)}`;
  const quoteMailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`${quoteService} — ${quoteName.trim() || 'Nouveau message'}`)}&body=${encodeURIComponent(quoteMessageText)}`;

  const handleQuoteChannelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!quoteName.trim() || !quoteContact.trim()) {
      e.preventDefault();
      setQuoteError('Merci d’indiquer votre nom et un moyen de vous répondre (téléphone ou e-mail).');
      return;
    }
    setQuoteError('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-24 lg:space-y-32">

      {/* SECTION 1 : AUTO-FORMATION NUMÉRIQUE */}
      <section id="passerelle" className="scroll-mt-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Auto-formation numérique
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Ce que je pratique à côté de la gestion.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5 text-[16px] sm:text-[17px] text-[var(--muted)] leading-[1.65]">
              <p>
                Depuis 2023 [période exacte À CONFIRMER], je me forme en autonomie aux outils numériques. Je suis à l’aise au quotidien avec Word, Excel, PowerPoint et Canva pour produire des documents propres et lisibles.
              </p>
              <p>
                J’apprends aussi les bases de l’automatisation (n8n, Zapier, API), de la publicité en ligne (Facebook Ads et TikTok Ads — avec une première campagne Facebook réalisée sans résultats concluants) et de la création web avec l’aide de l’IA. Ce sont des outils complémentaires à mon objectif principal : un stage en gestion d’entreprise à {PERSONAL_INFO.location}.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 : MES PROJETS NUMÉRIQUES */}
      <section id="projets" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-xl">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Apprentissage pratique
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Mes projets numériques
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Chaque fiche précise s’il s’agit d’un essai réel ou d’une démonstration, les outils utilisés et le résultat honnête.
              </p>
            </div>

            <div role="tablist" aria-label="Filtrer mes projets numériques" className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-[var(--hairline)]">
              {[
                { id: 'all' as const, label: `Tous (${DIGITAL_PROJECTS_DATA.length})` },
                { id: 'automation' as const, label: 'Automatisation' },
                { id: 'ads' as const, label: 'Publicités' },
                { id: 'web' as const, label: 'Web & IA' },
              ].map((tab) => {
                const active = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`relative pb-3 text-[14px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                      active ? 'text-[var(--ink)]' : 'text-[var(--subtle)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[var(--accent)] transition-transform duration-200 origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delayMs={idx * 60}>
              <article className="project-card overflow-hidden flex flex-col h-full">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-left flex-1 flex flex-col justify-between cursor-pointer w-full group"
                >
                  <div>
                    {/* Device frame preview slot for real screenshot [IMAGE] */}
                    <div className="h-48 bg-[var(--surface)] overflow-hidden relative flex items-center justify-center p-5">
                      <div className="project-card-media w-full h-full flex items-center justify-center">
                        {project.mockupType === 'desktop' ? (
                          <div className="w-full max-w-[260px] rounded-[8px] bg-[#0A2540] text-white p-3.5 shadow-md space-y-2.5">
                            <div className="flex items-center justify-between text-[10px] text-white/70">
                              <span className="inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                              </span>
                              <span>Capture écran</span>
                            </div>
                            <div className="h-20 rounded bg-white/10 border border-dashed border-white/25 flex items-center justify-center text-[11px] text-white/80">
                              [IMAGE]
                            </div>
                          </div>
                        ) : (
                          <div className="w-28 h-36 rounded-[14px] bg-[#0A2540] text-white p-2.5 shadow-md flex flex-col justify-between">
                            <div className="w-8 h-1 rounded-full bg-white/25 mx-auto" />
                            <div className="flex-1 my-2 rounded bg-white/10 border border-dashed border-white/25 flex items-center justify-center text-[10px] text-white/80">
                              [IMAGE]
                            </div>
                            <div className="text-[9px] text-white/70 text-center">Mobile</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
                        <span className="font-medium text-[var(--accent)]">{project.categoryLabel}</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[var(--surface)] font-medium text-[var(--ink)]">
                          {project.badge}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-medium text-[var(--ink)] leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                        {project.summary}
                      </p>
                      <div className="pt-1 text-[13px] text-[var(--subtle)]">
                        Outils : {project.stack.join(' · ')}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-[14px] font-medium text-[var(--accent)]">
                    <span>Voir les détails</span>
                    <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
                  </div>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3 : UN PETIT BESOIN ? PARLONS-EN (Formulaire discret) */}
      <section id="devis" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)] space-y-10">
        <Reveal>
          <div className="bg-[var(--surface)] rounded-[10px] p-6 sm:p-10 space-y-6">
            <div className="max-w-xl space-y-1.5">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Coup de main bureautique ou numérique
              </div>
              <h2 className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] tracking-[-0.02em]">
                Un petit besoin ? Parlons-en
              </h2>
              <p className="text-[14px] text-[var(--muted)]">
                Si vous avez besoin d’un coup de main ponctuel sur Word, Excel, PowerPoint, Canva ou un essai simple sur n8n/Zapier, laissez votre nom et votre contact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-name" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Votre nom *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  value={quoteName}
                  onChange={(e) => {
                    setQuoteName(e.target.value);
                    if (quoteError) setQuoteError('');
                  }}
                  placeholder="Nom et prénom"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>

              <div>
                <label htmlFor="quote-contact" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Téléphone, WhatsApp ou e-mail *
                </label>
                <input
                  id="quote-contact"
                  type="text"
                  value={quoteContact}
                  onChange={(e) => {
                    setQuoteContact(e.target.value);
                    if (quoteError) setQuoteError('');
                  }}
                  placeholder="Ex : +242 06 ... ou e-mail"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>

              <CustomSelect
                id="quote-service-select"
                label="Sujet"
                value={quoteService}
                options={serviceOptions}
                onChange={setQuoteService}
              />

              <CustomSelect
                id="quote-delay-select"
                label="Délai souhaité"
                value={quoteDelay}
                options={delayOptions}
                onChange={setQuoteDelay}
              />

              <div className="md:col-span-2">
                <label htmlFor="quote-details" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Précisions (optionnel)
                </label>
                <input
                  id="quote-details"
                  type="text"
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  placeholder="Décrivez brièvement ce dont vous avez besoin"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>
            </div>

            {quoteError && (
              <p role="alert" className="text-[13px] font-medium text-red-600 dark:text-red-400">
                {quoteError}
              </p>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
              <a
                href={quoteMailtoUrl}
                onClick={handleQuoteChannelClick}
                className="btn-secondary w-full sm:w-auto"
              >
                Envoyer par e-mail
              </a>
              <a
                href={quoteWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleQuoteChannelClick}
                className="btn-primary group w-full sm:w-auto"
              >
                <span>Envoyer sur WhatsApp</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ACCESSIBLE PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
              <div>
                <div className="text-[12px] font-medium text-[var(--accent)]">
                  {selectedProject.categoryLabel} · {selectedProject.badge}
                </div>
                <h3 id="project-modal-title" className="text-[22px] font-medium text-[var(--ink)] mt-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Fermer la fiche projet"
                className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5 text-[15px] leading-relaxed">
              <div className="space-y-1">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  1. Ce qui a été fait
                </div>
                <p className="text-[var(--muted)]">{selectedProject.workDone}</p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  2. Outils utilisés
                </div>
                <p className="text-[var(--ink)] font-medium text-[14px]">
                  {selectedProject.stack.join(' · ')}
                </p>
              </div>

              <div className="space-y-1 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  3. Résultat honnête
                </div>
                <p className="text-[var(--muted)]">{selectedProject.honestResult}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={() => setSelectedProject(null)} className="btn-secondary">
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  onOpenContact();
                }}
                className="btn-primary group"
              >
                <span>Échanger à ce sujet</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
