import { useState } from 'react';
import { 
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
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Reveal } from './MotionPrimitives.tsx';

interface ProfileStageTabProps {
  onOpenContact: () => void;
}

export function ProfileStageTab({ onOpenContact }: ProfileStageTabProps) {
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'education' | 'experience' | 'certification'>('all');
  const [activeProof, setActiveProof] = useState<'recouvrement' | 'commerce' | 'tresorerie' | 'management'>('recouvrement');
  const [expandedSkill, setExpandedSkill] = useState<string | null>('Balance âgée & Suivi des échéances');

  const [selectedDunningStage, setSelectedDunningStage] = useState<number>(10);
  const [recoveryBonus, setRecoveryBonus] = useState<number>(0);

  const [funnelLeads, setFunnelLeads] = useState<number>(120);
  const [funnelTicket, setFunnelTicket] = useState<number>(350000);

  const dynamicInvoices = SAMPLE_INVOICES_DEMO.map((inv, idx) => {
    if (idx === 1 && recoveryBonus > 0) {
      return {
        ...inv,
        paidAmount: Math.min(inv.amount, inv.paidAmount + recoveryBonus),
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

  const filteredTimeline = TIMELINE_DATA.filter((item) => {
    if (timelineFilter === 'all') return true;
    return item.type === timelineFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-24 lg:space-y-32">
      
      {/* SECTION 1 : À PROPOS */}
      <section id="a-propos" className="scroll-mt-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Profil &amp; Objectif
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Un stagiaire opérationnel dès la première semaine.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4 text-[16px] sm:text-[17px] text-[var(--muted)] leading-[1.65]">
                <p>
                  Après deux années de tronc commun en gestion à l'Université Libre du Congo (ULC), j'ai obtenu ma Licence Professionnelle en Administration des Entreprises (LPAE) à l'ESGAE à Brazzaville.
                </p>
                <p>
                  Je recherche un stage en <strong className="font-medium text-[var(--ink)]">commerce</strong>, <strong className="font-medium text-[var(--ink)]">comptabilité</strong>, <strong className="font-medium text-[var(--ink)]">recouvrement</strong> ou <strong className="font-medium text-[var(--ink)]">management</strong> auprès d'une entreprise locale. Ce n'est pas un stage de développement informatique.
                </p>
                <p>
                  Sur le terrain, j'ai participé au montage des déclarations annuelles des salaires (DAS 1 &amp; 2) au cabinet Émeraude, et suivi en mai 2026 la Masterclass dédiée au recouvrement de créances et à la gestion des impayés.
                </p>
              </div>

              {/* Clean tabular facts without boxed cards */}
              <div className="pt-6 border-t border-[var(--hairline)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[13px]">
                <div>
                  <div className="text-[var(--subtle)]">Diplôme</div>
                  <div className="font-medium text-[var(--ink)] mt-1">LPAE (ESGAE)</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Localisation</div>
                  <div className="font-medium text-[var(--ink)] mt-1">Brazzaville, Congo</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Mobilité</div>
                  <div className="font-medium text-[var(--ink)] mt-1">Permis B (en cours d'obtention)</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Disponibilité</div>
                  <div className="font-medium text-[var(--ink)] mt-1">Immédiate</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 : COMPÉTENCES PAR DOMAINE */}
      <section id="competences" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="max-w-2xl space-y-2 mb-12">
            <div className="text-[13px] font-medium text-[var(--accent)]">
              Compétences métiers
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
              Ce que je sais faire concrètement en entreprise.
            </h2>
            <p className="text-[15px] text-[var(--muted)]">
              Sélectionnez une compétence pour afficher le détail pratique de son application.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {SKILL_CATEGORIES.map((category, cIdx) => (
            <Reveal key={category.id} delayMs={cIdx * 60}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[18px] font-medium text-[var(--ink)]">
                    {category.title}
                  </h3>
                  <p className="text-[14px] text-[var(--muted)]">
                    {category.description}
                  </p>
                </div>

                <div className="border-t border-[var(--hairline)]">
                  {category.skills.map((skill, sIdx) => {
                    const isOpen = expandedSkill === skill.name;
                    return (
                      <div key={sIdx} className="border-b border-[var(--hairline)]">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setExpandedSkill(isOpen ? null : skill.name)}
                          className="w-full py-3.5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                        >
                          <span className="text-[15px] font-normal text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                            {skill.name}
                          </span>
                          <span className="inline-flex items-center gap-2 text-[13px] text-[var(--subtle)] shrink-0">
                            <span>{skill.tag}</span>
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="pb-4 pr-6 text-[14px] text-[var(--muted)] leading-relaxed">
                            {skill.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3 : PREUVES VISUELLES INTERACTIVES (EXEMPLES FICTIFS) */}
      <section id="exemples" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Preuves visuelles
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Modèles de suivi et de relance.
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Simulations interactives construites avec mes méthodes de travail.
              </p>
            </div>

            {/* Clean borderless text tabs with animated underline */}
            <div className="flex flex-wrap items-center gap-6 border-b border-[var(--hairline)]" role="tablist" aria-label="Exemples métiers">
              {[
                { id: 'recouvrement', label: 'Recouvrement' },
                { id: 'commerce', label: 'Commerce' },
                { id: 'tresorerie', label: 'Trésorerie' },
                { id: 'management', label: 'Management' },
              ].map((tab) => {
                const isActive = activeProof === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveProof(tab.id as typeof activeProof)}
                    className={`relative pb-3 text-[14px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[var(--ink)]'
                        : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-150 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Sub-view 1: Recouvrement */}
        {activeProof === 'recouvrement' && (
          <div className="space-y-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-6 border-y border-[var(--hairline)]">
              <div>
                <div className="text-[13px] text-[var(--subtle)]">Total créances émises</div>
                <div className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] mt-1 tnum">
                  {formatFCFA(agingReport.totalInvoiced)}
                </div>
              </div>
              <div>
                <div className="text-[13px] text-[var(--subtle)]">Total encaissé</div>
                <div className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] mt-1 tnum">
                  {formatFCFA(agingReport.totalCollected)}
                </div>
              </div>
              <div>
                <div className="text-[13px] text-[var(--subtle)]">Taux de recouvrement</div>
                <div className="text-[24px] sm:text-[28px] font-light text-[var(--accent)] mt-1 tnum">
                  {agingReport.recoveryRatePercent}%
                </div>
              </div>
              <div>
                <div className="text-[13px] text-[var(--subtle)]">Retard moyen constaté</div>
                <div className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] mt-1 tnum">
                  {agingReport.averageOverdueDays} jours
                </div>
              </div>
            </div>

            {/* Balance âgée & Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-5">
                <h3 className="text-[17px] font-medium text-[var(--ink)]">
                  Répartition de la balance âgée
                </h3>
                <div className="w-full h-3 rounded-[4px] bg-[var(--surface)] overflow-hidden flex">
                  <div
                    style={{ width: `${(agingReport.buckets.current.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-slate-400"
                    title="0-30 jours"
                  />
                  <div
                    style={{ width: `${(agingReport.buckets.moderate.amount / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-[var(--accent)]"
                    title="31-60 jours"
                  />
                  <div
                    style={{ width: `${((agingReport.buckets.critical.amount + agingReport.buckets.contentious.amount) / (agingReport.totalOutstanding || 1)) * 100}%` }}
                    className="h-full bg-[var(--ink)]"
                    title="Plus de 60 jours"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-[13px]">
                  <div className="py-2 border-b border-[var(--hairline)] flex justify-between">
                    <span className="text-[var(--muted)]">0 – 30 jours</span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.current.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex justify-between">
                    <span className="text-[var(--muted)]">31 – 60 jours</span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.moderate.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex justify-between">
                    <span className="text-[var(--muted)]">61 – 90 jours</span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.critical.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex justify-between">
                    <span className="text-[var(--muted)]">&gt; 90 jours</span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.contentious.amount)}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <label htmlFor="sim-recovery-range" className="text-[var(--muted)]">
                      Simuler un encaissement suite à relance :
                    </label>
                    <span className="font-medium text-[var(--accent)] tnum">
                      +{formatFCFA(recoveryBonus)}
                    </span>
                  </div>
                  <input
                    id="sim-recovery-range"
                    type="range"
                    min={0}
                    max={500000}
                    step={50000}
                    value={recoveryBonus}
                    onChange={(e) => setRecoveryBonus(Number(e.target.value))}
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Protocole de relance J+3 à J+35 */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-[17px] font-medium text-[var(--ink)]">
                  Protocole de relance amiable (<span className="tnum">J+3 à J+35</span>)
                </h3>

                <div className="flex flex-wrap gap-2">
                  {[
                    { days: 3, code: 'J+3', title: 'Rappel courtois' },
                    { days: 10, code: 'J+10', title: 'Relance formelle' },
                    { days: 20, code: 'J+20', title: 'Mise en demeure' },
                    { days: 35, code: 'J+35', title: 'Échéancier' },
                  ].map((s) => (
                    <button
                      key={s.days}
                      type="button"
                      onClick={() => setSelectedDunningStage(s.days)}
                      className={`h-[44px] px-4 rounded-[6px] text-[14px] font-medium cursor-pointer transition-colors tnum ${
                        selectedDunningStage === s.days
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--hairline)]'
                      }`}
                    >
                      {s.code} · {s.title}
                    </button>
                  ))}
                </div>

                <div className="pt-3 space-y-2 text-[14px]">
                  <div className="font-medium text-[var(--ink)] tnum">
                    Étape {currentDunningInfo.code} — Canal : {currentDunningInfo.recommendedChannel}
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {currentDunningInfo.action}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[12px] text-[var(--subtle)] italic">
              Exemple illustratif, données fictives.
            </p>
          </div>
        )}

        {/* Sub-view 2: Commerce */}
        {activeProof === 'commerce' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--hairline)]">
              <div className="space-y-1">
                <h3 className="text-[18px] font-medium text-[var(--ink)]">
                  Entonnoir de prospection commerciale
                </h3>
                <p className="text-[14px] text-[var(--muted)]">
                  Suivi du taux de transformation entre prise de contact et signature.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[14px]">
                <label className="flex items-center gap-2 text-[var(--muted)]">
                  <span>Prospects :</span>
                  <select
                    value={funnelLeads}
                    onChange={(e) => setFunnelLeads(Number(e.target.value))}
                    className="h-[44px] px-3 rounded-[6px] bg-[var(--surface)] border border-[var(--hairline)] text-[var(--ink)] tnum"
                  >
                    <option value={60}>60</option>
                    <option value={120}>120</option>
                    <option value={250}>250</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-[var(--muted)]">
                  <span>Panier moyen :</span>
                  <select
                    value={funnelTicket}
                    onChange={(e) => setFunnelTicket(Number(e.target.value))}
                    className="h-[44px] px-3 rounded-[6px] bg-[var(--surface)] border border-[var(--hairline)] text-[var(--ink)] tnum"
                  >
                    <option value={150000}>150 000 FCFA</option>
                    <option value={350000}>350 000 FCFA</option>
                    <option value={750000}>750 000 FCFA</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="divide-y divide-[var(--hairline)] border-b border-[var(--hairline)]">
              {[
                { label: '1. Prospects ciblés (Brazzaville)', count: funnelData.prospects, rate: '100%' },
                { label: '2. Décideurs qualifiés', count: funnelData.qualified, rate: '45%' },
                { label: '3. Rendez-vous & devis remis', count: funnelData.pitched, rate: '27%' },
                { label: '4. Contrats signés', count: `${funnelData.deals} ventes`, rate: `${funnelData.overallConversionRate}%` },
              ].map((row, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between text-[15px]">
                  <span className="text-[var(--ink)]">{row.label}</span>
                  <div className="flex items-center gap-8 tnum">
                    <span className="font-medium text-[var(--ink)]">{row.count}</span>
                    <span className="text-[var(--muted)] w-16 text-right">{row.rate}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-[var(--muted)]">Chiffre d'affaires prévisionnel simulé</span>
              <span className="text-[28px] font-light text-[var(--ink)] tnum">
                {formatFCFA(funnelData.estimatedRevenue)}
              </span>
            </div>

            <p className="text-[12px] text-[var(--subtle)] italic">
              Exemple illustratif, données fictives.
            </p>
          </div>
        )}

        {/* Sub-view 3: Trésorerie */}
        {activeProof === 'tresorerie' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-[18px] font-medium text-[var(--ink)]">
                Modèle de suivi de trésorerie prévisionnelle
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Anticipation mensuelle des flux d'encaissements et décaissements (trésorerie de départ : <span className="tnum">1 500 000 FCFA</span>).
              </p>
            </div>

            <div className="overflow-x-auto border-y border-[var(--hairline)]">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[var(--hairline)] text-[var(--subtle)]">
                    <th className="py-3 px-2 font-medium">Période</th>
                    <th className="py-3 px-2 font-medium">Encaissements</th>
                    <th className="py-3 px-2 font-medium">Décaissements</th>
                    <th className="py-3 px-2 font-medium text-right">Solde fin de mois</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)] tnum">
                  {treasurySim.monthlyResults.map((m, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-2 text-[var(--ink)]">{m.month}</td>
                      <td className="py-3 px-2 text-[var(--muted)]">+{formatFCFA(m.inflow)}</td>
                      <td className="py-3 px-2 text-[var(--muted)]">-{formatFCFA(m.outflow)}</td>
                      <td className="py-3 px-2 text-right font-medium text-[var(--ink)]">
                        {formatFCFA(m.endingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[12px] text-[var(--subtle)] italic">
              Exemple illustratif, données fictives.
            </p>
          </div>
        )}

        {/* Sub-view 4: Management */}
        {activeProof === 'management' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-[18px] font-medium text-[var(--ink)]">
                Organisation hebdomadaire et priorisation
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Répartition structurée des tâches pour un pôle administratif et commercial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-[var(--hairline)]">
              <div className="space-y-3">
                <h4 className="text-[15px] font-medium text-[var(--ink)]">
                  Priorités du matin (Urgent &amp; Trésorerie)
                </h4>
                <ul className="space-y-2 text-[14px] text-[var(--muted)]">
                  <li>• Pointage des encaissements et pièces de caisse de la veille</li>
                  <li>• Appels et messages de relance pour les factures échues (&gt; 30 jours)</li>
                  <li>• Traitement des demandes clients prioritaires</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-[15px] font-medium text-[var(--ink)]">
                  Structuration l'après-midi (Fond &amp; Commerce)
                </h4>
                <ul className="space-y-2 text-[14px] text-[var(--muted)]">
                  <li>• Rapprochement bancaire et lettrage comptable OHADA</li>
                  <li>• Prospection B2B, relance de devis envoyés et suivi CRM</li>
                  <li>• Mise à jour des tableaux de bord automatisés</li>
                </ul>
              </div>
            </div>

            <p className="text-[12px] text-[var(--subtle)] italic">
              Exemple illustratif, données fictives.
            </p>
          </div>
        )}
      </section>

      {/* SECTION 4 : PARCOURS (TIMELINE INTERACTIVE) */}
      <section id="parcours" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Parcours vérifiable
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Formation et expériences.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-b border-[var(--hairline)]" role="tablist" aria-label="Filtrer le parcours">
              {[
                { id: 'all', label: 'Tout' },
                { id: 'education', label: 'Formation' },
                { id: 'experience', label: 'Expériences' },
                { id: 'certification', label: 'Certifications' },
              ].map((f) => {
                const isActive = timelineFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTimelineFilter(f.id as typeof timelineFilter)}
                    className={`relative pb-3 text-[14px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                      isActive ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{f.label}</span>
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--accent)] transition-transform duration-150 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <div className="md:col-span-3 text-[14px] text-[var(--subtle)] tnum">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-1.5">
                <div className="text-[17px] font-medium text-[var(--ink)]">
                  {item.title}
                </div>
                <div className="text-[14px] text-[var(--muted)]">
                  {item.organization} · {item.location}
                </div>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed pt-1 max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 : POURQUOI MOI ? */}
      <section className="pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Engagement dès la semaine 1
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Pourquoi me confier un stage ?
              </h2>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="btn-primary group"
                >
                  <span>Me contacter</span>
                  <ChevronRight className="w-4 h-4 chevron-slide" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-medium text-[var(--ink)]">01. Autonomie immédiate</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                  Habitué à travailler sur des pièces réelles (DAS 1 &amp; 2 chez Émeraude), j'assimile rapidement les consignes sans bloquer mon encadrant.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-medium text-[var(--ink)]">02. Méthode de recouvrement</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                  Je sais tenir une balance âgée à jour et conduire des relances graduées de J+3 à J+35 qui préservent la relation commerciale.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-medium text-[var(--ink)]">03. Automatisation utile</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                  Là où les tâches manuelles ralentissent l'équipe, je mets en place des tableurs connectés et formulaires Google Workspace simples.
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-[16px] font-medium text-[var(--ink)]">04. Mobilité sur Brazzaville</h3>
                <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                  Basé à Brazzaville avec le permis B en cours d'obtention, disponible immédiatement pour les visites clients et démarches terrain.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
