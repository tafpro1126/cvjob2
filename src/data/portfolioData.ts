import { TimelineEvent, SkillCategory, ProjectCase, ServiceOffering } from '../types.ts';

export const PERSONAL_INFO = {
  name: 'Marion Moun',
  title: 'Titulaire LPAE (ESGAE) | Stage en Gestion, Commerce, Comptabilité & Recouvrement',
  degree: 'Licence Professionnelle en Administration des Entreprises (LPAE)',
  school: 'ESGAE (École Supérieure de Gestion et d’Administration des Entreprises)',
  location: 'Brazzaville',
  phone1: '+242 06 113 38 15',
  phone2: '+242 06 406 50 70',
  phone1Raw: '242061133815',
  phone2Raw: '242064065070',
  email: 'glory3marrion71@gmail.com',
  legalEditorName: 'Valry Moun',
  legalEditorStatus: 'personne physique, Brazzaville, Congo',
  legalEditorEmail: 'valryboulot371@gmail.com',
  publicationDirector: 'Marion Moun',
  hostInfo: 'Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis · +1 (650) 319-8930 · cloudflare.com',
  driverLicense: 'Permis B (en cours) [À CONFIRMER]',
  availability: 'À partir du 1er décembre 2026 [À CONFIRMER]',
  cvDownloadUrl: '/assets/aistudio/Capture_d__cran_2026-11-10_223928_d3219857.png',
  siteDomainPlaceholder: 'https://[DOMAINE_A_COMPLETER]',
  linkedInUrl: 'https://linkedin.com/in/[PROFIL_LINKEDIN_A_COMPLETER]',
  languages: 'Français (langue de travail), Anglais (intermédiaire, formation BYU-Pathway)',
  whyMePoints: [
    {
      title: 'Je viens pour apprendre',
      desc: 'Au début de mon parcours, je cherche avant tout une équipe auprès de laquelle observer, pratiquer et comprendre les exigences du terrain.',
    },
    {
      title: 'J’accepte les corrections et j’en tire des leçons',
      desc: 'Lors des travaux sur les déclarations DAS 1 & 2, les relectures d’un expert-comptable qui corrigeait mes erreurs m’ont beaucoup fait progresser.',
    },
    {
      title: 'Je peux faire gagner du temps avec les outils numériques',
      desc: 'Avec rigueur et polyvalence, j’utilise Word, Excel, PowerPoint, Canva ainsi que des bases d’automatisation (n8n, Zapier) et d’IA pour alléger les tâches répétitives.',
    },
  ],
};

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'lpae-esgae',
    period: '2025 – 2026',
    title: 'Licence Professionnelle en Administration des Entreprises (LPAE)',
    organization: 'ESGAE (École Supérieure de Gestion et d’Administration des Entreprises)',
    location: 'Brazzaville',
    type: 'education',
    current: true,
    description:
      'Cours en gestion globale des organisations, comptabilité OHADA, droit commercial et gestion courante d’entreprise.',
    highlights: [
      'Bases académiques en comptabilité OHADA et suivi budgétaire',
      'Compréhension du fonctionnement administratif et commercial d’une PME',
    ],
  },
  {
    id: 'masterclass-recouvrement',
    period: 'Mai 2026',
    title: 'Masterclass Recouvrement de créances (4 h)',
    organization: 'Stage de professionnalisation · ESGAE',
    location: 'Brazzaville',
    type: 'workshop',
    description:
      'Atelier de 4 heures suivi durant un stage de professionnalisation à l’ESGAE, avec quelques cas pratiques sur les relances et impayés (sans certificat).',
    highlights: [
      'Notions de balance âgée et repérage des retards de paiement',
      'Cas pratiques sur la relance graduelle J+3 à J+35 et l’approche amiable',
    ],
  },
  {
    id: 'projet-das',
    period: '2025 – 2026 [Dates exactes À CONFIRMER]',
    title: 'Participation au montage des DAS 1 & 2',
    organization: 'Un cabinet d’expertise comptable',
    location: 'Brazzaville',
    type: 'experience',
    description:
      'Participation au montage des déclarations annuelles des salaires (DAS 1 & 2), avec l’aide d’un expert-comptable qui relisait et corrigeait mes nombreuses erreurs.',
    highlights: [
      'Travail concret sur pièces préparatoires sous relecture constante',
      'Apprentissage par la correction et sensibilisation à la précision des chiffres',
    ],
  },
  {
    id: 'ulc-tronc-commun',
    period: '2023 – 2025',
    title: 'Tronc commun en gestion (L1 2023–2024 · L2 2024–2025)',
    organization: 'ULC (Université Libre du Congo)',
    location: 'Brazzaville',
    type: 'education',
    description:
      'Deux années d’apprentissage des bases en économie, introduction à la comptabilité, mathématiques financières et gestion.',
    highlights: [
      '1ère année Gestion Tronc Commun (2023–2024)',
      '2ème année Gestion Tronc Commun (2024–2025)',
    ],
  },
  {
    id: 'autoformation-numerique',
    period: 'Depuis 2023 [Période exacte À CONFIRMER]',
    title: 'Auto-formation web, outils numériques et IA',
    organization: 'Apprentissage en autonomie',
    location: 'Brazzaville',
    type: 'workshop',
    description:
      'Pratique personnelle des outils bureautiques et numériques : maîtrise régulière de Word, Excel, PowerPoint et Canva ; bases en automatisation (n8n, Zapier, API), publicité en ligne (Facebook Ads, TikTok Ads) et création web avec l’aide de l’IA.',
    highlights: [
      'Word, Excel, PowerPoint et Canva utilisés régulièrement',
      'Première campagne Facebook Ads réalisée (sans résultats concluants) et découverte des automatisations',
    ],
  },
  {
    id: 'bac-d',
    period: '2023',
    title: 'Baccalauréat Général Série D',
    organization: 'Formation secondaire',
    location: 'Brazzaville',
    type: 'education',
    description: 'Parcours scientifique développant la méthode et l’analyse chiffrée.',
    highlights: ['Obtenu en 2023 à Brazzaville'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'recouvrement',
    title: 'Recouvrement (Masterclass 4 h)',
    description: 'Notions abordées pendant une session pratique de 4 heures à l’ESGAE (mai 2026), sans certificat.',
    skills: [
      {
        name: 'Balance âgée et suivi des échéances',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : classement des factures par ancienneté pour repérer les retards.',
      },
      {
        name: 'Plan de relance J+3 à J+35',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : étapes progressives d’un rappel courtois avant une relance formelle.',
      },
      {
        name: 'Négociation amiable',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en cas pratiques : aborder le dialogue avec un client en gardant une relation correcte.',
      },
    ],
  },
  {
    id: 'comptabilite',
    title: 'Comptabilité & gestion (appris en LPAE)',
    description: 'Bases vues en cours de LPAE et lors d’une participation encadrée sur les DAS 1 & 2.',
    skills: [
      {
        name: 'Déclarations annuelles des salaires (DAS 1 & 2)',
        tier: 2,
        levelLabel: 'Bases',
        description:
          'J’ai participé au montage avec un expert-comptable qui relisait et corrigeait mon travail. J’ai appris de mes erreurs et je veux gagner en autonomie.',
      },
      {
        name: 'Comptabilité OHADA',
        tier: 2,
        levelLabel: 'Bases',
        description: 'Notions et exercices vus en cours à l’ULC et en LPAE (plan comptable, écritures simples).',
      },
      {
        name: 'Trésorerie et contrôle des dépenses',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : suivi simple des entrées, sorties et pièces justificatives.',
      },
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce',
    description: 'Notions théoriques vues durant le cursus en gestion, à mettre en pratique sur le terrain.',
    skills: [
      {
        name: 'Prospection et relation client',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : prise de contact structurée et suivi des échanges clients.',
      },
      {
        name: 'Plan d’action commercial',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : compréhension d’un objectif mensuel et des étapes de suivi.',
      },
    ],
  },
  {
    id: 'management',
    title: 'Management',
    description: 'Bases organisationnelles apprises en cours et lors de travaux collectifs.',
    skills: [
      {
        name: 'Planification et priorisation',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Vu en formation : organiser ses tâches quotidiennes par ordre d’urgence et d’échéance.',
      },
      {
        name: 'Travail en équipe',
        tier: 1,
        levelLabel: 'Notions',
        description: 'Coordination simple avec d’autres membres et suivi des consignes données.',
      },
    ],
  },
  {
    id: 'numerique',
    title: 'Outils numériques (là où je suis le plus à l’aise)',
    description: 'Outils pratiqués en auto-formation depuis 2023 pour gagner du temps sur les tâches courantes.',
    skills: [
      {
        name: 'Word, Excel, PowerPoint, Canva',
        tier: 3,
        levelLabel: 'À l’aise',
        description: 'Utilisés seul et régulièrement : mise en forme de documents, tableaux Excel, présentations et visuels simples.',
      },
      {
        name: 'Automatisation n8n, Zapier, API',
        tier: 2,
        levelLabel: 'Bases',
        description: 'Pratique d’auto-formation sur des liaisons simples entre formulaires, webhooks et notifications.',
      },
      {
        name: 'Facebook Ads et TikTok Ads',
        tier: 2,
        levelLabel: 'Bases',
        description:
          'Première campagne Facebook Ads réalisée, sans résultats concluants. C’est un domaine où j’apprends.',
      },
      {
        name: 'Création web avec l’aide de l’IA',
        tier: 2,
        levelLabel: 'Bases',
        description: 'Réalisation de pages web simples en m’appuyant sur des outils d’IA, pour comprendre et tester.',
      },
    ],
  },
];

export const TODAY_VS_STAGE = {
  today: [
    'Préparer des documents, tableaux et présentations propres sur Word, Excel, PowerPoint et Canva.',
    'Assister sur la saisie, la vérification ou le montage de pièces administratives sous relecture.',
    'Tester de petites automatisations (n8n, Zapier) ou pages web avec l’IA pour simplifier des tâches simples.',
  ],
  inStage: [
    '[À COMPLÉTER : Objectif 1 — Ex. pratiquer la comptabilité courante et les déclarations sur de vrais dossiers]',
    '[À COMPLÉTER : Objectif 2 — Ex. suivre concrètement la relation client et les relances d’impayés]',
    '[À COMPLÉTER : Objectif 3 — Ex. gagner en vitesse, en méthode et en autonomie au sein d’une équipe]',
  ],
};

export const DIGITAL_PROJECTS_DATA: ProjectCase[] = [
  {
    id: 'projet-1',
    title: 'Projet 1 — [À COMPLÉTER : Nom du projet n8n / Zapier]',
    category: 'automation',
    categoryLabel: 'Automatisation',
    badge: 'Démonstration',
    summary: '[À COMPLÉTER : Courte description d’une automatisation simple reliant deux outils via n8n, Zapier ou une API.]',
    workDone: '[À COMPLÉTER : Ce que j’ai configuré concrètement (déclencheur, webhook, envoi de notification).]',
    honestResult: '[À COMPLÉTER : Résultat constaté en test ou apprentissage tiré.]',
    stack: ['n8n', 'Zapier', 'API'],
    mockupType: 'desktop',
  },
  {
    id: 'projet-2',
    title: 'Projet 2 — Première campagne publicitaire Facebook Ads',
    category: 'ads',
    categoryLabel: 'Publicité en ligne',
    badge: 'Projet réel',
    summary: 'Paramétrage d’une première campagne Facebook Ads avec visuels préparés sur Canva dans le cadre de mon auto-formation.',
    workDone: 'Création des visuels sur Canva, rédaction des textes courts et configuration basique d’audience et de budget sur Facebook Ads.',
    honestResult: 'Campagne diffusée mais sans résultats concluants ; utile pour identifier mes erreurs de ciblage et de suivi.',
    stack: ['Facebook Ads', 'Canva', 'TikTok Ads (bases)'],
    mockupType: 'mobile',
  },
  {
    id: 'projet-3',
    title: 'Projet 3 — [À COMPLÉTER : Page web réalisée avec l’aide de l’IA]',
    category: 'web',
    categoryLabel: 'Création web & IA',
    badge: 'Démonstration',
    summary: '[À COMPLÉTER : Mise en page d’un petit site de présentation avec l’aide d’outils d’IA et d’un éditeur simple.]',
    workDone: '[À COMPLÉTER : Structuration du contenu, adaptation mobile et essais d’hébergement.]',
    honestResult: '[À COMPLÉTER : Compétence acquise ou point encore à améliorer.]',
    stack: ['Création web + IA', 'Word / Canva'],
    mockupType: 'desktop',
  },
];

export const SERVICES_DATA: ServiceOffering[] = [
  {
    id: 'service-bureautique',
    title: 'Mise en forme Excel, Word, PowerPoint ou visuels Canva',
    description: 'Tableaux propres, présentations lisibles ou petits supports visuels simples.',
    tag: 'À l’aise',
  },
  {
    id: 'service-automation',
    title: 'Petite automatisation de tâches (n8n / Zapier)',
    description: 'Liaison simple entre un formulaire et une alerte e-mail ou message.',
    tag: 'Bases',
  },
  {
    id: 'service-web',
    title: 'Page web simple avec l’aide de l’IA',
    description: 'Prototype léger pour présenter une activité locale sur mobile.',
    tag: 'Bases',
  },
  {
    id: 'service-ads',
    title: 'Lancement basique de publicités (Facebook / TikTok Ads)',
    description: 'Aide technique de premier niveau sur les réglages de base, en toute transparence sur mon niveau débutant.',
    tag: 'Bases',
  },
];

export const SAMPLE_INVOICES_DEMO = [
  {
    id: 'EX-01',
    client: 'Client exemple A',
    amount: 1450000,
    paidAmount: 1450000,
    dueDate: '2026-10-05',
    status: 'paid' as const,
  },
  {
    id: 'EX-02',
    client: 'Client exemple B',
    amount: 850000,
    paidAmount: 350000,
    dueDate: '2026-10-25',
    status: 'overdue' as const,
  },
  {
    id: 'EX-03',
    client: 'Client exemple C',
    amount: 600000,
    paidAmount: 0,
    dueDate: '2026-11-08',
    status: 'overdue' as const,
  },
  {
    id: 'EX-04',
    client: 'Client exemple D',
    amount: 1200000,
    paidAmount: 200000,
    dueDate: '2026-09-20',
    status: 'overdue' as const,
  },
  {
    id: 'EX-05',
    client: 'Client exemple E',
    amount: 950000,
    paidAmount: 950000,
    dueDate: '2026-11-01',
    status: 'paid' as const,
  },
];
