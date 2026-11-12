/**
 * Pure calculation logic for Marion Moun Portfolio
 * Covers Recovery (Balance âgée, DSO, Taux de recouvrement),
 * Treasury cashflow simulation, and Commercial sales funnel.
 */

export interface InvoiceRecord {
  id: string;
  client: string;
  amount: number; // in FCFA (XAF)
  paidAmount: number;
  dueDate: string; // YYYY-MM-DD
  status: 'paid' | 'pending' | 'overdue';
}

export interface AgingBucket {
  range: string;
  label: string;
  amount: number;
  count: number;
  color: string;
}

export interface AgingReport {
  totalInvoiced: number;
  totalCollected: number;
  totalOutstanding: number;
  recoveryRatePercent: number;
  buckets: {
    current: AgingBucket;     // 0 - 30 days
    moderate: AgingBucket;    // 31 - 60 days
    critical: AgingBucket;    // 61 - 90 days
    contentious: AgingBucket; // > 90 days
  };
  averageOverdueDays: number;
}

export function calculateDaysOverdue(dueDateStr: string, referenceDateStr: string = '2026-11-12'): number {
  const due = new Date(dueDateStr).getTime();
  const ref = new Date(referenceDateStr).getTime();
  const diffDays = Math.floor((ref - due) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function getDunningStage(daysOverdue: number): {
  code: string;
  title: string;
  tone: 'preventive' | 'firm' | 'urgent' | 'legal';
  action: string;
  recommendedChannel: string;
} {
  if (daysOverdue <= 5) {
    return {
      code: 'J+3',
      title: 'Rappel préventif & courtois',
      tone: 'preventive',
      action: 'Avis d’échéance avec récapitulatif de la facture et coordonnées de paiement',
      recommendedChannel: 'WhatsApp & SMS direct'
    };
  }
  if (daysOverdue <= 15) {
    return {
      code: 'J+10',
      title: 'Première relance formelle',
      tone: 'firm',
      action: 'Demande d’état des lieux, relevé de compte et accusé de réception',
      recommendedChannel: 'Email officiel & Appel téléphonique de courtoisie'
    };
  }
  if (daysOverdue <= 30) {
    return {
      code: 'J+20',
      title: 'Mise en demeure amiable',
      tone: 'urgent',
      action: 'Sommation amiable avec délai fixe (48h/72h) avant blocage de prestation',
      recommendedChannel: 'Courrier avec décharge & Appel responsable financier'
    };
  }
  return {
    code: 'J+35',
    title: 'Protocole d’accord ou Contentieux',
    tone: 'legal',
    action: 'Proposition d’échéancier transactionnel ou transfert vers conseil juridique / huissier',
    recommendedChannel: 'Notification formelle & Entretien de conciliation'
  };
}

export function calculateAgingReport(invoices: InvoiceRecord[], referenceDateStr: string = '2026-11-12'): AgingReport {
  let totalInvoiced = 0;
  let totalCollected = 0;
  let totalOutstanding = 0;
  let totalOverdueDaysSum = 0;
  let overdueCount = 0;

  const buckets = {
    current: { range: '0-30j', label: 'Créances courantes', amount: 0, count: 0, color: '#10B981' },
    moderate: { range: '31-60j', label: 'Retards modérés', amount: 0, count: 0, color: '#F59E0B' },
    critical: { range: '61-90j', label: 'Retards critiques', amount: 0, count: 0, color: '#EF4444' },
    contentious: { range: '>90j', label: 'Pré-contentieux', amount: 0, count: 0, color: '#7F1D1D' }
  };

  for (const inv of invoices) {
    totalInvoiced += inv.amount;
    totalCollected += inv.paidAmount;
    const remaining = Math.max(0, inv.amount - inv.paidAmount);
    totalOutstanding += remaining;

    if (remaining > 0) {
      const days = calculateDaysOverdue(inv.dueDate, referenceDateStr);
      if (days > 0) {
        totalOverdueDaysSum += days;
        overdueCount++;
      }

      if (days <= 30) {
        buckets.current.amount += remaining;
        buckets.current.count++;
      } else if (days <= 60) {
        buckets.moderate.amount += remaining;
        buckets.moderate.count++;
      } else if (days <= 90) {
        buckets.critical.amount += remaining;
        buckets.critical.count++;
      } else {
        buckets.contentious.amount += remaining;
        buckets.contentious.count++;
      }
    }
  }

  const recoveryRatePercent = totalInvoiced > 0 
    ? Number(((totalCollected / totalInvoiced) * 100).toFixed(1)) 
    : 0;

  const averageOverdueDays = overdueCount > 0 
    ? Math.round(totalOverdueDaysSum / overdueCount) 
    : 0;

  return {
    totalInvoiced,
    totalCollected,
    totalOutstanding,
    recoveryRatePercent,
    buckets,
    averageOverdueDays
  };
}

export interface CashMonthInput {
  month: string;
  inflow: number; // Encaissements
  outflow: number; // Décaissements
}

export interface CashMonthResult extends CashMonthInput {
  net: number;
  endingBalance: number;
  isNegative: boolean;
}

export function simulateTreasury(startingBalance: number, months: CashMonthInput[]): {
  monthlyResults: CashMonthResult[];
  minBalance: number;
  finalBalance: number;
  totalInflow: number;
  totalOutflow: number;
} {
  let currentBalance = startingBalance;
  let minBalance = startingBalance;
  let totalInflow = 0;
  let totalOutflow = 0;

  const monthlyResults: CashMonthResult[] = months.map(m => {
    totalInflow += m.inflow;
    totalOutflow += m.outflow;
    const net = m.inflow - m.outflow;
    currentBalance += net;
    if (currentBalance < minBalance) {
      minBalance = currentBalance;
    }
    return {
      ...m,
      net,
      endingBalance: currentBalance,
      isNegative: currentBalance < 0
    };
  });

  return {
    monthlyResults,
    minBalance,
    finalBalance: currentBalance,
    totalInflow,
    totalOutflow
  };
}

export function calculateCommercialFunnel(
  prospectsCount: number,
  qualifiedRate: number,
  pitchRate: number,
  dealRate: number,
  averageTicket: number
) {
  const qualified = Math.round(prospectsCount * (qualifiedRate / 100));
  const pitched = Math.round(qualified * (pitchRate / 100));
  const deals = Math.round(pitched * (dealRate / 100));
  const estimatedRevenue = deals * averageTicket;
  const overallConversionRate = prospectsCount > 0 
    ? Number(((deals / prospectsCount) * 100).toFixed(2)) 
    : 0;

  return {
    prospects: prospectsCount,
    qualified,
    pitched,
    deals,
    estimatedRevenue,
    overallConversionRate
  };
}
