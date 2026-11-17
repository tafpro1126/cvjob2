import { useState } from 'react';
import {
  TIMELINE_DATA,
  SKILL_CATEGORIES,
  SAMPLE_INVOICES_DEMO,
  TODAY_VS_STAGE,
  PERSONAL_INFO,
} from '../data/portfolioData.ts';
import {
  calculateAgingReport,
  simulateTreasury,
  calculateCommercialFunnel,
  getDunningStage,
} from '../utils/calculations.ts';
import { SkillLevelTier } from '../types.ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Reveal } from './MotionPrimitives.tsx';

interface ProfileStageTabProps {
  onOpenContact: () => void;
}

function SkillDots({ tier, label }: { tier: SkillLevelTier; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 shrink-0"
      aria-label={`Niveau : ${label} (${tier} sur 3)`}
    >
      <span className="inline-flex items-center gap-1" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`w-2 h-2 rounded-full transition-colors ${
              step <= tier
                ? 'bg-[var(--accent)]'
                : 'border border-[var(--subtle)]/50 bg-transparent'
            }`}
          />
        ))}
      </span>
      <span className="text-[12.5px] text-[var(--muted)] w-[54px] text-right">{label}</span>
    </span>
  );
}

export function ProfileStageTab({ onOpenContact }: ProfileStageTabProps) {
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'education' | 'experience' | 'workshop'>('all');
  const [activeProof, setActiveProof] = useState<'recouvrement' | 'commerce' | 'tresorerie' | 'management'>('recouvrement');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(
    'Déclarations annuelles des salaires (DAS 1 & 2)'
  );

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
    { month: 'Mois 1', inflow: 4200000, outflow: 3600000 },
    { month: 'Mois 2', inflow: 3800000, outflow: 3900000 },
    { month: 'Mois 3', inflow: 5100000, outflow: 4200000 },
    { month: 'Mois 4', inflow: 4600000, outflow: 4100000 },
    { month: 'Mois 5', inflow: 5800000, outflow: 4400000 },
    { month: 'Mois 6', inflow: 6200000, outflow: 4700000 },
  ]);

  const currentDunningInfo = getDunningStage(selectedDunningStage);

  const formatFCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  const filteredTimeline = TIMELINE_DATA.filter((item) => {
    if (timelineFilter === 'all') return true;
    return item.type === timelineFilter;
  });

  const bucketTotal = agingReport.totalOutstanding || 1;
  const pctBucket1 = (agingReport.buckets.current.amount / bucketTotal) * 100;
  const pctBucket2 = (agingReport.buckets.moderate.amount / bucketTotal) * 100;
  const pctBucket3 = (agingReport.buckets.critical.amount / bucketTotal) * 100;
  const pctBucket4 = (agingReport.buckets.contentious.amount / bucketTotal) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-24 lg:space-y-32">

      {/* SECTION 1 : PROFIL & OBJECTIF */}
      <section id="a-propos" className="scroll-mt-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Profil &amp; Objectif
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Ici pour apprendre, et me rendre utile vite.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4 text-[16px] sm:text-[17px] text-[var(--muted)] leading-[1.65]">
                <p>
                  Après deux ans de tronc commun en gestion à l’Université Libre du Congo, j’ai obtenu ma Licence Professionnelle en Administration des Entreprises (LPAE) à l’ESGAE, à Brazzaville.
                </p>
                <p>
                  Je cherche un stage de 3 à 6 mois en <strong className="font-medium text-[var(--ink)]">commerce</strong>, <strong className="font-medium text-[var(--ink)]">comptabilité</strong>, <strong className="font-medium text-[var(--ink)]">recouvrement</strong> ou <strong className="font-medium text-[var(--ink)]">management</strong>, auprès d’une entreprise locale. Un stage en gestion, pas en informatique.
                </p>
                <p>
                  J’ai déjà touché au concret : j’ai participé au montage des déclarations annuelles des salaires (DAS 1 &amp; 2) dans un cabinet d’expertise comptable, avec l’aide d’un expert-comptable, et suivi en mai 2026 une Masterclass de 4 h sur le recouvrement de créances.
                </p>
                <p>
                  Je me forme aussi en autonomie aux outils numériques et à l’IA, pour gagner du temps sur les tâches répétitives. Je travaille en français et en anglais.
                </p>
              </div>

              {/* Fiche d'infos honnête et sobre */}
              <div className="pt-6 border-t border-[var(--hairline)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[13px]">
                <div>
                  <div className="text-[var(--subtle)]">Diplôme</div>
                  <div className="font-medium text-[var(--ink)] mt-1">LPAE (ESGAE)</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Langues</div>
                  <div className="font-medium text-[var(--ink)] mt-1">{PERSONAL_INFO.languages}</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Mobilité</div>
                  <div className="font-medium text-[var(--ink)] mt-1">{PERSONAL_INFO.driverLicense}</div>
                </div>
                <div>
                  <div className="text-[var(--subtle)]">Disponibilité</div>
                  <div className="font-medium text-[var(--ink)] mt-1">{PERSONAL_INFO.availability}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 2 : COMPÉTENCES HONNÊTES (●○○ Notions / ●●○ Bases / ●●● À l'aise) */}
      <section id="competences" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-2">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Compétences
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Mes bases, et ce que je viens apprendre.
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Je suis au début de mon parcours professionnel. Voici ce que j’ai déjà vu ou pratiqué, avec l’aide dont j’ai bénéficié.
              </p>
            </div>

            {/* Légende visuelle des 3 segments */}
            <div
              aria-label="Légende des niveaux"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[var(--muted)] py-2.5 px-3.5 rounded-[6px] bg-[var(--surface)] shrink-0"
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full border border-[var(--subtle)]/50" />
                  <span className="w-2 h-2 rounded-full border border-[var(--subtle)]/50" />
                </span>
                <span><strong className="font-medium text-[var(--ink)]">Notions</strong> (vu en formation)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full border border-[var(--subtle)]/50" />
                </span>
                <span><strong className="font-medium text-[var(--ink)]">Bases</strong> (pratiqué avec aide)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span><strong className="font-medium text-[var(--ink)]">À l’aise</strong> (utilisé seul)</span>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {SKILL_CATEGORIES.map((category, cIdx) => (
            <Reveal key={category.id} delayMs={cIdx * 50}>
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
                          <span className="inline-flex items-center gap-2.5 shrink-0">
                            <SkillDots tier={skill.tier} label={skill.levelLabel} />
                            {isOpen ? (
                              <ChevronDown className="w-4 h-4 text-[var(--subtle)]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[var(--subtle)]" />
                            )}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="pb-4 pr-6 text-[14px] text-[var(--muted)] leading-relaxed transition-all duration-150">
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

      {/* SECTION 3 : BLOC "AUJOURD'HUI -> EN STAGE" (Deux colonnes sur fond teinté) */}
      <section id="objectifs-stage" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="space-y-2 mb-8">
            <div className="text-[13px] font-medium text-[var(--accent)]">
              Projection honnête
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
              Aujourd’hui → Ce que je viens apprendre en stage
            </h2>
          </div>

          <div className="rounded-[10px] bg-[var(--surface)] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-[17px] font-medium text-[var(--ink)]">
                Ce que je sais faire aujourd’hui
              </h3>
              <ul className="space-y-3 text-[15px] text-[var(--muted)] leading-relaxed">
                {TODAY_VS_STAGE.today.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-[var(--accent)] font-medium">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--hairline)] md:pl-10">
              <h3 className="text-[17px] font-medium text-[var(--ink)]">
                Ce que je viens apprendre en stage
              </h3>
              <ul className="space-y-3 text-[15px] text-[var(--muted)] leading-relaxed">
                {TODAY_VS_STAGE.inStage.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-[var(--accent)] font-medium">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 4 : PREUVES VISUELLES INTERACTIVES (EXEMPLES FICTIFS) */}
      <section id="exemples" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Maquettes d’entraînement · Exemple illustratif, données fictives
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Modèles de suivi et de relance.
              </h2>
              <p className="text-[15px] text-[var(--muted)]">
                Simulations fictives réalisées pour illustrer les notions étudiées en cours et en Masterclass.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-[var(--hairline)]" role="tablist" aria-label="Exemples métiers">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-6 border-y border-[var(--hairline)]">
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
                <div className="text-[13px] text-[var(--subtle)]">Retard moyen simulé</div>
                <div className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] mt-1 tnum">
                  {agingReport.averageOverdueDays} jours
                </div>
              </div>
            </div>

            {/* Balance âgée & Légende avec couleurs strictement identiques */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-5">
                <h3 className="text-[17px] font-medium text-[var(--ink)]">
                  Répartition de la balance âgée (simulation)
                </h3>
                <div className="w-full h-3 rounded-[4px] bg-[var(--surface)] overflow-hidden flex">
                  <div
                    style={{ width: `${pctBucket1}%`, backgroundColor: 'var(--bucket-1)' }}
                    className="h-full"
                    title="0-30 jours"
                  />
                  <div
                    style={{ width: `${pctBucket2}%`, backgroundColor: 'var(--bucket-2)' }}
                    className="h-full"
                    title="31-60 jours"
                  />
                  <div
                    style={{ width: `${pctBucket3}%`, backgroundColor: 'var(--bucket-3)' }}
                    className="h-full"
                    title="61-90 jours"
                  />
                  <div
                    style={{ width: `${pctBucket4}%`, backgroundColor: 'var(--bucket-4)' }}
                    className="h-full"
                    title="Plus de 90 jours"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                  <div className="py-2 border-b border-[var(--hairline)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: 'var(--bucket-1)' }} aria-hidden="true" />
                      <span>0 – 30 jours</span>
                    </span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.current.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: 'var(--bucket-2)' }} aria-hidden="true" />
                      <span>31 – 60 jours</span>
                    </span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.moderate.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: 'var(--bucket-3)' }} aria-hidden="true" />
                      <span>61 – 90 jours</span>
                    </span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.critical.amount)}</span>
                  </div>
                  <div className="py-2 border-b border-[var(--hairline)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[var(--muted)]">
                      <span className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: 'var(--bucket-4)' }} aria-hidden="true" />
                      <span>&gt; 90 jours</span>
                    </span>
                    <span className="font-medium text-[var(--ink)] tnum">{formatFCFA(agingReport.buckets.contentious.amount)}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <label htmlFor="sim-recovery-range" className="text-[var(--muted)]">
                      Simuler un encaissement fictif :
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

              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-[17px] font-medium text-[var(--ink)]">
                  Étapes d’un plan de relance amiable (<span className="tnum">J+3 à J+35</span>)
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
                  Exemple d’entonnoir de prospection
                </h3>
                <p className="text-[14px] text-[var(--muted)]">
                  Simulation théorique du passage entre prise de contact et devis signé.
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
                { label: '1. Prospects contactés', count: funnelData.prospects, rate: '100%' },
                { label: '2. Contacts qualifiés', count: funnelData.qualified, rate: '45%' },
                { label: '3. Rendez-vous & devis remis', count: funnelData.pitched, rate: '27%' },
                { label: '4. Contrats conclus', count: `${funnelData.deals} ventes`, rate: `${funnelData.overallConversionRate}%` },
              ].map((row, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[15px]">
                  <span className="text-[var(--ink)]">{row.label}</span>
                  <div className="flex items-center justify-between sm:justify-end gap-8 tnum">
                    <span className="font-medium text-[var(--ink)]">{row.count}</span>
                    <span className="text-[var(--muted)] w-16 text-right">{row.rate}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[14px] text-[var(--muted)]">Total simulé sur cet exemple</span>
              <span className="text-[24px] sm:text-[28px] font-light text-[var(--ink)] tnum">
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
                Tableau d’exemple : suivi de trésorerie
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Notions de suivi des encaissements et décaissements (base fictive de départ : <span className="tnum">1 500 000 FCFA</span>).
              </p>
            </div>

            <div className="overflow-x-auto border-y border-[var(--hairline)]">
              <table className="w-full min-w-[520px] text-left text-[14px]">
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
                Exemple d’organisation hebdomadaire
              </h3>
              <p className="text-[14px] text-[var(--muted)]">
                Méthode simple de priorisation pour garder des dossiers propres au quotidien.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-[var(--hairline)]">
              <div className="space-y-3">
                <h4 className="text-[15px] font-medium text-[var(--ink)]">
                  Priorités du matin
                </h4>
                <ul className="space-y-2 text-[14px] text-[var(--muted)]">
                  <li>• Vérifier les pièces reçues et les échéances du jour</li>
                  <li>• Préparer ou suivre les rappels clients selon les consignes</li>
                  <li>• Traiter les demandes urgentes confiées par le responsable</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-[15px] font-medium text-[var(--ink)]">
                  Suivi de l’après-midi
                </h4>
                <ul className="space-y-2 text-[14px] text-[var(--muted)]">
                  <li>• Mettre à jour les classeurs Excel et dossiers Word</li>
                  <li>• Faire relire les saisies comptables en cas de doute</li>
                  <li>• Préparer les comptes rendus courts pour le lendemain</li>
                </ul>
              </div>
            </div>

            <p className="text-[12px] text-[var(--subtle)] italic">
              Exemple illustratif, données fictives.
            </p>
          </div>
        )}
      </section>

      {/* SECTION 5 : PARCOURS (Frise verticale fine avec points, élément actuel mis en avant, ordre chronologique inversé) */}
      <section id="parcours" className="scroll-mt-24 pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                Parcours chronologique
              </div>
              <h2 className="text-[28px] sm:text-[34px] font-light text-[var(--ink)] tracking-[-0.02em] leading-[1.15]">
                Formation et expériences.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-[var(--hairline)]" role="tablist" aria-label="Filtrer le parcours">
              {[
                { id: 'all', label: 'Tout' },
                { id: 'education', label: 'Formation' },
                { id: 'experience', label: 'Expériences' },
                { id: 'workshop', label: 'Ateliers & auto-formation' },
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

        {/* Frise verticale fine avec points */}
        <div className="relative pl-7 sm:pl-9 border-l border-[var(--hairline)] space-y-10">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-2.5 h-2.5 rounded-full ${
                  item.current
                    ? 'bg-[var(--accent)] ring-4 ring-[var(--accent-subtle)]'
                    : 'bg-[var(--bg)] border-2 border-[var(--subtle)]'
                }`}
              />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
                <div className="md:col-span-3 text-[13.5px] text-[var(--subtle)] tnum flex flex-wrap items-center gap-2">
                  <span>{item.period}</span>
                  {item.current && (
                    <span className="text-[11px] font-medium text-[var(--accent)]">
                      Récent
                    </span>
                  )}
                </div>
                <div className="md:col-span-9 space-y-1.5">
                  <div className="text-[17px] font-medium text-[var(--ink)]">
                    {item.title}
                  </div>
                  <div className="text-[14px] text-[var(--muted)]">
                    {item.organization}{item.location ? ` · ${item.location}` : ''}
                  </div>
                  <p className="text-[14px] text-[var(--muted)] leading-relaxed pt-1 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 : POURQUOI MOI ? (3 lignes courtes, sans cartes identiques) */}
      <section className="pt-16 border-t border-[var(--hairline)]">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[13px] font-medium text-[var(--accent)]">
                État d’esprit
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

            <div className="lg:col-span-8 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {PERSONAL_INFO.whyMePoints.map((pt, idx) => (
                <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="text-[13px] font-normal text-[var(--subtle)] tnum shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[16px] font-medium text-[var(--ink)]">
                      {pt.title}
                    </h3>
                    <p className="text-[14px] text-[var(--muted)] leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
