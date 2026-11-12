import { useState, useTransition } from 'react';
import { 
  PERSONAL_INFO, 
  TIMELINE_DATA, 
  SKILL_CATEGORIES, 
  SAMPLE_INVOICES_DEMO 
} from '../data/portfolioData.ts';
import { 
  calculateAgingReport, 
  simulateTreasury, 
  calculateCommercialFunnel,
  getDunningStage
} from '../utils/calculations.ts';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Coins, 
  Calculator, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  FileCheck2, 
  Layers, 
  Send,
  Zap,
  Info
} from 'lucide-react';

interface ProfileStageTabProps {
  onOpenContact: () => void;
  onOpenScanner: () => void;
}

export function ProfileStageTab({
  onOpenContact,
  onOpenScanner
}: ProfileStageTabProps) {
  // Timeline filter state
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'education' | 'experience' | 'certification'>('all');

  // Interactive Proof of Work Sub-tabs
  const [activeProofTab, setActiveProofTab] = useState<'recouvrement' | 'commerce' | 'compta' | 'management'>('recouvrement');

  // Recouvrement interactive state
  const [selectedDunningStage, setSelectedDunningStage] = useState<number>(10); // J+10 by default
  const [recoverySimulationBonus, setRecoverySimulationBonus] = useState<number>(0);

  // Commerce Funnel state
  const [funnelLeads, setFunnelLeads] = useState<number>(120);
  const [funnelTicket, setFunnelTicket] = useState<number>(350000); // 350k FCFA average

  // Treasury Simulation state
  const [startingCash, setStartingCash] = useState<number>(1500000);

  // Calculate dynamic aging report based on sample invoices
  const dynamicInvoices = SAMPLE_INVOICES_DEMO.map((inv, idx) => {
    if (idx === 1 && recoverySimulationBonus > 0) {
      return {
        ...inv,
        paidAmount: Math.min(inv.amount, inv.paidAmount + recoverySimulationBonus)
      };
    }
    return inv;
  });

  const agingReport = calculateAgingReport(dynamicInvoices, '2026-11-12');

  // Commercial Funnel calculations
  const funnelData = calculateCommercialFunnel(funnelLeads, 45, 60, 40, funnelTicket);

  // Treasury forecast data
  const treasurySim = simulateTreasury(startingCash, [
    { month: 'Mois 1 (Actuel)', inflow: 4200000, outflow: 3600000 },
    { month: 'Mois 2 (M+1)', inflow: 3800000, outflow: 3900000 },
    { month: 'Mois 3 (M+2)', inflow: 5100000, outflow: 4200000 },
    { month: 'Mois 4 (M+3)', inflow: 4600000, outflow: 4100000 },
    { month: 'Mois 5 (M+4)', inflow: 5800000, outflow: 4400000 },
    { month: 'Mois 6 (M+5)', inflow: 6200000, outflow: 4700000 },
  ]);

  // Filtered timeline
  const filteredTimeline = TIMELINE_DATA.filter(item => {
    if (timelineFilter === 'all') return true;
    return item.type === timelineFilter;
  });

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  const currentDunningInfo = getDunningStage(selectedDunningStage);

  return (
    <div className="space-y-16 py-8">
      
      {/* SECTION 1: À PROPOS & PITCH PROFESSIONNEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                Profil & Objectif de Recrutement
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                À propos de Marion Moun
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                <Briefcase className="w-3.5 h-3.5" /> Stage d'immersion & missions
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle className="w-3.5 h-3.5" /> Brazzaville & Environs
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Titulaire d’une <strong className="text-slate-900 dark:text-white">Licence Professionnelle en Administration des Entreprises (LPAE)</strong> à l’ESGAE après un tronc commun en gestion à l’Université Libre du Congo (ULC), je candidate activement à un stage en entreprise à Brazzaville.
              </p>
              <p>
                Mes domaines de prédilection sont le <strong className="text-slate-900 dark:text-white">COMMERCE</strong>, la <strong className="text-slate-900 dark:text-white">COMPTABILITÉ</strong>, le <strong className="text-slate-900 dark:text-white">RECOUVREMENT DE CRÉANCES</strong> et le <strong className="text-slate-900 dark:text-white">MANAGEMENT</strong>. Fort d’une pratique réelle en cabinet d'expertise comptable (projet DAS 1 & 2 chez Émeraude avec M. Yves Miatoko) et certifié par une Masterclass spécialisée en gestion des impayés, je dispose d'outils concrets pour assainir vos comptes clients.
              </p>
              <p>
                Ma valeur ajoutée ? Ma maîtrise approfondie des outils digitaux et de l’automatisation (Google Workspace, tableurs interconnectés, web). Je ne suis pas un stagiaire qui attend passivement des consignes : je structure, j’optimise et je fais gagner du temps à votre équipe dès la première semaine.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Fiche synthétique RH
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Diplôme :</span>
                  <span className="font-semibold text-slate-900 dark:text-white">LPAE (ESGAE)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Spécialité :</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Administration & Recouvrement</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Localisation :</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Mansimou, Brazzaville</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Mobilité :</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Permis B (Auto)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500 dark:text-slate-400">Disponibilité :</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">Immédiate</span>
                </div>
              </div>

              <button
                onClick={onOpenContact}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Proposer un entretien</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPÉTENCES PAR DOMAINE AVEC JAUGES ANIMÉES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-8">
          <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
            Savoir-Faire Opérationnel
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Compétences Métiers & Maîtrise Technique
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Des compétences immédiatement applicables en entreprise, alliant rigueur administrative, aisance relationnelle et maîtrise technologique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900">
                    {category.id === 'recouvrement' && <Coins className="w-5 h-5" />}
                    {category.id === 'comptabilite' && <Calculator className="w-5 h-5" />}
                    {category.id === 'commerce' && <Briefcase className="w-5 h-5" />}
                    {category.id === 'management' && <Users className="w-5 h-5" />}
                    {category.id === 'tech' && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {category.skills.length} compétences
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill bars */}
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          {skill.tag || `${skill.level}%`}
                        </span>
                      </div>
                      
                      {/* Gauge progress bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PREUVES VISUELLES & CAS PRATIQUES (DONNÉES FICTIVES MAIS INTERACTIVES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <Info className="w-3.5 h-3.5" /> Exemple illustratif, données fictives & interactives
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Preuves Visuelles & Cas Pratiques Métiers
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                La preuve concrète par l'outil : testez ci-dessous mes modèles de recouvrement, commerce, comptabilité et management.
              </p>
            </div>

            {/* Proof sub-tabs */}
            <div className="flex flex-wrap p-1 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
              <button
                onClick={() => setActiveProofTab('recouvrement')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeProofTab === 'recouvrement'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                1. Recouvrement
              </button>
              <button
                onClick={() => setActiveProofTab('commerce')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeProofTab === 'commerce'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                2. Commerce (Funnel)
              </button>
              <button
                onClick={() => setActiveProofTab('compta')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeProofTab === 'compta'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                3. Trésorerie
              </button>
              <button
                onClick={() => setActiveProofTab('management')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeProofTab === 'management'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                4. Management
              </button>
            </div>
          </div>

          {/* SUB-TAB 1: RECOUVREMENT INTERACTIF (BALANCE ÂGÉE & WORKFLOW RELANCE) */}
          {activeProofTab === 'recouvrement' && (
            <div className="mt-8 space-y-8 animate-in fade-in duration-200">
              
              {/* Metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="text-xs text-slate-400">Total Créances Émises</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {formatFCFA(agingReport.totalInvoiced)}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Portefeuille suivi
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="text-xs text-slate-400">Total Encaissé</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    {formatFCFA(agingReport.totalCollected)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Trésorerie sécurisée
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="text-xs text-slate-400">Taux de Recouvrement</div>
                  <div className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                    {agingReport.recoveryRatePercent}%
                  </div>
                  <div className="text-[11px] text-sky-300 mt-1">
                    Objectif cible &gt; 80%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700">
                  <div className="text-xs text-slate-400">Reste à Recouvrer</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {formatFCFA(agingReport.totalOutstanding)}
                  </div>
                  <div className="text-[11px] text-amber-300 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Relances en cours
                  </div>
                </div>
              </div>

              {/* Balance Âgée Visualization */}
              <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    Structure de la Balance Âgée (Répartition par ancienneté)
                  </h4>
                  <span className="text-xs text-slate-400">
                    Retard moyen : <strong className="text-white">{agingReport.averageOverdueDays} jours</strong>
                  </span>
                </div>

                {/* Stacked bar visualization */}
                <div className="w-full h-6 rounded-lg bg-slate-800 overflow-hidden flex border border-slate-700">
                  <div 
                    style={{ width: `${(agingReport.buckets.current.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-emerald-500 transition-all duration-300"
                    title={`0-30j : ${formatFCFA(agingReport.buckets.current.amount)}`}
                  />
                  <div 
                    style={{ width: `${(agingReport.buckets.moderate.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-amber-500 transition-all duration-300"
                    title={`31-60j : ${formatFCFA(agingReport.buckets.moderate.amount)}`}
                  />
                  <div 
                    style={{ width: `${(agingReport.buckets.critical.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-rose-500 transition-all duration-300"
                    title={`61-90j : ${formatFCFA(agingReport.buckets.critical.amount)}`}
                  />
                  <div 
                    style={{ width: `${(agingReport.buckets.contentious.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-purple-600 transition-all duration-300"
                    title={`>90j : ${formatFCFA(agingReport.buckets.contentious.amount)}`}
                  />
                </div>

                {/* Buckets Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-emerald-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      0 - 30 jours (Courant)
                    </div>
                    <div className="font-semibold text-white mt-1">
                      {formatFCFA(agingReport.buckets.current.amount)}
                    </div>
                    <div className="text-[11px] text-slate-400">{agingReport.buckets.current.count} facture(s)</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-amber-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      31 - 60 jours (Modéré)
                    </div>
                    <div className="font-semibold text-white mt-1">
                      {formatFCFA(agingReport.buckets.moderate.amount)}
                    </div>
                    <div className="text-[11px] text-slate-400">{agingReport.buckets.moderate.count} facture(s)</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-rose-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      61 - 90 jours (Critique)
                    </div>
                    <div className="font-semibold text-white mt-1">
                      {formatFCFA(agingReport.buckets.critical.amount)}
                    </div>
                    <div className="text-[11px] text-slate-400">{agingReport.buckets.critical.count} facture(s)</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-purple-500/30">
                    <div className="flex items-center gap-1.5 font-bold text-purple-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                      &gt; 90 jours (Contentieux)
                    </div>
                    <div className="font-semibold text-white mt-1">
                      {formatFCFA(agingReport.buckets.contentious.amount)}
                    </div>
                    <div className="text-[11px] text-slate-400">{agingReport.buckets.contentious.count} facture(s)</div>
                  </div>
                </div>

                {/* Interactive Simulator Slider */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <strong>Simulateur de relance réussie :</strong> Voyez l'impact d'un encaissement de relance sur le taux global.
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <input 
                      type="range"
                      min={0}
                      max={500000}
                      step={50000}
                      value={recoverySimulationBonus}
                      onChange={(e) => setRecoverySimulationBonus(Number(e.target.value))}
                      className="w-full sm:w-48 accent-sky-500 cursor-pointer"
                      aria-label="Simulation encaissement supplémentaire"
                    />
                    <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                      +{formatFCFA(recoverySimulationBonus)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Dunning Workflow / Schéma de Relance */}
              <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Protocole Opérationnel de Relance Progressive (J+3 à J+35)
                  </h4>
                  <span className="text-xs text-sky-400 font-semibold hidden sm:inline">
                    Cliquez sur une étape pour afficher la stratégie
                  </span>
                </div>

                {/* Stages selector buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { days: 3, code: 'J+3', title: 'Rappel Courtois', color: 'border-emerald-500 text-emerald-400' },
                    { days: 10, code: 'J+10', title: 'Relance Formelle', color: 'border-sky-500 text-sky-400' },
                    { days: 20, code: 'J+20', title: 'Mise en Demeure', color: 'border-amber-500 text-amber-400' },
                    { days: 35, code: 'J+35', title: 'Échéancier / Pré-juridique', color: 'border-rose-500 text-rose-400' }
                  ].map((stage) => (
                    <button
                      key={stage.code}
                      onClick={() => setSelectedDunningStage(stage.days)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedDunningStage === stage.days
                          ? 'bg-slate-800 ring-2 ring-sky-500 ' + stage.color
                          : 'bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{stage.code}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{stage.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {stage.days <= 5 ? 'Avis préventif' : stage.days <= 15 ? 'Écrit officiel' : stage.days <= 30 ? 'Sommation amiable' : 'Contentieux'}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Details of selected stage */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Étape {currentDunningInfo.code} : {currentDunningInfo.title}
                    </span>
                    <span className="text-xs text-slate-400">
                      Canal recommandé : <strong className="text-white">{currentDunningInfo.recommendedChannel}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Action terrain :</strong> {currentDunningInfo.action}
                  </p>

                  {/* Template message snippet */}
                  <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 leading-relaxed">
                    <div className="text-slate-500 text-[10px] mb-1 font-sans font-semibold">
                      Modèle de message préparé par Marion :
                    </div>
                    {currentDunningInfo.code === 'J+3' && (
                      <p>
                        "Bonjour Monsieur/Madame [Client], nous espérons que vous allez bien. Sauf erreur de notre part, la facture [N°] de [Montant] FCFA est arrivée à échéance le [Date]. Nous restons à votre entière disposition pour tout renseignement ou modalité de règlement. Bien cordialement, Marion Moun."
                      </p>
                    )}
                    {currentDunningInfo.code === 'J+10' && (
                      <p>
                        "Objet : Relance facture impayée N° [XXX]. Madame, Monsieur, malgré notre premier rappel, votre compte présente à ce jour un solde débiteur de [Montant] FCFA. Nous vous prions de bien vouloir procéder à son règlement sous 48h ou de nous transmettre la preuve de virement. Comptablement vôtre, Marion Moun."
                      </p>
                    )}
                    {currentDunningInfo.code === 'J+20' && (
                      <p>
                        "Objet : MISE EN DEMEURE AMIABLE - Facture [XXX]. Madame, Monsieur, le retard de paiement de [Montant] FCFA dépasse désormais 20 jours. À défaut de règlement sous 72 heures, nous serons contraints de suspendre les livraisons en cours et d'engager le recouvrement forcé. Contactez-nous sans délai pour convenir d'une solution."
                      </p>
                    )}
                    {currentDunningInfo.code === 'J+35' && (
                      <p>
                        "Objet : Protocole d'accord transactionnel & Échéancier. Afin d'éviter des frais d'huissier et poursuites contentieuses, nous vous proposons un plan d'échelonnement validé en 3 tranches mensuelles fermes. La première échéance doit intervenir le [Date]. Document soumis à signature conjointe."
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={onOpenScanner}
                    className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <span>Analyser une facture réelle avec l'IA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 2: COMMERCE - ENTONNOIR DE PROSPECTION (FUNNEL) */}
          {activeProofTab === 'commerce' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Entonnoir de Prospection Commerciale & Plan d'Action (PAC)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Simulation interactive du pipeline de vente d'une entreprise locale à Brazzaville.
                  </p>
                </div>

                {/* Interactive Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Prospects ciblés :</span>
                    <select
                      value={funnelLeads}
                      onChange={(e) => setFunnelLeads(Number(e.target.value))}
                      className="bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1 font-semibold text-xs"
                      aria-label="Nombre de prospects"
                    >
                      <option value={60}>60 prospects</option>
                      <option value={120}>120 prospects</option>
                      <option value={250}>250 prospects</option>
                      <option value={500}>500 prospects</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Panier moyen :</span>
                    <select
                      value={funnelTicket}
                      onChange={(e) => setFunnelTicket(Number(e.target.value))}
                      className="bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1 font-semibold text-xs"
                      aria-label="Panier moyen FCFA"
                    >
                      <option value={150000}>150 000 FCFA</option>
                      <option value={350000}>350 000 FCFA</option>
                      <option value={750000}>750 000 FCFA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Funnel SVG Graph */}
              <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl bg-slate-800 border-t-4 border-sky-400">
                    <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Étape 1</div>
                    <div className="text-sm font-bold text-white mt-0.5">Prospects Bruts</div>
                    <div className="text-2xl font-black text-white my-2">{funnelData.prospects}</div>
                    <p className="text-[11px] text-slate-400">Cibles qualifiées via terrain, réseaux & annuaire d'entreprises</p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-xl bg-slate-800 border-t-4 border-indigo-400">
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Étape 2 (45%)</div>
                    <div className="text-sm font-bold text-white mt-0.5">Leads Qualifiés</div>
                    <div className="text-2xl font-black text-indigo-300 my-2">{funnelData.qualified}</div>
                    <p className="text-[11px] text-slate-400">Décideur identifié avec besoin avéré et budget validé</p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-xl bg-slate-800 border-t-4 border-amber-400">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Étape 3 (60%)</div>
                    <div className="text-sm font-bold text-white mt-0.5">Rendez-vous & Devis</div>
                    <div className="text-2xl font-black text-amber-300 my-2">{funnelData.pitched}</div>
                    <p className="text-[11px] text-slate-400">Pitch d'offre sur-mesure et proposition financière remise</p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 rounded-xl bg-slate-800 border-t-4 border-emerald-400">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Étape 4 (40%)</div>
                    <div className="text-sm font-bold text-white mt-0.5">Contrats Signés</div>
                    <div className="text-2xl font-black text-emerald-400 my-2">{funnelData.deals} ventes</div>
                    <p className="text-[11px] text-slate-400">Bons de commande signés et premier acompte encaissé</p>
                  </div>
                </div>

                {/* Projected Revenue Banner */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-sky-900/60 via-indigo-900/60 to-emerald-900/60 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-300">Chiffre d'Affaires Prévisionnel Généré :</div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {formatFCFA(funnelData.estimatedRevenue)}
                    </div>
                  </div>
                  <div className="text-right text-xs text-emerald-400 font-semibold">
                    Taux de conversion global : {funnelData.overallConversionRate}%
                  </div>
                </div>
              </div>

              {/* Action Commercial Plan */}
              <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  Plan d'Action Commercial (PAC) appliqué par Marion Moun
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-sky-400">1. Prospection Ciblée :</span>
                    <p className="text-slate-300 mt-1">Identification des décideurs (DG, DAF, Directeurs Commerciaux) à Brazzaville avec préparation de pitchs sur-mesure.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-indigo-400">2. Négociation & Devis :</span>
                    <p className="text-slate-300 mt-1">Écoute active des objections prix/délais, mise en avant de la rentabilité et relance planifiée à J+2 après devis.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-bold text-emerald-400">3. Suivi & Fidélisation :</span>
                    <p className="text-slate-300 mt-1">Point qualité après livraison pour stimuler les commandes récurrentes et les recommandations clients.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 3: COMPTABILITÉ & TRÉSORERIE */}
          {activeProofTab === 'compta' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Modèle de Suivi & Prévision de Trésorerie (Budget de Caisse)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Anticipation des encaissements et décaissements sur 6 mois pour prévenir tout découvert.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Trésorerie initiale :</span>
                  <select
                    value={startingCash}
                    onChange={(e) => setStartingCash(Number(e.target.value))}
                    className="bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1 font-semibold text-xs"
                    aria-label="Trésorerie de départ"
                  >
                    <option value={1000000}>1 000 000 FCFA</option>
                    <option value={1500000}>1 500 000 FCFA</option>
                    <option value={3000000}>3 000 000 FCFA</option>
                  </select>
                </div>
              </div>

              {/* Cashflow Table / Grid */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-850">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-900">
                      <th className="py-3 px-4 font-bold">Période</th>
                      <th className="py-3 px-4 font-bold text-emerald-400">Encaissements (+)</th>
                      <th className="py-3 px-4 font-bold text-rose-400">Décaissements (-)</th>
                      <th className="py-3 px-4 font-bold">Flux Net</th>
                      <th className="py-3 px-4 font-bold text-right">Solde Cumulé Fin de Mois</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {treasurySim.monthlyResults.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{m.month}</td>
                        <td className="py-3 px-4 text-emerald-300 font-mono">+{formatFCFA(m.inflow)}</td>
                        <td className="py-3 px-4 text-rose-300 font-mono">-{formatFCFA(m.outflow)}</td>
                        <td className={`py-3 px-4 font-bold font-mono ${m.net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {m.net >= 0 ? `+${formatFCFA(m.net)}` : `-${formatFCFA(Math.abs(m.net))}`}
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold font-mono text-sky-400">
                          {formatFCFA(m.endingBalance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* DAS 1 & DAS 2 Expertise Box */}
              <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Calculator className="w-4 h-4 text-sky-400" />
                  <span>Maîtrise Pratique : Déclarations Annuelles des Salaires (DAS 1 & 2)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Grâce au projet académique réalisé au cabinet <strong className="text-white">Émeraude</strong> sous la direction de <strong className="text-white">M. Yves Miatoko (Expert-Comptable)</strong>, je maîtrise la préparation, le rapprochement avec les livres de paie et la télédéclaration des états DAS 1 & DAS 2 conformément au droit fiscal et social congolais.
                </p>
              </div>

            </div>
          )}

          {/* SUB-TAB 4: MANAGEMENT & ORGANISATION */}
          {activeProofTab === 'management' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-200">
              
              <div>
                <h3 className="text-lg font-bold text-white">
                  Planning d'Équipe & Matrice de Gestion des Priorités
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organisation hebdomadaire d'un pôle administratif et commercial pour éliminer les retards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">Priorités Urgentes / Critiques</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Relances téléphoniques créances &gt; 30 jours</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Rapprochement bancaire et pointage de caisse du jour</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Traitement des factures d'achat urgentes</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400">Actions Structurantes</span>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>Prospection commerciale de 15 nouveaux comptes PME</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>Mise à jour du tableau de bord de trésorerie</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>Standardisation des modèles de devis et bons de commande</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">Amélioration Continue</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Automatisation Google Workspace des circuits d'approbation</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Classement et archivage numérique des pièces justificatives</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Feedback hebdomadaire avec la direction générale</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* SECTION 4: PARCOURS & TIMELINE INTERACTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
              Historique & Cursus
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Parcours Académique & Expériences
            </h2>
          </div>

          {/* Timeline Filter Controls */}
          <div className="flex flex-wrap p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setTimelineFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timelineFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tout ({TIMELINE_DATA.length})
            </button>
            <button
              onClick={() => setTimelineFilter('education')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timelineFilter === 'education'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Formations
            </button>
            <button
              onClick={() => setTimelineFilter('experience')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timelineFilter === 'experience'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Expériences
            </button>
            <button
              onClick={() => setTimelineFilter('certification')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timelineFilter === 'certification'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Certifications & Permis
            </button>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-8">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Dot Icon Indicator */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-xs group-hover:scale-110 transition-transform">
                {item.type === 'education' && <GraduationCap className="w-4 h-4" />}
                {item.type === 'experience' && <Briefcase className="w-4 h-4" />}
                {item.type === 'certification' && <Award className="w-4 h-4" />}
              </div>

              {/* Event Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {item.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {item.organization}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: ENCADRÉ « POURQUOI MOI DÈS LA PREMIÈRE SEMAINE ? » */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-sky-600 via-indigo-700 to-slate-900 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 space-y-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/20 text-white backdrop-blur-xs mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-300" /> Engagement de Valeur Immédiate
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Pourquoi choisir Marion Moun ? Ce que j'apporte dès la première semaine
              </h2>
              <p className="text-sky-100 text-sm sm:text-base mt-2">
                Un profil junior formé aux exigences réelles de l'entreprise locale, capable d'être autonome sans monopoliser le temps de votre encadrement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {PERSONAL_INFO.whyMePoints.map((point, pIdx) => (
                <div 
                  key={pIdx}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                      {pIdx === 0 && <Zap className="w-5 h-5 text-amber-300" />}
                      {pIdx === 1 && <ShieldCheck className="w-5 h-5 text-emerald-300" />}
                      {pIdx === 2 && <TrendingUp className="w-5 h-5 text-sky-300" />}
                      {pIdx === 3 && <CheckCircle className="w-5 h-5 text-indigo-300" />}
                    </div>
                    <h3 className="font-bold text-base text-white">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed pl-12">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/20">
              <div className="text-xs text-sky-200">
                Prêt à démarrer immédiatement · Mobilité totale sur Brazzaville
              </div>
              <button
                onClick={onOpenContact}
                className="py-3 px-6 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-sky-50 transition-all hover:scale-102 flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-sky-600" />
                <span>Fixer un entretien maintenant</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
