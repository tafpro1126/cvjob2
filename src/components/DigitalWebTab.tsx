import { useEffect, useRef, useState } from 'react';
import { ProjectCase } from '../types.ts';
import { SERVICES_DATA, PERSONAL_INFO } from '../data/portfolioData.ts';
import { ChevronRight, X } from 'lucide-react';
import { Reveal } from './MotionPrimitives.tsx';

interface DigitalWebTabProps {
  onOpenContact: () => void;
}

type ProjectFilter = 'all' | 'gestion' | 'web' | 'ecommerce';

export function DigitalWebTab({ onOpenContact }: DigitalWebTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  const [quoteService, setQuoteService] = useState<string>('Tableaux de Bord de Gestion & Trésorerie Automatisés');
  const [quoteDelay, setQuoteDelay] = useState<string>('Standard (2 semaines)');
  const [quoteDetails, setQuoteDetails] = useState<string>('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  const projects: ProjectCase[] = [
    {
      id: 'telecom-billing',
      title: 'Facturation & Recouvrement pour Télécoms',
      category: 'gestion',
      categoryLabel: 'Gestion & Recouvrement',
      badge: 'Cas entreprise',
      summary:
        'Génération de factures récurrentes, calcul automatique des retards de paiement et préparation des relances SMS et WhatsApp.',
      problem:
        'Une PME locale perdait plus d’un mois de délai sur ses règlements à cause de factures dispersées sur plusieurs feuilles Excel sans suivi structuré des impayés.',
      solution:
        'Mise en place d’un outil centralisé avec édition immédiate des reçus PDF, calcul automatique de la balance âgée et génération de messages de relance personnalisés.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Passerelle SMS'],
      results: [
        '-45 % de temps consacré au suivi administratif mensuel',
        '+32 % d’encaissements sous 30 jours dès le deuxième mois',
        'Aucune créance oubliée ou égarée',
      ],
      mockupType: 'desktop',
      featured: true,
    },
    {
      id: 'student-association',
      title: 'Gestion des Adhésions & Cotisations Étudiantes',
      category: 'web',
      categoryLabel: 'Portail web',
      badge: 'Projet associatif',
      summary:
        'Plateforme mobile d’inscription, de reçu dématérialisé et de traçabilité des cotisations annuelles pour le trésorier.',
      problem:
        'Inscriptions manuelles sur cahiers papier, perte fréquente de reçus et contestations lors de la reddition des comptes financiers.',
      solution:
        'Développement d’une interface web légère utilisable sur smartphone avec confirmation instantanée, reçu téléchargeable et bilan exportable.',
      stack: ['React', 'Tailwind CSS', 'Base cloud', 'Export tableur'],
      results: [
        '450 adhésions enregistrées sans aucune perte de registre',
        'Clôture du bilan financier en 1 journée au lieu de 2 semaines',
        'Traçabilité complète des fonds collectés',
      ],
      mockupType: 'mobile',
      featured: true,
    },
    {
      id: 'ecommerce-ads',
      title: 'Boutique WhatsApp & Campagnes Facebook Ads',
      category: 'ecommerce',
      categoryLabel: 'E-commerce local',
      badge: 'Commerce local',
      summary:
        'Catalogue de vente en ligne relié directement au WhatsApp de la boutique avec ciblage publicitaire sur Brazzaville.',
      problem:
        'Un commerçant recevait de nombreux messages non qualifiés sur WhatsApp, sans commandes fermes ni catalogue consultable avec les prix en FCFA.',
      solution:
        'Création d’un site catalogue épuré adapté aux connexions mobiles locales, commande pré-remplie vers WhatsApp et publicités Meta géolocalisées.',
      stack: ['WordPress / WooCommerce', 'WhatsApp', 'Meta Ads Manager'],
      results: [
        'Multiplication par 3 des ventes mensuelles validées',
        'Ciblage géographique précis sur Brazzaville et Pointe-Noire',
        'Panier moyen augmenté grâce à la clarté du catalogue',
      ],
      mockupType: 'mobile',
      featured: true,
    },
    {
      id: 'treasury-dashboard',
      title: 'Tableau de Bord Trésorerie Google Workspace',
      category: 'gestion',
      categoryLabel: 'Gestion & Automatisation',
      badge: 'Gestion PME',
      summary:
        'Saisie mobile des dépenses sur Google Forms, synchronisation Google Sheets en temps réel et alertes de seuil critique.',
      problem:
        'Visibilité tardive sur la trésorerie réelle en fin de mois uniquement, entraînant des frais bancaires imprévus et des tensions de liquidité.',
      solution:
        'Formulaire de saisie rapide sur le téléphone des gérants, mise à jour instantanée du solde de caisse et prévisionnel à 15 jours.',
      stack: ['Google Sheets', 'Google Forms', 'Google Apps Script', 'Looker Studio'],
      results: [
        'Pointage de caisse quotidien bouclé en 5 minutes',
        'Anticipation des tensions de trésorerie deux semaines à l’avance',
        'Aucune licence logicielle payante requise',
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

  const quoteMessageText = `Bonjour Marion,\n\nJe souhaite un devis ou un cadrage pour : ${quoteService}.\nDélai envisagé : ${quoteDelay}.\nPrécisions : ${quoteDetails.trim() || '[À préciser lors de notre échange]'}`;
  const quoteWhatsappUrl = `https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${encodeURIComponent(quoteMessageText)}`;
  const quoteMailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`Demande de devis : ${quoteService}`)}&body=${encodeURIComponent(quoteMessageText)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-24 lg:space-y-32">
      
      {/* SECTION 1 : PASSERELLE GESTION & OUTILS WEB (Sans encadrement ni pastilles) */}
      <section id="passerelle" className="scroll-mt-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Digital Web &amp; Automatisation
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                La gestion d'entreprise, accélérée par le numérique.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5 text-[16px] sm:text-[17px] text-[var(--muted)] leading-[1.65]">
              <p>
                Dans beaucoup de PME à Brazzaville, des heures entières partent chaque semaine à recopier des factures papier, vérifier des carnets de caisse ou relancer des clients sans suivi structuré.
              </p>
              <p>
                Mon double profil apporte une réponse concrète :{' '}
                <strong className="font-medium text-[var(--ink)]">
                  je connais les règles comptables et commerciales, et je sais construire des outils simples pour les automatiser
                </strong>
                . Formulaires mobiles pour enregistrer les dépenses sur le terrain, tableurs Google Sheets qui calculent automatiquement la balance âgée, ou boutiques reliées à WhatsApp.
              </p>

              <div className="pt-6 border-t border-[var(--hairline)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[13px]">
                <div>
                  <div className="font-medium text-[var(--ink)]">Outils gratuits &amp; accessibles</div>
                  <div className="text-[var(--muted)] mt-1">Google Workspace, Apps Script, tableurs sans coût de licence.</div>
                </div>
                <div>
                  <div className="font-medium text-[var(--ink)]">Pensé pour le mobile</div>
                  <div className="text-[var(--muted)] mt-1">Interfaces rapides adaptées aux réseaux 3G/4G et smartphones.</div>
                </div>
                <div>
                  <div className="font-medium text-[var(--ink)]">Traçabilité immédiate</div>
                  <div className="text-[var(--muted)] mt-1">Zéro ressaisie manuelle et historique vérifiable à tout moment.</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 : PROJETS RÉALISÉS (Filtres soulignés + cartes élévation sans bordure) */}
      <section id="projets" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-xl">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Cas concrets
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Projets livrés et études de cas
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Cliquez sur un projet pour consulter le problème initial, la solution déployée et les résultats.
              </p>
            </div>

            {/* Borderless underline filter tabs */}
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
                      active
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--subtle)] hover:text-[var(--ink)]'
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

        {/* Project Cards Grid (Borderless, soft shadow, 2px lift & 3% inner media zoom) */}
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
                    {/* Media slot with 3% zoom on hover */}
                    <div className="h-52 bg-[var(--surface)] overflow-hidden relative flex items-center justify-center p-6">
                      <div className="project-card-media w-full h-full flex items-center justify-center">
                        {project.mockupType === 'desktop' ? (
                          <div className="w-full max-w-[290px] rounded-[8px] bg-[#0A2540] text-white p-3 shadow-md">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-white/60">
                              <span className="truncate font-mono">marion-moun/{project.id}</span>
                              <span className="tnum">[CAPTURE_PROJET]</span>
                            </div>
                            <div className="text-[12px] font-medium text-white truncate">
                              {project.title}
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] tnum">
                              <div className="p-2 rounded bg-white/5 text-white/80">
                                Suivi : Actif
                              </div>
                              <div className="p-2 rounded bg-white/5 text-white/80">
                                Balance : À jour
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-36 h-40 rounded-[14px] bg-[#0A2540] text-white p-3 shadow-md flex flex-col justify-between">
                            <div className="text-[9px] text-white/60 font-mono text-center">
                              [CAPTURE_PROJET]
                            </div>
                            <div className="text-[11px] font-medium leading-snug line-clamp-2">
                              {project.title}
                            </div>
                            <div className="py-1 px-2 rounded bg-[var(--accent)] text-white text-[10px] text-center font-medium">
                              Mobile Congo Ready
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="text-[12px] font-medium text-[var(--accent)]">
                        {project.categoryLabel} · {project.badge}
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

                  {/* Clean footer action */}
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

      {/* SECTION 3 : SERVICES PRESTATAIRE & DEMANDE DE DEVIS */}
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
              En parallèle de ma recherche de stage, j'interviens ponctuellement auprès de commerçants, cabinets et associations locales.
            </p>
          </div>
        </Reveal>

        {/* Numbered editorial service rows */}
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
                      const el = document.getElementById('devis-express');
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

        {/* Clean Surface Quote Configurator */}
        <Reveal>
          <div id="devis-express" className="bg-[var(--surface)] rounded-[10px] p-6 sm:p-10 space-y-6">
            <div className="max-w-xl space-y-1.5">
              <h3 className="text-[20px] font-medium text-[var(--ink)]">
                Cadrer un besoin ou demander un devis
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Préparez votre message en deux sélections : envoyez-le ensuite directement sur mon WhatsApp ou par e-mail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-service" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Type de besoin
                </label>
                <select
                  id="quote-service"
                  value={quoteService}
                  onChange={(e) => setQuoteService(e.target.value)}
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)]"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Proposition de stage en entreprise">Proposition de stage en entreprise</option>
                </select>
              </div>

              <div>
                <label htmlFor="quote-delay" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Délai souhaité
                </label>
                <select
                  id="quote-delay"
                  value={quoteDelay}
                  onChange={(e) => setQuoteDelay(e.target.value)}
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)]"
                >
                  <option value="Urgent (moins d'une semaine)">Urgent (moins d'une semaine)</option>
                  <option value="Standard (2 semaines)">Standard (2 semaines)</option>
                  <option value="Stage (Démarrage immédiat)">Stage (Démarrage immédiat)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="quote-details" className="block text-[13px] font-medium text-[var(--ink)] mb-1.5">
                  Précisions rapides (optionnel)
                </label>
                <input
                  id="quote-details"
                  type="text"
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  placeholder="Ex : suivi de caisse quotidien pour 2 points de vente à Brazzaville"
                  className="w-full h-[44px] px-3.5 rounded-[6px] bg-[var(--surface-elevated)] border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder:text-[var(--subtle)]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <a
                href={quoteMailtoUrl}
                className="btn-secondary"
              >
                Envoyer par e-mail
              </a>
              <a
                href={quoteWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary group"
              >
                <span>Envoyer sur WhatsApp</span>
                <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ACCESSIBLE PROJECT DETAIL MODAL (Focus trap + Escape) */}
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
                  3. Stack &amp; Outils
                </div>
                <p className="text-[var(--ink)] font-medium text-[14px]">
                  {selectedProject.stack.join(' · ')}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  4. Résultats constatés
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

              <div className="space-y-1 pt-4 border-t border-[var(--hairline)]">
                <div className="text-[12px] font-medium text-[var(--subtle)] uppercase tracking-wider">
                  5. Démonstration &amp; Lien
                </div>
                <p className="text-[13px] text-[var(--subtle)]">
                  Visuel d'aperçu : [CAPTURE_PROJET — ajouter une capture réelle si souhaité] · Lien démo : [À COMPLÉTER]
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="btn-secondary"
              >
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
