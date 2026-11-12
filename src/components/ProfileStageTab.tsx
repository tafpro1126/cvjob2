import { useState } from 'react';
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
  ChevronRight, 
  ChevronDown,
  Clock, 
  Check, 
  FileCheck, 
  ArrowUpRight,
  ShieldCheck,
  Send,
  Building,
  Calendar,
  Layers
} from 'lucide-react';

interface ProfileStageTabProps {
  onOpenContact: () => void;
}

export function ProfileStageTab({ onOpenContact }: ProfileStageTabProps) {
  // Timeline filter
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'education' | 'experience' | 'certification'>('all');
  
  // Interactive proof selector
  const [activeProof, setActiveProof] = useState<'recouvrement' | 'commerce' | 'tresorerie' | 'management'>('recouvrement');

  // Expanded skill disclosure state
  const [expandedSkill, setExpandedSkill] = useState<string | null>('Balance âgée & Suivi des échéances');

  // Recouvrement interactive state
  const [selectedDunningStage, setSelectedDunningStage] = useState<number>(10);
  const [recoveryBonus, setRecoveryBonus] = useState<number>(0);

  // Commerce Funnel state
  const [funnelLeads, setFunnelLeads] = useState<number>(120);
  const [funnelTicket, setFunnelTicket] = useState<number>(350000);

  // Dynamic invoices calculation
  const dynamicInvoices = SAMPLE_INVOICES_DEMO.map((inv, idx) => {
    if (idx === 1 && recoveryBonus > 0) {
      return {
        ...inv,
        paidAmount: Math.min(inv.amount, inv.paidAmount + recoveryBonus)
      };
    }
    return inv;
  });

  const agingReport = calculateAgingReport(dynamicInvoices, '2026-11-12');
  const funnelData = calculateCommercialFunnel(funnelLeads, 45, 60, 40, funnelTicket);
  const treasurySim = simulateTreasury(1500000, [
    { month: 'Mois 1 (Actuel)', inflow: 4200000, outflow: 3600000 },
    { month: 'Mois 2 (M+1)', inflow: 3800000, outflow: 3900000 },
    { month: 'Mois 3 (M+2)', inflow: 5100000, outflow: 4200000 },
    { month: 'Mois 4 (M+3)', inflow: 4600000, outflow: 4100000 },
    { month: 'Mois 5 (M+4)', inflow: 5800000, outflow: 4400000 },
    { month: 'Mois 6 (M+5)', inflow: 6200000, outflow: 4700000 },
  ]);

  const currentDunningInfo = getDunningStage(selectedDunningStage);

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  const filteredTimeline = TIMELINE_DATA.filter(item => {
    if (timelineFilter === 'all') return true;
    return item.type === timelineFilter;
  });

  return (
    <div className="space-y-12 max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      
      {/* SECTION 1 : À PROPOS (3 à 4 lignes concrètes sans superlatifs) */}
      <section className="space-y-3">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
          À propos
        </h2>
        
        <div className="ios-inset-group p-5 sm:p-6 space-y-3.5 text-[15px] sm:text-[16px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            Après deux années de tronc commun en gestion à l'Université Libre du Congo (ULC), j'ai obtenu ma Licence Professionnelle en Administration des Entreprises (LPAE) à l'ESGAE.
          </p>
          <p>
            Mon objectif immédiat est de rejoindre une entreprise à Brazzaville pour un stage où je serai utile dès le premier jour : traiter les factures clients, relancer les règlements en retard selon un protocole clair, et participer à la gestion quotidienne sans mobiliser le temps de mon encadrant.
          </p>
          <p>
            En complément de ma formation académique, j'ai suivi la Masterclass spécialisée en recouvrement de créances en mai 2026 et mené des travaux pratiques sur les déclarations fiscales DAS 1 & 2 chez Émeraude.
          </p>
        </div>
      </section>

      {/* SECTION 2 : COMPÉTENCES PAR DOMAINE (Listes groupées iOS Settings avec chevrons) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
            Compétences par domaine
          </h2>
          <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
            Toucher une ligne pour voir le détail
          </span>
        </div>

        <div className="space-y-6">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="text-[12px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider px-2">
                {category.title}
              </div>

              <div className="ios-inset-group">
                {category.skills.map((skill, idx) => {
                  const isExpanded = expandedSkill === skill.name;
                  return (
                    <div key={idx} className="border-b last:border-b-0 border-neutral-200/70 dark:border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setExpandedSkill(isExpanded ? null : skill.name)}
                        className="w-full text-left ios-row cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
                            {skill.tag || 'Acquis'}
                          </span>
                          <span className="text-neutral-400">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 stroke-[1.75]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 stroke-[1.75]" />
                            )}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-4 pt-1 bg-neutral-50/70 dark:bg-neutral-900/60 text-[14px] text-neutral-600 dark:text-neutral-400 leading-normal border-t border-neutral-100 dark:border-neutral-800">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 : PREUVES VISUELLES SOBRES (APPLE STYLE) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
              Preuves visuelles & modèles de travail
            </h2>
            <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Outils interactifs représentatifs de mes méthodes sur le terrain.
            </p>
          </div>

          {/* Segmented picker for proofs */}
          <div className="ios-segmented">
            <button
              type="button"
              onClick={() => setActiveProof('recouvrement')}
              className={`ios-segmented-item cursor-pointer ${activeProof === 'recouvrement' ? 'active' : ''}`}
            >
              Recouvrement
            </button>
            <button
              type="button"
              onClick={() => setActiveProof('commerce')}
              className={`ios-segmented-item cursor-pointer ${activeProof === 'commerce' ? 'active' : ''}`}
            >
              Commerce
            </button>
            <button
              type="button"
              onClick={() => setActiveProof('tresorerie')}
              className={`ios-segmented-item cursor-pointer ${activeProof === 'tresorerie' ? 'active' : ''}`}
            >
              Trésorerie
            </button>
            <button
              type="button"
              onClick={() => setActiveProof('management')}
              className={`ios-segmented-item cursor-pointer ${activeProof === 'management' ? 'active' : ''}`}
            >
              Management
            </button>
          </div>
        </div>

        {/* 1. Recouvrement (Tableau de bord de créances & Protocole de relance) */}
        {activeProof === 'recouvrement' && (
          <div className="ios-inset-group p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
              <div>
                <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-neutral-100">
                  Suivi des créances & Balance âgée
                </h3>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                  Surveillance du portefeuille client et délais moyens de paiement
                </p>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Taux actuel</div>
                <div className="text-[20px] font-bold text-[#0071E3] dark:text-[#0A84FF]">
                  {agingReport.recoveryRatePercent}%
                </div>
              </div>
            </div>

            {/* Apple style key numbers row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Total facturé</div>
                <div className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {formatFCFA(agingReport.totalInvoiced)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Encaissé</div>
                <div className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {formatFCFA(agingReport.totalCollected)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Reste dû</div>
                <div className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {formatFCFA(agingReport.totalOutstanding)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Retard moyen</div>
                <div className="text-[17px] font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {agingReport.averageOverdueDays} jours
                </div>
              </div>
            </div>

            {/* Minimalist stacked aging bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[12px] text-neutral-500 dark:text-neutral-400">
                <span>Structure des retards</span>
                <span>0-30j (vert) · 31-60j (bleu) · &gt;60j (sombre)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex">
                <div 
                  style={{ width: `${(agingReport.buckets.current.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                  className="h-full bg-neutral-400 dark:bg-neutral-500"
                  title="0-30 jours"
                />
                <div 
                  style={{ width: `${(agingReport.buckets.moderate.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                  className="h-full bg-[#0071E3] dark:bg-[#0A84FF]"
                  title="31-60 jours"
                />
                <div 
                  style={{ width: `${((agingReport.buckets.critical.amount + agingReport.buckets.contentious.amount) / (agingReport.totalOutstanding || 1)) * 100}%` }}
                  className="h-full bg-neutral-900 dark:bg-neutral-100"
                  title="Plus de 60 jours"
                />
              </div>
            </div>

            {/* Protocol of progressive dunning */}
            <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 space-y-3">
              <div className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100">
                Protocole de relance amiable (J+3 à J+35)
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { days: 3, label: 'J+3', name: 'Rappel courtois', channel: 'SMS / WhatsApp' },
                  { days: 10, label: 'J+10', name: 'Relance formelle', channel: 'Email avec relevé' },
                  { days: 20, label: 'J+20', name: 'Mise en demeure', channel: 'Courrier recommandé' },
                  { days: 35, label: 'J+35', name: 'Échéancier', channel: 'Entretien direct' }
                ].map((s) => (
                  <button
                    key={s.days}
                    type="button"
                    onClick={() => setSelectedDunningStage(s.days)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedDunningStage === s.days
                        ? 'border-[#0071E3] bg-[#0071E3]/5 dark:bg-[#0A84FF]/10 text-neutral-900 dark:text-neutral-100'
                        : 'border-neutral-200/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <div className="text-[13px] font-bold">{s.label}</div>
                    <div className="text-[12px] font-medium mt-0.5">{s.name}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-500 mt-1">{s.channel}</div>
                  </button>
                ))}
              </div>

              {/* Dunning message snippet */}
              <div className="p-3.5 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/50 text-[13px] text-neutral-700 dark:text-neutral-300">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Action terrain pour l'étape {currentDunningInfo.code} :
                </div>
                <div>{currentDunningInfo.action}</div>
              </div>
            </div>

            <div className="text-[12px] text-neutral-400 dark:text-neutral-500 italic text-center pt-2">
              Exemple illustratif, données fictives
            </div>
          </div>
        )}

        {/* 2. Commerce (Entonnoir de vente & PAC) */}
        {activeProof === 'commerce' && (
          <div className="ios-inset-group p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
              <div>
                <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-neutral-100">
                  Entonnoir de prospection commerciale
                </h3>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                  Transformation des contacts qualifiés en contrats signés
                </p>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Conversion</div>
                <div className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100">
                  {funnelData.overallConversionRate}%
                </div>
              </div>
            </div>

            {/* Funnel rows */}
            <div className="space-y-2">
              {[
                { label: '1. Cibles identifiées (terrain & annuaire)', count: funnelData.prospects, percent: '100%' },
                { label: '2. Contacts qualifiés (décideur joint)', count: funnelData.qualified, percent: '45%' },
                { label: '3. Devis transmis après rendez-vous', count: funnelData.pitched, percent: '27%' },
                { label: '4. Commandes conclues & acomptes', count: `${funnelData.deals} ventes`, percent: '11%' }
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 flex items-center justify-between">
                  <span className="text-[14px] text-neutral-800 dark:text-neutral-200">{step.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-bold text-neutral-900 dark:text-neutral-100">{step.count}</span>
                    <span className="text-[12px] text-neutral-500 dark:text-neutral-400 font-mono w-10 text-right">{step.percent}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated revenue */}
            <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400">Chiffre d'affaires estimé généré :</div>
                <div className="text-[20px] font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                  {formatFCFA(funnelData.estimatedRevenue)}
                </div>
              </div>
              <span className="text-[13px] text-neutral-600 dark:text-neutral-400">
                Panier moyen : {formatFCFA(funnelTicket)}
              </span>
            </div>

            <div className="text-[12px] text-neutral-400 dark:text-neutral-500 italic text-center pt-2">
              Exemple illustratif, données fictives
            </div>
          </div>
        )}

        {/* 3. Trésorerie (Budget de caisse & Suivi DAS) */}
        {activeProof === 'tresorerie' && (
          <div className="ios-inset-group p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
              <div>
                <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-neutral-100">
                  Modèle de suivi de trésorerie sur 6 mois
                </h3>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                  Anticipation des encaissements et décaissements pour éviter les découverts
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
                    <th className="py-2.5 px-3 font-semibold">Mois</th>
                    <th className="py-2.5 px-3 font-semibold">Encaissements</th>
                    <th className="py-2.5 px-3 font-semibold">Décaissements</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Solde clôture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {treasurySim.monthlyResults.slice(0, 4).map((m, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-medium text-neutral-900 dark:text-neutral-100">{m.month}</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400 font-mono">+{formatFCFA(m.inflow)}</td>
                      <td className="py-2.5 px-3 text-neutral-600 dark:text-neutral-400 font-mono">-{formatFCFA(m.outflow)}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                        {formatFCFA(m.endingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/50 text-[13px] space-y-1">
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                Application pratique DAS 1 & 2 (Cabinet Émeraude) :
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Montage et contrôle des Déclarations Annuelles des Salaires sous la direction de M. Yves Miatoko, Expert-Comptable. Contrôle des pièces de caisse et lettrage OHADA.
              </p>
            </div>

            <div className="text-[12px] text-neutral-400 dark:text-neutral-500 italic text-center pt-2">
              Exemple illustratif, données fictives
            </div>
          </div>
        )}

        {/* 4. Management (Organisation & planning) */}
        {activeProof === 'management' && (
          <div className="ios-inset-group p-5 sm:p-6 space-y-6">
            <div className="pb-3 border-b border-neutral-200/80 dark:border-neutral-800">
              <h3 className="text-[17px] font-semibold text-neutral-900 dark:text-neutral-100">
                Organisation des priorités hebdomadaires
              </h3>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
                Matrice d'efficacité pour sécuriser les urgences sans bloquer le long terme
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
              <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 space-y-2">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Urgences du matin (J+0)
                </div>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[13px]">
                  <li>• Pointage des encaissements de la veille</li>
                  <li>• Relances téléphoniques des factures &gt; 30 jours</li>
                  <li>• Traitement des urgences clients</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 space-y-2">
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Fond & Structuration (Après-midi)
                </div>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-400 text-[13px]">
                  <li>• Rapprochement bancaire et classement des pièces</li>
                  <li>• Prospection commerciale et envoi des devis</li>
                  <li>• Automatisation des tableurs récurrents</li>
                </ul>
              </div>
            </div>

            <div className="text-[12px] text-neutral-400 dark:text-neutral-500 italic text-center pt-2">
              Exemple illustratif, données fictives
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4 : PARCOURS (Timeline interactive en liste groupée iOS) */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
            Parcours
          </h2>
          
          {/* Timeline Filter */}
          <div className="ios-segmented">
            <button
              type="button"
              onClick={() => setTimelineFilter('all')}
              className={`ios-segmented-item cursor-pointer ${timelineFilter === 'all' ? 'active' : ''}`}
            >
              Tout
            </button>
            <button
              type="button"
              onClick={() => setTimelineFilter('education')}
              className={`ios-segmented-item cursor-pointer ${timelineFilter === 'education' ? 'active' : ''}`}
            >
              Formation
            </button>
            <button
              type="button"
              onClick={() => setTimelineFilter('experience')}
              className={`ios-segmented-item cursor-pointer ${timelineFilter === 'experience' ? 'active' : ''}`}
            >
              Expérience
            </button>
          </div>
        </div>

        <div className="ios-inset-group">
          {filteredTimeline.map((item, idx) => (
            <div key={item.id} className="ios-row items-start py-4">
              <div className="space-y-1 pr-4">
                <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </div>
                <div className="text-[13px] text-neutral-600 dark:text-neutral-400">
                  {item.organization} · {item.location}
                </div>
                <div className="text-[13px] text-neutral-500 dark:text-neutral-400 pt-0.5 leading-normal">
                  {item.description}
                </div>
              </div>
              <div className="text-[12px] font-mono text-neutral-500 dark:text-neutral-400 whitespace-nowrap shrink-0 pt-0.5">
                {item.period}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 : POURQUOI MOI ? (Ce que j'apporte dès la première semaine) */}
      <section className="space-y-3">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-neutral-900 dark:text-neutral-100 tracking-[-0.015em]">
          Pourquoi moi ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="ios-inset-group p-5 space-y-1.5">
            <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
              Autonomie opérationnelle
            </div>
            <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-normal">
              Habitué à manipuler des pièces comptables réelles et à relancer des clients sans hésitation, je comprends vite les consignes et j'exécute avec soin.
            </p>
          </div>

          <div className="ios-inset-group p-5 space-y-1.5">
            <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
              Rigueur de recouvrement
            </div>
            <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-normal">
              Une méthode claire pour suivre les échéances : balance âgée tenue à jour, relances graduées pour faire rentrer la trésorerie tout en ménageant la relation commerciale.
            </p>
          </div>

          <div className="ios-inset-group p-5 space-y-1.5">
            <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
              Optimisation par le digital
            </div>
            <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-normal">
              Là où d'autres perdent des heures à recalculer manuellement, je crée des tableurs connectés et des formulaires simples pour supprimer la paperasse inutile.
            </p>
          </div>

          <div className="ios-inset-group p-5 space-y-1.5">
            <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
              Mobilité & Disponibilité
            </div>
            <p className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-normal">
              Basé à Mansimou (Brazzaville) avec le permis B opérationnel, disponible immédiatement pour les déplacements administratifs et démarches terrain.
            </p>
          </div>
        </div>

        {/* Small CTA banner */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] hover:bg-[#0077ED] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF] text-white text-[15px] font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <span>Proposer un entretien à Brazzaville</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
