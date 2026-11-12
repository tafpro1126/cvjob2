import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateDaysOverdue,
  getDunningStage,
  calculateAgingReport,
  simulateTreasury,
  calculateCommercialFunnel,
  type InvoiceRecord
} from './calculations.ts';

test('calculateDaysOverdue correctly calculates difference', () => {
  const days = calculateDaysOverdue('2026-11-02', '2026-11-12');
  assert.equal(days, 10);
  const futureDays = calculateDaysOverdue('2026-11-20', '2026-11-12');
  assert.equal(futureDays, 0);
});

test('getDunningStage assigns stages according to delinquency period', () => {
  assert.equal(getDunningStage(3).code, 'J+3');
  assert.equal(getDunningStage(10).code, 'J+10');
  assert.equal(getDunningStage(25).code, 'J+20');
  assert.equal(getDunningStage(45).code, 'J+35');
});

test('calculateAgingReport calculates accurate totals and bucket sums', () => {
  const sampleInvoices: InvoiceRecord[] = [
    {
      id: 'INV-001',
      client: 'Brazza Distribution Sarl',
      amount: 1000000,
      paidAmount: 1000000,
      dueDate: '2026-10-01',
      status: 'paid'
    },
    {
      id: 'INV-002',
      client: 'Congo Logistique Express',
      amount: 500000,
      paidAmount: 0,
      dueDate: '2026-11-01', // 11 days overdue -> 0-30j bucket
      status: 'overdue'
    },
    {
      id: 'INV-003',
      client: 'TeleCom Partner SA',
      amount: 800000,
      paidAmount: 200000, // 600,000 remaining
      dueDate: '2026-09-15', // 58 days overdue -> 31-60j bucket
      status: 'overdue'
    }
  ];

  const report = calculateAgingReport(sampleInvoices, '2026-11-12');
  assert.equal(report.totalInvoiced, 2300000);
  assert.equal(report.totalCollected, 1200000);
  assert.equal(report.totalOutstanding, 1100000);
  assert.equal(report.buckets.current.amount, 500000);
  assert.equal(report.buckets.moderate.amount, 600000);
  assert.ok(report.recoveryRatePercent > 50);
});

test('simulateTreasury computes ending balance and flags negative reserves', () => {
  const result = simulateTreasury(500000, [
    { month: 'Mois 1', inflow: 1000000, outflow: 800000 }, // +200k -> 700k
    { month: 'Mois 2', inflow: 400000, outflow: 1200000 }, // -800k -> -100k
    { month: 'Mois 3', inflow: 1500000, outflow: 500000 }  // +1M -> 900k
  ]);

  assert.equal(result.monthlyResults[0].endingBalance, 700000);
  assert.equal(result.monthlyResults[1].endingBalance, -100000);
  assert.equal(result.monthlyResults[1].isNegative, true);
  assert.equal(result.finalBalance, 900000);
  assert.equal(result.minBalance, -100000);
});

test('calculateCommercialFunnel calculates stage drops and revenue', () => {
  const funnel = calculateCommercialFunnel(100, 40, 50, 50, 250000);
  assert.equal(funnel.prospects, 100);
  assert.equal(funnel.qualified, 40);
  assert.equal(funnel.pitched, 20);
  assert.equal(funnel.deals, 10);
  assert.equal(funnel.estimatedRevenue, 2500000);
  assert.equal(funnel.overallConversionRate, 10);
});
