import { useState, useTransition, type FormEvent } from 'react';
import { ProjectCase } from '../types.ts';
import { SERVICES_DATA, PERSONAL_INFO } from '../data/portfolioData.ts';
import { 
  Code2, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  FileSpreadsheet, 
  FileCode, 
  Workflow, 
  X, 
  Send, 
  Sliders, 
  DollarSign, 
  TrendingUp, 
  LayoutTemplate 
} from 'lucide-react';

interface DigitalWebTabProps {
  onOpenContact: () => void;
  onOpenScanner: () => void;
}

export function DigitalWebTab({
  onOpenContact,
  onOpenScanner
}: DigitalWebTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gestion' | 'web' | 'ecommerce' | 'automation'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);

  // Quote builder states
  const [quoteService, setQuoteService] = useState<string>('dashboard');
  const [quoteBudget, setQuoteBudget] = useState<string>('standard');
  const [quoteMessage, setQuoteMessage] = useState<string>('');
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Projects list
  const projects: ProjectCase[] = [
    {
      id: 'telecom-billing',
      title: 'Système de Facturation & Recouvrement Télécom',
      category: 'gestion',
      categoryLabel: 'Gestion & Recouvrement',
      badge: 'Cas Entreprise Réel',
      summary: 'Plateforme web automatisant l’émission de factures récurrentes, le calcul d’intérêts de retard et les relances multi-canaux (SMS / Email / WhatsApp).',
      problem: 'Une PME locale de télécoms perdait 45 jours de délai moyen sur ses encaissements à cause de factures manuelles éparpillées sur plusieurs classeurs Excel, sans relance programmée.',
      solution: 'Développement d’une application web centralisée : génération instantanée des factures en PDF certifié, balance âgée en temps réel et alertes automatiques pour relancer les impayés.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Passerelle SMS', 'Export PDF'],
      results: [
        '-45% de temps passé sur la gestion administrative mensuelle',
        '+32% d’encaissements sous 30 jours dès le deuxième mois',
        'Zéro facture oubliée ou égarée dans les flux'
      ],
      mockupType: 'desktop',
      featured: true
    },
    {
      id: 'student-association',
      title: 'Plateforme de Gestion des Étudiants & Cotisations',
      category: 'web',
      categoryLabel: 'Portail Web & Adhésions',
      badge: 'Projet Associatif',
      summary: 'Portail complet facilitant l’inscription des étudiants, la traçabilité des cotisations annuelles (simulation Mobile Money) et la diffusion d’annonces officielles.',
      problem: 'Inscriptions manuelles sur cahiers physiques, risques de perte de données et contestations récurrentes lors des bilans financiers annuels de l’association étudiante.',
      solution: 'Création d’un portail web 100% mobile-friendly avec profil étudiant sécurisé, reçu de cotisation dématérialisé et tableau de bord trésorier avec export Excel.',
      stack: ['React / Vite', 'Tailwind CSS', 'Supabase Cloud', 'Mobile Money Gateway', 'Export XLSX'],
      results: [
        'Plus de 450 étudiants inscrits dès les 2 premières semaines',
        'Transparence financière absolue saluée par le bureau des étudiants',
        'Temps de validation d’un paiement réduit de 15 minutes à 30 secondes'
      ],
      mockupType: 'mobile',
      featured: true
    },
    {
      id: 'ecommerce-ads',
      title: 'Boutique E-commerce & Stratégie Facebook Ads',
      category: 'ecommerce',
      categoryLabel: 'E-commerce & Publicités',
      badge: 'Prestation Client',
      summary: 'Boutique en ligne conçue pour le marché congolais, synchronisée avec un catalogue WhatsApp Business et propulsée par des campagnes publicitaires ciblées.',
      problem: 'Un commerçant de Brazzaville recevait des centaines de messages WhatsApp non qualifiés sans structure de commande claire, générant un taux d’abandon élevé.',
      solution: 'Mise en place d’un site de commande ultra-rapide optimisé pour les connexions mobiles locales, avec bouton d’achat direct WhatsApp pré-rempli et campagnes Facebook Ads géociblées.',
      stack: ['WordPress / WooCommerce', 'Meta Pixel', 'Facebook Ads Manager', 'WhatsApp API'],
      results: [
        'Retour sur investissement publicitaire (ROAS) de x3.8',
        '+120 commandes fermes validées dès le premier mois de diffusion',
        'Panier moyen client augmenté de 25%'
      ],
      mockupType: 'mobile',
      featured: true
    },
    {
      id: 'treasury-dashboard',
      title: 'Tableau de Bord de Trésorerie & Google Workspace',
      category: 'automation',
      categoryLabel: 'Automatisation & Data',
      badge: 'Outil de Gestion PME',
      summary: 'Système d’automatisation connectant Google Forms pour la saisie mobile des dépenses, Google Sheets pour les calculs et Looker Studio pour le pilotage.',
      problem: 'Le chef d’entreprise n’avait de visibilité sur son solde bancaire et sa caisse qu’en fin de mois, subissant des agios imprévus et des tensions de liquidité.',
      solution: 'Mise en place d’un formulaire sur smartphone pour chaque sortie de caisse, synchronisation instantanée sous Google Sheets avec Apps Script et indicateurs visuels de solde restant.',
      stack: ['Google Sheets API', 'Google Forms', 'Looker Studio', 'Google Apps Script'],
      results: [
        'Clôture comptable journalière réalisée en 5 minutes chrono',
        'Anticipation des tensions de trésorerie à 15 jours',
        'Accès au tableau de bord en direct sur smartphone pour le gérant'
      ],
      mockupType: 'desktop',
      featured: true
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleSendQuote = (e: FormEvent) => {
    e.preventDefault();
    const serviceName = quoteService === 'dashboard' ? 'Tableau de bord de gestion' : quoteService === 'site' ? 'Site web vitrine' : 'Boutique E-commerce / Ads';
    const text = encodeURIComponent(
      `Bonjour Marion,\n\nJe souhaite un devis pour un projet : ${serviceName}.\nBudget estimé : ${quoteBudget}.\nPrécisions : ${quoteMessage || 'À définir lors de notre échange.'}`
    );
    window.open(`https://wa.me/${PERSONAL_INFO.phone1Raw}?text=${text}`, '_blank');
    setQuoteSubmitted(true);
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* SECTION 1: PASSERELLE MÉTIER + DIGITAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white border border-indigo-800 shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" /> La Double Compétence Rentable
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Pourquoi un gestionnaire qui maîtrise le web apporte 3x plus de valeur à votre PME ?
              </h2>

              <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
                Les entreprises locales perdent des journées entières sur des tâches répétitives : ressaisir des chiffres sur papier, relancer des clients à la main, créer des devis sans modèle.
              </p>

              <p className="text-indigo-100/90 text-sm leading-relaxed">
                <strong className="text-white">Je ne fais pas que tenir vos comptes :</strong> je conçois des systèmes d'automatisation légers (Google Workspace, tableurs interconnectés, formulaires mobiles) qui éliminent les erreurs, accélèrent vos ventes et sécurisent vos encaissements dès le premier mois.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold">
                  ⚡ 0 coût de licence exorbitant
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold">
                  📱 100% adapté aux smartphones du terrain
                </div>
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold">
                  🛡️ Processus sécurisés et traçables
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3">
              <div className="text-xs uppercase tracking-wider text-indigo-200 font-bold">
                Pour Recruteurs & Clients
              </div>
              <div className="text-2xl font-black text-white">
                Besoin d'un coup d'accélérateur ?
              </div>
              <p className="text-xs text-indigo-100">
                Que ce soit pour un stage en entreprise ou une mission de prestation ponctuelle, échangeons en direct.
              </p>
              <button
                onClick={onOpenContact}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Contacter Marion Moun</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: GALERIE DE CAS CONCRETS AVEC CADRES DE DEVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              Réalisations Digitales
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Cas Concrets & Projets Applicatifs
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Chaque projet résout un problème organisationnel précis avec un résultat mesurable.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tous ({projects.length})
            </button>
            <button
              onClick={() => setSelectedCategory('gestion')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'gestion'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Facturation & Gestion
            </button>
            <button
              onClick={() => setSelectedCategory('web')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'web'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Portails Web
            </button>
            <button
              onClick={() => setSelectedCategory('ecommerce')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'ecommerce'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              E-commerce & Ads
            </button>
            <button
              onClick={() => setSelectedCategory('automation')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'automation'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Google Workspace
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group"
            >
              <div>
                
                {/* Device Frame Preview (Mockup in pure CSS/SVG) */}
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 flex items-center justify-center border border-slate-200 dark:border-slate-700 mb-6 overflow-hidden relative">
                  
                  {project.mockupType === 'desktop' ? (
                    // Laptop frame
                    <div className="w-full max-w-sm h-36 rounded-lg bg-slate-900 border-2 border-slate-700 shadow-lg p-1.5 flex flex-col group-hover:scale-102 transition-transform">
                      {/* Laptop screen top bar */}
                      <div className="flex items-center gap-1 pb-1 px-1 border-b border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        <span className="text-[8px] text-slate-500 ml-2 font-mono truncate">
                          app.marion-moun.digital/{project.id}
                        </span>
                      </div>
                      {/* Screen content mockup */}
                      <div className="flex-1 bg-slate-950 p-2 text-[9px] text-slate-300 overflow-hidden space-y-1.5">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                          <span className="font-bold text-sky-400">{project.title}</span>
                          <span className="px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 font-mono text-[7px]">Actif</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 pt-1">
                          <div className="p-1 rounded bg-slate-900 border border-slate-800 text-center">
                            <div className="text-[7px] text-slate-500">Factures</div>
                            <div className="font-bold text-white text-[9px]">142</div>
                          </div>
                          <div className="p-1 rounded bg-slate-900 border border-slate-800 text-center">
                            <div className="text-[7px] text-slate-500">Recouvré</div>
                            <div className="font-bold text-emerald-400 text-[9px]">89%</div>
                          </div>
                          <div className="p-1 rounded bg-slate-900 border border-slate-800 text-center">
                            <div className="text-[7px] text-slate-500">En cours</div>
                            <div className="font-bold text-amber-400 text-[9px]">11%</div>
                          </div>
                        </div>
                        <div className="h-6 w-full rounded bg-slate-900/80 border border-slate-800 p-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-400" />
                          <span className="text-[8px] text-slate-400">Automatisation connectée</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Smartphone frame
                    <div className="w-40 h-40 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-lg p-1.5 flex flex-col group-hover:scale-105 transition-transform">
                      <div className="w-12 h-1 rounded-full bg-slate-700 mx-auto mb-1" />
                      <div className="flex-1 bg-slate-950 rounded-lg p-2 text-[8px] text-slate-300 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-white text-[9px] line-clamp-1">{project.title}</div>
                          <div className="text-slate-500 text-[7px] mt-0.5">Mobile Congo Ready</div>
                          <div className="mt-2 space-y-1">
                            <div className="h-1.5 w-full bg-slate-800 rounded" />
                            <div className="h-1.5 w-3/4 bg-indigo-500/50 rounded" />
                          </div>
                        </div>
                        <div className="py-1 px-1.5 rounded bg-emerald-600 text-white text-[7px] font-bold text-center">
                          WhatsApp / MoMo Ready
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Project Header */}
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                  <span>{project.categoryLabel}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 my-4">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key results highlights */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-1 text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider mb-1">
                    Impact direct :
                  </div>
                  {project.results.slice(0, 2).map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Modal trigger button */}
              <button
                onClick={() => setSelectedProject(project)}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Voir le cas complet (Problème ➔ Solution ➔ Résultat)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SERVICES PRESTATAIRE & CONFIGURATEUR DE DEVIS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-8">
          <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
            Prestations & Missions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Offre de Services & Solutions Digitales
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Disponible également pour des missions de consulting, création de sites vitrines, boutiques en ligne ou automatisation de processus pour entreprises et commerçants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-300 dark:hover:border-sky-700 transition-all"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                  {srv.tag}
                </span>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {srv.description}
                </p>

                <div className="my-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  {srv.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setQuoteService(srv.id === 'service-dashboard' ? 'dashboard' : srv.id === 'service-web' ? 'site' : 'ecommerce');
                  const el = document.getElementById('devis-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Configurer ce besoin</span>
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Quote Calculator / Lead generator */}
        <div id="devis-calculator" className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Devis & Évaluation Express
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Estimez votre besoin et recevez un retour direct sous 24h
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Sélectionnez votre type de projet : je prépare pour vous un pré-cadrage technique et financier sans engagement.
            </p>
          </div>

          <form onSubmit={handleSendQuote} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Type de prestation</label>
              <select
                value={quoteService}
                onChange={(e) => setQuoteService(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="dashboard">Tableau de bord de gestion & Trésorerie</option>
                <option value="site">Site Web Vitrine & Mobile</option>
                <option value="ecommerce">Boutique E-commerce & Tunnels WhatsApp</option>
                <option value="ads">Campagnes Facebook Ads locales</option>
                <option value="stage">Opportunité de Stage (Gratuit)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Délai souhaité</label>
              <select
                value={quoteBudget}
                onChange={(e) => setQuoteBudget(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="urgent">Urgent (&lt; 1 semaine)</option>
                <option value="standard">Standard (2 à 3 semaines)</option>
                <option value="stage">Stage (Prêt immédiatement)</option>
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-1">
              <label className="text-xs font-bold text-slate-300">Validation & Envoi</label>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmettre via WhatsApp</span>
              </button>
            </div>
          </form>

          {quoteSubmitted && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Votre demande a été préparée pour WhatsApp ! Marion vous répondra personnellement.</span>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: HUB GOOGLE WORKSPACE & APPLICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                Interopérabilité & Outils Cloud
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                Hub Google Workspace Intégré
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Connexion directe avec Google Forms, Google Sheets et la suite bureautique collaborative.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-3 h-3" /> Connecteur Actif
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Google Form Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <FileCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Formulaire Google Forms
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Remplissez notre formulaire officiel de contact sécurisé pour formaliser vos besoins de stage ou mission.
              </p>
              <a
                href={PERSONAL_INFO.googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline"
              >
                <span>Accéder au Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Google Sheets Sync Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Base de Projets Google Sheets
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Structure JavaScript prête pour synchronisation dynamique avec un classeur Sheets partagé en temps réel.
              </p>
              <span className="inline-block text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                GET /api/projects · Prêt pour API Sheets
              </span>
            </div>

            {/* Google Docs & Slides Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Modèles Docs & Présentations Slides
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Standardisation des rapports d'audit comptable, protocoles d'accord et présentations de plans d'action.
              </p>
              <button
                onClick={onOpenContact}
                className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Demander un modèle type</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer la modale"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {selectedProject.categoryLabel} · {selectedProject.badge}
              </span>
              <h3 id="modal-project-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {selectedProject.title}
              </h3>
            </div>

            {/* Problème ➔ Solution ➔ Stack ➔ Résultat */}
            <div className="space-y-4 text-xs sm:text-sm">
              
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-1">
                <div className="font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider text-[11px]">
                  1. Problème Métier Rencontré
                </div>
                <p className="text-rose-950 dark:text-rose-200 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 space-y-1">
                <div className="font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider text-[11px]">
                  2. Solution Digitale Développée
                </div>
                <p className="text-sky-950 dark:text-sky-200 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  3. Stack Technique & Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 font-mono text-xs border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-2">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[11px]">
                  4. Résultats Mesurables Obtenus
                </div>
                <ul className="space-y-1.5 text-emerald-950 dark:text-emerald-200">
                  {selectedProject.results.map((res, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Conçu et documenté par Marion Moun
              </span>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenContact();
                }}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <span>Échanger sur ce type de projet</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
