import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '20mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MARION_SYSTEM_PROMPT = `Tu es l'assistant virtuel et ambassadeur IA de Marion Moun.
Marion Moun est titulaire d'une Licence Professionnelle en Administration des Entreprises (LPAE) obtenue à l'ESGAE (École Supérieure de Gestion et d'Administration des Entreprises) à Brazzaville, Congo, précédée d'un Tronc Commun en Gestion à l'ULC (Université Libre du Congo) et d'un Bac D au lycée Sébastien Mafouta.
Il a suivi une Masterclass spécialisée en "Recouvrement de créances & Gestion des impayés" en mai 2026.
Expériences clés :
- Projet Comptable Professionnel Académique (DAS 1 & DAS 2) chez Emeraude sous la direction de M. Yves Miatoko, Expert-Comptable.
- Consultant indépendant en Web, E-commerce et Digitalisation.
- Agent de surface BEM Service / GFAC (août 2026) et stage serveur chez Good Vibes.
- Titulaire du permis de conduire catégorie B (formation Bling Auto-école).

OBJECTIF PRIORITAIRE :
Marion recherche un stage pratique et opérationnel dans les métiers de la gestion d'entreprise :
1. COMMERCE (prospection, relation client, négociation, plan d'action commercial)
2. COMPTABILITÉ (opérations courantes, déclarations fiscales, suivi de trésorerie, DAS 1/2)
3. RECOUVREMENT (balance âgée, plan de relance J+3 à J+35, négociations amiables, réduction du DSO)
4. MANAGEMENT (coordination d'équipe, optimisation de processus, rigueur)

ATOUT DIFFÉRENCIANT :
Sa double compétence en transformation digitale : il sait créer des tableaux de bord automatisés, maîtriser Google Workspace (Sheets, Forms, Drive), automatiser la facturation et piloter des campagnes digitales.

COORDONNÉES DE MARION :
- Email : glory3marrion71@gmail.com
- Téléphone & WhatsApp : +242 06 406 50 70 / +242 06 113 38 15
- Localisation : Brazzaville (arr8 Madibou / Mansimou), Congo.

CONSIGNES DE RÉPONSE :
Sois courtois, percutant, structuré, chaleureux et orienté solution. Mets en avant sa motivation, sa rigueur et sa capacité à apporter de la valeur dès la première semaine. Réponds toujours en français.`;

// Endpoint 1: Gemini Chatbot
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;
    if (!userMessage && (!messages || messages.length === 0)) {
      return res.status(400).json({ error: 'Message requis' });
    }

    // Build contents array for multi-turn history
    const contents: any[] = [];
    if (Array.isArray(messages)) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content }],
        });
      }
    }
    if (userMessage) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: MARION_SYSTEM_PROMPT,
      },
    });

    const reply = response.text || "Je suis à votre disposition pour toute information sur le profil de Marion Moun.";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Erreur API Gemini Chat:', error);
    return res.status(500).json({
      error: 'Erreur lors de la génération de réponse IA',
      details: error.message || String(error),
    });
  }
});

// Endpoint 2: Document / Invoice Scanner & Recovery Assistant
app.post('/api/gemini/analyze-document', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/png', additionalNotes } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image requise pour l\'analyse' });
    }

    // Clean base64 string if it contains data URI prefix
    const base64Data = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const promptText = `Tu es un expert en analyse de documents financiers et recouvrement de créances.
Analyse cette facture ou ce document commercial / comptable.
${additionalNotes ? `Note contextuelle : ${additionalNotes}` : ''}

Fournis une analyse structurée au format JSON STRICT suivant :
{
  "documentType": "Facture" ou "Bon de commande" ou "Reçu" ou "Relevé de compte",
  "clientName": "Nom du client/débiteur détecté",
  "invoiceNumber": "Numéro de document ou Inconnu",
  "amount": "Montant total détecté avec devise (ex: 750 000 FCFA)",
  "dueDate": "Date d'échéance détectée ou estimée",
  "delayAssessment": "Évaluation du retard ou statut",
  "riskLevel": "Faible" ou "Modéré" ou "Élevé" ou "Critique",
  "keyObservations": ["Observation 1", "Observation 2", "Observation 3"],
  "recommendedAction": "Action recommandée selon le protocole de relance (J+3, J+10, J+20 ou J+35)",
  "draftRelanceLetter": "Proposition concrète d'un court message de relance courtois et ferme prêt à envoyer par WhatsApp ou Email"
}`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/png',
        data: base64Data,
      },
    };

    const textPart = {
      text: promptText,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      parsedData = { rawText };
    }

    return res.json({ result: parsedData });
  } catch (error: any) {
    console.error('Erreur API Gemini Analyze Document:', error);
    return res.status(500).json({
      error: 'Erreur lors de l\'analyse du document',
      details: error.message || String(error),
    });
  }
});

// Endpoint 3: Dynamic Projects List (Google Sheets Connector Ready)
app.get('/api/projects', (_req: Request, res: Response) => {
  // Pre-configured projects with structure ready for external Google Sheets Sync
  const projects = [
    {
      id: 'telecom-billing',
      title: 'Système de Facturation & Recouvrement Télécom',
      category: 'gestion',
      categoryLabel: 'Gestion & Recouvrement',
      badge: 'Cas Réel / Pro',
      summary: 'Plateforme web automatisant l’émission de factures récurrentes, le calcul d’intérêts de retard et les relances multi-canaux (SMS / Email / WhatsApp).',
      problem: 'Une entreprise locale de sous-traitance télécom gérait plus de 120 clients sur des fichiers Excel dispersés, provoquant 45 jours de retard moyen de paiement et des erreurs de facturation répétées.',
      solution: 'Conception d’une application web centralisée avec génération instantanée de factures PDF, balance âgée automatisée et déclenchement programmé des rappels selon l’échéancier.',
      stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'API SMS', 'PDF Kit'],
      results: [
        '-45% de temps passé sur la gestion administrative mensuelle',
        '+32% d’encaissements sous 30 jours dès le deuxième mois',
        '0 facture égarée ou oubliée'
      ],
      mockupType: 'desktop',
      demoUrl: '#',
      featured: true,
    },
    {
      id: 'student-association',
      title: 'Plateforme de Gestion des Étudiants & Cotisations',
      category: 'web',
      categoryLabel: 'Application Web',
      badge: 'Projet Académique & Vie de Campus',
      summary: 'Portail associatif complet permettant l’enrôlement des étudiants, le paiement sécurisé des cotisations (simulation Mobile Money) et la publication des actualités.',
      problem: 'Gestion manuelle des listes d’adhérents sur cahiers physiques, pertes d’informations et litiges lors des assemblées générales quant à l’état financier de l’association.',
      solution: 'Développement d’une interface responsive avec tableau de bord trésorier en temps réel, reçus numériques automatiques et annuaire sécurisé.',
      stack: ['Next.js / React', 'Tailwind CSS', 'Supabase', 'Mobile Money Gateway', 'Export Excel'],
      results: [
        'Plus de 450 étudiants enregistrés en 2 semaines',
        'Transparence financière totale certifiée par les délégués',
        'Accès mobile 100% fluide sur smartphones'
      ],
      mockupType: 'mobile',
      demoUrl: '#',
      featured: true,
    },
    {
      id: 'ecommerce-ads',
      title: 'Boutique E-commerce & Campagnes Facebook Ads',
      category: 'ecommerce',
      categoryLabel: 'E-commerce & Ads',
      badge: 'Prestation Client',
      summary: 'Création d’un site de vente en ligne couplé à une stratégie de publicité ciblée sur Facebook & Instagram pour le marché de Brazzaville.',
      problem: 'Un commerçant local peinait à convertir ses publications sur Facebook en ventes fermes en raison de l’absence de catalogue clair et d’un processus de commande chaotique.',
      solution: 'Mise en place d’une boutique rapide adaptée aux connexions mobiles africaines, tunnel d’achat direct vers WhatsApp et campagnes publicitaires locales ciblées.',
      stack: ['WordPress / WooCommerce', 'Meta Pixel', 'Facebook Ads Manager', 'WhatsApp API'],
      results: [
        'ROAS (Retour sur investissement publicitaire) de x3.8',
        '+120 commandes validées dès le premier mois de lancement',
        'Panier moyen augmenté de 25%'
      ],
      mockupType: 'mobile',
      demoUrl: '#',
      featured: true,
    },
    {
      id: 'treasury-dashboard',
      title: 'Tableau de Bord de Trésorerie & Google Workspace',
      category: 'automation',
      categoryLabel: 'Automatisation & Data',
      badge: 'Outil de Gestion',
      summary: 'Système d’automatisation reliant Google Forms, Google Sheets et Looker Studio pour le suivi en temps réel de la trésorerie et des dépenses d’exploitation.',
      problem: 'Le chef d’entreprise n’avait aucune visibilité journalière sur le solde disponible et découvrait les découverts bancaires en fin de mois.',
      solution: 'Formulaire mobile de saisie des décaissements / encaissements, script Google Apps de calcul de balance et tableau de bord visuel instantané.',
      stack: ['Google Sheets API', 'Google Forms', 'Looker Studio', 'Apps Script'],
      results: [
        'Clôture comptable journalière en 5 minutes au lieu de 40 minutes',
        'Anticipation des tensions de trésorerie à 15 jours',
        'Tableau consultable en 1 clic sur téléphone'
      ],
      mockupType: 'desktop',
      demoUrl: '#',
      featured: true,
    }
  ];

  res.json({
    status: 'success',
    syncedAt: new Date().toISOString(),
    source: 'local_ready_for_sheets_sync',
    data: projects,
  });
});

// Setup Vite middlewares for development or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portail Portfolio Marion Moun en ligne sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Échec démarrage serveur:', err);
  process.exit(1);
});
