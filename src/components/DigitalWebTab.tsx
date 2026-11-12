import { useState } from 'react';
import { ProjectCase } from '../types.ts';
import { SERVICES_DATA, PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  X, 
  ArrowUpRight, 
  Check, 
  ExternalLink, 
  ChevronRight,
  Send,
  Sliders,
  Laptop,
  Smartphone
} from 'lucide-react';

interface DigitalWebTabProps {
  onOpenContact: () => void;
}

export function DigitalWebTab({ onOpenContact }: DigitalWebTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gestion' | 'web' | 'ecommerce' | 'automation'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  // Quote builder states
  const [quoteService, setQuoteService] = useState<string>('Tableau de bord de trésorerie');
  const [quoteDelay, setQuoteDelay] = useState<string>('Standard (2 semaines)');
  const [quoteDetails, setQuoteDetails] = useState<string>('');

  const projects: ProjectCase[] = [
    {
      id: 'telecom-billing',
      title: 'Facturation & Recouvrement pour Télécoms',
      category: 'gestion',
      categoryLabel: 'Gestion & Recouvrement',
      badge: 'Cas entreprise',
      summary: 'Génération de factures récurrentes, calcul automatique des intérêts de retard et déclenchement des relances SMS et WhatsApp.',
      problem: 'Une PME locale perdait plus d’un mois de délai sur ses règlements à cause de factures dispersées sur des feuilles Excel sans suivi structuré des impayés.',
      solution: 'Mise en place d’un outil centralisé avec édition immédiate des reçus PDF, calcul automatique de la balance âgée et préparation des messages de relance personnalisés.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Passerelle SMS'],
      results: [
        '-45% de temps passé sur la gestion administrative chaque mois',
        '+32% d’encaissements sous 30 jours dès le deuxième mois',
        'Zéro créance oubliée ou égarée'
      ],
      mockupType: 'desktop',
      featured: true
    },
    {
      id: 'student-association',
      title: 'Gestion des Adhésions & Cotisations Étudiantes',
      category: 'web',
      categoryLabel: 'Portail web',
      badge: 'Projet associatif',
      summary: 'Plateforme mobile d’inscription, de reçu dématérialisé et de traçabilité des cotisations annuelles pour l’association.',
      problem: 'Inscriptions manuelles sur cahiers papier, perte fréquente de reçus et contestations récurrentes lors de la reddition des comptes financiers.',
      solution: 'Développement d’une interface web légère utilisable sur smartphone avec confirmation instantanée, reçu téléchargeable et tableau récapitulatif pour le trésorier.',
      stack: ['React', 'Tailwind CSS', 'Supabase', 'Export Excel'],
      results: [
        '450 étudiants inscrits sans aucune perte de registre',
        'Clôture du bilan financier en 1 journée au lieu de 2 semaines',
        'Traçabilité complète des fonds collectés'
      ],
      mockupType: 'mobile',
      featured: true
    },
    {
      id: 'ecommerce-ads',
      title: 'Boutique WhatsApp & Campagnes Facebook Ads',
      category: 'ecommerce',
      categoryLabel: 'E-commerce local',
      badge: 'Commerce local',
      summary: 'Catalogue de vente en ligne relié directement au WhatsApp de la boutique avec ciblage publicitaire sur Brazzaville.',
      problem: 'Un commerçant recevait de nombreux messages non qualifiés sur WhatsApp, sans commandes fermes ni catalogue consultable avec les prix en FCFA.',
      solution: 'Création d’un site catalogue épuré optimisé pour le réseau mobile 3G/4G, bouton de commande pré-rempli dans WhatsApp et publicités Meta ciblées.',
      stack: ['WordPress / WooCommerce', 'WhatsApp API', 'Meta Ads Manager'],
      results: [
        'Multiplication par 3 des ventes mensuelles validées',
        'Ciblage géographique précis sur Brazzaville et Pointe-Noire',
        'Panier moyen augmenté grâce à la clarté du catalogue'
      ],
      mockupType: 'mobile',
      featured: true
    },
    {
      id: 'treasury-dashboard',
      title: 'Tableau de Bord Trésorerie Google Workspace',
      category: 'automation',
      categoryLabel: 'Automatisation',
      badge: 'Gestion PME',
      summary: 'Saisie mobile des dépenses sur Google Forms, synchronisation Google Sheets en temps réel et alertes de seuil critique.',
      problem: 'Visibilité tardive sur la trésorerie réelle en fin de mois uniquement, entraînant des frais bancaires imprévus et des tensions de liquidité.',
      solution: 'Formulaire de saisie rapide sur le téléphone des gérants, mise à jour instantanée du solde de caisse et prévisionnel à 15 jours.',
      stack: ['Google Sheets', 'Google Forms', 'Google Apps Script', 'Looker Studio'],
      results: [
        'Pointage de caisse quotidien bouclé en 5 minutes',
        'Anticipation des tensions de trésorerie deux semaines à l’avance',
        'Aucune licence logicielle payante requise'
      ],
      mockupType: 'desktop',
      featured: true
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleSendQuoteWhatsApp = () => {
    const text = encodeURIComponent(
      `Bonjour Marion,\n\nJe souhaite un devis pour : ${quoteService}.\nDélai envisagé : ${quoteDelay}.\nPrécisions : ${quoteDetails || '[À définir lors de notre échange]'}`
    );
    window.open(`https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      
      {/* SECTION 1 : MESSAGE DE PASSERELLE (Concret, sans buzzwords) */}
      <section className="space-y-3">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
          La passerelle : Gestion & Outils Web
        </h2>

        <div className="ios-inset-group p-5 sm:p-6 space-y-3 text-[15px] sm:text-[16px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Dans la plupart des PME locales, des heures entières sont perdues chaque semaine à recopier des chiffres à la main, vérifier des factures sur des carnets papier ou relancer des clients sans modèle formalisé.
          </p>
          <p>
            Mon avantage pour votre entreprise : <strong>je maîtrise les règles de gestion et je sais aussi construire les outils pour les faire tourner vite</strong>. Je crée des formulaires mobiles pour enregistrer les dépenses de caisse en direct, des tableurs interconnectés qui calculent automatiquement les retards de paiement, et des sites web réactifs pour développer vos ventes.
          </p>
          <div className="pt-1 flex flex-wrap gap-2 text-[13px] text-neutral-600 dark:text-neutral-400">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
              Outils Google Workspace gratuits
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
              Adapté aux smartphones
            </span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
              Traçabilité immédiate
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 : GALERIE DE CAS CONCRETS (Apple Developer Case Studies Style) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
              Cas concrets & projets
            </h2>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Toucher un projet pour afficher la feuille de détails (Problème ➔ Solution ➔ Résultat)
            </p>
          </div>

          {/* Filter */}
          <div className="ios-segmented">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`ios-segmented-item cursor-pointer ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              Tous ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('gestion')}
              className={`ios-segmented-item cursor-pointer ${selectedCategory === 'gestion' ? 'active' : ''}`}
            >
              Gestion
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('web')}
              className={`ios-segmented-item cursor-pointer ${selectedCategory === 'web' ? 'active' : ''}`}
            >
              Web
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ecommerce')}
              className={`ios-segmented-item cursor-pointer ${selectedCategory === 'ecommerce' ? 'active' : ''}`}
            >
              E-commerce
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="ios-inset-group p-5 flex flex-col justify-between cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
            >
              <div className="space-y-4">
                
                {/* Device Frame (Clean Apple styled Mockup) */}
                <div className="w-full h-44 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center p-3 relative overflow-hidden">
                  
                  {project.mockupType === 'desktop' ? (
                    // MacBook frame
                    <div className="w-full max-w-[260px] h-32 rounded-lg bg-neutral-900 border border-neutral-700 p-1 flex flex-col shadow-xs group-hover:scale-102 transition-transform">
                      <div className="flex items-center gap-1 px-1 pb-1 border-b border-neutral-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="text-[8px] text-neutral-400 font-mono ml-2 truncate">
                          app.marion-moun.digital/{project.id}
                        </span>
                      </div>
                      <div className="flex-1 bg-black p-2 text-[9px] text-neutral-300 flex flex-col justify-between">
                        <div className="font-semibold text-neutral-100 truncate">{project.title}</div>
                        <div className="grid grid-cols-2 gap-1 text-[8px] text-neutral-400">
                          <div className="p-1 bg-neutral-900 rounded">Balance âgée : OK</div>
                          <div className="p-1 bg-neutral-900 rounded">Relances : Actives</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // iPhone frame
                    <div className="w-28 h-36 rounded-2xl bg-neutral-900 border-2 border-neutral-700 p-1 flex flex-col shadow-xs group-hover:scale-102 transition-transform">
                      <div className="w-8 h-1 bg-neutral-700 rounded-full mx-auto mb-1" />
                      <div className="flex-1 bg-black rounded-lg p-1.5 text-[8px] text-neutral-300 flex flex-col justify-between">
                        <div className="font-semibold text-neutral-100 line-clamp-1">{project.title}</div>
                        <div className="text-[7px] text-neutral-400">Mobile Congo Ready</div>
                        <div className="py-0.5 px-1 rounded bg-[#0071E3] text-white text-[7px] text-center font-medium">
                          WhatsApp Ready
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10">
                      {project.badge}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[12px] text-neutral-500 dark:text-neutral-400 font-medium">
                    {project.categoryLabel}
                  </div>
                  <h3 className="text-[16px] font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-1.5 leading-normal">
                    {project.summary}
                  </p>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.stack.slice(0, 3).map((st, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {st}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-neutral-400">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>

              </div>

              {/* Bottom detail action link */}
              <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[13px] font-semibold text-[#0071E3] dark:text-[#0A84FF]">
                <span>Ouvrir la fiche de cas</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 : SERVICES PRESTATAIRE & DEMANDE DE DEVIS */}
      <section className="space-y-4">
        <div>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
            Services & prestations web
          </h2>
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            Pour les entreprises, commerçants ou associations ayant un besoin ponctuel de digitalisation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES_DATA.map((srv) => (
            <div key={srv.id} className="ios-inset-group p-5 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-neutral-900 dark:text-neutral-100">
                    {srv.title}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {srv.tag}
                  </span>
                </div>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 mt-1 leading-normal">
                  {srv.description}
                </p>

                <ul className="mt-3 space-y-1 text-[13px] text-neutral-600 dark:text-neutral-400">
                  {srv.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-neutral-400">•</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuoteService(srv.title);
                    const el = document.getElementById('devis-express');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[13px] font-semibold text-[#0071E3] dark:text-[#0A84FF] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Configurer ce besoin</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Apple Style Devis Express Box */}
        <div id="devis-express" className="ios-inset-group p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100">
              Demander un devis ou cadrage
            </h3>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Sélectionnez vos critères : le message sera pré-rempli pour WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
            <div>
              <label className="text-[12px] font-medium text-neutral-600 dark:text-neutral-400 block mb-1">
                Type de prestation
              </label>
              <select
                value={quoteService}
                onChange={(e) => setQuoteService(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 rounded-xl px-3 py-2 text-[13px] text-neutral-900 dark:text-neutral-100"
              >
                <option value="Tableau de bord de trésorerie">Tableau de bord de trésorerie</option>
                <option value="Création de site web vitrine">Création de site web vitrine</option>
                <option value="Boutique e-commerce WhatsApp">Boutique e-commerce WhatsApp</option>
                <option value="Campagne Facebook Ads locale">Campagne Facebook Ads locale</option>
                <option value="Stage en entreprise (Gratuit)">Stage en entreprise</option>
              </select>
            </div>

            <div>
              <label className="text-[12px] font-medium text-neutral-600 dark:text-neutral-400 block mb-1">
                Délai envisagé
              </label>
              <select
                value={quoteDelay}
                onChange={(e) => setQuoteDelay(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700 rounded-xl px-3 py-2 text-[13px] text-neutral-900 dark:text-neutral-100"
              >
                <option value="Urgent (< 1 semaine)">Urgent (&lt; 1 semaine)</option>
                <option value="Standard (2 semaines)">Standard (2 semaines)</option>
                <option value="Stage (Immédiat)">Stage (Immédiat)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSendQuoteWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF] text-white text-[14px] font-semibold transition-colors cursor-pointer"
            >
              <span>Envoyer via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FEUILLE MODALE DU BAS (iOS BOTTOM SHEET) POUR LE DÉTAIL D'UN PROJET */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full sm:max-w-xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#1C1C1E] rounded-t-[28px] sm:rounded-[28px] p-6 shadow-2xl ios-sheet relative space-y-5 border border-black/5 dark:border-white/10">
            
            {/* iOS Grabber pill */}
            <div className="w-9 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 mx-auto -mt-1 mb-2 sm:hidden" />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[12px] font-medium text-neutral-500 dark:text-neutral-400">
                  {selectedProject.categoryLabel} · {selectedProject.badge}
                </span>
                <h3 className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Problème ➔ Solution ➔ Stack ➔ Résultat */}
            <div className="space-y-4 text-[14px]">
              
              <div className="space-y-1">
                <div className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  1. Problème rencontré
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-normal">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  2. Solution mise en place
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-normal">
                  {selectedProject.solution}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  3. Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[12px] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  4. Résultat mesurable
                </div>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-[13px]">
                  {selectedProject.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0071E3] dark:text-[#0A84FF]">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-[12px] text-neutral-400 dark:text-neutral-500">
                Marion Moun · Brazzaville
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  onOpenContact();
                }}
                className="px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF] text-white text-[13px] font-semibold cursor-pointer"
              >
                Discuter de ce cas
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
