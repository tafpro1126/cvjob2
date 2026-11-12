import { useState } from 'react';
import { X, Copy, Download, Check, FileCode } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StandaloneExportModal({ isOpen, onClose }: StandaloneExportModalProps) {
  const [copiedChecklist, setCopiedChecklist] = useState(false);

  if (!isOpen) return null;

  const checklistItems = [
    { key: '[PHOTO]', desc: 'Remplacer le bloc photo par votre vrai portrait photo (ex: portrait_marion.jpg).' },
    { key: '[LIEN_PDF_CV]', desc: 'Lien direct vers votre CV PDF (ex: Google Drive public ou fichier hébergé).' },
    { key: 'Coordonnées', desc: 'Téléphones +242 06 406 50 70 / +242 06 113 38 15 et email glory3marrion71@gmail.com déjà intégrés.' },
    { key: 'Captures de projets', desc: 'Remplacer les cadres SVG des projets par vos vraies captures d\'écran si vous le souhaitez.' }
  ];

  const handleCopyChecklist = () => {
    const text = checklistItems.map(c => `- ${c.key} : ${c.desc}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  const handleDownloadStandaloneHtml = () => {
    const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Marion Moun — Portfolio LPAE Gestion & Recouvrement | Brazzaville</title>
  <meta name="description" content="Portfolio professionnel de Marion Moun, diplômé LPAE ESGAE. Stage en Commerce, Comptabilité, Recouvrement et Management à Brazzaville." />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --ios-bg: #F2F2F7;
      --ios-card: #FFFFFF;
      --ios-separator: rgba(60, 60, 67, 0.12);
      --ios-label: #000000;
      --ios-secondary: #3C3C4399;
      --ios-blue: #0071E3;
    }
    .dark {
      --ios-bg: #000000;
      --ios-card: #1C1C1E;
      --ios-separator: rgba(255, 255, 255, 0.12);
      --ios-label: #FFFFFF;
      --ios-secondary: #EBEBF599;
      --ios-blue: #0A84FF;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
      background-color: var(--ios-bg);
      color: var(--ios-label);
      letter-spacing: -0.011em;
    }
    .liquid-glass {
      background-color: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(20px) saturate(190%);
      -webkit-backdrop-filter: blur(20px) saturate(190%);
      border-color: rgba(0, 0, 0, 0.08);
    }
    .dark .liquid-glass {
      background-color: rgba(28, 28, 30, 0.82);
      border-color: rgba(255, 255, 255, 0.12);
    }
    .ios-inset-group {
      background-color: var(--ios-card);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid var(--ios-separator);
    }
    .ios-segmented {
      background-color: rgba(118, 118, 128, 0.12);
      border-radius: 12px;
      padding: 3px;
      display: inline-flex;
    }
    .ios-segmented-btn {
      border-radius: 9px;
      padding: 6px 16px;
      font-size: 13px;
      font-weight: 500;
      color: var(--ios-secondary);
      transition: all 0.2s ease;
    }
    .ios-segmented-btn.active {
      background-color: var(--ios-card);
      color: var(--ios-label);
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
  </style>
</head>
<body class="transition-colors duration-200 min-h-screen flex flex-col">

  <!-- En-tête Liquid Glass -->
  <header class="sticky top-0 z-40 w-full liquid-glass border-b">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold text-xs flex items-center justify-center">MM</div>
        <div>
          <div class="text-[14px] font-semibold">Marion Moun</div>
          <div class="text-[11px] text-neutral-500 hidden sm:block">LPAE · ESGAE Brazzaville</div>
        </div>
      </div>

      <nav class="hidden sm:inline-flex ios-segmented">
        <button id="btn-seg-stage" onclick="switchTab('stage')" class="ios-segmented-btn active">Profil & Stage</button>
        <button id="btn-seg-digital" onclick="switchTab('digital')" class="ios-segmented-btn">Digital Web</button>
      </nav>

      <div class="flex items-center gap-2">
        <button onclick="toggleDarkMode()" class="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300">🌓</button>
        <a href="https://wa.me/242064065070" target="_blank" class="px-3.5 py-1.5 rounded-full bg-[#0071E3] text-white text-[13px] font-semibold">Me contacter</a>
      </div>
    </div>
  </header>

  <!-- Contenu Principal -->
  <main class="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-10 w-full">
    
    <!-- Hero Handcrafted -->
    <section class="space-y-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 text-[#0071E3] text-[13px] font-medium">
        <span>Stage recherché · Brazzaville</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div class="md:col-span-4 flex flex-col items-start">
          <div class="w-44 h-52 rounded-[24px] bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-center p-3">
            <div class="w-16 h-16 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-xl mb-2">👤</div>
            <div class="text-[12px] font-semibold text-neutral-700 dark:text-neutral-200">[PHOTO]</div>
            <div class="text-[10px] text-neutral-500">Photo portrait recadrée</div>
          </div>
          <div class="w-full mt-3 ios-inset-group p-3 text-[12px] space-y-1.5">
            <div class="flex justify-between"><span>Localisation :</span><strong>Mansimou, Brazza</strong></div>
            <div class="flex justify-between"><span>Diplôme :</span><strong>LPAE (ESGAE)</strong></div>
            <div class="flex justify-between"><span>Permis :</span><strong>Permis B</strong></div>
          </div>
        </div>

        <div class="md:col-span-8 space-y-4">
          <h1 class="text-[34px] font-bold tracking-tight">Marion Moun</h1>
          <p class="text-[16px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Diplômé en administration des entreprises (LPAE) à l'ESGAE, je recherche un stage opérationnel de 3 à 6 mois à Brazzaville en commerce, comptabilité, recouvrement ou management.
          </p>
          <p class="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Pratique réelle des déclarations fiscales DAS 1 & 2 chez Émeraude avec M. Yves Miatoko, et spécialisation en réduction des délais de paiement lors de la Masterclass Recouvrement de mai 2026.
          </p>
          <div class="flex flex-wrap gap-2.5 pt-2">
            <a href="https://wa.me/242064065070" target="_blank" class="px-5 py-2 rounded-xl bg-[#0071E3] text-white text-[14px] font-semibold">WhatsApp</a>
            <a href="tel:+242064065070" class="px-5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-[14px] font-semibold">Appel direct</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Mobile In-Page -->
    <div class="flex sm:hidden justify-center">
      <nav class="ios-segmented">
        <button id="btn-seg-stage-mob" onclick="switchTab('stage')" class="ios-segmented-btn active">Profil & Stage</button>
        <button id="btn-seg-digital-mob" onclick="switchTab('digital')" class="ios-segmented-btn">Digital Web</button>
      </nav>
    </div>

    <!-- ONGLET 1: STAGE & PROFIL -->
    <div id="tab-stage" class="space-y-8">
      <section class="space-y-3">
        <h2 class="text-[20px] font-bold">Compétences par domaine</h2>
        <div class="ios-inset-group">
          <div class="p-3.5 border-b border-neutral-200 dark:border-neutral-800 flex justify-between">
            <span>Balance âgée & Suivi des échéances</span><strong>Expert</strong>
          </div>
          <div class="p-3.5 border-b border-neutral-200 dark:border-neutral-800 flex justify-between">
            <span>Plan de relance multi-canaux (J+3 à J+35)</span><strong>Pratique</strong>
          </div>
          <div class="p-3.5 border-b border-neutral-200 dark:border-neutral-800 flex justify-between">
            <span>Déclarations fiscales DAS 1 & 2 (OHADA)</span><strong>Spécialité</strong>
          </div>
          <div class="p-3.5 flex justify-between">
            <span>Tableaux de bord connectés & Automatisation</span><strong>Avancé</strong>
          </div>
        </div>
      </section>

      <section class="ios-inset-group p-5 space-y-4">
        <h3 class="text-[17px] font-semibold">Tableau de bord Recouvrement (Données fictives)</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[13px]">
          <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">Facturé : <strong>5 050 000 FCFA</strong></div>
          <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">Encaissé : <strong>4 150 000 FCFA</strong></div>
          <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">Taux : <strong>82.1%</strong></div>
          <div class="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">Retard moyen : <strong>19 jours</strong></div>
        </div>
        <div class="text-[11px] text-neutral-400 italic text-center">Exemple illustratif, données fictives</div>
      </section>
    </div>

    <!-- ONGLET 2: DIGITAL WEB -->
    <div id="tab-digital" class="hidden space-y-6">
      <section class="ios-inset-group p-5 space-y-3">
        <h2 class="text-[18px] font-bold">La passerelle Gestion + Web</h2>
        <p class="text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Un profil de gestion capable d'automatiser apporte une valeur immédiate : zéro ressaisie papier, clôture quotidienne de trésorerie en 5 minutes, et visibilité client en direct sur smartphone.
        </p>
      </section>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="ios-inset-group p-4 space-y-2">
          <h4 class="font-bold text-[15px]">Facturation & Recouvrement Télécom</h4>
          <p class="text-[13px] text-neutral-500">Calcul automatique d'intérêts et relances WhatsApp : -45% de temps de gestion.</p>
        </div>
        <div class="ios-inset-group p-4 space-y-2">
          <h4 class="font-bold text-[15px]">Tableau de Bord Trésorerie Google Sheets</h4>
          <p class="text-[13px] text-neutral-500">Formulaire mobile de dépenses et suivi prévisionnel sans abonnement payant.</p>
        </div>
      </div>
    </div>

  </main>

  <footer class="border-t border-neutral-200 dark:border-neutral-800 p-6 text-center text-[13px] text-neutral-500">
    « Ce site a été conçu pour aller à l'essentiel : des compétences vérifiables, sans artifice. » — Marion Moun, Brazzaville.
  </footer>

  <script>
    function switchTab(tab) {
      const stage = document.getElementById('tab-stage');
      const digital = document.getElementById('tab-digital');
      const b1 = document.getElementById('btn-seg-stage');
      const b2 = document.getElementById('btn-seg-digital');
      const b1m = document.getElementById('btn-seg-stage-mob');
      const b2m = document.getElementById('btn-seg-digital-mob');

      if (tab === 'digital') {
        stage.classList.add('hidden');
        digital.classList.remove('hidden');
        if (b1) { b1.classList.remove('active'); b2.classList.add('active'); }
        if (b1m) { b1m.classList.remove('active'); b2m.classList.add('active'); }
        window.location.hash = 'digital';
      } else {
        digital.classList.add('hidden');
        stage.classList.remove('hidden');
        if (b1) { b1.classList.add('active'); b2.classList.remove('active'); }
        if (b1m) { b1m.classList.add('active'); b2m.classList.remove('active'); }
        window.location.hash = 'stage';
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      const p = new URLSearchParams(window.location.search);
      const h = window.location.hash;
      if (h === '#digital') switchTab('digital');
      else if (p.get('src') === 'cv' || h === '#stage') switchTab('stage');
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-[24px] p-6 shadow-2xl space-y-5 border border-black/5 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-bold text-neutral-900 dark:text-neutral-100">
              Export Fichier Unique index.html
            </h3>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
              Prêt à héberger gratuitement sur GitHub Pages ou Netlify
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 flex items-center justify-between gap-3">
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100">
              Télécharger le fichier index.html autonome
            </div>
            <div className="text-[12px] text-neutral-500 dark:text-neutral-400">
              Aucune dépendance externe, CSS et scripts inclus.
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadStandaloneHtml}
            className="px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-semibold shrink-0 cursor-pointer"
          >
            Télécharger
          </button>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px] font-medium text-neutral-700 dark:text-neutral-300">
            <span>Éléments à remplacer dans le fichier :</span>
            <button
              type="button"
              onClick={handleCopyChecklist}
              className="text-[#0071E3] dark:text-[#0A84FF] hover:underline flex items-center gap-1 cursor-pointer text-[12px]"
            >
              {copiedChecklist ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChecklist ? 'Copié' : 'Copier liste'}</span>
            </button>
          </div>

          <div className="ios-inset-group text-[13px]">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="p-3 border-b last:border-b-0 border-neutral-100 dark:border-neutral-800 flex items-start gap-2">
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 shrink-0">
                  {item.key}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  : {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[14px] font-semibold cursor-pointer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
