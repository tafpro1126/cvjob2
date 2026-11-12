import React from 'react';
import { PERSONAL_INFO, KEY_METRICS } from '../data/portfolioData.ts';
import { 
  FileText, 
  MessageSquare, 
  MapPin, 
  Award, 
  Car, 
  CheckCircle, 
  TrendingUp, 
  Scan, 
  QrCode,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
  onOpenScanner: () => void;
  onOpenQr: () => void;
  onSelectTab: (tab: 'stage' | 'digital') => void;
}

export function Hero({
  onOpenContact,
  onOpenScanner,
  onOpenQr,
  onSelectTab
}: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Verification banner for QR Code scan */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-xs animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Accès QR Code CV vérifié</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span>Disponible immédiatement pour stage à Brazzaville</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-5 text-left">
            
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  Portfolio Professionnel
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  Diplômé LPAE · ESGAE
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                  <Car className="w-3 h-3 text-sky-500" />
                  Permis B
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {PERSONAL_INFO.name}
              </h1>

              <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200">
                Orienté <span className="text-sky-600 dark:text-sky-400 underline decoration-sky-300 dark:decoration-sky-700 decoration-2 underline-offset-4">Commerce</span>, <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 decoration-2 underline-offset-4">Comptabilité</span>, <span className="text-teal-600 dark:text-teal-400 underline decoration-teal-300 dark:decoration-teal-700 decoration-2 underline-offset-4">Recouvrement</span> & <span className="text-slate-800 dark:text-slate-200">Management</span>
              </p>
            </div>

            {/* Strategic Value Proposition */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Ce site révèle ce que le format d'un CV papier ne peut pas montrer : 
                <strong className="text-slate-900 dark:text-white font-semibold ml-1">
                  l'alliance d'une rigueur comptable et commerciale certifiée avec des compétences rares d'automatisation digitale
                </strong>, prêtes à faire gagner du temps et de la trésorerie à votre entreprise dès la première semaine.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Brazzaville, Congo (Mansimou)
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Masterclass Recouvrement
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Projet DAS 1 & 2 chez Émeraude
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              
              {/* Download CV button */}
              <a
                href={PERSONAL_INFO.cvDownloadUrl}
                download="CV_Marion_Moun_LPAE.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-101"
              >
                <FileText className="w-4 h-4 text-sky-400 dark:text-sky-600" />
                <span>Télécharger mon CV</span>
              </a>

              {/* Direct WhatsApp / Contact button */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-101"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Me contacter (WhatsApp / Email)</span>
              </button>

              {/* Document Scanner Feature */}
              <button
                onClick={onOpenScanner}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-sm font-semibold transition-all"
                title="Tester l'analyseur IA de factures et créances"
              >
                <Scan className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Scanner une créance (IA)</span>
              </button>

              {/* Show QR code button */}
              <button
                onClick={onOpenQr}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all"
                title="Partager le QR Code"
                aria-label="Afficher le QR code pour smartphone"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Quick Profile Summary / Hero Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl p-6 bg-gradient-to-br from-white via-sky-50/50 to-indigo-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border border-sky-100 dark:border-slate-700 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    MM
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                      LPAE Gestion d'Entreprise
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" title="Actif et disponible" />
              </div>

              {/* Profile Strengths List */}
              <div className="py-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Formation ESGAE & ULC :</strong> Solide bagage académique en gestion, compta OHADA et management.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Maîtrise du Recouvrement :</strong> Méthodologie rigoureuse pour réduire les délais de paiement clients.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Atout Digital :</strong> Créateur de solutions web, tableurs connectés et automatisation Google Workspace.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Mobilité immédiate :</strong> Permis B opérationnel pour prospection et démarches terrain.</span>
                </div>
              </div>

              {/* Direct Tab Switchers */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700 grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onSelectTab('stage')}
                  className="py-2 px-3 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-bold hover:bg-sky-200 dark:hover:bg-sky-900 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Profil Métier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onSelectTab('digital')}
                  className="py-2 px-3 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Atouts Web</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Animated Key Metrics Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {KEY_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all text-center sm:text-left"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
