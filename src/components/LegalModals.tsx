import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LegalDocType } from '../utils/storage.ts';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface LegalModalProps {
  activeDoc: LegalDocType | null;
  onClose: () => void;
  onOpenCookiePrefs: () => void;
}

export function LegalModal({ activeDoc, onClose, onOpenCookiePrefs }: LegalModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeDoc) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const container = dialogRef.current;
    if (container) {
      const closeBtn = container.querySelector<HTMLElement>('button');
      closeBtn?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && container) {
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevFocused?.focus();
    };
  }, [activeDoc, onClose]);

  if (!activeDoc) return null;

  const titles: Record<LegalDocType, string> = {
    confidentialite: 'Politique de confidentialité',
    cgu: "Conditions Générales d'Utilisation (CGU)",
    cookies: 'Politique relative aux cookies',
    mentions: 'Mentions légales',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[10px] bg-[var(--surface-elevated)] border border-[var(--hairline)] shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
          <div>
            <h2 id="legal-modal-title" className="text-[22px] font-medium text-[var(--ink)]">
              {titles[activeDoc]}
            </h2>
            <p className="text-[13px] text-[var(--muted)] mt-1 tnum">
              Dernière mise à jour : 13 novembre 2026
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre légale"
            className="w-9 h-9 rounded-[6px] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeDoc === 'confidentialite' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">1. Responsable du traitement</h3>
              <p>
                Marion Moun — Email : <span className="text-[var(--ink)]">{PERSONAL_INFO.email}</span> — Localisation : {PERSONAL_INFO.location}.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">2. Données collectées</h3>
              <p>
                Lorsque vous utilisez les formulaires de contact ou de devis, vous transmettez volontairement votre nom, votre téléphone ou e-mail et le contenu de votre message. Le paramètre <code className="text-[var(--ink)]">?src=cv</code> est lu localement par le navigateur pour ouvrir la partie « Profil &amp; Stage ».
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">3. Finalités et base légale</h3>
              <p>
                Ces informations servent exclusivement à répondre à vos propositions de stage en entreprise ou demandes de prestations web, sur la base de votre démarche volontaire.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">4. Durée de conservation et destinataires</h3>
              <p>
                Les échanges reçus sont conservés le temps du suivi de candidature ou de la mission, et au maximum 24 mois après le dernier contact. Marion Moun en est l’unique destinataire ; aucune donnée n’est cédée à des tiers.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">5. Hébergeur</h3>
              <p>
                Hébergement du site : [À COMPLÉTER : Nom, adresse et contact de l’hébergeur].
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">6. Vos droits</h3>
              <p>
                Vous disposez d’un droit d’accès, de rectification et de suppression de vos données en écrivant à{' '}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[var(--accent)] underline">
                  {PERSONAL_INFO.email}
                </a>.
              </p>
            </section>
          </div>
        )}

        {activeDoc === 'cgu' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">1. Objet du site</h3>
              <p>
                Ce site présente le parcours de Marion Moun en vue d’un stage de 3 à 6 mois en commerce, comptabilité, recouvrement et management, ainsi que ses prestations web pour les entreprises locales.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">2. Propriété intellectuelle</h3>
              <p>
                Les textes, maquettes et présentations publiés sur ce site sont la propriété de Marion Moun, sauf mention contraire.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">3. Exemples illustratifs</h3>
              <p>
                Les tableaux interactifs (balance âgée, suivi de trésorerie, prospection) reposent exclusivement sur des données fictives à but démonstratif.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">4. Absence d’engagement contractuel</h3>
              <p>
                Les descriptions de prestations présentées sont informatives. Toute mission fait l’objet d’un devis validé au préalable.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">5. Loi applicable</h3>
              <p>
                Les présentes conditions sont soumises au droit applicable en République du Congo [À VÉRIFIER : Congo-Brazzaville].
              </p>
            </section>
          </div>
        )}

        {activeDoc === 'cookies' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <p>
              Ce site limite au strict minimum le stockage local sur votre navigateur et n’active aucune mesure d’audience sans votre accord explicite.
            </p>

            <div className="overflow-x-auto border border-[var(--hairline)] rounded-[8px]">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[var(--surface)] text-[var(--ink)] border-b border-[var(--hairline)]">
                  <tr>
                    <th className="py-2.5 px-3 font-medium">Nom</th>
                    <th className="py-2.5 px-3 font-medium">Finalité</th>
                    <th className="py-2.5 px-3 font-medium">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">mm_cookie_consent_v1</td>
                    <td className="py-2.5 px-3">Enregistrement de vos choix de consentement</td>
                    <td className="py-2.5 px-3 tnum">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">mm_theme_v1</td>
                    <td className="py-2.5 px-3">Mémorisation du thème clair ou sombre</td>
                    <td className="py-2.5 px-3 tnum">12 mois</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[var(--ink)]">Mesure d’audience</td>
                    <td className="py-2.5 px-3">Chargée uniquement après consentement explicite</td>
                    <td className="py-2.5 px-3 tnum">[À COMPLÉTER]</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCookiePrefs();
                }}
                className="btn-secondary"
              >
                Modifier mes choix de cookies
              </button>
            </div>
          </div>
        )}

        {activeDoc === 'mentions' && (
          <div className="space-y-4 text-[14px] text-[var(--muted)] leading-relaxed">
            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">Éditeur du site</h3>
              <p>
                Marion Moun — Diplômé en Licence Professionnelle en Administration des Entreprises (LPAE, ESGAE).
              </p>
              <p>
                Localisation : {PERSONAL_INFO.location}<br />
                Email :{' '}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[var(--accent)] underline">
                  {PERSONAL_INFO.email}
                </a>
                <br />
                Téléphones : {PERSONAL_INFO.phone1} / {PERSONAL_INFO.phone2}
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="text-[15px] font-medium text-[var(--ink)]">Hébergement</h3>
              <p>
                [À COMPLÉTER : Raison sociale de l’hébergeur, adresse postale et contact].
              </p>
            </section>
          </div>
        )}

        <div className="pt-4 border-t border-[var(--hairline)] flex justify-end">
          <button type="button" onClick={onClose} className="btn-primary">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
