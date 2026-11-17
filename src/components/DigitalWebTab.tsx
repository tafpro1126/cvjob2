import { useEffect, useRef, useState } from 'react';
import { ProjectCase } from '../types.ts';
import { SERVICES_DATA, PERSONAL_INFO } from '../data/portfolioData.ts';
import { Check, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Reveal } from './MotionPrimitives.tsx';

interface DigitalWebTabProps {
  onOpenContact: () => void;
}

type ProjectFilter = 'all' | 'gestion' | 'web' | 'ecommerce';

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

export function DigitalWebTab({ onOpenContact }: DigitalWebTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  // Quote builder states (custom selectors, name + contact required validation)
  const [quoteName, setQuoteName] = useState<string>('');
  const [quoteContact, setQuoteContact] = useState<string>('');
  const [quoteService, setQuoteService] = useState<string>(SERVICES_DATA[1].title);
  const [quoteDelay, setQuoteDelay] = useState<string>('Standard (2 semaines)');
  const [quoteDetails, setQuoteDetails] = useState<string>('');
  const [quoteError, setQuoteError] = useState<string>('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  const projects: ProjectCase[] = [
    {
      id: 'telecom-billing',
      title: 'Outil de facturation & suivi des relances',
      category: 'gestion',
      categoryLabel: 'Gestion & Recouvrement',
      badge: 'Démonstration',
      summary:
        'Suivi des factures récurrentes, calcul automatique des retards et préparation des messages de relance SMS et WhatsApp.',
      problem:
        'Des factures dispersées sur plusieurs feuilles de calcul entraînaient des oublis de relance et des délais d’encaissement supérieurs à un mois.',
      solution:
        'Centralisation dans une interface unique calculant la balance âgée et préparant des modèles de relance personnalisés.',
      stack: ['React', 'TypeScript', 'Node.js', 'Base relationnelle'],
      results: [
        'Suivi clair des créances échues par tranche de retard',
        'Réduction estimée du temps administratif de préparation des relances',
        'Historique unifié des paiements partiels',
      ],
      mockupType: 'desktop',
      featured: true,
    },
    {
      id: 'student-association',
      title: 'Portail d’adhésions & suivi des cotisations',
      category: 'web',
      categoryLabel: 'Portail web',
      badge: 'Projet réel',
      summary:
        'Interface mobile d’enregistrement, de reçu dématérialisé et de traçabilité des cotisations pour une structure associative.',
      problem:
        'Inscriptions manuelles sur cahiers papier, perte fréquente de reçus et difficultés lors du pointage de caisse.',
      solution:
        'Plateforme légère utilisable sur smartphone avec confirmation immédiate, génération de reçu et tableau récapitulatif exportable.',
      stack: ['React', 'Tailwind CSS', 'Base cloud', 'Export tableur'],
      results: [
        'Registre centralisé accessible depuis mobile et ordinateur',
        'Clôture des comptes nettement plus rapide',
        'Traçabilité complète des cotisations perçues',
      ],
      mockupType: 'mobile',
      featured: true,
    },
    {
      id: 'ecommerce-ads',
      title: 'Catalogue WhatsApp & campagnes Facebook Ads',
      category: 'ecommerce',
      categoryLabel: 'E-commerce local',
      badge: 'Projet réel',
      summary:
        'Catalogue en ligne léger relié directement au WhatsApp du vendeur avec campagnes géolocalisées sur Brazzaville.',
      problem:
        'De nombreux messages non qualifiés arrivaient sur WhatsApp sans connaissance préalable des prix ni des disponibilités.',
      solution:
        'Site catalogue adapté aux connexions mobiles locales avec panier pré-rempli vers WhatsApp et publicités ciblées.',
      stack: ['WordPress / WooCommerce', 'WhatsApp', 'Meta Ads Manager'],
      results: [
        'Demandes de commande mieux qualifiées dès le premier message',
        'Ciblage précis sur Brazzaville',
        'Présentation claire des tarifs en FCFA',
      ],
      mockupType: 'mobile',
      featured: true,
    },
    {
      id: 'treasury-dashboard',
      title: 'Tableau de bord trésorerie Google Workspace',
      category: 'gestion',
      categoryLabel: 'Gestion & Automatisation',
      badge: 'Démonstration',
      summary:
        'Saisie mobile des dépenses sur Google Forms, synchronisation Google Sheets en temps réel et alerte de seuil bas.',
      problem:
        'Visibilité tardive sur l’état réel de la caisse en fin de mois uniquement, compliquant l’anticipation des paiements.',
      solution:
        'Formulaire mobile rapide relié à un classeur Google Sheets calculant automatiquement le solde journalier.',
      stack: ['Google Sheets', 'Google Forms', 'Apps Script'],
      results: [
        'Pointage de caisse bouclé en quelques minutes chaque soir',
        'Anticipation des sorties de trésorerie à 15 jours',
        'Aucun coût de licence logicielle',
      ],
      mockupType: 'desktop',
      featured: true,
    },
  ];

  const filteredProjects = projects.filter((p) => {
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

  const serviceOptions: CustomSelectOption[] = [
    ...SERVICES_DATA.map((s) => ({ value: s.title, label: s.title })),
    { value: 'Proposer un entretien', label: 'Proposer un entretien' },
  ];

  const delayOptions: CustomSelectOption[] = [
    { value: "Urgent (moins d'une semaine)", label: "Urgent (moins d'une semaine)" },
    { value: 'Standard (2 semaines)', label: 'Standard (2 semaines)' },
    { value: 'Flexible (1 mois)', label: 'Flexible (1 mois)' },
  ];

  const quoteMessageText = `Bonjour Marion,\n\nNom : ${quoteName.trim()}\nContact : ${quoteContact.trim()}\nObjet : ${quoteService}\nDélai : ${quoteDelay}\nPrécisions : ${quoteDetails.trim() || 'À préciser lors de notre échange'}`;
  const quoteWhatsappUrl = `https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${encodeURIComponent(quoteMessageText)}`;
  const quoteMailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`${quoteService} — ${quoteName.trim() || 'Nouveau contact'}`)}&body=${encodeURIComponent(quoteMessageText)}`;

  const handleQuoteChannelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!quoteName.trim() || !quoteContact.trim()) {
      e.preventDefault();
      setQuoteError('Merci d’indiquer votre nom et un moyen de vous contacter (téléphone ou e-mail).');
      return;
    }
    setQuoteError('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-24 lg:space-y-32">
      
      {/* SECTION 1 : PASSERELLE GESTION & OUTILS WEB */}
      <section id="passerelle" className="scroll-mt-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Digital Web
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                La gestion d’entreprise, accélérée par le numérique.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5 text-[16px] sm:text-[17px] text-[var(--muted)] leading-[1.65]">
              <p>
                Dans de nombreuses PME à <span className="whitespace-nowrap">Brazzaville</span>, des heures entières sont consacrées chaque semaine à recopier des factures papier ou vérifier des carnets de caisse sans suivi structuré.
              </p>
              <p>
                En complément de ma formation en gestion, je conçois des formulaires mobiles simples, des tableaux de bord Google Sheets automatisés et des sites légers pour gagner du temps et développer les ventes.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 : PROJETS (Étiquetés Projet réel / Démonstration, sans fausse URL, emplacement visuel optimisé) */}
      <section id="projets" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-xl">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Réalisations &amp; modèles
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Projets et démonstrations
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Ouvrez une fiche pour consulter le contexte, la solution mise en place et les résultats.
              </p>
            </div>

            <div role="tablist" aria-label="Filtrer les projets par catégorie" className="flex items-center gap-6 border-b border-[var(--hairline)] overflow-x-auto">
              {[
                { id: 'all' as const, label: `Tous (${projects.length})` },
                { id: 'gestion' as const, label: 'Gestion' },
                { id: 'web' as const, label: 'Web' },
                { id: 'ecommerce' as const, label: 'E-commerce' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delayMs={idx * 60}>
              <article className="project-card overflow-hidden flex flex-col h-full">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="text-left flex-1 flex flex-col justify-between cursor-pointer w-full group"
                >
                  <div>
                    {/* Visual capture slot (ready for lazy-loaded WebP screenshots; crisp SVG illustration by default) */}
                    <div className="h-48 bg-[var(--surface)] overflow-hidden relative flex items-center justify-center p-6">
                      <div className="project-card-media w-full h-full flex items-center justify-center">
                        {project.mockupType === 'desktop' ? (
                          <div className="w-full max-w-[280px] rounded-[8px] bg-[#0A2540] text-white p-3.5 shadow-md space-y-2.5">
                            <div className="flex items-center justify-between text-[10px] text-white/70">
                              <span>Interface bureau</span>
                              <span className="tnum">{project.badge}</span>
                            </div>
                            <div className="h-1.5 w-3/4 rounded bg-white/20" />
                            <div className="grid grid-cols-3 gap-2 pt-1">
                              <div className="h-8 rounded bg-white/10" />
                              <div className="h-8 rounded bg-[var(--accent)]/60" />
                              <div className="h-8 rounded bg-white/10" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-32 h-36 rounded-[14px] bg-[#0A2540] text-white p-3 shadow-md flex flex-col justify-between">
                            <div className="text-[9px] text-white/70 text-center">Vue mobile</div>
                            <div className="space-y-1.5">
                              <div className="h-2 w-full rounded bg-white/25" />
                              <div className="h-2 w-2/3 rounded bg-white/15" />
                            </div>
                            <div className="py-1 px-2 rounded bg-[var(--accent)] text-white text-[10px] text-center font-medium">
                              WhatsApp direct
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="flex items-center justify-between gap-3 text-[12px]">
                        <span className="font-medium text-[var(--accent)]">{project.categoryLabel}</span>
                        <span className="font-medium text-[var(--ink)]">{project.badge}</span>
                      </div>
                      <h3 className="text-[20px] font-medium text-[var(--ink)] leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[15px] text-[var(--muted)] leading-relaxed">
                        {project.summary}
                      </p>
                      <div className="pt-2 text-[13px] text-[var(--subtle)]">
                        Outils : {project.stack.join(' · ')}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-[14px] font-medium text-[var(--accent)]">
                    <span>Ouvrir la fiche détaillée</span>
                    <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
                  </div>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3 : SERVICES PRESTATAIRE & FORMULAIRE DEVIS */}
      <section id="services" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)] space-y-16">
        <Reveal>
          <div className="max-w-2xl space-y-2">
            <div className="text-[13px] font-medium text-[var(--accent)]">
              Prestations indépendantes
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
              Services web &amp; digitalisation pour PME
            </h2>
            <p className="text-[15px] text-[var(--muted)]">
              Interventions ponctuelles auprès d’entreprises, commerçants et associations à <span className="whitespace-nowrap">Brazzaville</span>.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {SERVICES_DATA.map((srv, idx) => (
            <Reveal key={srv.id} delayMs={idx * 50}>
              <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 flex items-start gap-4">
                  <span className="text-[13px] font-normal text-[var(--subtle)] tnum pt-1">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[18px] font-medium text-[var(--ink)]">
                      {srv.title}
                    </h3>
                    <div className="text-[13px] text-[var(--accent)]">
                      {srv.tag}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <p className="text-[15px] text-[var(--muted)] leading-relaxed">
                    {srv.description}
                  </p>
                  <ul className="space-y-1.5 text-[14px] text-[var(--muted)]">
                    {srv.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-[var(--accent)]">—</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2 lg:text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setQuoteService(srv.title);
                      const el = document.getElementById('devis');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--accent)] hover:underline cursor-pointer group"
                  >
                    <span>Demander un devis</span>
                    <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Formulaire Devis : Nom + Contact + Sélecteurs personnalisés + WhatsApp ET Email */}
        <Reveal>
          <div id="devis" className="scroll-mt-24 bg-[var(--surface)] rounded-[10px] p-6 sm:p-10 space-y-6">
            <div className="max-w-xl space-y-1.5">
              <h3 className="text-[20px] font-medium text-[var(--ink)]">
                Demander un devis ou proposer un entretien
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Renseignez votre nom et votre contact, choisissez l’objet, puis envoyez directement par WhatsApp ou par e-mail.
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
                  placeholder="Ex : Nom et prénom"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>

              <div>
                <label htmlFor="quote-contact" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Téléphone, WhatsApp ou E-mail *
                </label>
                <input
                  id="quote-contact"
                  type="text"
                  value={quoteContact}
                  onChange={(e) => {
                    setQuoteContact(e.target.value);
                    if (quoteError) setQuoteError('');
                  }}
                  placeholder="Ex : +242 06 ... ou nom@entreprise.cg"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>

              <CustomSelect
                id="quote-service-select"
                label="Type de besoin"
                value={quoteService}
                options={serviceOptions}
                onChange={setQuoteService}
              />

              <CustomSelect
                id="quote-delay-select"
                label="Délai envisagé"
                value={quoteDelay}
                options={delayOptions}
                onChange={setQuoteDelay}
              />

              <div className="md:col-span-2">
                <label htmlFor="quote-details" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Précisions rapides (optionnel)
                </label>
                <input
                  id="quote-details"
                  type="text"
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  placeholder="Ex : suivi de caisse quotidien ou entretien de stage"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>
            </div>

            {quoteError && (
              <p role="alert" className="text-[13px] font-medium text-red-600 dark:text-red-400">
                {quoteError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <a
                href={quoteMailtoUrl}
                onClick={handleQuoteChannelClick}
                className="btn-secondary"
              >
                Envoyer par e-mail
              </a>
              <a
                href={quoteWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleQuoteChannelClick}
                className="btn-primary group"
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
                  1. Problème rencontré
                </div>
                <p className="text-[var(--muted)]">{selectedProject.problem}</p>
              </div>

              <div className="space-y-1 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  2. Solution mise en place
                </div>
                <p className="text-[var(--muted)]">{selectedProject.solution}</p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  3. Outils utilisés
                </div>
                <p className="text-[var(--ink)] font-medium text-[14px]">
                  {selectedProject.stack.join(' · ')}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  4. Résultats
                </div>
                <ul className="space-y-1.5 text-[14px] text-[var(--muted)] tnum">
                  {selectedProject.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[var(--accent)]">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
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
                <span>Discuter de ce projet</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
