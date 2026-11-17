import { useEffect, useRef, useState } from 'react';
import { X, Copy, Check, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StandaloneExportModal({ isOpen, onClose }: StandaloneExportModalProps) {
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = dialogRef.current;
    if (container) {
      const firstBtn = container.querySelector<HTMLElement>('button');
      firstBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const checklistItems = [
    { key: '[PHOTO]', desc: 'Remplacer le bloc photo par votre portrait recadré.' },
    { key: '[LIEN_PDF_CV]', desc: 'Mettre le lien public vers votre CV PDF téléchargeable.' },
    { key: '[HÉBERGEUR]', desc: 'Compléter le nom et les coordonnées de l’hébergeur (Mentions légales & Confidentialité).' },
    { key: '[CAPTURE_PROJET]', desc: 'Remplacer les aperçus des projets par vos captures réelles si souhaité.' },
    { key: '[À COMPLÉTER]', desc: 'Vérifier les compteurs/liens externes (LinkedIn, formulaire Google, mesure d’audience).' },
  ];

  const handleCopyChecklist = async () => {
    const text = checklistItems.map((c) => `- ${c.key} : ${c.desc}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedChecklist(true);
      window.setTimeout(() => setCopiedChecklist(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleDownloadStandaloneHtml = () => {
    const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Marion Moun — Gestion, Recouvrement &amp; Digital Web | Brazzaville</title>
  <meta name="description" content="Portfolio professionnel de Marion Moun, diplômé LPAE à l'ESGAE (Brazzaville). Recherche de stage en commerce, comptabilité, recouvrement et management." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --accent: #3B49DF;
      --accent-hover: #2E3BC7;
      --ink: #0A2540;
      --muted: #425466;
      --subtle: #697386;
      --bg: #FFFFFF;
      --surface: #F6F9FC;
      --elevated: #FFFFFF;
      --hairline: rgba(10, 37, 64, 0.09);
      --glass: rgba(255, 255, 255, 0.86);
      --shadow: 0 4px 14px rgba(10, 37, 64, 0.06), 0 1px 3px rgba(10, 37, 64, 0.04);
      --shadow-hover: 0 14px 30px rgba(10, 37, 64, 0.1), 0 4px 10px rgba(10, 37, 64, 0.06);
    }
    .dark {
      --accent: #6875F5;
      --accent-hover: #7E8AF8;
      --ink: #F8FAFC;
      --muted: #B4C0D0;
      --subtle: #8895A7;
      --bg: #070B14;
      --surface: #0D1422;
      --elevated: #121B2D;
      --hairline: rgba(248, 250, 252, 0.1);
      --glass: rgba(7, 11, 20, 0.86);
      --shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
      --shadow-hover: 0 16px 36px rgba(0, 0, 0, 0.45);
    }
    * { box-sizing: border-box; }
    html {
      font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      scroll-behavior: smooth;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
    }
    body { margin: 0; background: var(--bg); color: var(--ink); overflow-x: hidden; line-height: 1.6; }
    a { color: inherit; text-decoration: none; }
    button, input, select { font-family: inherit; }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .tnum { font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
    .container { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
    .hidden { display: none !important; }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      height: 44px; padding: 0 18px; border-radius: 6px; font-size: 15px; font-weight: 500;
      cursor: pointer; border: 1px solid transparent; transition: background-color 150ms ease, border-color 150ms ease;
      white-space: nowrap;
    }
    .btn-primary { background: var(--accent); color: #FFF; }
    .btn-primary:hover { background: var(--accent-hover); }
    .btn-secondary { background: var(--elevated); color: var(--ink); border-color: var(--hairline); }
    .btn-secondary:hover { background: var(--surface); border-color: var(--muted); }
    .chev { transition: transform 150ms ease; display: inline-block; }
    .btn-primary:hover .chev { transform: translateX(3px); }

    header {
      position: sticky; top: 0; z-index: 40; transition: background-color 180ms ease, backdrop-filter 180ms ease;
    }
    header.scrolled {
      background: var(--glass); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    }
    .header-inner { height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .brand { display: inline-flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; }
    .monogram {
      width: 28px; height: 28px; border-radius: 6px; background: var(--ink); color: var(--bg);
      font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;
    }
    .nav-links { display: flex; align-items: center; gap: 28px; }
    .nav-item { position: relative; }
    .nav-btn {
      background: none; border: none; color: var(--muted); font-size: 15px; font-weight: 500;
      padding: 8px 0; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; position: relative;
    }
    .nav-btn.active, .nav-btn:hover { color: var(--ink); }
    .nav-btn::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
      background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform 180ms ease;
    }
    .nav-btn.active::after { transform: scaleX(1); }
    .dropdown {
      position: absolute; top: 100%; left: 0; margin-top: 8px; width: 256px; padding: 8px;
      background: var(--elevated); border-radius: 8px; box-shadow: 0 20px 44px rgba(10,37,64,0.14);
      animation: ddEnter 160ms cubic-bezier(0.16, 1, 0.3, 1); z-index: 50;
    }
    .dropdown button {
      width: 100%; text-align: left; background: none; border: none; padding: 10px 12px;
      border-radius: 6px; cursor: pointer; color: var(--ink); display: block;
    }
    .dropdown button:hover { background: var(--surface); }
    .dropdown small { display: block; color: var(--muted); font-size: 12px; margin-top: 2px; }
    @keyframes ddEnter { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

    .hero { position: relative; overflow: hidden; padding: 36px 0 56px; }
    .mesh-1, .mesh-2, .mesh-3 {
      position: absolute; border-radius: 999px; pointer-events: none; will-change: transform, opacity;
    }
    .mesh-1 {
      top: -110px; right: -90px; width: 620px; height: 560px; filter: blur(56px);
      background: radial-gradient(circle at 35% 35%, #4F46E5 0%, #7C3AED 44%, #EC4899 82%, transparent 100%);
      animation: meshFlow1 10s ease-in-out infinite;
    }
    .mesh-2 {
      top: 40px; right: 8%; width: 500px; height: 460px; filter: blur(58px);
      background: radial-gradient(circle at 60% 45%, #F97316 0%, #FB7185 48%, #8B5CF6 88%, transparent 100%);
      animation: meshFlow2 13s ease-in-out infinite;
    }
    .mesh-3 {
      top: -40px; right: 24%; width: 440px; height: 420px; filter: blur(52px);
      background: radial-gradient(circle at 50% 50%, #38BDF8 0%, #60A5FA 42%, #6366F1 84%, transparent 100%);
      animation: meshFlow3 9.5s ease-in-out infinite;
    }
    .dark .mesh-1, .dark .mesh-2, .dark .mesh-3 { filter: blur(66px) brightness(0.68); }
    .hero-scrim {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(90deg, var(--bg) 0%, rgba(255,255,255,0.72) 42%, transparent 100%);
    }
    .dark .hero-scrim {
      background: linear-gradient(90deg, var(--bg) 0%, rgba(7,11,20,0.75) 42%, transparent 100%);
    }
    @keyframes meshFlow1 {
      0%, 100% { transform: translate3d(0,0,0) rotate(-14deg) scale(1); opacity: 0.48; }
      33% { transform: translate3d(-78px,42px,0) rotate(-4deg) scale(1.1); opacity: 0.62; }
      66% { transform: translate3d(44px,76px,0) rotate(-20deg) scale(0.95); opacity: 0.42; }
    }
    @keyframes meshFlow2 {
      0%, 100% { transform: translate3d(0,0,0) rotate(10deg) scale(0.96); opacity: 0.42; }
      50% { transform: translate3d(-96px,-54px,0) rotate(24deg) scale(1.14); opacity: 0.58; }
    }
    @keyframes meshFlow3 {
      0%, 100% { transform: translate3d(0,0,0) rotate(0deg) scale(1.04); opacity: 0.36; }
      40% { transform: translate3d(68px,-46px,0) rotate(14deg) scale(0.92); opacity: 0.52; }
      75% { transform: translate3d(-52px,56px,0) rotate(-10deg) scale(1.1); opacity: 0.44; }
    }
    .hero-grid { display: grid; grid-template-columns: 1.7fr 0.9fr; gap: 48px; align-items: center; position: relative; z-index: 2; }
    h1 { font-size: clamp(36px, 5vw, 68px); font-weight: 300; letter-spacing: -0.02em; line-height: 1.05; margin: 0 0 20px; }
    .lead { font-size: 20px; color: var(--muted); margin: 0 0 18px; max-width: 620px; }
    .explorer-link {
      display: inline-flex; align-items: center; gap: 6px; height: 44px; padding: 0 12px;
      background: none; border: none; font-size: 15px; font-weight: 500;
      color: var(--ink); cursor: pointer; transition: color 150ms ease;
    }
    .explorer-link:hover { color: var(--accent); text-decoration: underline; }
    .cred-carousel {
      max-width: 672px; margin: 0 auto 20px; overflow: hidden; padding: 8px 0;
      -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
      mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
    }
    .cred-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
    .cred-carousel:hover .cred-track { animation-play-state: paused; }
    .metrics {
      margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--hairline);
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; position: relative; z-index: 2;
    }
    .metric-val { font-size: 40px; font-weight: 300; line-height: 1; }
    .marquee-wrap {
      margin-top: 56px; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline);
      background: var(--surface); padding: 14px 0; overflow: hidden;
    }
    .marquee-track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
    .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee-item { padding: 0 28px; font-size: 13px; font-weight: 500; color: var(--muted); white-space: nowrap; }

    .section { padding: 88px 0; border-top: 1px solid var(--hairline); }
    .section h2 { font-size: clamp(26px, 3vw, 34px); font-weight: 300; letter-spacing: -0.02em; margin: 0 0 12px; }
    .eyebrow { font-size: 13px; font-weight: 500; color: var(--accent); margin-bottom: 8px; }
    .tabs-underline { display: flex; gap: 24px; border-bottom: 1px solid var(--hairline); margin-bottom: 28px; overflow-x: auto; }
    .tab-u {
      background: none; border: none; padding: 12px 0; font-size: 14px; font-weight: 500;
      color: var(--subtle); cursor: pointer; position: relative; white-space: nowrap;
    }
    .tab-u.active { color: var(--ink); }
    .tab-u.active::after {
      content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--accent);
    }
    .cards-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; }
    .project-card {
      background: var(--elevated); border-radius: 10px; box-shadow: var(--shadow); overflow: hidden;
      transition: transform 200ms ease, box-shadow 200ms ease; cursor: pointer;
    }
    .project-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
    .project-media { background: var(--surface); height: 180px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .project-card:hover .project-media-inner { transform: scale(1.03); }
    .project-media-inner { transition: transform 260ms ease; }
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.52); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 60;
    }
    .modal-box {
      background: var(--elevated); border: 1px solid var(--hairline); border-radius: 10px;
      max-width: 640px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 28px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.28);
    }
    .cookie-banner {
      position: fixed; bottom: 16px; left: 16px; right: 16px; max-width: 960px; margin: 0 auto;
      background: var(--elevated); border: 1px solid var(--hairline); border-radius: 8px;
      box-shadow: 0 18px 40px rgba(10,37,64,0.16); padding: 20px; display: flex; flex-wrap: wrap;
      align-items: center; justify-content: space-between; gap: 16px; z-index: 55;
    }
    footer {
      border-top: 1px solid var(--hairline); background: var(--surface); padding: 48px 0; font-size: 13px; color: var(--muted);
    }
    .footer-links { display: flex; flex-wrap: wrap; gap: 18px; align-items: center; }
    .mobile-only { display: none; }
    .mobile-panel {
      position: fixed; inset: 72px 0 0; background: var(--bg); z-index: 45; padding: 24px;
      display: flex; flex-direction: column; justify-content: space-between; overflow-y: auto;
    }
    @media (max-width: 767px) {
      .desktop-only { display: none !important; }
      .mobile-only { display: inline-flex; }
      .hero-grid, .cards-2 { grid-template-columns: 1fr; }
      .metrics { grid-template-columns: repeat(2, 1fr); }
    }
    @media (prefers-reduced-motion: reduce) {
      .mesh-1, .mesh-2, .mesh-3, .marquee-track, .cred-track { animation: none !important; }
      * { transition: none !important; }
    }
  </style>
</head>
<body>
  <header id="site-header">
    <div class="container header-inner">
      <a href="#stage" onclick="switchTab('stage'); return false;" class="brand">
        <span class="monogram">MM</span>
        <span>Marion Moun</span>
      </a>

      <nav class="nav-links desktop-only" aria-label="Navigation principale">
        <button type="button" class="nav-btn" onclick="switchTab('stage'); window.scrollTo({top:0, behavior:'smooth'});">Home</button>
        <div class="nav-item" onmouseenter="hoverOpen('dd-stage')" onmouseleave="hoverClose('dd-stage')">
          <button type="button" id="nav-stage-btn" class="nav-btn active" onclick="switchTab('stage')">
            Profil &amp; Stage
          </button>
          <button type="button" class="nav-btn" aria-label="Sous-menu Profil &amp; Stage" onclick="toggleDd('dd-stage')">▾</button>
          <div id="dd-stage" class="dropdown hidden">
            <button type="button" onclick="navTo('stage', 'a-propos')">À propos &amp; Objectif<small>Stage à Brazzaville</small></button>
            <button type="button" onclick="navTo('stage', 'competences')">Compétences<small>Commerce, Compta, Recouvrement</small></button>
            <button type="button" onclick="navTo('stage', 'exemples')">Exemples métiers<small>Balance âgée, relance, trésorerie</small></button>
            <button type="button" onclick="navTo('stage', 'parcours')">Parcours<small>ESGAE, ULC, Émeraude</small></button>
          </div>
        </div>

        <div class="nav-item" onmouseenter="hoverOpen('dd-digital')" onmouseleave="hoverClose('dd-digital')">
          <button type="button" id="nav-digital-btn" class="nav-btn" onclick="switchTab('digital')">
            Digital Web
          </button>
          <button type="button" class="nav-btn" aria-label="Sous-menu Digital Web" onclick="toggleDd('dd-digital')">▾</button>
          <div id="dd-digital" class="dropdown hidden">
            <button type="button" onclick="navTo('digital', 'projets')">Projets<small>Cas concrets &amp; outils PME</small></button>
            <button type="button" onclick="navTo('digital', 'services')">Services<small>Sites, tableaux de bord, devis</small></button>
          </div>
        </div>

        <button type="button" class="nav-btn" onclick="openModal('modal-contact')">Contact</button>
      </nav>

      <div class="desktop-only" style="display:flex; gap:12px;">
        <a href="${PERSONAL_INFO.cvDownloadUrl}" target="_blank" rel="noreferrer" class="btn btn-secondary">Mon CV</a>
        <button type="button" class="btn btn-primary" onclick="openModal('modal-contact')">
          Me contacter <span class="chev">›</span>
        </button>
      </div>

      <button type="button" class="btn btn-secondary mobile-only" onclick="toggleMobileMenu()" aria-label="Menu">Menu</button>
    </div>
  </header>

  <div id="mobile-panel" class="mobile-panel hidden">
    <div style="display:flex; flex-direction:column; gap:16px; font-size:18px; font-weight:500;">
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="switchTab('stage'); toggleMobileMenu(); window.scrollTo({top:0, behavior:'smooth'});">Home</button>
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="navTo('stage','a-propos')">Profil &amp; Stage — À propos</button>
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="navTo('stage','competences')">Compétences métiers</button>
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="navTo('stage','exemples')">Exemples &amp; Parcours</button>
      <hr style="border:none; border-top:1px solid var(--hairline); width:100%;" />
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="navTo('digital','projets')">Digital Web — Projets</button>
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="navTo('digital','services')">Services &amp; Devis</button>
      <button type="button" style="text-align:left; background:none; border:none; color:var(--ink); padding:8px 0;" onclick="toggleMobileMenu(); openModal('modal-contact')">Contact</button>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; padding-top:24px; border-top:1px solid var(--hairline);">
      <a href="${PERSONAL_INFO.cvDownloadUrl}" target="_blank" rel="noreferrer" class="btn btn-secondary">Mon CV</a>
      <button type="button" class="btn btn-primary" onclick="toggleMobileMenu(); openModal('modal-contact')">Me contacter ›</button>
    </div>
  </div>

  <main>
    <section class="hero">
      <div class="mesh-1" aria-hidden="true"></div>
      <div class="mesh-2" aria-hidden="true"></div>
      <div class="mesh-3" aria-hidden="true"></div>
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="container" style="position:relative; z-index:2; display:flex; justify-content:center; margin-bottom:26px;">
        <p style="font-size:13px; margin:0; text-align:center; display:inline-flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px;">
          <span style="color:#0071E3; font-weight:500;">Stage recherché · 3 à 6 mois</span>
          <span style="color:var(--subtle);">·</span>
          <span style="color:var(--muted); display:inline-flex; align-items:center; gap:5px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Brazzaville, Congo
          </span>
          <span style="color:var(--subtle);">·</span>
          <span style="color:var(--muted);">Permis B (en cours d'obtention)</span>
        </p>
      </div>
      <div class="container hero-grid">
        <div>
          <h1>Gérer, relancer, digitaliser</h1>
          <p class="lead">
            Je m’appelle Marion Moun. Titulaire d’une Licence Professionnelle en Administration des Entreprises (LPAE) à l’ESGAE Brazzaville après deux années de gestion à l’Université Libre du Congo, je recherche une opportunité pour mettre ma rigueur au service d’une équipe locale.
          </p>
          <div class="cred-carousel" aria-label="Références clés">
            <div class="cred-track">
              <span class="marquee-item">Projet DAS 1 &amp; 2 chez Émeraude</span>
              <span class="marquee-item">Masterclass Recouvrement (Mai 2026)</span>
              <span class="marquee-item">Permis B (en cours d'obtention)</span>
              <span class="marquee-item">Diplômé LPAE · ESGAE Brazzaville</span>
              <span class="marquee-item">Projet DAS 1 &amp; 2 chez Émeraude</span>
              <span class="marquee-item">Masterclass Recouvrement (Mai 2026)</span>
              <span class="marquee-item">Permis B (en cours d'obtention)</span>
              <span class="marquee-item">Diplômé LPAE · ESGAE Brazzaville</span>
            </div>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
            <button type="button" class="btn btn-primary" onclick="openModal('modal-contact')">Me contacter <span class="chev">›</span></button>
            <button type="button" class="explorer-link" onclick="switchTab('stage')">Explorer Profil &amp; Stage ›</button>
            <button type="button" class="explorer-link" onclick="navTo('digital','projets')">Explorer Digital Web ›</button>
          </div>
        </div>
        <div style="justify-self:center; width:100%; max-width:176px; background:var(--surface); border-radius:8px; padding:24px 16px; text-align:center; box-shadow:var(--shadow);">
          <div style="font-weight:500; font-size:13px;">[PHOTO]</div>
          <p style="font-size:11px; color:var(--muted); margin:6px 0 0;">Photo d'identité</p>
        </div>
      </div>

      <div class="container metrics tnum">
        <div><div class="metric-val" data-count="3">3</div><div style="font-size:14px; font-weight:500; margin-top:6px;">Années de gestion</div><div style="font-size:13px; color:var(--muted);">ULC + LPAE ESGAE</div></div>
        <div><div class="metric-val" data-count="10">10</div><div style="font-size:14px; font-weight:500; margin-top:6px;">Étapes clés</div><div style="font-size:13px; color:var(--muted);">Bac D à DAS 1 &amp; 2</div></div>
        <div><div class="metric-val" data-count="4">4</div><div style="font-size:14px; font-weight:500; margin-top:6px;">Domaines ciblés</div><div style="font-size:13px; color:var(--muted);">Commerce, Compta, Recouvrement, Management</div></div>
        <div><div class="metric-val" data-count="1">1</div><div style="font-size:14px; font-weight:500; margin-top:6px;">Masterclass Recouvrement</div><div style="font-size:13px; color:var(--muted);">Certifiée Mai 2026</div></div>
      </div>

      <div class="marquee-wrap">
        <div class="marquee-track">
          <span class="marquee-item">Comptabilité OHADA révisée</span>
          <span class="marquee-item">Déclarations DAS 1 &amp; 2</span>
          <span class="marquee-item">Balance âgée &amp; Recouvrement</span>
          <span class="marquee-item">Google Sheets &amp; Apps Script</span>
          <span class="marquee-item">Facebook Ads &amp; WhatsApp Business</span>
          <span class="marquee-item">Permis B (en cours d'obtention) · Brazzaville</span>
          <span class="marquee-item">Comptabilité OHADA révisée</span>
          <span class="marquee-item">Déclarations DAS 1 &amp; 2</span>
          <span class="marquee-item">Balance âgée &amp; Recouvrement</span>
          <span class="marquee-item">Google Sheets &amp; Apps Script</span>
          <span class="marquee-item">Facebook Ads &amp; WhatsApp Business</span>
          <span class="marquee-item">Permis B (en cours d'obtention) · Brazzaville</span>
        </div>
      </div>
    </section>

    <!-- ONGLET 1 : PROFIL & STAGE -->
    <div id="tab-stage" class="container">
      <section id="a-propos" class="section" style="border-top:none;">
        <div class="eyebrow">Profil &amp; Objectif</div>
        <h2>Un stagiaire opérationnel dès la première semaine.</h2>
        <p style="color:var(--muted); max-width:740px;">
          Diplômé en Administration des Entreprises (LPAE) à l'ESGAE après deux ans à l'ULC, je recherche un stage en commerce, comptabilité, recouvrement ou management à Brazzaville. J'ai travaillé sur les DAS 1 &amp; 2 chez Émeraude et suivi la Masterclass Recouvrement de mai 2026.
        </p>
      </section>

      <section id="competences" class="section">
        <div class="eyebrow">Compétences par domaine</div>
        <h2>Savoir-faire vérifiés</h2>
        <div style="display:grid; gap:16px; margin-top:24px;">
          <div style="padding:18px 0; border-bottom:1px solid var(--hairline); display:flex; justify-content:space-between; gap:16px;">
            <div><strong>Recouvrement de créances</strong><div style="font-size:14px; color:var(--muted);">Balance âgée, relance J+3 à J+35, négociation amiable</div></div>
            <span class="tnum" style="color:var(--accent); font-weight:500;">95 %</span>
          </div>
          <div style="padding:18px 0; border-bottom:1px solid var(--hairline); display:flex; justify-content:space-between; gap:16px;">
            <div><strong>Comptabilité &amp; Gestion OHADA</strong><div style="font-size:14px; color:var(--muted);">DAS 1 &amp; 2, rapprochements, contrôle budgétaire</div></div>
            <span class="tnum" style="color:var(--accent); font-weight:500;">90 %</span>
          </div>
          <div style="padding:18px 0; border-bottom:1px solid var(--hairline); display:flex; justify-content:space-between; gap:16px;">
            <div><strong>Commerce &amp; Management</strong><div style="font-size:14px; color:var(--muted);">Prospection locale, plan d'action commercial, organisation d'équipe</div></div>
            <span class="tnum" style="color:var(--accent); font-weight:500;">90 %</span>
          </div>
        </div>
      </section>

      <section id="exemples" class="section">
        <div class="eyebrow">Exemples métiers interactifs</div>
        <h2>Aperçus opérationnels (Exemple illustratif, données fictives)</h2>
        <div class="tabs-underline">
          <button type="button" class="tab-u active" onclick="showProof('recouvrement', this)">Recouvrement</button>
          <button type="button" class="tab-u" onclick="showProof('tresorerie', this)">Trésorerie</button>
        </div>
        <div id="proof-recouvrement" class="tnum" style="background:var(--surface); border-radius:10px; padding:24px;">
          <p style="margin:0 0 12px; font-weight:500;">Balance âgée fictive — Portefeuille PME</p>
          <p style="margin:0; color:var(--muted); font-size:14px;">Facturé : 5 050 000 FCFA · Encaissé : 3 150 000 FCFA · Taux de recouvrement : 62,4 % · Relances : J+3, J+10, J+20, J+35.</p>
        </div>
        <div id="proof-tresorerie" class="tnum hidden" style="background:var(--surface); border-radius:10px; padding:24px;">
          <p style="margin:0 0 12px; font-weight:500;">Suivi prévisionnel de trésorerie (Données fictives)</p>
          <p style="margin:0; color:var(--muted); font-size:14px;">Solde initial : 1 500 000 FCFA · Encaissements M+1 : 4 200 000 FCFA · Décaissements M+1 : 3 600 000 FCFA · Solde net : +2 100 000 FCFA.</p>
        </div>
      </section>

      <section id="parcours" class="section">
        <div class="eyebrow">Parcours</div>
        <h2>Formation &amp; expériences terrain</h2>
        <ul style="list-style:none; padding:0; margin:24px 0 0;">
          <li style="padding:14px 0; border-bottom:1px solid var(--hairline);"><strong class="tnum">2025 – 2026</strong> · LPAE — ESGAE Brazzaville</li>
          <li style="padding:14px 0; border-bottom:1px solid var(--hairline);"><strong class="tnum">Mai 2026</strong> · Masterclass Recouvrement de créances &amp; Gestion des impayés</li>
          <li style="padding:14px 0; border-bottom:1px solid var(--hairline);"><strong class="tnum">2025 – 2026</strong> · Projet DAS 1 &amp; 2 — Cabinet Émeraude</li>
          <li style="padding:14px 0;"><strong class="tnum">2023 – 2025</strong> · 1ère et 2ème année Gestion Tronc Commun — ULC Brazzaville</li>
        </ul>
      </section>
    </div>

    <!-- ONGLET 2 : DIGITAL WEB -->
    <div id="tab-digital" class="container hidden">
      <section id="projets" class="section" style="border-top:none;">
        <div class="eyebrow">Digital Web</div>
        <h2>Cas concrets &amp; projets livrés</h2>
        <div class="cards-2" style="margin-top:28px;">
          <article class="project-card" onclick="openModal('modal-contact')">
            <div class="project-media"><div class="project-media-inner" style="font-size:13px; color:var(--subtle);">[CAPTURE_PROJET] Facturation &amp; Recouvrement</div></div>
            <div style="padding:24px;">
              <div style="font-size:12px; color:var(--accent); font-weight:500;">Gestion &amp; Recouvrement</div>
              <h3 style="margin:6px 0 8px; font-size:19px; font-weight:500;">Facturation &amp; Recouvrement Télécoms</h3>
              <p style="margin:0; font-size:14px; color:var(--muted);">-45 % de temps administratif · +32 % d'encaissements sous 30 jours.</p>
            </div>
          </article>
          <article class="project-card" onclick="openModal('modal-contact')">
            <div class="project-media"><div class="project-media-inner" style="font-size:13px; color:var(--subtle);">[CAPTURE_PROJET] Trésorerie Google Workspace</div></div>
            <div style="padding:24px;">
              <div style="font-size:12px; color:var(--accent); font-weight:500;">Automatisation PME</div>
              <h3 style="margin:6px 0 8px; font-size:19px; font-weight:500;">Tableau de bord Trésorerie</h3>
              <p style="margin:0; font-size:14px; color:var(--muted);">Saisie mobile sur Google Forms, clôture de caisse en 5 minutes.</p>
            </div>
          </article>
        </div>
      </section>

      <section id="services" class="section">
        <div class="eyebrow">Prestations</div>
        <h2>Services pour entreprises locales</h2>
        <p style="color:var(--muted); max-width:640px;">Création de sites vitrines, tableaux de bord automatisés sous Google Sheets, boutiques reliées à WhatsApp et campagnes Facebook Ads à Brazzaville.</p>
        <div style="margin-top:20px;">
          <a href="https://wa.me/${PERSONAL_INFO.phone1Raw}" target="_blank" rel="noreferrer" class="btn btn-primary">Demander un devis sur WhatsApp <span class="chev">›</span></a>
        </div>
      </section>
    </div>
  </main>

  <footer>
    <div class="container" style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:20px; align-items:center;">
      <div>
        <strong style="color:var(--ink);">© 2026 Marion Moun</strong> · Brazzaville, Congo
      </div>
      <div class="footer-links">
        <button type="button" style="background:none; border:none; color:inherit; cursor:pointer;" onclick="openLegal('mentions-legales')">Mentions légales</button>
        <button type="button" style="background:none; border:none; color:inherit; cursor:pointer;" onclick="openLegal('confidentialite')">Confidentialité</button>
        <button type="button" style="background:none; border:none; color:inherit; cursor:pointer;" onclick="openLegal('cgu')">CGU</button>
        <button type="button" style="background:none; border:none; color:inherit; cursor:pointer;" onclick="openLegal('cookies')">Cookies</button>
        <button type="button" style="background:none; border:none; color:inherit; cursor:pointer;" onclick="openModal('modal-cookies')">Gérer mes cookies</button>
        <button type="button" style="background:none; border:none; color:var(--ink); font-weight:500; cursor:pointer;" onclick="toggleDark()">Thème clair/sombre</button>
      </div>
    </div>
  </footer>

  <!-- Bannière Cookies -->
  <aside id="cookie-banner" class="cookie-banner hidden" aria-label="Bannière cookies">
    <div style="max-width:520px;">
      <strong style="font-size:14px;">Respect de votre vie privée</strong>
      <p style="margin:4px 0 0; font-size:13px; color:var(--muted);">Ce site mémorise vos préférences essentielles. La mesure d'audience reste désactivée sans votre accord.</p>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <button type="button" class="btn btn-secondary" onclick="openModal('modal-cookies')">Personnaliser</button>
      <button type="button" class="btn btn-secondary" onclick="saveConsent(false)">Tout refuser</button>
      <button type="button" class="btn btn-primary" onclick="saveConsent(true)">Tout accepter</button>
    </div>
  </aside>

  <!-- Modale Contact -->
  <div id="modal-contact" class="modal-backdrop hidden" role="dialog" aria-modal="true" onclick="closeModal('modal-contact')">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="margin:0; font-size:20px; font-weight:500;">Me contacter — Marion Moun</h3>
        <button type="button" class="btn btn-secondary" style="height:36px; padding:0 12px;" onclick="closeModal('modal-contact')">Fermer</button>
      </div>
      <p style="font-size:14px; color:var(--muted);">Téléphones : <strong class="tnum">${PERSONAL_INFO.phone1}</strong> / <strong class="tnum">${PERSONAL_INFO.phone2}</strong><br/>Email : ${PERSONAL_INFO.email}<br/>Adresse : ${PERSONAL_INFO.address}</p>
      <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:20px;">
        <a href="https://wa.me/${PERSONAL_INFO.phone1Raw}" target="_blank" rel="noreferrer" class="btn btn-primary">WhatsApp ›</a>
        <a href="mailto:${PERSONAL_INFO.email}" class="btn btn-secondary">Envoyer un e-mail</a>
      </div>
    </div>
  </div>

  <!-- Modale Cookies -->
  <div id="modal-cookies" class="modal-backdrop hidden" role="dialog" aria-modal="true" onclick="closeModal('modal-cookies')">
    <div class="modal-box" onclick="event.stopPropagation()">
      <h3 style="margin:0 0 12px;">Personnaliser mes cookies</h3>
      <p style="font-size:14px; color:var(--muted);">Essentiels (thème &amp; consentement) : toujours actifs.</p>
      <label style="display:flex; align-items:center; gap:10px; margin:16px 0; font-size:14px;">
        <input type="checkbox" id="chk-analytics" /> Mesure d'audience (désactivée par défaut)
      </label>
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button type="button" class="btn btn-secondary" onclick="saveConsent(false); closeModal('modal-cookies');">Tout refuser</button>
        <button type="button" class="btn btn-primary" onclick="saveConsent(document.getElementById('chk-analytics').checked); closeModal('modal-cookies');">Enregistrer</button>
      </div>
    </div>
  </div>

  <!-- Modale Légale -->
  <div id="modal-legal" class="modal-backdrop hidden" role="dialog" aria-modal="true" onclick="closeModal('modal-legal')">
    <div class="modal-box" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 id="legal-title" style="margin:0;">Informations légales</h3>
        <button type="button" class="btn btn-secondary" style="height:36px; padding:0 12px;" onclick="closeModal('modal-legal')">Fermer</button>
      </div>
      <div id="legal-body" style="font-size:14px; color:var(--muted);"></div>
    </div>
  </div>

  <script>
    function switchTab(tab) {
      var st = document.getElementById('tab-stage');
      var dg = document.getElementById('tab-digital');
      var bs = document.getElementById('nav-stage-btn');
      var bd = document.getElementById('nav-digital-btn');
      if (tab === 'digital') {
        st.classList.add('hidden'); dg.classList.remove('hidden');
        if (bs) bs.classList.remove('active'); if (bd) bd.classList.add('active');
      } else {
        dg.classList.add('hidden'); st.classList.remove('hidden');
        if (bd) bd.classList.remove('active'); if (bs) bs.classList.add('active');
      }
      document.getElementById('dd-stage').classList.add('hidden');
      document.getElementById('dd-digital').classList.add('hidden');
    }
    function navTo(tab, id) {
      switchTab(tab);
      var mp = document.getElementById('mobile-panel');
      if (!mp.classList.contains('hidden')) mp.classList.add('hidden');
      setTimeout(function() {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 30);
    }
    var ddOpenTimer = null, ddCloseTimer = null;
    function hoverOpen(id) {
      clearTimeout(ddOpenTimer); clearTimeout(ddCloseTimer);
      ddOpenTimer = setTimeout(function() {
        var other = id === 'dd-stage' ? 'dd-digital' : 'dd-stage';
        document.getElementById(other).classList.add('hidden');
        document.getElementById(id).classList.remove('hidden');
      }, 150);
    }
    function hoverClose(id) {
      clearTimeout(ddOpenTimer); clearTimeout(ddCloseTimer);
      ddCloseTimer = setTimeout(function() {
        document.getElementById(id).classList.add('hidden');
      }, 180);
    }
    function toggleDd(id) {
      clearTimeout(ddOpenTimer); clearTimeout(ddCloseTimer);
      var other = id === 'dd-stage' ? 'dd-digital' : 'dd-stage';
      document.getElementById(other).classList.add('hidden');
      document.getElementById(id).classList.toggle('hidden');
    }
    function toggleMobileMenu() {
      document.getElementById('mobile-panel').classList.toggle('hidden');
    }
    function showProof(id, btn) {
      document.getElementById('proof-recouvrement').classList.add('hidden');
      document.getElementById('proof-tresorerie').classList.add('hidden');
      document.getElementById('proof-' + id).classList.remove('hidden');
      btn.parentElement.querySelectorAll('.tab-u').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    }
    function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
    function openLegal(doc) {
      var t = document.getElementById('legal-title');
      var b = document.getElementById('legal-body');
      var texts = {
        'mentions-legales': ['Mentions légales', 'Éditeur : Marion Moun — ${PERSONAL_INFO.address} — ${PERSONAL_INFO.email}. Hébergeur : [À COMPLÉTER].'],
        'confidentialite': ['Politique de confidentialité', 'Responsable : Marion Moun (${PERSONAL_INFO.email}). Les données saisies servent uniquement à répondre à vos propositions de stage ou devis (conservation max 24 mois). Droits d’accès/suppression sur simple e-mail. Hébergeur : [À COMPLÉTER].'],
        'cgu': ["Conditions Générales d'Utilisation", "Ce site présente le parcours de Marion Moun. Les simulations utilisent des données fictives. Droit applicable : République du Congo [À VÉRIFIER]."],
        'cookies': ['Politique relative aux cookies', 'Stockage mm_cookie_consent_v1 et mm_theme_v1 (12 mois). Mesure d’audience chargée uniquement après consentement.']
      };
      t.textContent = texts[doc][0]; b.textContent = texts[doc][1];
      openModal('modal-legal');
    }
    function saveConsent(analytics) {
      try { localStorage.setItem('mm_cookie_consent_v1', JSON.stringify({ essential: true, analytics: !!analytics })); } catch (e) {}
      document.getElementById('cookie-banner').classList.add('hidden');
    }
    function toggleDark() {
      document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('mm_theme_v1', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
    }
    window.addEventListener('scroll', function() {
      var h = document.getElementById('site-header');
      if (window.scrollY > 8) h.classList.add('scrolled'); else h.classList.remove('scrolled');
    }, { passive: true });
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        ['modal-contact', 'modal-cookies', 'modal-legal', 'dd-stage', 'dd-digital'].forEach(function(id) {
          document.getElementById(id).classList.add('hidden');
        });
      }
    });
    window.addEventListener('DOMContentLoaded', function() {
      try {
        var t = localStorage.getItem('mm_theme_v1');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
        if (!localStorage.getItem('mm_cookie_consent_v1')) document.getElementById('cookie-banner').classList.remove('hidden');
      } catch (e) {}
      var p = new URLSearchParams(window.location.search);
      var h = window.location.hash.toLowerCase();
      if (h === '#digital' || h === '#projets' || h === '#services') switchTab('digital');
      else if (['#confidentialite', '#cgu', '#cookies', '#mentions-legales'].indexOf(h) !== -1) openLegal(h.slice(1));
      else if (p.get('src') === 'cv' || h === '#stage') switchTab('stage');
    });
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
          <div>
            <h3 id="export-modal-title" className="text-[20px] font-medium text-[var(--ink)]">
              Export fichier unique index.html
            </h3>
            <p className="text-[13px] text-[var(--muted)] mt-1">
              Version autonome HTML/CSS/JS prête pour Cloudflare Pages, Netlify ou GitHub Pages.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre d'export"
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 rounded-[8px] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-medium text-[var(--ink)]">
              Télécharger index.html autonome
            </div>
            <div className="text-[13px] text-[var(--muted)] mt-0.5">
              Inclut la navigation unique, le ruban hero, les cookies et les pages légales.
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownloadStandaloneHtml}
            className="btn-primary group shrink-0"
          >
            <span>Télécharger</span>
            <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-[13px] font-medium text-[var(--ink)]">
            <span>Éléments à compléter avant mise en ligne :</span>
            <button
              type="button"
              onClick={handleCopyChecklist}
              className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 cursor-pointer text-[12px]"
            >
              {copiedChecklist ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChecklist ? 'Copié' : 'Copier la liste'}</span>
            </button>
          </div>

          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)] text-[13px]">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-start gap-2">
                <span className="font-mono font-medium text-[var(--ink)] shrink-0">
                  {item.key}
                </span>
                <span className="text-[var(--muted)]">
                  — {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
