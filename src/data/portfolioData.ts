import { TimelineEvent, SkillCategory, ProjectCase, ServiceOffering } from '../types.ts';

export const PERSONAL_INFO = {
  name: 'Marion Moun',
  fullName: 'Glory Marion Moun',
  title: 'Diplômé en LPAE | Gestion, Commerce, Comptabilité & Recouvrement',
  degree: 'Licence Professionnelle en Administration des Entreprises (LPAE)',
  school: 'ESGAE (École Supérieure de Gestion et d’Administration des Entreprises)',
  location: 'Brazzaville, Congo (Mansimou, arr8 Madibou)',
  address: 'N° 8, avenue de l’impréco Mansimou, arr8 Madibou, Brazzaville',
  phone1: '+242 06 406 50 70',
  phone2: '+242 06 113 38 15',
  phone1Raw: '242064065070',
  phone2Raw: '242061133815',
  email: 'glory3marrion71@gmail.com',
  driverLicense: 'Permis de conduire Catégorie B (Bling Auto-école)',
  cvDownloadUrl: '/assets/aistudio/Capture_d__cran_2026-11-10_223928_d3219857.png',
  googleFormUrl: 'https://forms.gle/[LIEN_GOOGLE_FORM_A_PERSONNALISER]',
  linkedInUrl: 'https://linkedin.com/in/[PROFIL_LINKEDIN_A_COMPLETER]',
  bioObjective: "Diplômé en Administration des Entreprises (ESGAE) avec une spécialisation en recouvrement et gestion, je recherche un stage opérationnel en COMMERCE, COMPTABILITÉ, RECOUVREMENT ou MANAGEMENT. Rigoureux et polyvalent, j'allie la rigueur financière à la maîtrise des outils digitaux et de l'automatisation pour optimiser vos processus dès le premier jour.",
  whyMePoints: [
    {
      title: 'Opérationnel dès la 1ère semaine',
      desc: 'Formé aux réalités du terrain d’entreprise : traitement des pièces comptables, tenue de tableaux de bord et contact direct avec les clients et débiteurs.',
      icon: 'zap'
    },
    {
      title: 'Spécialiste de la relance & du recouvrement',
      desc: 'Certifié par une Masterclass dédiée au recouvrement de créances. Je sais structurer un plan de relance progressif (J+3 à J+35) qui préserve la relation commerciale tout en encaissant le cash.',
      icon: 'shield-check'
    },
    {
      title: 'Double casquette Gestion + Digitalisation',
      desc: 'Capacité unique à transformer des processus papier chronophages en flux automatisés avec Google Workspace, tableurs connectés et outils web modernes.',
      icon: 'cpu'
    },
    {
      title: 'Sens du service, discipline et polyvalence',
      desc: 'Expériences formatrices en gestion académique (DAS 1 & 2), en service client exigeant et en logistique. Permis B pour tous déplacements professionnels à Brazzaville.',
      icon: 'check-circle'
    }
  ]
};

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'lpae-esgae',
    period: '2025 – 2026',
    title: 'Licence Professionnelle en Administration des Entreprises (LPAE)',
    organization: 'ESGAE (École Supérieure de Gestion et d’Administration des Entreprises)',
    location: 'Brazzaville, Congo',
    type: 'education',
    description: 'Formation d’excellence en gestion globale des organisations, management stratégique, comptabilité approfondie, droit commercial et gestion des ressources humaines.',
    highlights: [
      'Analyse financière et diagnostic d’exploitation des PME',
      'Management opérationnel et organisation des structures',
      'Fiscalité d’entreprise et comptabilité OHADA révisée'
    ],
    badgeColor: 'emerald'
  },
  {
    id: 'masterclass-recouvrement',
    period: 'Mai 2026',
    title: 'Masterclass Spécialisée : Recouvrement de créances & Gestion des impayés',
    organization: 'Formation Professionnelle Continue',
    location: 'Brazzaville, Congo',
    type: 'certification',
    description: 'Perfectionnement intensif sur les techniques amiables et judiciaires de recouvrement de créances, la négociation avec les débiteurs récalcitrants et la réduction du DSO.',
    highlights: [
      'Construction de la balance âgée et détection précoce du risque client',
      'Techniques de négociation téléphonique et rédaction des sommations amiables',
      'Élaboration d’échéanciers de paiement réalistes et sécurisés'
    ],
    badgeColor: 'amber'
  },
  {
    id: 'permis-b',
    period: 'Septembre – Octobre 2026',
    title: 'Formation en Conduite Automobile (Permis Catégorie B)',
    organization: 'Bling Auto-école',
    location: 'Brazzaville, Congo',
    type: 'certification',
    description: 'Obtention du permis de conduire catégorie B. Mobilité immédiate garantie pour les missions de terrain, visites clients et démarches administratives.',
    highlights: ['Titulaire du permis B', 'Grande disponibilité géographique sur tout Brazzaville et environs'],
    badgeColor: 'blue'
  },
  {
    id: 'projet-emeraude',
    period: '2025 – 2026',
    title: 'Projet Comptable Professionnel Académique (DAS 1 & 2)',
    organization: 'Cabinet Émeraude',
    location: 'Sous la direction de M. Yves Miatoko, Expert-Comptable',
    type: 'experience',
    description: 'Mission pratique en environnement d’expertise comptable : montage et contrôle des Déclarations Annuelles des Salaires (DAS 1 & 2) et travaux de révision comptable.',
    highlights: [
      'Contrôle de conformité des états préparatoires de paie et charges sociales',
      'Application rigoureuse du système comptable OHADA',
      'Développement d’une grande rigueur dans le traitement des pièces justificatives'
    ],
    badgeColor: 'indigo'
  },
  {
    id: 'consultant-digital',
    period: '2024 – Présent',
    title: 'Consultant Web, E-commerce & Automatisation Indépendant',
    organization: 'Activité Indépendante',
    location: 'Brazzaville & Télétravail',
    type: 'experience',
    description: 'Accompagnement de commerçants et structures locales dans leur présence web, mise en place de boutiques, campagnes publicitaires ciblées et automatisation de tableurs.',
    highlights: [
      'Création de sites vitrines et plateformes web sur-mesure',
      'Mise en place de campagnes Facebook Ads & tunnels WhatsApp',
      'Automatisation de tableaux de bord avec Google Workspace & Apps Script'
    ],
    badgeColor: 'purple'
  },
  {
    id: 'ulc-gestion-2',
    period: '2024 – 2025',
    title: '2ème année en Gestion Tronc Commun',
    organization: 'ULC (Université Libre du Congo)',
    location: 'Brazzaville, Congo',
    type: 'education',
    description: 'Approfondissement des sciences de gestion, micro/macroéconomie, statistiques appliquées, comptabilité générale et droit des affaires.',
    highlights: ['Comptabilité analytique d’exploitation', 'Techniques quantitatives de gestion'],
    badgeColor: 'emerald'
  },
  {
    id: 'ulc-gestion-1',
    period: '2023 – 2024',
    title: '1ère année en Gestion Tronc Commun',
    organization: 'ULC (Université Libre du Congo)',
    location: 'Brazzaville, Congo',
    type: 'education',
    description: 'Acquisition des fondamentaux de l’économie d’entreprise, introduction à la gestion comptable, mathématiques financières et droit civil.',
    highlights: ['Fondamentaux de la gestion d’entreprise', 'Méthodologie de travail universitaire'],
    badgeColor: 'emerald'
  },
  {
    id: 'agent-bem-gfac',
    period: 'Août 2026',
    title: 'Agent de surface pour le compte de BEM Service',
    organization: 'GFAC (BEM Service)',
    location: 'Brazzaville, Congo',
    type: 'experience',
    description: 'Sens aiguisé de la discipline, respect scrupuleux des protocoles d’hygiène et des consignes d’ordre dans un milieu professionnel corporate.',
    highlights: ['Discipline, ponctualité et endurance professionnelle'],
    badgeColor: 'slate'
  },
  {
    id: 'serveur-good-vibes',
    period: '2023 – 2024',
    title: 'Stage en tant que Serveur',
    organization: 'Good Vibes',
    location: 'Brazzaville, Congo',
    type: 'experience',
    description: 'Prise de commande, encaissement, gestion du stress en période d’affluence, accueil chaleureux et satisfaction client au quotidien.',
    highlights: ['Excellence du relationnel client et réactivité en environnement dynamique'],
    badgeColor: 'slate'
  },
  {
    id: 'bac-d',
    period: '2022 – 2023',
    title: 'Baccalauréat Général Série D (Scientifique)',
    organization: 'Lycée Sébastien Mafouta',
    location: 'Brazzaville, Congo',
    type: 'education',
    description: 'Formation scientifique solide développant l’esprit logique, l’analyse quantitative, la rigueur de démonstration et la méthodologie.',
    highlights: ['Rigueur scientifique et capacité de raisonnement structuré'],
    badgeColor: 'emerald'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'recouvrement',
    title: 'Recouvrement de Créances',
    icon: 'coins',
    description: 'Réduire le DSO, sécuriser les liquidités et préserver la relation client grâce à une méthode éprouvée.',
    skills: [
      { name: 'Balance âgée & Suivi des échéances', level: 95, description: 'Catégorisation des retards et priorisation des dossiers à risque', tag: 'Expert' },
      { name: 'Plan de relance multi-canaux (J+3 à J+35)', level: 92, description: 'SMS, WhatsApp, courrier officiel et contact téléphonique ciblé', tag: 'Pratique' },
      { name: 'Négociation amiable & Échéanciers', level: 90, description: 'Accords transactionnels réalistes et suivi scrupuleux des engagements', tag: 'Atout' },
      { name: 'Gestion des litiges & Pré-contentieux', level: 85, description: 'Constitution de dossiers complets avec pièces justificatives pour mise en demeure', tag: 'Norme' }
    ]
  },
  {
    id: 'comptabilite',
    title: 'Comptabilité & Gestion',
    icon: 'calculator',
    description: 'Rigueur comptable selon les normes OHADA révisées et suivi dynamique de la trésorerie.',
    skills: [
      { name: 'Déclarations fiscales & sociales (DAS 1 & 2)', level: 90, description: 'Pratique confirmée sous supervision d’expert-comptable chez Émeraude', tag: 'Spécialité' },
      { name: 'Suivi de trésorerie & Rapprochements', level: 88, description: 'Tableaux de bord des flux journaliers et contrôle des pièces de caisse/banque', tag: 'Essentiel' },
      { name: 'Enregistrement comptable OHADA', level: 86, description: 'Factures achats/ventes, opérations diverses et lettrage des comptes tiers', tag: 'Conforme' },
      { name: 'Contrôle budgétaire & Dépenses', level: 82, description: 'Vérification de la conformité des bons de commande et factures fournisseurs', tag: 'Méthode' }
    ]
  },
  {
    id: 'commerce',
    title: 'Commerce & Négociation',
    icon: 'briefcase',
    description: 'Développer le portefeuille clients, qualifier les opportunités et concrétiser les ventes.',
    skills: [
      { name: 'Prospection B2B & B2C locale', level: 90, description: 'Identification des cibles d’entreprises et approche directe terrain à Brazzaville', tag: 'Terrain' },
      { name: 'Plan d’action commercial (PAC)', level: 85, description: 'Définition des objectifs de vente mensuels et suivi du taux de transformation', tag: 'Stratégie' },
      { name: 'Fidélisation & Suivi Relation Client', level: 92, description: 'Écoute active, traitement des réclamations et satisfaction client durable', tag: 'Relationnel' },
      { name: 'Pitch commercial & Clôture', level: 88, description: 'Présentation de valeur claire et closing de devis', tag: 'Impact' }
    ]
  },
  {
    id: 'management',
    title: 'Management & Organisation',
    icon: 'users',
    description: 'Coordonner les tâches, respecter les plannings et optimiser les flux de travail internes.',
    skills: [
      { name: 'Planification d’équipe & Priorisation', level: 88, description: 'Matrice d’urgence/importance et répartition équitable de la charge de travail', tag: 'Efficacité' },
      { name: 'Optimisation des procédures de travail', level: 90, description: 'Standardisation des modèles de documents et élimination des doublons', tag: 'Lean' },
      { name: 'Sens de la responsabilité & Rigueur', level: 95, description: 'Discipline acquise à l’ESGAE et lors des missions de terrain', tag: 'Valeur' },
      { name: 'Polyvalence & Esprit d’équipe', level: 94, description: 'Excellente communication humaine et adaptabilité rapide à tout contexte', tag: 'Culture' }
    ]
  },
  {
    id: 'tech',
    title: 'Digital & Outils Google Workspace',
    icon: 'code-2',
    description: 'La force de frappe technologique qui transforme la gestion d’entreprise quotidienne.',
    skills: [
      { name: 'Google Sheets & Automatisation Apps Script', level: 94, description: 'Formules avancées, liaisons dynamiques et tableaux de bord connectés', tag: 'Avancé' },
      { name: 'Google Forms, Docs & Drive collaboratif', level: 95, description: 'Mise en place de circuits de validation et formulaires sans papier', tag: 'Productivité' },
      { name: 'Facebook Ads & Marketing Digital local', level: 90, description: 'Ciblage publicitaire géolocalisé Congo, Meta Pixel et conversion WhatsApp', tag: 'Performance' },
      { name: 'Création Web & Vibe Coding / IA Prompting', level: 88, description: 'Développement de solutions web réactives et exploitation pragmatique des LLM', tag: 'Innovation' }
    ]
  }
];

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: 'service-web',
    title: 'Création de Sites Web & Portails Métiers',
    icon: 'layout',
    description: 'Sites vitrines modernes et applications web sur-mesure, conçus 100% mobile-first pour séduire vos clients et valoriser votre marque à Brazzaville et à l’international.',
    deliverables: [
      'Design épuré et responsive (smartphone, tablette, PC)',
      'Optimisation pour chargement ultra-rapide sur mobile',
      'Boutons directs d’appel et conversion WhatsApp',
      'Hébergement et configuration de nom de domaine'
    ],
    tag: 'Très demandé'
  },
  {
    id: 'service-dashboard',
    title: 'Tableaux de Bord de Gestion & Trésorerie Automatisés',
    icon: 'bar-chart-3',
    description: 'Fini les calculs manuels à répétition : transformez vos fichiers de caisse et de facturation en outils de pilotage connectés avec alertes en temps réel.',
    deliverables: [
      'Balance âgée et calcul automatique des créances en retard',
      'Suivi de trésorerie prévisionnelle multi-comptes',
      'Synchronisation Google Sheets + Formulaires mobiles de saisie',
      'Formation de vos collaborateurs en 1 heure'
    ],
    tag: 'ROI Immédiat'
  },
  {
    id: 'service-ecommerce',
    title: 'Boutiques E-commerce & Tunnels WhatsApp',
    icon: 'shopping-bag',
    description: 'Vendez vos produits 24h/24 avec un catalogue structuré, relié directement à vos numéros WhatsApp pour des commandes instantanées sans friction.',
    deliverables: [
      'Catalogue interactif avec photos et prix en FCFA',
      'Panier d’achat avec validation directe par WhatsApp',
      'Intégration des moyens de paiement usuels (Airtel Money / MTN MoMo ready)',
      'Gestion simplifiée des stocks'
    ],
    tag: 'Commerce Local'
  },
  {
    id: 'service-ads',
    title: 'Campagnes Facebook Ads & Marketing Digital',
    icon: 'trending-up',
    description: 'Attirez de nouveaux clients locaux grâce à des publicités ultra-ciblées sur Facebook et Instagram avec des messages à fort taux de clic.',
    deliverables: [
      'Paramétrage du Gestionnaire de Publicités Meta',
      'Ciblage géographique précis (Brazzaville / Pointe-Noire)',
      'Création des visuels et rédactions publicitaires (copywriting)',
      'Rapport hebdomadaire de retour sur investissement (ROAS)'
    ],
    tag: 'Acquisition'
  }
];

export const KEY_METRICS = [
  { value: '3', label: 'Années de formation en Gestion', detail: 'ULC Tronc Commun + Licence ESGAE' },
  { value: '100%', label: 'Disponibilité & Mobilité terrain', detail: 'Basé à Brazzaville · Permis B actif' },
  { value: '1', label: 'Masterclass Recouvrement certifiée', detail: 'Spécialisation créances & impayés' },
  { value: '4', label: 'Piliers d’impact immédiat', detail: 'Commerce, Compta, Recouvrement, Web' }
];

export const SAMPLE_INVOICES_DEMO = [
  {
    id: 'FAC-2026-041',
    client: 'Sodex Congo SARL',
    amount: 1450000,
    paidAmount: 1450000,
    dueDate: '2026-10-05',
    status: 'paid' as const
  },
  {
    id: 'FAC-2026-082',
    client: 'Brazza Logistique Express',
    amount: 850000,
    paidAmount: 350000,
    dueDate: '2026-10-25', // 18 jours de retard -> J+20
    status: 'overdue' as const
  },
  {
    id: 'FAC-2026-095',
    client: 'Cabinet Médical Mpila',
    amount: 600000,
    paidAmount: 0,
    dueDate: '2026-11-08', // 4 jours de retard -> J+3
    status: 'overdue' as const
  },
  {
    id: 'FAC-2026-033',
    client: 'Hôtel Riviera Brazza',
    amount: 1200000,
    paidAmount: 200000,
    dueDate: '2026-09-20', // 53 jours de retard -> J+35
    status: 'overdue' as const
  },
  {
    id: 'FAC-2026-104',
    client: 'Omni Télécoms & Réseaux',
    amount: 950000,
    paidAmount: 950000,
    dueDate: '2026-11-01',
    status: 'paid' as const
  }
];
