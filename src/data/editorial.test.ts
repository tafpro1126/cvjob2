import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSONAL_INFO,
  TIMELINE_DATA,
  SKILL_CATEGORIES,
  TODAY_VS_STAGE,
  DIGITAL_PROJECTS_DATA,
  SERVICES_DATA,
  SAMPLE_INVOICES_DEMO,
} from './portfolioData.ts';

const FORBIDDEN_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: 'spécialité/spécialisé', regex: /spécialit|spécialis/i },
  { label: 'éprouvée', regex: /éprouvée?/i },
  { label: "d'excellence", regex: /excellence/i },
  { label: 'force de frappe', regex: /force de frappe/i },
  { label: 'ROI immédiat', regex: /roi immédiat/i },
  { label: 'très demandé', regex: /très demandé/i },
  { label: 'opérationnel', regex: /opérationnel/i },
  { label: 'certifié/certification (sans contexte négatif)', regex: /(?<!sans\s)certif/i },
  { label: 'consultant / indépendant', regex: /consultant|indépendant/i },
  { label: 'Apps Script / Google Workspace', regex: /apps script|google sheets|google forms|google workspace/i },
  { label: 'Noms tiers interdits', regex: /émeraude|bem service|gfac|good vibes|mafouta|yves miatoko/i },
  { label: 'Diplômé / prêt / habitué', regex: /diplômé|prêt|habitué/i },
  { label: 'Gestion des litiges', regex: /gestion des litiges/i },
];

function stripAllowedExpertPhrases(text: string): string {
  return text
    .replace(/cabinet d’expertise comptable/gi, '')
    .replace(/cabinet d'expertise comptable/gi, '')
    .replace(/avec l’aide d’un expert(?:-comptable)?/gi, '')
    .replace(/avec l'aide d'un expert(?:-comptable)?/gi, '')
    .replace(/suivi d’un expert-comptable/gi, '')
    .replace(/relecture d’un expert-comptable/gi, '')
    .replace(/un expert-comptable/gi, '');
}

test('portfolioData contains no forbidden seniority claims, Google Workspace tools, or third-party names', () => {
  const serialized = JSON.stringify({
    PERSONAL_INFO,
    TIMELINE_DATA,
    SKILL_CATEGORIES,
    TODAY_VS_STAGE,
    DIGITAL_PROJECTS_DATA,
    SERVICES_DATA,
    SAMPLE_INVOICES_DEMO,
  });

  for (const { label, regex } of FORBIDDEN_PATTERNS) {
    assert.equal(regex.test(serialized), false, `Found forbidden pattern (${label}) in portfolioData`);
  }

  const withoutAllowedExpert = stripAllowedExpertPhrases(serialized);
  assert.equal(/\bexpert/i.test(withoutAllowedExpert), false, 'Found unauthorized use of "expert"');
});

test('PERSONAL_INFO matches authorized coordinates and neutral Permis B status', () => {
  assert.equal(PERSONAL_INFO.email, 'glory3marrion71@gmail.com');
  assert.equal(PERSONAL_INFO.phone1, '+242 06 113 38 15');
  assert.equal(PERSONAL_INFO.phone1Raw, '242061133815');
  assert.equal(PERSONAL_INFO.phone2, '+242 06 406 50 70');
  assert.equal(PERSONAL_INFO.location, 'Brazzaville');
  assert.equal(PERSONAL_INFO.driverLicense, 'Permis B (en cours) [À CONFIRMER]');
  assert.equal(PERSONAL_INFO.legalEditorName, 'Valry Moun');
  assert.equal(PERSONAL_INFO.legalEditorEmail, 'valryboulot371@gmail.com');
});

test('TIMELINE_DATA excludes Permis B and orders LPAE 2025-2026 first as current', () => {
  assert.ok(TIMELINE_DATA.length >= 6);
  assert.equal(TIMELINE_DATA[0].id, 'lpae-esgae');
  assert.equal(TIMELINE_DATA[0].current, true);
  assert.equal(
    TIMELINE_DATA.some((ev) => /permis/i.test(ev.title)),
    false,
    'Permis B should not appear in timeline'
  );
});

test('SKILL_CATEGORIES strictly use 1-3 tier visual levels (Notions / Bases / À l’aise)', () => {
  for (const cat of SKILL_CATEGORIES) {
    for (const skill of cat.skills) {
      assert.ok([1, 2, 3].includes(skill.tier), `Invalid tier for ${skill.name}`);
      assert.ok(['Notions', 'Bases', 'À l’aise'].includes(skill.levelLabel), `Invalid levelLabel for ${skill.name}`);
    }
  }
});

test('DIGITAL_PROJECTS_DATA uses honest Projet 1-3 titles and badges', () => {
  assert.equal(DIGITAL_PROJECTS_DATA.length, 3);
  for (const proj of DIGITAL_PROJECTS_DATA) {
    assert.ok(['Projet réel', 'Démonstration'].includes(proj.badge), `Invalid badge for ${proj.id}`);
  }
});
