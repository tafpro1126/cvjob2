import { useState } from 'react';
import { X, Copy, Download, CheckCircle, FileCode, ExternalLink, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StandaloneExportModal({ isOpen, onClose }: StandaloneExportModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  if (!isOpen) return null;

  const checklistItems = [
    { key: '[LIEN_TELECHARGEMENT_CV_PDF]', desc: "Lien vers votre CV PDF hébergé (ex: Google Drive public, GitHub ou votre serveur)." },
    { key: '[LIEN_GOOGLE_FORM]', desc: "URL de votre Google Forms si vous souhaitez rediriger vos prospects/recruteurs dessus." },
    { key: '[PROFIL_LINKEDIN_A_COMPLETER]', desc: "URL de votre profil LinkedIn si vous en avez un." },
    { key: 'Numéros WhatsApp', desc: "+242 06 406 50 70 et +242 06 113 38 15 (déjà renseignés d'après votre CV)." },
    { key: 'Adresse e-mail', desc: "glory3marrion71@gmail.com (déjà renseignée d'après votre CV)." },
    { key: 'Adresse physique', desc: "N° 8, avenue de l'impréco Mansimou, arr8 Madibou, Brazzaville (déjà renseignée)." }
  ];

  const handleCopyChecklist = () => {
    const text = checklistItems.map(c => `- ${c.key} : ${c.desc}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  const handleDownloadStandaloneHtml = () => {
    // Generate clean standalone HTML
    const standaloneHtml = `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Marion Moun — Portfolio LPAE Gestion, Commerce & Recouvrement | Brazzaville</title>
  <meta name="description" content="Portfolio professionnel de Marion Moun, diplômé en LPAE (ESGAE, Brazzaville) - Stage en Commerce, Comptabilité, Recouvrement, Management et Services Web." />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { 50: '#f0f9ff', 500: '#0284c7', 600: '#0369a1', 700: '#075985' }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">

  <!-- En-tête Fixe -->
  <header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-lg shadow-sm">MM</div>
      <div>
        <div class="font-bold text-slate-900 dark:text-white leading-tight">Marion Moun</div>
        <div class="text-xs text-slate-500 dark:text-slate-400">LPAE · ESGAE Brazzaville</div>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button onclick="toggleDarkMode()" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">🌓</button>
      <a href="https://wa.me/242064065070" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">WhatsApp Direct</a>
    </div>
  </header>

  <!-- Navigation Onglets Principaux -->
  <div class="max-w-4xl mx-auto px-4 mt-6">
    <div class="flex p-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-sm font-bold">
      <button id="btn-tab-stage" onclick="switchTab('stage')" class="flex-1 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm transition-all">
        1. Profil & Stage Métier
      </button>
      <button id="btn-tab-digital" onclick="switchTab('digital')" class="flex-1 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 transition-all">
        2. Digital Web & Atouts
      </button>
    </div>
  </div>

  <!-- ONGLET 1: PROFIL & STAGE -->
  <main id="content-stage" class="max-w-4xl mx-auto px-4 py-8 space-y-12">
    <!-- Hero -->
    <section class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
        ✓ Profil Certifié CV (Code QR) · Brazzaville
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
        Marion Moun
      </h1>
      <p class="text-base sm:text-lg text-sky-600 dark:text-sky-400 font-bold">
        Diplômé en LPAE | Commerce, Comptabilité, Recouvrement & Management
      </p>
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Ce site dit ce que mon CV ne peut pas dire : j'allie la rigueur de gestion d'entreprise et des comptes à la puissance d'automatisation des outils web pour sécuriser vos encaissements et accélérer vos processus dès la première semaine.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a href="https://wa.me/242064065070" class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">Me contacter (WhatsApp)</a>
        <a href="tel:+242064065070" class="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs">Appel direct (+242 06 406 50 70)</a>
      </div>
    </section>

    <!-- Preuve Visuelle : Recouvrement -->
    <section class="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
      <div class="text-xs uppercase tracking-wider text-amber-400 font-bold">Exemple illustratif, données fictives</div>
      <h3 class="text-xl font-bold">Tableau de Bord Recouvrement & Plan de Relance</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-800">
          <div class="text-slate-400">Total Facturé</div>
          <div class="text-lg font-black mt-1">4 950 000 FCFA</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-800">
          <div class="text-slate-400">Total Encaissé</div>
          <div class="text-lg font-black text-emerald-400 mt-1">4 185 000 FCFA</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-800">
          <div class="text-slate-400">Taux Recouvrement</div>
          <div class="text-lg font-black text-sky-400 mt-1">84.5%</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-800">
          <div class="text-slate-400">DSO (Délai Moyen)</div>
          <div class="text-lg font-black text-amber-400 mt-1">19 jours</div>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-slate-850 border border-slate-800 text-xs space-y-2">
        <div class="font-bold text-sky-400">Protocole de relance J+3 à J+35 :</div>
        <p class="text-slate-300">J+3 : Rappel courtois SMS/WhatsApp ➔ J+10 : Écrit formel avec relevé ➔ J+20 : Sommation amiable 48h ➔ J+35 : Échéancier ou Contentieux.</p>
      </div>
    </section>

    <!-- Pourquoi moi dès la première semaine -->
    <section class="p-6 rounded-3xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 space-y-3">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">Pourquoi moi dès la première semaine ?</h3>
      <ul class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <li>✓ <strong>Autonomie immédiate :</strong> Formé aux réalités du cabinet d'expertise comptable (DAS 1 & 2 chez Émeraude).</li>
        <li>✓ <strong>Spécialiste de la trésorerie :</strong> Certifié par une Masterclass sur le recouvrement des créances & impayés.</li>
        <li>✓ <strong>Mobilité totale :</strong> Titulaire du permis de conduire catégorie B pour tous déplacements à Brazzaville.</li>
      </ul>
    </section>
  </main>

  <!-- ONGLET 2: DIGITAL WEB -->
  <main id="content-digital" class="hidden max-w-4xl mx-auto px-4 py-8 space-y-8">
    <section class="p-6 rounded-3xl bg-indigo-900 text-white space-y-3">
      <h2 class="text-2xl font-extrabold">La Passerelle Gestion + Web</h2>
      <p class="text-xs sm:text-sm text-indigo-100 leading-relaxed">
        Un profil gestion/commerce qui sait digitaliser et automatiser est un stagiaire qui apporte de la valeur tout de suite : suppression des ressaisies manuelles, alertes d'impayés et sites vitrines prêts à vendre.
      </p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">Facturation Télécom</span>
        <h4 class="font-bold text-slate-900 dark:text-white">Système de Facturation & Recouvrement</h4>
        <p class="text-xs text-slate-600 dark:text-slate-400">Automatisation des factures récurrentes et relances SMS : -45% de temps de traitement.</p>
      </div>

      <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">Portail Associatif</span>
        <h4 class="font-bold text-slate-900 dark:text-white">Plateforme Étudiants & Cotisations</h4>
        <p class="text-xs text-slate-600 dark:text-slate-400">Enrôlement et traçabilité des cotisations pour 450+ étudiants avec export trésorerie.</p>
      </div>
    </div>
  </main>

  <!-- Script Navigation & QR Handler -->
  <script>
    function switchTab(tab) {
      const stage = document.getElementById('content-stage');
      const digital = document.getElementById('content-digital');
      const btnStage = document.getElementById('btn-tab-stage');
      const btnDigital = document.getElementById('btn-tab-digital');

      if (tab === 'digital') {
        stage.classList.add('hidden');
        digital.classList.remove('hidden');
        btnDigital.className = 'flex-1 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm transition-all';
        btnStage.className = 'flex-1 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 transition-all';
        window.location.hash = 'digital';
      } else {
        digital.classList.add('hidden');
        stage.classList.remove('hidden');
        btnStage.className = 'flex-1 py-2.5 rounded-lg bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm transition-all';
        btnDigital.className = 'flex-1 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 transition-all';
        window.location.hash = 'stage';
      }
    }

    // QR Code / URL parameter detection (?src=cv)
    window.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (hash === '#digital') {
        switchTab('digital');
      } else if (params.get('src') === 'cv' || hash === '#stage') {
        switchTab('stage');
      }
    });

    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Livrable Clé en Main
          </span>
          <h2 id="export-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Fichier Unique index.html Autonome (GitHub Pages & Netlify)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Conformément à votre demande, ce fichier rassemble tout le HTML, CSS et JavaScript dans un fichier 100% autonome prêt à être glissé-déposé sur Netlify Drop ou publié sur GitHub Pages.
          </p>
        </div>

        {/* Download Button Card */}
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
              Télécharger le fichier index.html autonome
            </div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400">
              Prêt pour hébergement gratuit sans aucune installation.
            </div>
          </div>
          <button
            onClick={handleDownloadStandaloneHtml}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger index.html</span>
          </button>
        </div>

        {/* Checklist of elements to customize */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Liste des éléments à personnaliser :
            </h4>
            <button
              onClick={handleCopyChecklist}
              className="text-xs text-sky-600 dark:text-sky-400 font-semibold hover:underline flex items-center gap-1"
            >
              {copiedChecklist ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChecklist ? 'Checklist copiée !' : 'Copier la checklist'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 p-2 text-xs">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="p-2.5 flex items-start gap-2">
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400 shrink-0">
                  {item.key}
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  : {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
